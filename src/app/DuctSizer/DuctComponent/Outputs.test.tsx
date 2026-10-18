import { render, screen } from "@testing-library/react"
import Outputs from "./Outputs"
import { DuctSizerInputs } from "@/app/libs/types"

// 1000 CFM / 800 FPM = 1.25 ft² = 180 in² (hand calculation)
const AREA = 1.25

function renderOutputs(result: number, velocity: number, cfm = 1000) {
  const inputs: DuctSizerInputs = { cfm, velocity }
  return render(<Outputs result={result} inputs={inputs} />)
}

describe("Outputs: calculated values", () => {
  it("shows the equivalent round diameter in inches and mm", () => {
    renderOutputs(AREA, 800)
    // D = 2 * sqrt(180 / pi) = 15.14 in = 384.5 mm
    expect(screen.getByText("15.1")).toBeInTheDocument()
    expect(screen.getByText(/385 mm/)).toBeInTheDocument()
  })

  it("shows the duct area in in², ft² and m²", () => {
    renderOutputs(AREA, 800)
    expect(screen.getByText(/180/)).toBeInTheDocument()
    expect(screen.getByText(/1\.250 ft/)).toBeInTheDocument()
    expect(screen.getByText(/0\.116 m/)).toBeInTheDocument()
  })
})

describe("Outputs: velocity band", () => {
  const LOW = /low velocity/i
  const MEDIUM = /medium velocity/i
  const HIGH = /high velocity/i

  it.each([
    [800, LOW],
    [900, LOW],     // upper edge of low
    [901, MEDIUM],
    [1200, MEDIUM],
    [1499, MEDIUM], // upper edge of medium
    [1500, HIGH],   // lower edge of high
    [2000, HIGH],
  ])("velocity(%i FPM) shows exactly one matching band", (velocity, expected) => {
    renderOutputs(AREA, velocity)
    expect(screen.getByText(expected)).toBeInTheDocument()
    for (const other of [LOW, MEDIUM, HIGH].filter((b) => b !== expected)) {
      expect(screen.queryByText(other)).not.toBeInTheDocument()
    }
  })
})

// These describe the behaviour we want. They fail on the current component
// and should pass once the guards (velocity > 0, finite result) are added.
describe("Outputs: invalid input (known issues)", () => {
  it.each([0, -100, NaN])("velocity %s shows no velocity band", (velocity) => {
    renderOutputs(AREA, velocity)
    expect(screen.queryByText(/low velocity/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/medium velocity/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/high velocity/i)).not.toBeInTheDocument()
  })

  it("never renders the text NaN when the area is invalid", () => {
    const { container } = renderOutputs(NaN, 800)
    expect(container).not.toHaveTextContent("NaN")
  })
})
import { render, screen } from "@testing-library/react"
import Outputs from "./Outputs"
import { BTUInputs } from "@/app/libs/types"

function renderOutputs(result: number, inputs: BTUInputs) {
  return render(<Outputs result={result} inputs={inputs} />)
}

describe("Outputs: calculated values", () => {
  const inputs: BTUInputs = { roomArea: 20, occupants: 2, windows: 1, sunExposure: 1.2 }
  it("shows BTU value", () => {
    renderOutputs(12720, inputs)
    expect(screen.getByText("12,720")).toBeInTheDocument()
    expect(screen.getByText("TOTAL BTU REQUIRED")).toBeInTheDocument()
  })

  it("shows horsepower conversion", () => {
    renderOutputs(12720, inputs)
    expect(screen.getByText(/1\.59\s*hp/i)).toBeInTheDocument()
  })

  it("shows ton conversion", () => {
    renderOutputs(12720, inputs)
    expect(screen.getByText(/1\.06\s*Ton/i)).toBeInTheDocument()
  })

  it("shows kW and W conversion", () => {
    renderOutputs(12720, inputs)
    expect(screen.getByText(/3\.73\s*kw\s3728\s*w/i)).toBeInTheDocument()
  })

  it("shows room space details", () => {
    renderOutputs(12720, inputs)
    const row = (label: string) => screen.getByText(label).parentElement!
    expect(row("Area")).toHaveTextContent("20")
    expect(row("People")).toHaveTextContent("2")
    expect(row("Windows")).toHaveTextContent("1")
    expect(row("Sun Exposure")).toHaveTextContent("1.2")
  })
})

describe("Outputs: edge cases", () => {
  it("handles zero result", () => {
    renderOutputs(0, {
      roomArea: 0,
      occupants: 0,
      windows: 0,
      sunExposure: 1
    })
    expect(screen.getAllByText("0")).toHaveLength(3)
  })

  it("never renders the text NaN when the result is invalid", () => {
    const { container } = renderOutputs(NaN, {
      roomArea: 0,
      occupants: 0,
      windows: 0,
      sunExposure: 1
    })
    expect(container).not.toHaveTextContent("NaN")
  })
})

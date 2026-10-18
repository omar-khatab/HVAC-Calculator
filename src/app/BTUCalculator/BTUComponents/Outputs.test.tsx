import { render, screen } from "@testing-library/react"
import Outputs from "./Outputs"
import { BTUInputs } from "@/app/libs/types"

function renderOutputs(result: number, inputs: BTUInputs) {
  return render(<Outputs result={result} inputs={inputs} />)
}

describe("Outputs: calculated values", () => {
  it("shows all outputs with all units", () => {
    renderOutputs(12720, {
      roomArea: 20,
      occupants: 2,
      windows: 1,
      sunExposure: 1.2
    })
    expect(screen.getByText("12,720")).toBeInTheDocument()
    expect(screen.getByText("TOTAL BTU REQUIRED")).toBeInTheDocument()
  })

  it("shows horsepower conversion", () => {
    renderOutputs(12720, {
      roomArea: 20,
      occupants: 2,
      windows: 1,
      sunExposure: 1.2
    })
    expect(screen.getByText(/1\.59/)).toBeInTheDocument()
    expect(screen.getByText(/hp/)).toBeInTheDocument()
  })

  it("shows ton conversion", () => {
    renderOutputs(12720, {
      roomArea: 20,
      occupants: 2,
      windows: 1,
      sunExposure: 1.2
    })
    expect(screen.getByText(/1\.06/)).toBeInTheDocument()
    expect(screen.getByText(/Ton/)).toBeInTheDocument()
  })

  it("shows kW and W conversion", () => {
    renderOutputs(12720, {
      roomArea: 20,
      occupants: 2,
      windows: 1,
      sunExposure: 1.2
    })
    expect(screen.getByText(/3\.73/)).toBeInTheDocument()
    expect(screen.getByText(/3728/)).toBeInTheDocument()
  })

  it("shows room space details", () => {
    renderOutputs(12720, {
      roomArea: 20,
      occupants: 2,
      windows: 1,
      sunExposure: 1.2
    })
    expect(screen.getByText("ROOM SPACE")).toBeInTheDocument()
    expect(screen.getByText("Area")).toBeInTheDocument()
    expect(screen.getByText("Base load")).toBeInTheDocument()
    expect(screen.getByText("People")).toBeInTheDocument()
    expect(screen.getByText("Windows")).toBeInTheDocument()
    expect(screen.getByText("Sun Exposure")).toBeInTheDocument()
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

"use client"
import { DuctSizerInputs } from "@/app/libs/types"
import { useState } from "react"
import Recommendations from "./Recommendations"
import Outputs from "./Outputs"
import Inputs from "@/app/components/Inputs"
import { CircleGauge, Sigma, SquareChartGantt, Wind } from "lucide-react"
import { calcDuctArea } from "@/app/libs/formulas"

export default function Main() {
  // HVAC duct sizing inputs state
  const [inputs, setInputs] = useState<DuctSizerInputs>({
    cfm: 400, // Airflow in Cubic Feet per Minute
    velocity: 900, // Air velocity in Feet Per Minute
  })

  // Calculate duct area using separated business logic
  const { ft2, in2, cm2 } = calcDuctArea(inputs)

  // Generic updater for any input field
  const update = (field: keyof DuctSizerInputs, value: number) =>
    setInputs(p => ({...p, [field]: value }))

  return (
    <div className="grid lg:grid-cols-3 w-full max-w-7xl mx-auto px-4 gap-4 pb-10 pt-20">
      {/* Input Panel */}
      <div className="bg-primary text-surface p-6 rounded-2xl lg:row-span-2">
        <h2 className="text-xl font-extrabold mb-4 text-head flex items-center gap-2">
          <SquareChartGantt size={30} strokeWidth={1.5} />
          Duct Sizer
        </h2>

        {/* Airflow input */}
        <Inputs Icon={Wind} label="AIRFLOW (CFM)" value={inputs.cfm} min={100} max={10000} step={50} calc={v => update("cfm", v)}/>

        {/* Velocity input */}
        <Inputs Icon={CircleGauge} label="Velocity (FPM)" value={inputs.velocity} min={300} max={3000} step={50} calc={v => update("velocity", v)}/>

        {/* Formula display */}
        <div className="bg-black/20 rounded-2xl p-4 mt-6 flex flex-col gap-2 font-mono text-sm">
          <h3 className="font-bold flex items-center gap-1 font-sans text-base"><Sigma/>FORMULA</h3>
          <p>Area = CFM / Velocity</p>
          <p>{inputs.cfm} / {inputs.velocity} = {ft2.toFixed(2)} ft²</p>
          <h3 className="font-bold mt-2 border-t border-white/20 pt-2 font-sans">
            {in2.toFixed(1)} in² • {cm2.toFixed(0)} cm²
          </h3>
        </div>
      </div>

      {/* Results and recommendations */}
      <Outputs result={ft2} inputs={inputs}/>
      <Recommendations result={ft2}/>
    </div>
  )
}
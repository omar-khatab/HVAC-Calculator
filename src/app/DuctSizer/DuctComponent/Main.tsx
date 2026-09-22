"use client"

import { DuctSizerInputs } from "@/app/Types/hvac";
import { useState } from "react";
import Recommendations from "./Recommendations";
import Outputs from "./Outputs";
import Inputs from "@/app/components/Inputs";
import { CircleGauge, Sigma, SquareChartGantt, Wind } from "lucide-react";

export default function Main() {
const [inputs, setInputs] = useState<DuctSizerInputs>({
    cfm : 100,
    velocity : 100,
})

  const result : number = parseFloat((inputs.cfm / inputs.velocity).toFixed(2))

  function calcCFM(value : number) {
        setInputs({...inputs, cfm : value})
    }
  function calcVelocity(value : number) {
        setInputs({...inputs, velocity : value})
    }

  return (
    <div className="grid lg:grid-cols-3 lg:grid-rows-3 w-full max-w-7xl mx-auto px-4 gap-4 grid-cols-1 row-span-1 pb-[40] pt-[80]">
      <div className=" bg-primary text-surface p-5 rounded-2xl lg:row-span-3">
        <div>
          <h2 className="text-xl font-extrabold mb-2 text-head flex item-center gap-2">
            <SquareChartGantt size={30} strokeWidth={1.5} />
            Duct Sizer</h2>
          {/* custom component for inputs */}
          <Inputs Icon = {Wind} label="AIRFLOW • معدل التدفق (CFM)" value={inputs.cfm} min={0} max={10000} step={50} calc={calcCFM}/>
          <Inputs Icon = {CircleGauge} label="السرعة (fpm)" value={inputs.velocity} min={100} max={3000} step={50} calc={calcVelocity}/>
        </div>
        {/* UI for Formula */}
        <div className="bg-primary text-surface rounded-2xl p-4 border-border border-2 mt-10 flex gap-4 flex-col">
          <h3 className="text-head text-xl font-bold flex item-center gap-1"><Sigma/>FORMULA • المعادلة</h3>
          <p>Area = CFM / Velocity</p>
          <p>{inputs.cfm} / {inputs.velocity} = {result} ft<sup>2</sup></p>
          <p>{(result * 144).toFixed(1)} in<sup>2</sup> • {(result * 929.0304).toFixed(0)} cm<sup>2</sup></p>
        </div>
      </div>
        <Outputs result ={result} inputs = {inputs}/>
        <Recommendations result ={result}/>
    </div>
  )
}

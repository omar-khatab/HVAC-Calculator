"use client"

import { DuctSizerInputs } from "@/app/Types/hvac";
import { useState } from "react";
import Recommendations from "./Recommendations";
import Outputs from "./Outputs";
import Inputs from "@/app/components/Inputs";

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
    <div className="container m-auto grid grid-cols-3 grid-rows-1 gap-3">
      <div className="p-6 bg-primary text-surface rounded-2xl">
        <div>
          <h2 className="text-xl font-extrabold mb-4 text-head">Duct Sizer</h2>
          {/* custom component for inputs */}
          <Inputs label="AIRFLOW • معدل التدفق (CFM)" value={inputs.cfm} min={0} max={10000} step={50} calc={calcCFM}/>
          <Inputs label="السرعة (fpm)" value={inputs.velocity} min={100} max={3000} step={50} calc={calcVelocity}/>
        </div>
        {/* UI for Formula */}
        <div className="bg-primary text-surface rounded-2xl p-4 border-surface border-2 mt-4">
          <h3 className="text-head text-xl font-bold mb-2">FORMULA • المعادلة</h3>
          <p>Area = CFM / Velocity</p>
          <p>{inputs.cfm} / {inputs.velocity} = {result} ft<sup>2</sup></p>
          <p>{(result * 144).toFixed(1)} in<sup>2</sup> • {(result * 929.0304).toFixed(0)} cm<sup>2</sup></p>
        </div>
      </div>
      <div className="flex flex-col gap-3 col-span-2">
        <Outputs result ={result} inputs = {inputs}/>
        <Recommendations result ={result}/>
      </div>
    </div>
  )
}

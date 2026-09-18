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
    <>
    {/* custom component for inputs */}
      <Inputs label="AIRFLOW • معدل التدفق (CFM)" value={inputs.cfm} min={10} max={10000} step={50} calc={calcCFM}/>
      <Inputs label="السرعة (fpm)" value={inputs.velocity} min={100} max={3000} step={50} calc={calcVelocity}/>
      {/* UI for Formula */}
      <div>
        <h3>FORMULA • المعادلة</h3>
        <p>Area = CFM / Velocity</p>
        <p>{inputs.cfm} / {inputs.velocity} = {result} ft<sup>2</sup></p>
        <p>{(result * 144).toFixed(1)} in<sup>2</sup> • {(result * 929.0304).toFixed(0)} cm<sup>2</sup></p>
      </div>
      <Outputs result ={result} inputs = {inputs}/>
      <Recommendations result ={result}/>
    </>
  )
}

"use client"

import { DuctSizerInputs } from "@/app/Types/hvac";
import { useState } from "react";
import MainOutput from "./Outputs/MainOutput";
import DuctCalc from "./Calculations/DuctCalc";
import DuctFormula from "./Calculations/DuctFormula";
import DuctRecommendations from "./Recommendations/DuctRecommendations";

export default function Ductmain() {
const [inputs, setInputs] = useState<DuctSizerInputs>({
    cfm : 1,
    velocity : 1,
})

    const result : number = parseFloat((inputs.cfm / inputs.velocity).toFixed(2))

  return (
    <>
      <DuctCalc inputs={inputs} setInputs={setInputs}/>
      <DuctFormula inputs={inputs} result = {result}/>
      <MainOutput result ={result} inputs = {inputs}/>
      <DuctRecommendations result = {result} />
    </>
  )
}

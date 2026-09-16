"use client"

import { useState } from "react"
import { BTUInputs, RecommendationsTypes } from "../../Types/hvac"
import BTURecommendations from "./Recommendations/BTURecommendations"
import BTUCalc from "./Calculations/BTUCalc"
import BTUFormula from "./Calculations/BTUFormula"
import BTUOutput from "./Outputs/BTUOutput"

export default function BTUmain() {

    const [inputs , setInputs] = useState<BTUInputs>({
        roomArea : 20,
        occupants : 1,
        window : 1,
        sunExposure : 1,
    })

    const result = (inputs.roomArea * 40 + inputs.occupants * 600 + inputs.window * 1000) * inputs.sunExposure

    const recommendationCard : RecommendationsTypes[]= [
        {id : 1, ton: "< 1 ton" , btu : "< 12k BTU", space : "Small office / غرفة صغيرة", 
            status : result < 12000 },
        {id : 2, ton: "1 - 1.5 ton" , btu : "12k-18k BTU", space : "Bedroom / غرفة نوم", 
            status : result >= 12000 && result < 18000},
        {id : 3, ton: "1.5 - 2 ton" , btu : "18k-24k BTU", space : "Large bedroom / كبيرة", 
            status : result >= 18000 && result < 24000},
        {id : 4, ton: "2 - 2.5 ton" , btu : "24k-30k BTU", space : "Living room / صالة", 
            status : result >= 24000 && result < 30000},
        {id : 5, ton: "2.5 - 3.5 ton" , btu : "30k-42k BTU", space : "Open plan / مفتوحة", 
            status : result >= 30000 && result < 42000},
        {id : 6, ton: "3.5+ ton" , btu : "> 42k BTU", space : "Commercial / تجاري", 
            status : result >= 42000},
    ]

    return (
        <div className="flex flex-wrap">
            <BTUCalc inputs={inputs} setInputs={setInputs}/>
            <BTUFormula inputs={inputs}/>
            <BTUOutput result = {result} inputs={inputs} />
            <BTURecommendations recommendationCard = {recommendationCard} result = {result}/>
        </div>
    )
}

"use client"

import { useMemo, useState } from "react"
import { BTUInputs, RecommendationsTypes } from "../../Types/hvac"
import BTUCalc from "./BTUCalc"
import BTUOutput from "./BTUOutput"
import BTURecommendations from "./BTURecommendations"
import BTUFormula from "./BTUFormula"

export default function BTUmain() {

    const [inputs , setInputs] = useState<BTUInputs>({
        roomArea : 20,
        occupants : 1,
        window : 1,
        sunExposure : 1,
    })

    // using useMemo to rerender(change) calculation, in case of the inputs is changed
    const result = useMemo (() => {
        const base = inputs.roomArea * 40;
        const sub = base + inputs.occupants * 600 + inputs.window * 1000
        return sub * inputs.sunExposure
    },[inputs])

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
        <div className="grid grid-cols-2 gap-2.5">
            <BTUCalc inputs={inputs} setInputs={setInputs} />
            <BTUFormula inputs = {inputs}/>
            <BTUOutput result = {result}/>
            <BTURecommendations recommendationCard = {recommendationCard}/>
        </div>
    )
}

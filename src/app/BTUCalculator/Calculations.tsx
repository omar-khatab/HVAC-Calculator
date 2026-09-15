"use client"

import { useMemo, useState } from "react"
import { BTUInputs } from "../Types/hvac"
export default function Calculations() {
   
 const [inputs , setInputs] = useState<BTUInputs>({
        roomArea : 20,
        occupants : 1,
        window : 1,
        sunExposure : 1,
    })

    const result = useMemo (() => {


        let btu = inputs.roomArea * 40;
        btu += inputs.occupants * 600
        btu += inputs.window * 1000
        btu *= inputs.sunExposure
        return btu
    },[inputs])

    const recommendationCard : {id : number, ton : string, btu : string, space : string, status : boolean}[]= [
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
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-black">BTU Calculator</h2>


            <div className="mb-4">
                <label className="block text-sm mb-1 text-black">
                    مساحة الغرفة (sq ft)
                </label>
                <input type="number" 
                min={1}
                value={inputs.roomArea}
                onChange={(e) => setInputs({...inputs, roomArea : Math.max(1, Number(e.target.value) || 0)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm  mb-1 text-black">
                    عدد الاشخاص
                </label>
                <input type="number" 
                min={0}
                value={inputs.occupants}
                onChange={(e) => setInputs({...inputs, occupants : Math.max(0, Number(e.target.value) || 0)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm  mb-1 text-black">
                    شبابيك
                </label>
                <input type="number"
                min={0}
                value={inputs.window}
                onChange={(e) =>  setInputs({...inputs, window : Math.max(0, Number(e.target.value) || 0)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                />
            </div>
            <p>Sun Exposure</p>
            <div className="flex gap-1.5 my-5">
                {[1 , 1.2 , 1.4].map((val) => {
                    return <label key={val} className={`cursor-pointer rounded-lg p-2 font-bold 
                                ${inputs.sunExposure === val ? "bg-gray-900 text-gray-200" : "bg-gray-100"}`}>
                            <input type="radio" name="sun" checked = {inputs.sunExposure === val}
                                onChange = {() => setInputs({...inputs, sunExposure : val})}
                                className="hidden"/>
                            {val === 1 ? "No Sun x 1" : val === 1.2 ? "Medium Sun x 1.2": "High Sun x 1.4"}
                        </label>
                })}
        </div>
    </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
            <span>BTU CALCULATOR - QUICK COOLING LOAD</span>
            <div>
                <p>TOTAL BTU REQUIRED</p>
                <h2 className="text-2xl text-gray-900">{result.toFixed(0)}</h2>
                <p>BTU / hour • وحدة حرارية بريطانية</p>
                <div>
                    <p>{(result / 12000).toFixed(2)} Ton</p>
                    <p>{`${(result / 3412).toFixed(2)} kw • ${(result / 3.412).toFixed(0)} w`}</p>
                </div>
            </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
            <span>Recommendations</span>
                <ul className="flex gap-1">
                    {recommendationCard.map((r) => {
        return <li key={r.id} className={`list-none p-2 rounded-xl 
        ${r.status ? "bg-gray-900 text-gray-200 shadow-xl scale-105" : "bg-gray-200 text-gray-900"}`}>
                <span>{r.ton}</span>
                <span>{r.btu}</span>
                <p>{r.space}</p>
            </li>
    })}
                </ul>
        </div>
    </div>
    )
}

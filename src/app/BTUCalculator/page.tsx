"use client"

import { useState } from "react"
import { BTUInputs } from "../Types/hvac"

export default function BTUCalculator() {

    const [inputs , setInputs] = useState<BTUInputs>({
        roomArea : 0,
        occupants : 0,
        hasWindow : false,
    })
    const [result , setResult] = useState<number | null>(null)

    function handleCalculate () {


        let btu = inputs.roomArea * 40;
        btu += inputs.occupants * 600

        if (inputs.hasWindow) {
            btu +=500;
        }

        setResult(btu)
    }
    return (
        <div className="p-6 bg-white rounded-xl shadow-md max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">BTU Calculator</h2>


            <div className="mb-4">
                <label className="block text-sm mb-1 text-black">
                    مساحة الغرفة (sq ft)
                </label>
                <input type="number" 
                min={10}
                value={inputs.roomArea}
                onChange={(e) => {
                    setInputs({...inputs, roomArea : Number(e.target.value)})
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm  mb-1 text-black">
                    عدد الاشخاص
                </label>
                <input type="number" 
                min={0}
                value={inputs.occupants}
                onChange={(e) => {
                    setInputs({...inputs, occupants : Number(e.target.value)})
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"/>
            </div>
            <div className="mb-4 flex items-center gap-2">
                <input type="checkbox" id="window"
                checked={inputs.hasWindow}
                onChange={(e) => {
                    setInputs({...inputs, hasWindow : e.target.checked})
                }}
                className="text-black"
                />
                <label className="text-sm text-black" htmlFor="window">
                    هل يوجد شباك كبير ؟
                </label>
            </div>
            <button onClick={handleCalculate}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >احسب</button>
            {result !==null && (
                <p className="mt-4 text-lg font-bold text-black">
                    Result : {result} BTU
                    | {(result / 3412).toFixed(2)} kw
                    | {(result * 0.00039301).toFixed(2)} hp
                </p>
            )}
        </div>
    )
}

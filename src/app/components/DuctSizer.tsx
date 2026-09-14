"use client"

import { useState } from "react"
import { DuctSizerInputs, DuctSizerResult } from "../Types/hvac"


export default function DuctSizer() {
    const [inputs, setInputs] = useState<DuctSizerInputs>({
    cfm : 0,
    velocity : 0,
})
    const [ result, setResult] = useState<DuctSizerResult | null>(null)

    function handleDuctSizer () {
        if(inputs.velocity <= 0) {
            alert("من فضلك ادخل سرعة صحيحة اكبر من الصفر")
            return;
        }

        if (inputs.cfm <=0) {
            alert("من فضلك ادخل كمية هواء صحيحة اكبر من الصفر")
            return;
        }
        const finalArea = inputs.cfm / inputs.velocity
        const finalDiameter = 2 * Math.sqrt(finalArea / Math.PI) 
        setResult({ area : parseFloat(finalArea.toFixed(2)),  diameter : parseFloat(finalDiameter.toFixed(2))})
    }
    return (
        <div className="p-6 bg-white rounded-xl shadow-md max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">DuctSizer</h2>
             <div className="mb-4">
                <label className="block text-sm mb-1 text-black">
                    كمية الهواء (cfm)
                </label>
                <input type="number" 
                value={inputs.cfm}
                onChange={(e) => setInputs({...inputs, cfm : Number(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm  mb-1 text-black">
                    السرعة (fpm)
                </label>
                <input type="number" 
                value={inputs.velocity}
                onChange={(e) => setInputs({...inputs, velocity : Number(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"/>
            </div>
            <button onClick={handleDuctSizer}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >احسب</button>

            {result !==null && (
                <div className="mt-4 text-lg font-bold text-black">
                        <p>المساحة: {result.area} sq ft</p>
                        <p>القطر: {result.diameter} in</p>
                </div>
            )}
        </div>
    )
}


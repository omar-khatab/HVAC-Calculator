"use client"

import { useState } from "react"
import { BTUInputs } from "../Types/hvac"

export default function BTUCalculator() {

    const [inputs , setInputs] = useState<BTUInputs>({
        roomArea : 1,
        occupants : 0,
        window : 0,
        sunExposure : 1,
    })
    const [result , setResult] = useState<number | null>(null)

    function handleCalculate () {


        let btu = inputs.roomArea * 40;
        btu += inputs.occupants * 600
        btu += inputs.window * 1000
        btu *= inputs.sunExposure
        setResult(btu)
    }

    // function to handle values inside the fields
    function handleNumberInput (event: React.InputEvent<HTMLInputElement>) : void {
    const input = event.currentTarget;

    // if field is deleted or has value less than 1, we will make the value always equal 1
    if (!input.value || input.value < "1") {
    input.value = "1";
    }
};
    return (
        <div className="p-6 bg-white rounded-xl shadow-md max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">BTU Calculator</h2>


            <div className="mb-4">
                <label className="block text-sm mb-1 text-black">
                    مساحة الغرفة (sq ft)
                </label>
                <input type="number" 
                min={1}
                onInput={handleNumberInput}
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
            <div className="mb-4">
                <label className="block text-sm  mb-1 text-black">
                    شبابيك
                </label>
                <input type="number"
                min={0}
                value={inputs.window}
                onChange={(e) => {
                    setInputs({...inputs, window : Number(e.target.value)})
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                />
            </div>
            <p>Sun Exposure</p>
            <form action="" className="flex gap-1.5 my-5">
            <input value = "1" type="radio" name="sun" id="normal" checked = {inputs.sunExposure == 1} 
            onChange={() => setInputs({...inputs , sunExposure : 1})}
            className="appearance-none"/>
            <label htmlFor="normal"
                className={`${inputs.sunExposure == 1 ? "bg-gray-900 text-gray-200" : ""}
                bg-gray-100 w-fit flex gap-5 rounded-2xl p-2 font-bold`}>
                No Sun x 1
            </label>
            <input value = "1.2" type="radio" name="sun" id="medium" checked = {inputs.sunExposure == 1.2}
            onChange={() => setInputs({...inputs , sunExposure : 1.2})}
            className="appearance-none"/>
            <label htmlFor="medium"
            className={`${inputs.sunExposure == 1.2 ? "bg-gray-900 text-gray-200" : ""}
            bg-gray-100 w-fit flex gap-5 rounded-2xl p-2 font-bold`}
            >Medium x 1.2</label>
            <input value= "1.4" type="radio" name="sun" id="high" checked = {inputs.sunExposure == 1.4}
            onChange={() => setInputs({...inputs , sunExposure : 1.4})}
            className="appearance-none"/>
            <label htmlFor="high"
            className={`${inputs.sunExposure == 1.4 ? "bg-gray-900 text-gray-200" : ""}
            bg-gray-100 w-fit flex gap-5 rounded-2xl p-2 font-bold`}
            >High x 1.4</label>
            </form>
            <button onClick={handleCalculate}
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
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

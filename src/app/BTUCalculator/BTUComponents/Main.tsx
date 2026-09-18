"use client"

import { useState } from "react"
import { BTUInputs} from "../../Types/hvac"
import Outputs from "./Outputs"
import Inputs from "../../components/Inputs"
import Recommendations from "./Recommendations"

export default function Main() {

    const [inputs , setInputs] = useState<BTUInputs>({
        roomArea : 50,
        occupants : 1,
        window : 1,
        sunExposure : 1,
    })

    // Formula and Calculations
    const base = inputs.roomArea * 40;
    const people = inputs.occupants * 600
    const windows= inputs.window * 1000
    const sub = base + people + windows
    const result = sub * inputs.sunExposure

    // update fields
    function calcRoomArea(value : number) {
        setInputs({...inputs, roomArea : value})
    }
    function calcOccupants(value : number) {
        setInputs({...inputs, occupants : value})
    }
    function calcWindows(value : number) {
        setInputs({...inputs, window : value})
    }

    return (
        <div className="flex flex-wrap">
            <div className="p-6 bg-white rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4 text-black">BTU Calculator</h2>
                {/* custom component for inputs */}
                <Inputs label="مساحة الغرفة (sq ft)" min={50} max={2000} step={10} value={inputs.roomArea} calc = {calcRoomArea}/>
                <Inputs label="عدد الاشخاص" min={0} max={100} value={inputs.occupants}calc = {calcOccupants}/>
                <Inputs label="شبابيك" min={0} max={20}value={inputs.window} calc = {calcWindows}/>
                {/* Sun Exposure selection */}
                <h3>Sun Exposure</h3>
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
                {/* UI for formula */}
            <div>
                <p> Base = Area x 40</p>
                <p> {inputs.roomArea } ft<sup>2</sup> x 40 = <span>{base.toLocaleString()} BTU</span></p>
                <p>+ People {inputs.occupants} x 600 = <span>{people}</span></p>
                <p>+ windows {inputs.window} x 1000 = <span>{windows}</span></p>
                <p>sub = {sub} x <span>{inputs.sunExposure}</span> (sun)</p>
                <h3>= {result.toFixed(0)} BTU = {(result / 12000).toFixed(2)} Ton</h3>
            </div>
            <Outputs result = {result} inputs={inputs} />
            <Recommendations result = {result}/>
        </div>
    )
}

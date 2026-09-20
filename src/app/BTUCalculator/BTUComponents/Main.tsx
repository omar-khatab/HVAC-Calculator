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
    const windows = inputs.window * 1000
    const sub = (base + windows) * inputs.sunExposure
    const people = inputs.occupants * 600
    const result = people + sub

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
        <div className="container m-auto grid grid-cols-3 grid-rows-1 gap-3">
            <div className="p-4 bg-primary text-surface rounded-2xl">
                <h2 className="text-xl font-extrabold mb-2 text-head">BTU Calculator</h2>
                {/* custom component for inputs */}
                <Inputs label="مساحة الغرفة (sq ft)" min={50} max={2000} step={10} value={inputs.roomArea} calc = {calcRoomArea}/>
                <Inputs label="عدد الاشخاص" min={0} max={100} value={inputs.occupants}calc = {calcOccupants}/>
                <Inputs label="شبابيك" min={0} max={20}value={inputs.window} calc = {calcWindows}/>
                {/* Sun Exposure selection */}
                <h3 className="p-2">SUN EXPOSURE • التعرض للشمس </h3>
                <div className="flex gap-1.5 mb-3 p-2">
                    {[1 , 1.2 , 1.4].map((val) => {
                    return <label key={val} className={`cursor-pointer rounded-2xl p-2 font-medium
                                    ${inputs.sunExposure === val ? "bg-surface text-primary" : "bg-secondary text-surface"}`}>
                                <input type="radio" name="sun" checked = {inputs.sunExposure === val}
                                    onChange = {() => setInputs({...inputs, sunExposure : val})}
                                    className="hidden"/>
                                {val === 1 ? "No Sun x 1" : val === 1.2 ? "Medium Sun x 1.2": "High Sun x 1.4"}
                        </label>
                    })}
                </div>
                {/* UI for formula */}
                <div className="bg-primary text-surface rounded-2xl p-4 border-surface border-2">
                    <h3 className="text-head text-xl font-bold mb-2">FORMULA • المعادلة</h3>
                    <p> Base = Area x 40</p>
                    <p> {inputs.roomArea } x 40 = <span>{base.toLocaleString()}</span></p>
                    <p>+ windows : {inputs.window} x 1000 = <span>{windows}</span></p>
                    <p>sub = (Base + Windows) x <span>{inputs.sunExposure}</span> (sun)</p>
                    <p>sub = {(base + windows)} x <span>{inputs.sunExposure}</span> = {sub}</p>
                    <p>+ People {inputs.occupants} x 600 = <span>{people}</span></p>
                    <h3>= {result.toFixed(0)} BTU = {(result / 12000).toFixed(2)} Ton</h3>
                </div>
            </div>
            <div className="flex flex-col justify-between col-span-2">
                <Outputs result = {result} inputs={inputs} />
                <Recommendations result = {result}/>
            </div>
        </div>
    )
}

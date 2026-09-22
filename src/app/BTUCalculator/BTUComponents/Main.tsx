"use client"

import { useState } from "react"
import { BTUInputs} from "../../Types/hvac"
import Outputs from "./Outputs"
import Inputs from "../../components/Inputs"
import Recommendations from "./Recommendations"
import { Box, PanelsTopLeft, Sigma, Sun,ThermometerSnowflake, Users } from "lucide-react"

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
        <div className="w-full max-w-7xl mx-auto px-4  grid lg:grid-cols-3 lg:grid-rows-2 gap-4
        grid-cols-1 grid-rows-1 mt-[100]">
            <div className="p-6 bg-primary text-surface rounded-2xl flex flex-col justify-between lg:row-span-2">
                <h2 className="text-xl font-extrabold text-head flex gap-2 items-center mb-2">
                    <ThermometerSnowflake size={30} strokeWidth={1.5} />BTU Calculator
                </h2>
                {/* custom component for inputs */}
                <Inputs Icon={Box} label="مساحة الغرفة (sq ft)" min={50} max={2000} step={10} value={inputs.roomArea} calc = {calcRoomArea}/>
                <Inputs Icon = {Users} label="عدد الاشخاص" min={0} max={100} value={inputs.occupants}calc = {calcOccupants}/>
                <Inputs Icon={PanelsTopLeft} label="شبابيك" min={0} max={20}value={inputs.window} calc = {calcWindows}/>
                {/* Sun Exposure selection */}
                    <h3 className="py-2 flex item-center gap-1"><Sun strokeWidth={1.5} />SUN EXPOSURE • التعرض للشمس </h3>
                <div className="flex mb-3 py-2 gap-2">
                    {[1 , 1.2 , 1.4].map((val) => {
                    return <label key={val} className={`cursor-pointer rounded-2xl p-2 font-medium text-sm
                                    ${inputs.sunExposure === val ? "bg-surface text-primary" : "bg-secondary text-surface"}`}>
                                <input type="radio" name="sun" checked = {inputs.sunExposure === val}
                                    onChange = {() => setInputs({...inputs, sunExposure : val})}
                                    className="hidden"/>
                                {val === 1 ? "No Sun x 1" : val === 1.2 ? "Medium Sun x 1.2": "High Sun x 1.4"}
                        </label>
                    })}
                </div>
                {/* UI for formula */}
                <div className="bg-primary text-surface rounded-2xl p-4 border-border border-2 flex flex-col gap-1.5">
                        <h3 className="text-head text-xl font-bold mb-1 flex item-center gap-1"><Sigma strokeWidth={1.5} />FORMULA • المعادلة</h3>
                    <p> Base = Area x 40</p>
                    <p> {inputs.roomArea } x 40 = <span>{base.toLocaleString()}</span></p>
                    <p>+ windows : {inputs.window} x 1,000 = <span>{windows.toLocaleString()}</span></p>
                    <p>sub = (Base + Windows) x <span>{inputs.sunExposure}</span> (sun)</p>
                    <p>sub = {(base + windows).toLocaleString()} x <span>{inputs.sunExposure}</span> = {sub.toLocaleString()}</p>
                    <p>+ People : {inputs.occupants} x 600 = <span>{people.toLocaleString()}</span></p>
                    <h3>= {result.toLocaleString()} BTU = {(result / 12000).toFixed(2)} Ton</h3>
                </div>
            </div>
            <Outputs result = {result} inputs={inputs} />
            <Recommendations result = {result}/>
        </div>
    )
}

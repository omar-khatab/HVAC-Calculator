"use client"

import { useState } from "react"
import { BTUInputs } from "../../libs/types"
import Outputs from "./Outputs"
import Inputs from "../../components/Inputs"
import Recommendations from "./Recommendations"
import { Box, PanelsTopLeft, Sigma, Sun, ThermometerSnowflake, Users } from "lucide-react"
import { calcBTU } from "../../libs/formulas"

export default function Main() {

    // Initial state for BTU calculation inputs
    const [inputs, setInputs] = useState<BTUInputs>({
        roomArea: 10, // Room area in square meters
        occupants: 1, // Number of people in the room
        window: 1, // Number of windows
        sunExposure: 1, // Sun exposure factor (1, 1.2, 1.4)
    })

    // Calculate BTU using extracted business logic
    const { base, windows, sub, people, result, tons } = calcBTU(inputs)

    // Generic handler to update any input field
    const update = (field : keyof BTUInputs, value : number) => {
        setInputs((prev) => ({...prev, [field]: value }))
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-3 lg:grid-rows-2 gap-4
            grid-cols-1 grid-rows-1 pb-[40] pt-[80]">
            {/* Input section */}
            <div className="p-6 bg-primary text-surface rounded-2xl flex flex-col justify-between lg:row-span-2">
                <h2 className="text-xl font-extrabold text-head flex gap-2 items-center mb-2">
                    <ThermometerSnowflake size={30} strokeWidth={1.5} />BTU Calculator
                </h2>

                {/* Reusable input components */}
                <Inputs Icon={Box} label=" room area (sq m)" min={10} max={200} step={5} value={inputs.roomArea} calc={(value) => update('roomArea', value)}/>
                <Inputs Icon={Users} label="people" min={0} max={100} value={inputs.occupants} calc={(value) => update('occupants', value)}/>
                <Inputs Icon={PanelsTopLeft} label="windows" min={0} max={20} value={inputs.window} calc={(value) => update('window', value)}/>

                {/* Sun exposure selector */}
                <h3 className="py-2 flex items-center gap-1"><Sun strokeWidth={1.5} />SUN EXPOSURE </h3>
                <div className="flex mb-3 gap-2 bg-secondary rounded-full justify-between">
                    {[1, 1.2, 1.4].map((val) => {
                    return <label key={val} className={`cursor-pointer rounded-full px-3 py-2 font-medium text-sm text-center
                                    ${inputs.sunExposure === val? "bg-surface text-primary" : " text-surface"}`}>
                                <input type="radio" name="sun" checked = {inputs.sunExposure === val}
                                    onChange = {() => setInputs((prev) => ({...prev, sunExposure: val }))}
                                    className="hidden"/>
                                {val === 1? <span>No Sun x 1</span> : val === 1.2? <span>Medium Sun x 1.2</span> :
                                <span>High Sun x 1.4</span>}
                        </label>
                    })}
                </div>

                {/* Formula breakdown display */}
                <div className="bg-black/20 text-surface rounded-2xl p-4 flex flex-col gap-1.5">
                        <h3 className="text-head text-xl font-bold mb-1 flex items-center gap-1"><Sigma strokeWidth={1.5} />FORMULA</h3>
                    <p> Base = Area x 430</p>
                    <p> {inputs.roomArea } x 430 = <span>{base.toLocaleString()}</span></p>
                    <p>+ windows : {inputs.window} x 1,000 = <span>{windows.toLocaleString()}</span></p>
                    <p>sub = (Base + Windows) x <span>{inputs.sunExposure}</span> (sun)</p>
                    <p>sub = {(base + windows).toLocaleString()} x <span>{inputs.sunExposure}</span> = {sub.toLocaleString()}</p>
                    <p>+ People : {inputs.occupants} x 600 = <span>{people.toLocaleString()}</span></p>
                    <h3 className="font-bold mt-2 border-t border-white/20 pt-2">= {result.toLocaleString()} BTU = {(tons).toFixed(2)} Ton</h3>
                </div>
            </div>

            {/* Output and recommendation panels */}
            <Outputs result = {result} inputs={inputs} />
            <Recommendations result = {result}/>
        </div>
    )
}
import { BTUInputs } from "@/app/Types/hvac"

type Props = {
inputs: BTUInputs,
setInputs: (value : BTUInputs) => void,
}

export default function BTUCalc({inputs , setInputs } : Props) {

    return (
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
    )
}

import { DuctSizerInputs } from "@/app/Types/hvac"

type Props = {
    inputs : DuctSizerInputs,
    setInputs : (value : DuctSizerInputs) => void,
}

export default function DuctCalc({inputs , setInputs} : Props) {
    
    return (
        <div className="p-6 bg-white rounded-xl shadow-md max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">DuctSizer</h2>
            <div className="mb-4">
                <label className="block text-sm mb-1 text-black">
                    كمية الهواء (cfm)
                </label>
                <input type="number" 
                value={inputs.cfm}
                onChange={(e) => setInputs({...inputs, cfm : Math.max(1, Number(e.target.value) || 1)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm  mb-1 text-black">
                    السرعة (fpm)
                </label>
                <input type="number" 
                value={inputs.velocity}
                onChange={(e) => setInputs({...inputs, velocity : Math.max(1, Number(e.target.value) || 1)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"/>
            </div>
        </div>
    )
}

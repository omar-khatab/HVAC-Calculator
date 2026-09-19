
type Props = {
    label : string
    value: number,
    min : number
    max : number
    step?: number
    calc: ( value : number) => void,
}

export default function Inputs({label , value, min, max, step, calc } : Props) {

    return (
        <div className="p-2 ">
            <label className="mb-1.5 flex justify-between text-surface">
                <span>{label}</span>
                <span>{value}</span>
            </label>
            <div className="flex justify-between">
                <input type="range" 
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => calc(Number(e.target.value))}
                    className="accent-secondary flex-1"
                    />
                <input type="number"
                    min={min}
                    max={max}
                    step={step} 
                    value={value}
                    onChange={(e) => calc(Number(e.target.value))}
                    onBlur={(e) => {
                        let num = Number(e.target.value)
                        if(isNaN(num) || num < min) num = min
                        calc(num)
                    }}
                    className="bg-surface text-primary border w-[80] ml-3 rounded-2xl outline-none px-2 py-1"
                    />
            </div>
        </div>
    )
}

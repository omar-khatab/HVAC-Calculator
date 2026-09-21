
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
        <div className="py-2">
            <label className="mb-1.5 flex justify-between text-surface">
                <span>{label}</span>
                <span>{value}</span>
            </label>
            <div className="flex flex-wrap gap-3">
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
                    onChange={(e) => {
                        calc(Math.min(Number(e.target.value),max))
                    }}
                    onBlur={(e) => {
                        let num = Number(e.target.value)
                        if(isNaN(num) || num < min) num = min
                        calc(num)
                    }}
                    className="bg-surface text-primary border w-[90] rounded-2xl outline-none px-2 py-1 focus:border-head transition"
                    />
            </div>
        </div>
    )
}

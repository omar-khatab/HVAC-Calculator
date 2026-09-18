
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
        <div>
            <label>
                <span>{label}</span>
                <span>{value}</span>
            </label>
            <input type="range" 
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => calc(Number(e.target.value))}
                />
            <input type="number"
                min={min}
                max={max}
                step={step} 
                value={value}
                onChange={(e) => calc(Number(e.target.value))}
                onBlur={(e) => {
                    let num = Number(e.target.value)
                    if(isNaN(num) || num < 50) num = 50
                    calc(min)
                }}
                />
        </div>
    )
}

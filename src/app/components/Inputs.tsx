import { LucideIcon } from "lucide-react"

type Props = {
    Icon: LucideIcon
    label: string
    value: number
    min: number
    max: number
    step?: number
    calc: (value: number) => void
}

export default function Inputs({ Icon, label, value, min, max, step, calc }: Props) {
    
    return (
        <div className="py-2 flex-1">
            <label className="mb-1.5 flex justify-between text-surface">
                <span className="flex item-center gap-1"><Icon className="w-4 h-6"/>{label}</span>
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
                        const rawValue = e.target.value
                        const num = Number(rawValue)
                        if (!isNaN(num)) {
                            calc(Math.min(num, max))
                        }
                    }}
                    onBlur={(e) => {
                        const rawValue = e.target.value
                        let num = Number(rawValue)
                        if (isNaN(num) || num < min) num = min
                        else if (num > max) num = max
                        calc(num)
                    }}
                    className="bg-surface text-primary border w-[90] rounded-2xl outline-none px-2 py-1 focus:border-head transition"
                    />
            </div>
        </div>
    )
}

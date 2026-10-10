import { Layers, Snowflake } from "lucide-react"

type Props = {
    result: number
}

export default function Recommendations({result}: Props) {
    // AC unit size recommendations based on BTU ranges
    const recommendationCard: {id: number, ton: string, btu: string, space: string, status: boolean}[] = [
        {id: 1, ton: "< 1 ton", btu: "< 12k BTU", space: "Small office",
            status: result < 12000},
        {id: 2, ton: "1 - 1.5 ton", btu: "12k-18k BTU", space: "Bedroom",
            status: result >= 12000 && result < 18000},
        {id: 3, ton: "1.5 - 2 ton", btu: "18k-24k BTU", space: "Large bedroom",
            status: result >= 18000 && result < 24000},
        {id: 4, ton: "2 - 2.5 ton", btu: "24k-30k BTU", space: "Living room",
            status: result >= 24000 && result < 30000},
        {id: 5, ton: "2.5 - 3.5 ton", btu: "30k-42k BTU", space: "Open plan",
            status: result >= 30000 && result < 42000},
        {id: 6, ton: "3.5+ ton", btu: "> 42k BTU", space: "Commercial",
            status: result >= 42000},
    ]

    return (
        <div className="p-6 bg-primary rounded-2xl lg:col-span-2">
            {/* Section header */}
            <h2 className="md:text-2xl text- flex items-center gap-1 text-head pb-5 border-b border-border">
                <Layers strokeWidth={1.5} size={20}/>Recommendation
            </h2>

            {/* Grid of recommendation cards */}
            <ul className="grid md:grid-cols-3 gap-3 py-4">
                {recommendationCard.map((r) => {
                    return <li key={r.id} className={`list-none p-2 rounded-2xl
                        ${r.status? "bg-secondary text-surface shadow-xl" : "bg-surface text-primary"}`}>
                        <div className="flex justify-between text-">
                            <span>{r.ton}</span>
                            <span className="p-1 bg-gray-200 text-black rounded-2xl text-">{r.btu}</span>
                        </div>
                        <p>{r.space}</p>
                    </li>
                })}
            </ul>

            {/* Active recommendation summary */}
            <div className="bg-amber-200/70 rounded-2xl px-4 py-2">
                <div className="flex item-center gap-1 flex-wrap">
                    <Snowflake strokeWidth={1.5} className="h-7 w-7 text-primary rounded-full bg-amber-200"/>
                    <span className="text-xl font-bold">Recommended</span> : {recommendationCard.map((r) => {
                        // Show only the matching recommendation
                        return r.status? <span key={r.id} className="text-xl font-bold">{r.space}</span> : ""
                    })}
                </div>
                <p>Calculated {result.toLocaleString()} BTU → {(result / 12000).toFixed(2)} Tons. For best efficiency, round up to next available unit size.
                </p>
            </div>
        </div>
    )
}
import { DuctSizerInputs } from "@/app/libs/types"
import { Diameter, Info, Scan } from "lucide-react"

type Props = {
    result: number // Duct area in ft²
    inputs: DuctSizerInputs
}

export default function Outputs({result, inputs}: Props) {
    // Guard against invalid inputs
    const isValidVelocity = inputs.velocity > 0 && Number.isFinite(inputs.velocity)
    const isValidResult = Number.isFinite(result) && result >= 0

    // Velocity-based design recommendations
    const detailsDesign: {id: number, title: string, desc: string, recommendations: string, status: boolean}[] = [
        {id: 1, title: "Low velocity • هادئ", desc: "suitable for quiet spaces", recommendations: "Friction → • Noise low ",
            status: isValidVelocity && inputs.velocity <= 900},
        {id: 2, title: "Medium velocity • متوازن", desc: "suitable for general spaces", recommendations: "Friction → • Noise ↑",
            status: isValidVelocity && inputs.velocity > 900 && inputs.velocity < 1500},
        {id: 3, title: "High velocity • عالي", desc: "may cause noise", recommendations: "Friction ↑ • Noise ↑",
            status: isValidVelocity && inputs.velocity >= 1500},
    ]

    // Calculate equivalent round duct diameter from area
    // Formula: Diameter = 2 * sqrt(Area / PI) converted from ft² to inches
    const diameterInch = isValidResult ? 2 * Math.sqrt((result * 144) / Math.PI) : 0

    return (
            <div className=" rounded-2xl lg:col-span-2 flex md:justify-between justify-center h-fit gap-2 flex-col md:flex-row">
                    {/* Equivalent diameter card */}
                    <div role="region" aria-label="Equivalent Diameter" className="bg-primary text-surface p-5 rounded-2xl flex flex-col justify-between gap-2 md:w-[265] w-full">
                        <h3 className="flex items-center gap-1 text-head"><Diameter className="h-6" strokeWidth={1.5} />Equivalent Diameter</h3>
                        <p data-testid="equivalent-diameter">
                            <span className="text-3xl font-bold">{diameterInch.toFixed(1)}<sup>{`"`}</sup></span>
                            <span>{`/ ${(diameterInch * 25.4).toFixed(0)} mm`}</span>
                        </p>
                        <p>
                            Round duct equivalent
                        </p>
                    </div>

                    {/* Duct area card */}
                    <div role="region" aria-label="DUCT AREA" className="bg-primary text-surface p-5 rounded-2xl flex flex-col justify-between gap-2 md:w-[265] w-full">
                        <h3 className="flex items-center gap-1 text-head"><Scan className="h-6" strokeWidth={1.5} />DUCT AREA</h3>
                        <p data-testid="duct-area" className="text-3xl font-bold">{isValidResult ? (result * 144).toFixed(0) : "0"} <span>in<sup>2</sup></span></p>
                        <p>{isValidResult ? result.toFixed(3) : "0"} ft<sup>2</sup> • {isValidResult ? (result * 0.092903).toFixed(3) : "0"} m<sup>2</sup></p>
                    </div>

                    {/* Velocity status card */}
                    <div role="region" data-testid="status-card" className="bg-primary text-surface p-5 rounded-2xl flex flex-col gap-1 md:w-[265] w-full">
                        <h3 className="flex items-center gap-1 text-head"><Info className="h-6" strokeWidth={1.5} />STATUS</h3>
                        {detailsDesign.map((s) => {
                            return s.status?
                            <div key={s.id} className="flex gap-1 flex-col">
                                <h3 className="font-bold">{s.title}</h3>
                                <p className="font-bold">{s.desc}</p>
                                <p>{s.recommendations}</p>
                            </div>
                            : ""
                        })}
                    </div>
            </div>
    )
}
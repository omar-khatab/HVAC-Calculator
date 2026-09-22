import { DuctSizerInputs } from "@/app/Types/hvac"
import { Diameter, Info, Scan } from "lucide-react"

type  Props = {
    result : number,
    inputs : DuctSizerInputs,
}

export default function Outputs({result, inputs} : Props) {

    const detailsDesign : { id : number, title : string, desc: string, recommendations : string, status : boolean }[] = [
        {id : 1 , title:"Low velocity • هادئ", desc : " مناسبة لغرف هادئة", recommendations: "Friction → • Noise low ",
            status : inputs.velocity <= 900},
        {id : 2 , title:"medium velocity • متوازن", desc : "مناسبة لمساحات عامة", recommendations : "Friction → • Noise ↑", 
            status : inputs.velocity > 900 && inputs.velocity < 1500},
        {id : 3 , title:"High velocity • عالي", desc : "قد تسبب ضوضاء ملحوظة", recommendations : "Friction ↑ • Noise ↑", 
            status : inputs.velocity >= 1500},
    ]
    const diameterInch = 2 * Math.sqrt((result * 144) / Math.PI) 
    return (
            <div className=" rounded-2xl lg:col-span-2 flex md:justify-between justify-center h-fit gap-2 flex-col md:flex-row">
                    <div className="bg-primary text-surface p-5 rounded-2xl flex flex-col justify-between gap-2 md:w-[265] w-full">
                        <h3 className="flex items-center gap-1 text-head"><Diameter className="h-6" strokeWidth={1.5} />EQUIVALENT DIA</h3>
                        <p>
                            <span className="text-3xl font-bold">{diameterInch.toFixed(1)}<sup>{`"`}</sup></span>
                            <span>{`/ ${(diameterInch * 25.4).toFixed(0)} mm`}</span>
                        </p>
                        <p className="text-[10px]">
                            Round duct equivalent • القطر المكافئ
                        </p>
                    </div>
                    <div className="bg-primary text-surface p-5 rounded-2xl flex flex-col justify-between gap-2 md:w-[265] w-full">
                        <h3 className="flex items-center gap-1 text-head"><Scan className="h-6" strokeWidth={1.5} />DUCT AREA</h3>
                        <p className="text-3xl font-bold">{(result * 144).toFixed(0)} <span className="text-[16px]">in<sup>2</sup></span></p>
                        <p>{result.toFixed(3)} ft<sup>2</sup> • {(result * 0.0929).toFixed(3)} m<sup>2</sup></p>
                    </div>
                    <div className="bg-primary text-surface p-5 rounded-2xl flex flex-col  gap-1 md:w-[265] w-full">
                        <h3 className="flex item-center gap-1 text-head"><Info className="h-6" strokeWidth={1.5} />STATUS</h3>
                        {detailsDesign.map((s) => {
                            return s.status ? 
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

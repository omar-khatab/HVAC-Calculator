import { DuctSizerInputs } from "@/app/Types/hvac"

type  Props = {
    result : number,
    inputs : DuctSizerInputs,
}

export default function MainOutput({result, inputs} : Props) {

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
        <div>
                <div className="mt-4 text-lg font-bold text-black">
                        <div>
                            <h3>EQUIVALENT DIA</h3>
                            <p>
                                {diameterInch.toFixed(1)}<sup>{`"`}</sup>
                                <span>{`/ ${(diameterInch * 25.4).toFixed(0)} mm`}</span>
                            </p>
                        </div>
                        <div>
                            <h3>DUCT AREA</h3>
                            <p>{result * 144} in<sup>2</sup></p>
                            <span>{result.toFixed(1)} ft<sup>2</sup></span>
                            <span> • {(result * 0.0929).toFixed(3)} m<sup>2</sup></span>
                        </div>
                        <div>
                            <h3>STATUS</h3>
                            {detailsDesign.map((s) => {
                                return s.status ? 
                                <div key={s.id}>
                                    <h3>{s.title}</h3>
                                    <p>{s.desc}</p>
                                    <p>{s.recommendations}</p>
                                </div>
                                : ""
                            })}
                        </div>
                </div>
        </div>
    )
}

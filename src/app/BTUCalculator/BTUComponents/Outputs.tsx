import { BTUInputs } from "@/app/Types/hvac"

type Props = {
    result: number,
    inputs : BTUInputs,
}

export default function Outputs({result, inputs} : Props) {
    const roomSpace : {id : number, title : string, value : number}[] = [
        {id :1, title : "Area • المساحة", value : inputs.roomArea},
        {id :2, title : "Base load", value :  inputs.roomArea * 40},
        {id :3, title : "People", value :  inputs.occupants},
        {id :4, title : "Windows", value :  inputs.window},
        {id :5, title : "Sun Exposure", value :  inputs.sunExposure},
    ]
return (
    <div className="bg-primary text-surface p-6 rounded-2xl lg:col-span-2">
        <h2 className="text-xl mb-4 text-head font-bold">BTU CALCULATOR - QUICK COOLING LOAD • حمل التبريد</h2>
        <div className="flex justify-between items-center flex-col md:flex-row gap-3">
            <div className="flex gap-3 flex-col w-full">
                <div>
                    <h3 className="text-xl">TOTAL BTU REQUIRED</h3>
                    <h3 className="text-5xl text-head my-3">{result.toLocaleString()}</h3>
                    <p>BTU / hour • وحدة حرارية بريطانية</p>
                </div>
                <div className="justify-center text-2xl font-bold flex gap-2 p-2  bg-secondary rounded-2xl md:w-fit">
                    <span>{(result / 2544.43).toFixed(2)}</span>
                    <span>hp • حصان</span>
                </div>
                <div className="flex gap-3 flex-col md:flex-row text-center">
                    <p className="bg-secondary rounded-2xl px-3 py-2">{(result / 12000).toFixed(2)} Ton</p>
                    <p className="bg-secondary rounded-2xl px-3 py-2">{`${(result / 3412).toFixed(2)} kw • ${(result / 3.412).toFixed(0)} w`}</p>
                </div>
            </div>
            <div className="bg-secondary rounded-2xl p-4 md:w-[250] w-full h-fit flex flex-col gap-2">
                <h3 className="font-bold">ROOM SPACE</h3>
                {roomSpace.map((e,i) => {
                    const fit = i === 0 || i === 1
                    return <div key = {e.id} className="flex justify-between">
                        <span>{e.title}</span>
                        <span>{`${e.value.toLocaleString()}`} {fit ? `ft`  : null}{fit ? <sup>2</sup> : null}</span>
                    </div>
                })}
            </div>
        </div>
    </div>
    )
}

import { BTUInputs } from "@/app/Types/hvac"

type Props = {
  result: number,
  inputs : BTUInputs,
}

export default function BTUOutput({result, inputs} : Props) {
  return (
    <div>

        <div className="p-6 bg-white rounded-xl shadow-md">
            <span>BTU CALCULATOR - QUICK COOLING LOAD</span>
            <div>
                <p>TOTAL BTU REQUIRED</p>
                <h2 className="text-2xl text-gray-900">{result.toFixed(0)}</h2>
                <p>BTU / hour • وحدة حرارية بريطانية</p>
                <div>
                    <p>{(result / 12000).toFixed(2)} Ton</p>
                    <p>{`${(result / 3412).toFixed(2)} kw • ${(result / 3.412).toFixed(0)} w`}</p>
                </div>
            </div>
        </div>
        <div>
        <h3>ROOM SPACE</h3>
        <div>
            <span>Area • المساحة</span>
            <span>{inputs.roomArea} ft<sup>2</sup></span>
        </div>
        <div>
            <span>Base load</span>
            <span>{inputs.roomArea * 40} ft<sup>2</sup></span>
        </div>
        <div>
            <span>People</span>
            <span>{inputs.occupants}</span>
        </div>
        <div>
            <span>Windows</span>
            <span>{inputs.window}</span>
        </div>
        <div>
            <span>Sun Exposure</span>
            <span>x{inputs.sunExposure}</span>
        </div>
    </div>
    </div>
    )
}

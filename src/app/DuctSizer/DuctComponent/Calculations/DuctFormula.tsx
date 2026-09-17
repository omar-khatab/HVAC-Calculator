import { DuctSizerInputs } from "@/app/Types/hvac"

type Props = {
  inputs : DuctSizerInputs,
  result : number,
}


export default function DuctFormula({inputs , result} : Props) {
  return (
    <div>
        <h3>FORMULA • المعادلة</h3>
        <p>Area = CFM / Velocity</p>
        <p>{inputs.cfm} / {inputs.velocity} = {result} ft<sup>2</sup></p>
        <p>{(result * 144).toFixed(1)} in<sup>2</sup> • {(result * 929.0304).toFixed(0)} cm<sup>2</sup></p>
    </div>
  )
}

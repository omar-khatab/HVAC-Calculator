import { BTUInputs } from "@/app/Types/hvac"

type Props = {
    inputs : BTUInputs,
}

export default function BTUFormula({inputs} : Props) {
    const base = inputs.roomArea * 40;
    const people = inputs.occupants * 600
    const windows= inputs.window * 1000
    const sub = base + people + windows
    const total = sub * inputs.sunExposure
  return (
    <div>
        <p> Base = Area x 40</p>
        <p> {inputs.roomArea } ft<sup>2</sup> x 40 = <span>{base.toLocaleString()} BTU</span></p>
        <p>+ People {inputs.occupants} x 600 = <span>{people}</span></p>
        <p>+ windows {inputs.window} x 1000 = <span>{windows}</span></p>
        <p>sub = {sub} x <span>{inputs.sunExposure}</span> (sun)</p>
        <h3>= {total.toFixed(0)} BTU = {(total / 12000).toFixed(2)} Ton</h3>
    </div>
  )
}

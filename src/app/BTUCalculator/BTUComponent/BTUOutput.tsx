type Props = {
  result: number
}

export default function BTUOutput({result} : Props) {
  return (
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
    )
}

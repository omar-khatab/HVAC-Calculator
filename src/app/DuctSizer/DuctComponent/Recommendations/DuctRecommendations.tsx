type Props = {
  result : number,
}


export default function DuctRecommendations({result} : Props) {
  const standardWidths = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48];
  const suggestions : {width : number , height : number, ratio : number, error : number}[] = []
  const seen = new Set<string>()
  const areaSqInch = result * 144
  for (const width of standardWidths) {
    const rawHeight = areaSqInch / width
    const height = Math.round(rawHeight / 2) * 2
    if(height < 6 || height > 48) continue

    const actualArea = width * height
    const errorPercent = Math.abs(actualArea - areaSqInch) / areaSqInch

    if (errorPercent > 0.15) continue
    const aspectRatio = Math.max(width, height) / Math.min(width, height)
    if (aspectRatio > 4) continue
    const key = `${Math.min(width, height)}x${Math.max(width, height)}`
    if (seen.has(key)) continue;

      seen.add(key)
      suggestions.push({
        width,
        height,
        ratio : Number(aspectRatio.toFixed(2)),
        error : Number(errorPercent.toFixed(2)),
      })
  }
  const finalSuggestions = suggestions.sort((a,b) => a.ratio - b.ratio || a.error - b.error).slice(0,4)

  return (
    <div>
      {finalSuggestions.map((s,i) => {
        const isBest = i === 0
        return (
          <div key={`${s.width}x${s.height}`} className="my-2">
            <span className="rounded-2xl bg-gray-900 text-gray-200 p-2">{i+1}</span>
            <span>{`${s.width}" x ${s.height}"`} / </span>
            <span>{`${(s.width * 25.4).toFixed(0)} mm x ${(s.height * 25.4).toFixed(0)} mm`}</span>
            <p>{areaSqInch.toFixed(0)} in<sup>2</sup> • Ratio {s.ratio}:1 • {isBest ? "Closest to square • الأقرب للمربع" : "Aspect OK"}</p>
          </div>
        )
      })}
    </div>
  )
}

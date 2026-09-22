type Props = {
  result : number,
}

// Standard Sizes
const standardWidths = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48];
function getSuggestions(result: number) {
  // Duct sizes Selection
  // :لكل عرض قياسي من الليستة | For each standard size in the list:
  // 1. احسب الارتفاع المناسب | Calculate the appropriate height
  // 2. قرّبه لرقم زوجي | Round it to an even number
  // 3. ارفضه لو برّه النطاق المعقول (6-48) | Reject if outside the reasonable range (6–48)
  // 4. %ارفضه لو الخطأ في المساحة أكبر من 15 | Reject if the area error exceeds 15%
  // 5. ارفضه لو الشكل نحيف جدًا (نسبة أكبر من 4:1) | Reject if the shape is too slender (ratio greater than 4:1)
  // 6. (12x16)(16x12) امنع تكرار المقاسات | Prevent duplicate dimensions (e.g., 12x16 and 16x12)
  // 7. اقبله لو عدى كل الشروط | Accept if all conditions are met
  // 8. رتب لأقرب شكل للمربع وخد افضل 4 | Sort by proximity to a square shape and select the best 4

  const suggestions : {width : number , height : number, area : number, ratio : number, error : number}[] = []

  // set to prevent the repetitions of sizes
  const seen = new Set<string>()
  // sq ft to sq inch
  const areaSqInch = result * 144

  for (const width of standardWidths) {
    // 1
    const rawHeight = areaSqInch / width
    // 2
    const height = Math.round(rawHeight / 2) * 2
    // 3
    if(height < 6 || height > 48) continue
    // 4
    const actualArea = width * height
    const errorPercent = Math.abs(actualArea - areaSqInch) / areaSqInch
    if (errorPercent > 0.15) continue
    // 5
    const aspectRatio = Math.max(width, height) / Math.min(width, height)
    if (aspectRatio > 4) continue
    // 6
    const key = `${Math.min(width, height)}x${Math.max(width, height)}`
    if (seen.has(key)) continue;
    // 7
    seen.add(key)
    suggestions.push({
      width,
      height,
      area : actualArea,
      ratio : Number(aspectRatio.toFixed(2)),
      error : Number(errorPercent.toFixed(2)),
    })
  }
  // 8
  return suggestions.sort((a,b) => a.ratio - b.ratio || a.error - b.error).slice(0,4)
}


export default function Recommendations({result} : Props) {
  const finalSuggestions = getSuggestions(result)
  return (
    <div className="p-5 bg-primary rounded-2xl lg:col-span-2 lg:row-span-2 text-surface h-fit">
          <h2 className="md:text-xl font-bold text-[14px] mb-3">Suggested Rectangular Sizes • مقاسات مقترحة</h2>
      {finalSuggestions.map((s,i) => {
        const isBest = i === 0
        return (
          <div key={`${s.width}x${s.height}`} className=" last:pb-0 py-3 border-t border-border hover:opacity-80 transition flex items-center gap-3">
            <h3 className={`${isBest ? "bg-white text-primary" : "border"} md:h-[40] md:w-[40] h-[30] w-[30] md:text-xl text-[12px] rounded-full flex items-center 
            justify-center`}>{i+1}</h3>
            <div className=" flex-1">
              <div className="font-bold md:text-[16px] text-[12px]">
                <span>{`${s.width}" x ${s.height}"`} / </span>
                <span>{`${(s.width * 25.4).toFixed(0)} mm x ${(s.height * 25.4).toFixed(0)} mm`}</span>
              </div>
              <p className="md:text-[14px] text-[10px]">{(s.area).toFixed(0)} in<sup>2</sup> • Ratio {s.ratio}:1 • {isBest ? "Closest to square • الأقرب للمربع" : "Aspect OK"}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

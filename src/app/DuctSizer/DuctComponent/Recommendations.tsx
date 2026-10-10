import { Cuboid } from "lucide-react";

type Props = {
  result: number // Result from duct area calculation in ft²
}

// Standard duct widths in inches
const standardWidths = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48];

function getSuggestions(result: number) {
  // Rectangular Duct Selection Algorithm:
  // 1. Iterate through each standard width
  // 2. Calculate the appropriate height for required area
  // 3. Round height to nearest even number (manufacturing standard)
  // 4. Reject if height outside reasonable range (6-48)
  // 5. Reject if area error exceeds 10%
  // 6. Reject if shape is too slender (aspect ratio > 4:1)
  // 7. Prevent duplicate dimensions (12x16 same as 16x12)
  // 8. Accept if all conditions pass
  // 9. Sort by closest to square and select best 4

  const suggestions: {width: number, height: number, area: number, ratio: number, error: number}[] = []

  // Set to track seen dimensions and prevent duplicates
  const seen = new Set<string>()

  // Convert ft² to in² for calculation
  const areaSqInch = result * 144

  for (const width of standardWidths) {
    // 1 + 2 - Calculate raw height for this width
    const rawHeight = areaSqInch / width
    // 3 - Round to even number
    const height = Math.round(rawHeight / 2) * 2
    // 4 - Validate height range
    if(height < 6 || height > 48) continue
    // 5 - Validate area tolerance
    const actualArea = width * height
    const errorPercent = Math.abs(actualArea - areaSqInch) / areaSqInch
    if (errorPercent > 0.1) continue
    // 6 - Validate aspect ratio
    const aspectRatio = Math.max(width, height) / Math.min(width, height)
    if (aspectRatio > 4) continue
    // 7 - Check duplicates
    const key = `${Math.min(width, height)}x${Math.max(width, height)}`
    if (seen.has(key)) continue;
    // 8 - Accept valid size
    seen.add(key)
    suggestions.push({
      width,
      height,
      area: actualArea,
      ratio: Number(aspectRatio.toFixed(2)),
      error: Number(errorPercent.toFixed(2)),
    })
  }
  // 9 - Sort by best shape (closest to square) and return top 4
  return suggestions.sort((a,b) => a.ratio - b.ratio || a.error - b.error).slice(0,4)
}

export default function Recommendations({result}: Props) {
  // Get best 4 rectangular suggestions
  const finalSuggestions = getSuggestions(result)

  return (
    <div className="p-5 bg-primary rounded-2xl lg:col-span-2 lg:row-span-2 text-head h-fit">
          {/* Section title */}
          <h2 className="md:text-xl font-bold text- mb-3 flex item-center gap-1">
            <Cuboid size={25} strokeWidth={1.5} />
            Suggested Rectangular Sizes
          </h2>

      {/* Render suggestion list */}
      {finalSuggestions.map((s, i) => {
        // First item is the most optimal (closest to square)
        const isBest = i === 0
        return (
          <div key={`${s.width}x${s.height}`} className=" last:pb-0 py-3 border-t border-border hover:opacity-80 transition flex items-center gap-3">
            {/* Rank badge */}
            <h3 className={`${isBest? "bg-white text-primary" : "border"} md:h-[40] md:w-[40] h-[30] w-[30] md:text-xl text- rounded-full
                flex items-center
            justify-center`}>{i+1}</h3>

            {/* Size details */}
            <div className="flex-1">
              <div className="font-bold md:text- text-">
                {/* Imperial and metric display */}
                <span>{`${s.width}" x ${s.height}"`} / </span>
                <span>{`${(s.width * 25.4).toFixed(0)} mm x ${(s.height * 25.4).toFixed(0)} mm`}</span>
              </div>
              {/* Metadata: area, ratio, quality */}
              <p className="md:text- text-">{(s.area).toFixed(0)} in<sup>2</sup>
              - Ratio {s.ratio}:1 • {isBest? "Closest to square" : "Aspect OK"}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
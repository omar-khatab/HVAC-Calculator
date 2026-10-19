// Recommendations of best sizes for duct sizer selection
// Standard duct widths in inches
const standardWidths = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48];
const MAX_ASPECT_RATIO = 4   // very slender ducts raise friction and noise
const MAX_OVERSIZE = 0.1     // accept up to 10% above or below the required area

export function getSuggestions(result: number) {
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
  if (errorPercent > MAX_OVERSIZE) continue
  // 6 - Validate aspect ratio
  const aspectRatio = Math.max(width, height) / Math.min(width, height)
  if (aspectRatio > MAX_ASPECT_RATIO) continue
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
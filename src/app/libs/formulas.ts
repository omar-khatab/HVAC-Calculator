import { BTUInputs, DuctSizerInputs } from "./types"

/**
 * Calculates cooling load in BTU based on room specs
 * Formula: ((Area * 430) + (Windows * 1000)) * SunExposure + (People * 600)
 */
export function calcBTU(inputs: BTUInputs) {
  // Base load from room area (430 BTU per sqm)
  const base = inputs.roomArea * 430
  
  // Additional load from windows (1000 BTU per window)
  const windows = inputs.windows * 1000
  
  // Apply sun exposure multiplier (1 = no sun, 1.2 = medium sun, 1.4 = high sun)
  const sub = (base + windows) * inputs.sunExposure
  
  // Human heat load (600 BTU per person)
  const people = inputs.occupants * 600
  
  // Total cooling load
  const result = sub + people
  
  return {
    base,      // Area load
    windows,   // Window load
    sub,       // Subtotal after sun factor
    people,    // Occupant load
    result,    // Total BTU
    tons: result / 12000 // Convert BTU to refrigeration tons
  }
}

/**
 * Calculates duct cross-sectional area from airflow
 * Formula: Area = CFM / Velocity
 */
export function calcDuctArea({ cfm, velocity }: DuctSizerInputs) {
  // Guard against division by zero
  if (velocity === 0) return { ft2: 0, in2: 0, cm2: 0 }
  
  // Area in square feet
  const ft2 = cfm / velocity
  
  return {
    ft2,              // Area in ft²
    in2: ft2 * 144,   // Convert to in² (1 ft² = 144 in²)
    cm2: ft2 * 929.03 // Convert to cm² (1 ft² = 929.03 cm²)
  }

}


// Recommendations of best sizes for duct sizer selection
// Standard duct widths in inches
const standardWidths = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48];

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
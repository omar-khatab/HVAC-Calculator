import { BTUInputs, DuctSizerInputs } from "./types"

/**
 * Calculates cooling load in BTU based on room specs
 * Formula: ((Area * 430) + (Windows * 1000)) * SunExposure + (People * 600)
 */
export function calcBTU(inputs: BTUInputs) {
  // Base load from room area (430 BTU per sqm)
  const base = inputs.roomArea * 430
  
  // Additional load from windows (1000 BTU per window)
  const windows = inputs.window * 1000
  
  // Apply sun exposure multiplier (1 = no sun, 1.4 = high sun)
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
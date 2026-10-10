// Inputs for Duct Sizer
export interface DuctSizerInputs {
    cfm: number;             // Airflow (Cubic Feet per Minute)
    velocity: number;        // Velocity (Feet per Minute)
}

// Inputs for BTU Calculator
export interface BTUInputs {
    roomArea: number;        // Room area (sq ft)
    occupants: number;       // Number of people
    window: number;          // Number of windows
    sunExposure: number;     // Sun exposure
}


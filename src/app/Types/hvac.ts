// المدخلات لحاسبة الدكت
export interface DuctSizerInputs {
    cfm : number;             // معدل تدفق الهواء (Cubic Feet per Minute)
    velocity : number;        // السرعة (Feet per Minute)
}

// المدخلات لحاسبة BTU
export interface BTUInputs {
    roomArea : number;        // مساحة الغرفة (sq ft)
    occupants : number;       //  عدد الاشخاص
    window : number;      //      عدد الشبابيك
    sunExposure : number,     // نسبة التعرض للشمس
}


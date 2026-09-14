// المدخلات لحاسبة الدكت
export interface DuctSizerInputs {
    cfm : number;             // معدل تدفق الهواء (Cubic Feet per Minute)
    velocity : number;        // السرعة (Feet per Minute)
}

// النتيجة الراجعة من الحاسبة
export interface DuctSizerResult {
    area : number;            // المساحة المطلوبة (sq ft)
    diameter : number;        // القطر في حالة الدكت الدائرى (inches)
}

// المدخلات لحاسبة BTU
type expose = 1 | 1.2 | 1.4

export interface BTUInputs {
    roomArea : number;        // مساحة الغرفة (sq ft)
    occupants : number;       //  عدد الاشخاص
    window : number;      //      عدد الشبابيك
    sunExposure : expose,     // نسبة التعرض للشمس
}

// navBar Links روابط
export interface Links {
    id : number,
    title : string
}
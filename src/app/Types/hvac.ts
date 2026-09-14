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
export interface BTUInputs {
    roomArea : number;        // مساحة الغرفة (sq ft)
    occupants : number;       //  عدد الاشخاص
    hasWindow : boolean;      // يوجد شباك ام لا 
}

// navBar Links روابط
export interface Links {
    id : number,
    title : string
}
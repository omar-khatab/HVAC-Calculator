import { calcBTU, calcDuctArea} from "../formulas";

// BTU calculator tests
describe("calcBTU", () => {
    test("should calculate BTU correctly", () => {
        const r = calcBTU({
            roomArea: 20,
            occupants: 2,
            windows: 1,
            sunExposure: 1.2
        })
        expect(r.base).toBe(8600)
        expect(r.windows).toBe(1000)
        expect(r.sub).toBe(11520)
        expect(r.people).toBe(1200)
        expect(r.result).toBe(12720)
        expect(r.result / 12000).toBeCloseTo(1.06)
    })
    test("sub calculation with neutral sun exposure", () => {
        const r = calcBTU({
            roomArea: 10,
            occupants: 0,
            windows: 1,
            sunExposure: 1
        })
        expect(r.sub).toBe(r.base + r.windows)
        expect(r.result).toBe(5300)
    })

    test("handle empty inputs", () => {
        const r = calcBTU({
            roomArea: 0,
            occupants: 0,
            windows: 0,
            sunExposure: 1
        })
        expect(r.base).toBe(0)
        expect(r.windows).toBe(0)
        expect(r.sub).toBe(0)
        expect(r.people).toBe(0)
        expect(r.result).toBe(0)
    })
    test("occupant heat load validation", () => {
        const r1 = calcBTU({
            roomArea: 20,
            occupants: 0,
            windows: 0,
            sunExposure: 1.4
        })
        const r2 = calcBTU({
            roomArea: 20,
            occupants: 2,
            windows: 0,
            sunExposure: 1.4
        })
        expect(r2.result - r1.result).toBe(1200)
    })
})

// duct sizer tests
describe("calcDuctArea", () => {
    test("should calculate duct area correctly", () => {
        const r = calcDuctArea({
            cfm: 400,
            velocity: 800
        })
        expect(r.ft2).toBe(0.5)
        expect(r.in2).toBe(72)
        expect(r.cm2).toBeCloseTo(464.515, 2)
    })
    test("velocity = 0 should return 0 not infinity", () => {
        expect(calcDuctArea({ cfm: 400, velocity: 0 })).toEqual({ ft2: 0, in2: 0, cm2: 0 })
    })
    test("cfm = 0 should return 0", () => {
        expect(calcDuctArea({ cfm: 0, velocity: 800 }).ft2).toBe(0)
    })
    test("doubling cfm should double area", () => {
        const r1 = calcDuctArea({ cfm: 400, velocity: 800 })
        const r2 = calcDuctArea({ cfm: 800, velocity: 800 })
        expect(r2.ft2).toBe(r1.ft2 * 2)
    })
})


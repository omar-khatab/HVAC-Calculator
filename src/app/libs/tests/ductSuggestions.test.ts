import { getSuggestions } from "../ductSuggestions";

const toIn2 = (ft2: number) => ft2 * 144;
const aspectRatio = (s: {width: number, height: number}) => {
    return Math.max(s.width, s.height) / Math.min(s.width, s.height);
}
describe("getSuggestions: every suggestion is a valid duct size", () => {
  // 72, 101, 180, 346 and 720 in²
  it.each([0.5, 0.7, 1.25, 2.4, 5])("required area %s ft²", (ft2) => {
    const required = toIn2(ft2)
    const suggestions = getSuggestions(ft2)
    // constraints to verify four suggestions are returned or less
    expect(suggestions.length).toBeGreaterThan(0)
    expect(suggestions.length).toBeLessThanOrEqual(4)
 
    for (const s of suggestions) {
      expect(s.area).toBe(s.width * s.height)
      expect(s.area).toBeLessThanOrEqual(required * 1.1)       // within 10% above
      expect(s.area).toBeGreaterThanOrEqual(required * 0.9)    // within 10% below
      expect(aspectRatio(s)).toBeLessThanOrEqual(4)            // not too slender
      expect(s.height).toBeGreaterThanOrEqual(6)               // height min 6"
      expect(s.height).toBeLessThanOrEqual(48)                 // height max 48"
    }
  })
})

describe("getSuggestions: list rules", () => {
  it("never returns the same size twice (12x16 equals 16x12)", () => {
    const keys = getSuggestions(2.4).map(
      (s) => `${Math.min(s.width, s.height)}x${Math.max(s.width, s.height)}`
    )
    expect(new Set(keys).size).toBe(keys.length)
  })
  it("orders suggestions from closest to square to most slender", () => {
    const ratios = getSuggestions(2.4).map((s) => s.ratio)
    expect(ratios).toEqual([...ratios].sort((a, b) => a - b))
  })
})

# ❄ HVAC Duct & BTU Calculator

A responsive, web-based engineering utility for preliminary HVAC calculations. Built with **Next.js 15 (App Router)** and **TypeScript Strict**, it estimates cooling loads (BTU) and calculates optimal duct dimensions using the Continuity Equation and SMACNA standards.

**Live Demo:** https://hvac-calculator-ebon.vercel.app/
---

[![Playwright Tests](https://github.com/omar-khatab/HVAC-Calculator/actions/workflows/playwright.yml/badge.svg)](https://github.com/omar-khatab/HVAC-Calculator/actions/workflows/playwright.yml)

[![Lighthouse CI](https://github.com/omar-khatab/HVAC-Calculator/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/omar-khatab/HVAC-Calculator/actions/workflows/lighthouse.yml)

---
## Overview

This project digitizes manual HVAC field calculations into an interactive web interface. Originally inspired by ventilation analysis during an internship at the National Authority for Tunnels (NAT), it bridges mechanical engineering domain logic with modern frontend architecture.

The goal is a **testable, production-grade engineering tool** where formulas and manufacturing constraints are covered by unit tests.

## Key Features

### BTU Cooling Load Estimator
- Input-driven calculation based on area, occupancy, windows, and sun exposure
- Automatic conversions to Ton, HP, kW, and Watts
- Recommendation engine for residential and commercial spaces

### Duct Sizing Calculator
- Duct area via Continuity Equation: `A = Q / V`
- Equivalent round diameter: `D = 2 * sqrt(A / π)`
- Rectangular sizes from standard widths (6"-48") with even-height rounding (manufacturing standard)
- Filters: max 10% area error, height 6"-48", aspect ratio ≤ 4:1 to prevent noise/friction
- Returns 4 optimal sizes sorted closest to square

### Velocity Status
- Low (quiet) / Medium (balanced) / High (noisy) indicators based on FPM

## Tech Stack

- **Framework:** Next.js 15 App Router, React 19 - `src/` directory structure
- **Language:** TypeScript Strict
- **Styling:** Tailwind CSS, Lucide Icons
- **Testing:** Vitest 1.6.1, @testing-library/react, jsdom, @vitest/coverage-v8

## Testing & Coverage

Business logic lives in `src/libs/` and is isolated for testability. Overall coverage is low by design because page shells, Main components, and input forms are not unit-tested - only pure logic and output components are.

### Latest Local Coverage (v8) - from your screenshot

| File | % Stmts | % Branch | % Funcs | % Lines |
| :--- | :--- | :--- | :--- | :--- |
| **All files** | 42.05 | 88.13 | 45.45 | 42.05 |
| `libs/ductSuggestions.ts` | **100** | 92.3 | **100** | **100** |
| `libs/formulas.ts` | **100** | **100** | **100** | **100** |
| `BTUCalculator/BTUComponents/Outputs.tsx` | **100** | **100** | **100** | **100** |
| `Ductsizer/DuctComponent/Outputs.tsx` | **100** | **100** | **100** | **100** |
| `BTUCalculator/BTUComponents/Main.tsx` | 0 | 0 | 0 | 0 |
| `Ductsizer/DuctComponent/Main.tsx` | 0 | 0 | 0 | 0 |
| `components/Inputs.tsx` | 0 | 0 | 0 | 0 |
| `components/ProModel.tsx` | 0 | 0 | 0 | 0 |

> The README in repo shows 53.77% for `formulas.ts` because it's outdated. Your local run shows 100% after your recent fixes - this README reflects the local truth.

### Test Suite

#### 1. `src/libs/formulas.ts`
Pure BTU and duct physics:
- `roomArea * 430` BTU, occupant `people * 600` added after sun factor
- `A = Q/V`, `D = 2*sqrt(A*144/π)`, conversions `ft²→in²`, `ft²→m²`
- Guards: `velocity=0` → `0` not `Infinity`, `cfm=0` → `0`

#### 2. `src/libs/ductSuggestions.ts` - NEW
- Validates every suggestion: `area=w*h`, `error ≤10%`, `6≤h≤48`, `ratio≤4`
- `it.each([0.5, 0.7, 1.25, 2.4, 5])` ft² - always 1-4 results
- No duplicates: `12x16` == `16x12`
- Sorted by `ratio` asc (closest to square first)
- Edge: `0` or negative → `[]`

#### 3. `Outputs.tsx` Components
- BTU: `12,720 BTU/h = 1.59 hp = 1.06 Ton = 3.73 kW`
- Duct: `1000 CFM / 800 FPM = 1.25 ft² = 180 in² → D=15.1in`
- Velocity bands tested with `it.each` boundaries: 900=LOW, 901=MEDIUM, 1499=MEDIUM, 1500=HIGH
- Guard: never renders `NaN`

### Running Tests

```bash
npm install --legacy-peer-deps
npm run test
npx vitest run --coverage
npx vitest run src/libs/__tests__/ductSuggestions.test.ts
```

## Formulas

```
BTU Load = (Area * 430 + Windows * 1000) * SunFactor + People * 600
Duct Area (ft²) = CFM / FPM
Diameter (in) = 2 * sqrt( (Area(ft²) * 144) / pi )
```

## Project Structure (actual from repo)

```
src/
├── BTUCalculator/BTUComponents/
│   ├── __tests__/Outputs.test.tsx
│   ├── Main.tsx
│   ├── Outputs.tsx
│   └── Recommendations.tsx
├── Ductsizer/DuctComponent/
│   ├── __tests__/Outputs.test.tsx
│   ├── Main.tsx
│   ├── Outputs.tsx
│   └── Recommendations.tsx
├── components/
│   ├── Inputs.tsx
│   └── ProModel.tsx
├── libs/
│   ├── __tests__/
│   │   ├── formulas.test.ts
│   │   └── ductSuggestions.test.ts
│   ├── ductSuggestions.ts
│   └── formulas.ts
├── app/
│   ├── layout.tsx
│   └── page.tsx
public/
├── coverage.png
```

## Getting Started

```bash
git clone https://github.com/omar-khatab/HVAC-Calculator.git
cd HVAC-Calculator
npm install --legacy-peer-deps
npm run dev
# http://localhost:3000
```

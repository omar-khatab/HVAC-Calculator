# ❄ HVAC Duct & BTU Calculator

A responsive, web-based engineering utility for preliminary HVAC calculations. Built with **Next.js 15 (App Router)** and **TypeScript Strict**, it estimates cooling loads (BTU) and calculates optimal duct dimensions using the Continuity Equation and SMACNA standards.

[Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
[TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)
[Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)
[Tests](https://img.shields.io/badge/tests-15%20passing-brightgreen?style=flat-square)
[Coverage](https://img.shields.io/badge/coverage-100%25%20Outputs-brightgreen?style=flat-square)
[Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18?style=flat-square)

**Live Demo:** https://hvac-calculator-ebon.vercel.app/

---

## Overview

This project digitizes manual HVAC field calculations into an interactive web interface. Originally inspired by ventilation analysis during an internship at the National Authority for Tunnels (NAT), it bridges mechanical engineering domain logic with modern frontend architecture.

## Key Features

### BTU Cooling Load Estimator
- Input-driven calculation based on area, occupancy, windows, and sun exposure
- Automatic conversions to Ton, HP, kW, and Watts
- Recommendation engine for residential and commercial spaces
- Transparent formula breakdown

### Duct Sizing Calculator
- Duct area via Continuity Equation: `A = Q / V`
- Equivalent round diameter: `D = 2 * sqrt(A / π)`
- 4 optimal rectangular sizes sorted by aspect ratio (closest to square = optimal)
- Velocity status indicators: Low (quiet) / Medium (balanced) / High (noisy)

## Tech Stack

- **Framework:** Next.js 15 App Router, React 19
- **Language:** TypeScript (Strict)
- **Styling:** Tailwind CSS 3.x, Lucide Icons
- **Testing:** Vitest 1.6.1, @testing-library/react, jsdom, Coverage v8

## Testing & Coverage

Core business logic and UI output layers are fully isolated and tested. Overall coverage is intentionally low because `page.tsx`, `layout.tsx`, `Footer`, and `NavBar` are excluded from unit testing by design.

### Coverage Report (v8)

[Coverage Report](./public/coverage.png)

| File | % Stmts | % Branch | % Funcs | % Lines |
| :--- | :--- | :--- | :--- | :--- |
| `app/BTUCalculator/BTUComponents/Outputs.tsx` | **100** | **100** | **100** | **100** |
| `app/Ductsizer/DuctComponent/Outputs.tsx` | **100** | **100** | **100** | **100** |
| `app/libs/formulas.ts` | 53.77 | 100 | 66.66 | 53.77 |

### Test Suite Breakdown

#### 1. Business Logic - `app/libs/formulas.ts` (8 tests)
Isolated in `libs/formulas.ts` for pure testability.

```bash
npx vitest run app/libs/__tests__/formulas.test.ts
```

- **Integer logic validation:** `roomArea * 430 = 8600 BTU` via `toBe`
- **Floating-point conversions:** `ft² → m²`, `ft² → in²`, `mm → ft` via `toBeCloseTo`
- **Edge case guards:** `velocity = 0` returns `0` instead of `Infinity`
- **Zero handling:** `cfm = 0` returns `0`
- **Linearity:** Doubling CFM doubles area `A = Q/V`
- **Domain logic:** Occupant heat load `people * 600` is added AFTER sun exposure multiplier
- **Unit integrity:** `hp = BTU/8000`, `Ton = BTU/12000`, `kW = BTU/3412`

#### 2. UI Layer - BTU Outputs (7 tests)

```bash
npx vitest run app/BTUCalculator/BTUComponents/__tests__/Outputs.test.tsx
```

```tsx
describe("Outputs: calculated values")
  - it shows main result(BTU/h)(12,720 BTU/h)
  - it shows horsepower conversion (1.59 hp = 12720/8000)
  - it shows ton conversion (1.06 Ton = 12720/12000)
  - it shows kW and W conversion (3.73 kW, 3728 W)

describe("Outputs: display")
  - it shows room space details (Base load = roomArea * 430)
  - it handles zero result safely

describe("Outputs: guards")
  - it never renders text "NaN" when result is invalid (safeResult = Number.isFinite(result) ? result : 0)
```

#### 3. UI Layer - Duct Outputs (5 tests)

```bash
npx vitest run app/Ductsizer/DuctComponent/__tests__/Outputs.test.tsx
```

```tsx
// Hand calculation: 1000 CFM / 800 FPM = 1.25 ft² = 180 in²
const AREA = 1.25

describe("Outputs: calculated values")
  - it shows equivalent round diameter in inches and mm
    // D = 2 * sqrt(180 / pi) = 15.1 in = 385 mm
  - it shows duct area in in², ft² and m²
    // 180 in², 1.250 ft², 0.116 m²

describe("Outputs: velocity band")
  - it.each([
      [800, LOW],
      [900, LOW],      // upper edge of low
      [901, MEDIUM],   // lower edge of medium
      [1200, MEDIUM],
      [1499, MEDIUM],  // upper edge of medium
      [1500, HIGH],    // lower edge of high
      [2000, HIGH],
    ])("velocity(%i FPM) shows exactly one matching band")

describe("Outputs: invalid input (known issues)")
  - it.each([0, -100, NaN])("velocity %s shows no velocity band")
  - it never renders text NaN when area is invalid
```

### Testing Strategy

- **Isolation:** Business logic in `libs/` with zero UI coupling
- **Guards:** `Number.isFinite()` checks and `velocity > 0` guards to prevent `NaN` and `Infinity` in production
- **Boundary testing:** Upper/lower edges of velocity bands
- **TDD for bugs:** Failing tests written first for known issues (NaN render, 0 velocity), then fixed

### Running Tests

```bash
# Install
npm install --legacy-peer-deps

# All tests
npm run test

# With coverage
npx vitest run --coverage

# Specific suites
npx vitest run --coverage app/BTUCalculator/BTUComponents/__tests__/Outputs.test.tsx
npx vitest run --coverage app/Ductsizer/DuctComponent/__tests__/Outputs.test.tsx
```

## Formulas

```
BTU Load = (Area * 430 BTU/ft²) + (People * 600 BTU) + (Windows * 1000 BTU) * SunFactor
Duct Area (ft²) = Airflow (CFM) / Velocity (FPM)
Equivalent Diameter (in) = 2 * √( (Area(ft²) * 144) / π )
Diameter (mm) = Diameter (in) * 25.4
Area (m²) = Area (ft²) * 0.092903
```

## Project Structure

```
app/
├── BTUCalculator/BTUComponents/
│   ├── __tests__/Outputs.test.tsx  # 100% coverage
│   ├── Outputs.tsx
│   └── Recommendations.tsx
├── Ductsizer/DuctComponent/
│   ├── __tests__/Outputs.test.tsx  # 100% coverage
│   ├── Outputs.tsx
│   └── Recommendations.tsx
├── libs/
│   ├── __tests__/formulas.test.ts  # Pure logic tests
│   └── formulas.ts
├── components/
└── page.tsx
```

## Getting Started

```bash
git clone https://github.com/omar-khatab/hvac-calculator.git
cd hvac-calculator
npm install --legacy-peer-deps
npm run dev
# http://localhost:3000
```

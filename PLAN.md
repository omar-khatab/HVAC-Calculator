# Design Plan: HVAC Duct & BTU Calculator

A one-page note on what this project does, how it is structured, and why.

## Goal

Give a non-expert a fast, preliminary estimate of (1) BTU cooling load for a room and (2) rectangular duct sizes for a target airflow, while showing the formula behind each number so it can be checked by hand.

## Scope

- **In scope:** two calculators (BTU load, duct sizing), formula-based results, input validation, a recommendation and velocity-status display, a "Get Pro" modal.
- **Out of scope:** saving results, user accounts, a backend, full engineering-grade load calculations. Results are estimates only.

## Architecture

Next.js App Router, TypeScript, Tailwind CSS.

| Layer | What it does | Where |
|---|---|---|
| Calculation logic | Pure functions: numbers in, numbers out. No React, no DOM. | `src/app/libs/formulas.ts`, `src/app/libs/ductSuggestions.ts` |
| Shared input | One input component used by both calculators | `src/app/components/Inputs.tsx` |
| Calculator UI | Per-calculator `Main`, `Outputs` and `Recommendations` components | `src/app/BTUCalculator/`, `src/app/DuctSizer/` |
| Pages | App Router pages wiring the above together | `page.tsx` in each folder |

**Key decision: keep the maths out of the UI.** Because the formulas are pure functions, they can be unit-tested without a browser and read as plain formulas.

## Calculation rules

```
BTU Load        = (Area * 430 + Windows * 1000) * SunFactor + People * 600
Duct Area (ft²) = CFM / FPM
Diameter (in)   = 2 * sqrt((Area(ft²) * 144) / pi)
```

Duct suggestions come from standard widths (6"-48") with even-height rounding. Each suggestion must have at most 10% area error, a height of 6"-48" and an aspect ratio of at most 4:1. The tool returns up to 4 sizes, closest to square first.

## Input validation

Calculations guard against zero and invalid input and return `0` or an empty result instead of `Infinity`, `NaN` or a wrong number (for example, velocity `0` returns `0`, and a zero or negative area returns no suggestions).

## Testing strategy

Tests are split by what each layer can prove:

1. **Unit (Vitest):** `formulas.ts` and `ductSuggestions.ts`, plus both `Outputs` components with React Testing Library. These are at 100% line coverage.
2. **End-to-end (Playwright, TypeScript):** 28 tests in `e2e/`, using a shared page object (`e2e/pages/calculators.page.ts`). They cover both calculators, navigation (including the mobile menu) and the Get Pro modal.

Overall unit coverage is about 42% by design: page shells, `Main` components and input forms are not unit-tested and are covered by the E2E suite instead.

## CI

GitHub Actions runs Playwright (on push and pull request) and Lighthouse CI (on push). Both reports are published to GitHub Pages from `master`.

- Lighthouse report: https://omar-khatab.github.io/HVAC-Calculator/lighthouse/
- Playwright report: https://omar-khatab.github.io/HVAC-Calculator/playwright/

## Run it

```bash
npm install --legacy-peer-deps
npm run dev                      # http://localhost:3000
npx vitest run --coverage        # unit tests + coverage
npx playwright install chromium
npx playwright test --project=chromium
```

## Known limitations

- Formulas are simplified estimates, not a substitute for a full load calculation.
- E2E tests run on Chromium only.
- `Main` components and `Inputs.tsx` have no unit tests, only E2E coverage.

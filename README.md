<div align="center">

# HVAC Duct & BTU Calculator

A frontend tool that applies core HVAC engineering formulas (duct sizing, cooling load estimation) through an interactive Next.js + TypeScript interface — built to bridge a Mechanical Power Engineering background with frontend development.

</div>

<br>

## About

This project isn't a replacement for professional HVAC design software (like Carrier HAP) — it's a learning-focused tool that demonstrates translating real engineering calculations into a clean, typed, interactive web interface. It's a personal project built to apply TypeScript and Next.js on a problem grounded in real engineering coursework and internship experience.

<br>

## Tech Stack

| Category | Tools |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |

<br>

## Features (Current)

- **BTU Calculator** — estimates cooling load based on room area, occupancy, and window exposure
- **Duct Sizer** — calculates required duct area and diameter from airflow (CFM) and velocity (FPM), using the continuity equation
- **Input validation** — prevents invalid calculations (zero/negative values)
- **Typed data models** — all inputs and outputs are defined with TypeScript interfaces for reliability

<br>

## Formulas Used

- **Duct Sizing:** `Area = CFM ÷ Velocity` (continuity equation), with diameter derived assuming a circular duct
- **BTU Estimate:** simplified load calculation based on room area, occupant count, and window exposure

<br>

## Roadmap

- [ ] Improve UI/UX (icons, refined layout, presets for common room types)
- [ ] Split into dedicated routes per calculator
- [ ] Add unit tests for calculation logic

<br>

## Getting Started

```bash
git clone https://github.com/your-username/hvac-calculator.git
cd hvac-calculator
npm install
npm run dev
```

<br>

## Author

**Omar Khatab** — Frontend Developer, Mechanical Power Engineering background

[Portfolio](https://portfolio-upgrade-wr9n.vercel.app/) &nbsp;·&nbsp; [LinkedIn](https://www.linkedin.com/in/omar-essam-319c/) &nbsp;·&nbsp; [GitHub](https://github.com/omar-khatab)

# ❄ HVAC Duct & BTU Calculator

A responsive, web-based engineering utility designed to streamline preliminary HVAC calculations. Built with **Next.js (App Router)** and **TypeScript**, this tool enables users to estimate cooling loads (BTU) and calculate optimal duct dimensions using real-world fluid dynamics and SMACNA standards.

[[Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[[TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[[Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[[License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[[Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=flat-square&logo=vercel)](https://hvac-calculator-ebon.vercel.app)

**Live:** https://hvac-calculator-ebon.vercel.app/ | **Source:** https://github.com/omar-khatab/HVAC-Calculator

---

## 💡 Overview

This project bridges mechanical engineering domain knowledge with modern web development. Inspired by practical training at the **National Authority for Tunnels (NAT)** — analyzing subway station ventilation and HVAC infrastructure — this calculator digitizes manual field formulas into an interactive digital interface.

> **Built by Omar Khatab — Mechanical Power Engineer & Frontend Developer**
> Ain Shams University (2024) | NAT Intern - HVAC & Ventilation Systems

## ✨ Key Features

### 🔥 BTU Cooling Load Estimator
- Calculates cooling capacity based on area, occupants, windows, and sun exposure
- Auto-converts results to Ton / HP / kW
- Smart recommendation system for residential & commercial spaces (Small office → Commercial)

### 📐 Duct Sizing Calculator
- Computes duct area using **Continuity Equation** `A = Q / V`
- Suggests 4 optimal rectangular sizes sorted by aspect ratio (closest to square = best)
- Calculates equivalent round diameter
- Velocity-based status: Low (quiet) / Medium (balanced) / High (noisy)

### 🔍 Transparent Calculations
- Shows full formula breakdown with live values (Show Your Work)
- No black-box results - every number is traceable

## 🛠 Tech Stack

| Category | Stack |
|----------|-------|
| Framework | Next.js 16 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Logic | Separated pure functions in `/libs/formulas.ts` |
| Deployment | Vercel |

## 📐 Formulas Used

### 1. BTU (Field Method)
```
Base BTU = Area (sq m) × 430
Window Load = Windows × 1000
Subtotal = (Base + Window Load) × SunFactor (1 / 1.2 / 1.4)
Occupant Load = People × 600
Total BTU = Subtotal + Occupant Load
1 Ton = 12000 BTU/h
```

### 2. Duct Sizing - Continuity Equation
```
Area(ft²) = CFM / Velocity(FPM)
Diameter(in) = 2 × sqrt((Area × 144) / π)
```

### 3. Rectangular Selection Algorithm
1. Iterate through standard widths (6" to 48")
2. Calculate height = RequiredArea / Width
3. Round height to nearest even number (manufacturing standard)
4. Filter: height 6-48, error < 10%, aspect ratio ≤ 4:1
5. Deduplicate (12x16 same as 16x12)
6. Sort by aspect ratio (closest to square first) and return top 4

### 4. Unit Conversions
```
1 TR = 12000 BTU/h = 3.517 kW
1 ft² = 144 in² = 929.03 cm² = 0.0929 m²
```

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/omar-khatab/HVAC-Calculator.git

# 2. Navigate to the project directory
cd HVAC-Calculator

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev

# 5. Open http://localhost:3000
```

## 🧠 Engineering Decisions

- **Separation of Concerns:** Business logic isolated in `libs/formulas.ts` for testability and reusability
- **Generic State Handler:** `update(field, value)` pattern prevents code duplication
- **SMACNA-aligned:** Uses only industry-standard duct sizes
- **Safety:** Zero-division guards and range validation on all inputs

## 🗺 Roadmap

- [x] BTU / Cooling Load calculator
- [x] Duct Sizer with smart algorithm
- [x] Transparent formula breakdown
- [x] Input validation & TypeScript strict mode
- [x] Live on Vercel
- [ ] Psychrometric chart
- [ ] U-Value calculator
- [ ] PDF export for reports

## 📄 License

MIT License - see [LICENSE](./LICENSE) file.

**© 2026 Omar Khatab — Engineering × Frontend**

`Thermodynamics → Fluid Mechanics → TypeScript → UI`

---

## 👨‍💻 Author

**Omar Khatab** — Engineering Software Developer | Frontend Developer

- 🎓 Mechanical Power Engineering, Ain Shams University (2026)
- 🔧 Intern: National Authority for Tunnels — HVAC & Ventilation Systems
- 🌐 Portfolio: https://portfolio-upgrade-wr9n.vercel.app/
- 💼 LinkedIn: https://www.linkedin.com/in/omar-essam-319c/
- 📧 omaressam0870@gmail.com
- 🔗 Live Demo: https://hvac-calculator-ebon.vercel.app/

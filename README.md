# ❄ HVAC Duct & BTU Calculator

A responsive, web-based engineering utility designed to streamline preliminary HVAC calculations. Built with **Next.js (App Router)** and **TypeScript**, this tool enables users to estimate cooling loads (BTU) for residential/commercial spaces and calculate optimal duct dimensions using real-world fluid dynamics and SMACNA standards.

[[Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=flat-square&logo=vercel)](https://hvac-calculator-ebon.vercel.app)
[[Tech Stack](https://img.shields.io/badge/Stack-Next.js_14_|_TypeScript_|_Tailwind-blue?style=flat-square)](https://nextjs.org/)
[[License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[[GitHub](https://img.shields.io/badge/Source_Code-GitHub-181717?style=flat-square&logo=github)](https://github.com/omar-khatab/HVAC-Calculator)

---

## 💡 Overview & Origin

This project bridges mechanical engineering domain knowledge with modern web development. Inspired by practical engineering training at the **National Authority for Tunnels (NAT)** — where analyzing subway station ventilation and HVAC infrastructure was key — this calculator digitizes manual formulas into an interactive, user-friendly digital interface.

> **Built by Omar Khatab — Mechanical Power Engineer & Frontend Developer**  
> Ain Shams University (2026) | NAT Intern - HVAC & Ventilation Systems

---

## ✨ Key Features

### 🔥 BTU Cooling Load Estimator
- Calculates required cooling capacity based on room area, ceiling height, occupant count, and heat-generating appliances
- Provides recommended AC unit capacity in Tons/BTU/h/kW/TR
- Applies safety factors and internal heat gains (lighting, occupants, appliances)

### 📐 Duct Sizing Calculator
- Computes required duct cross-sectional area using the **Continuity Equation** ($Q = V \times A$)
- Converts airflow (CFM) and target air velocity (FPM) into recommended rectangular and round duct sizes aligned with SMACNA standards
- Supports aspect ratio (W:H) constraints for false ceiling limits
- Validates rectangular dimensions and auto-adjusts to meet architectural constraints

### 🔄 Multi-Unit Engineering Converter
- Real-time conversion: BTU/h ↔ kW ↔ TR, CFM ↔ m³/h ↔ L/s, in.wg/100ft ↔ Pa/m, FPM ↔ m/s, °F ↔ °C, ft² ↔ m²
- No page reload - instant as you type

### 🔍 Transparent "Show Your Work" Breakdown
- Displays step-by-step formula execution and variable inputs so engineers can verify logic
- Velocity verification and required area outputs

### 💻 Developer-Centric UX
- Reusable, fully-typed input components (sliders + numerical validation)
- Fast, server-rendered multi-page layout with zero heavy UI libraries
- Dark/light industrial clean engineering UI

---

## 🛠 Tech Stack & Architecture

| Category | Stack |
|----------|-------|
| **Framework** | Next.js 14 (App Router, Server/Client Components) |
| **Language** | TypeScript (Strict types for thermal & fluid parameters) |
| **Styling** | Tailwind CSS (Responsive, utility-first) |
| **Icons** | Lucide React |
| **Deployment** | Vercel (CI/CD) |
| **License** | MIT |

---

## 📐 Formulas Used

### 1. BTU Cooling Load (Simplified Field Method)
```
Base BTU = Area (sq m) × 430
Total BTU = Base BTU + (Occupants × 600) + (Appliances × 1000)
```

### 2. Duct Sizing - Continuity Equation
```
A = Q / V
Where A = Area (ft²), Q = Airflow Rate (CFM), V = Velocity (FPM)
```

### 3. Rectangular Duct with Aspect Ratio
```
Given required Area and max Aspect Ratio (W/H)
Solve: W × H = Area, with W/H ≤ maxRatio
Algorithm selects optimal W, H that fits ceiling
```

### 4. Circular Equivalent
```
Diameter = sqrt((4 × Area) / π)
```

### 5. Airflow from Sensible Load
```
CFM = Q_sensible / (1.08 × ΔT)
Where ΔT = T_room - T_supply
```

### 6. Unit Conversions
```
1 TR = 12000 BTU/h = 3.517 kW
1 CFM = 1.699 m³/h = 0.4719 L/s
```

---

## 🚀 Getting Started Locally

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

---

## 🌟 What Makes This Different

- ✅ **Multi-Unit Converter** — real-time BTU/h ↔ kW ↔ TR, CFM ↔ m³/h, etc.
- ✅ **Aspect Ratio Constraints** — W:H restrictions for false ceiling limits
- ✅ **SMACNA-based sizing** — suggested sizes per standards
- ✅ **Constraint validation** — ensures ducts fit architectural limits
- ✅ **Transparent calculations** — show your work breakdown

This is more than a simple `Area = CFM/V` calculator — added real engineering constraints that MEP designers actually face.

---

## 🗺️ Roadmap

- [x] BTU / Cooling Load calculator
- [x] Duct Sizer with algorithm selection
- [x] Aspect Ratio (W:H) constraints
- [x] Multi-Unit Converter
- [x] Input validation & TypeScript
- [x] Live on Vercel
- [ ] Psychrometric chart
- [ ] U-Value calculator
- [ ] PDF export for reports

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file.

**© 2026 Omar Khatab — Engineering × Frontend**

`Thermodynamics → Fluid Mechanics → TypeScript → UI`

---

## 👨‍💻 Author

**Omar Khatab** — Engineering Software Developer | Frontend Developer

- 🎓 Mechanical Power Engineering, Ain Shams University (2024)
- 🔧 Intern: National Authority for Tunnels — HVAC & Ventilation Systems
- 🌐 Portfolio: https://portfolio-upgrade-wr9n.vercel.app/
- 💼 LinkedIn: https://www.linkedin.com/in/omar-essam-319c/
- 📧 omaressam0870@gmail.com
- 🔗 Live: https://hvac-calculator-ebon.vercel.app/

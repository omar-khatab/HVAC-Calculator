<div align="center">

# 🌡 HVAC Engineering Suite & Interactive Calculators

### High-Performance Web Application for MEP Consultants & HVAC Designers

[[Live Demo](https://img.shields.io/badge/🚀_Live_Demo-hvac--calculator--ebon.vercel.app-22C55E?style=for-the-badge&logo=vercel)](https://hvac-calculator-ebon.vercel.app/)
[[GitHub](https://img.shields.io/badge/💻_Source_Code-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/omar-khatab/HVAC-Calculator)

<br>

<img src="https://skillicons.dev/icons?i=nextjs,ts,tailwind,vercel" />

**Built by Omar Khatab — Mechanical Power Engineer & Frontend Developer**

</div>

---

A high-performance, domain-specific web application built for **MEP consultants, HVAC designers, and thermal engineers**. It automates complex HVAC calculations — including thermal cooling loads, supply airflow rates (CFM), advanced duct sizing with algorithm selection, aspect ratio constraints, and real-time engineering unit conversions.

> Designed and developed to bring complex thermodynamic equations and fluid mechanics into an intuitive, modern web application.

---

## 🚀 Live Interactive Demo

**👉 https://hvac-calculator-ebon.vercel.app/**

---

## 🌟 Comprehensive Features & Domain Logic

### 1. 📐 Advanced Duct Sizing Suite (Duct Sizer)

Provides flexibility for duct sizing with engineering constraints:

**Algorithm Selection:**
- Select duct sizing algorithm based on design requirements — computes dimensions from airflow (CFM) and velocity (FPM)
- Uses continuity equation: `Area = CFM / Velocity` as base, with method selection for different design scenarios

**Constraint Controls & Aspect Ratio:**
- Supports custom **Aspect Ratio (W:H)** restrictions to ensure ducts fit within architectural false ceiling limits
- Validates rectangular duct dimensions against max height/width constraints
- Automatically adjusts duct dimensions to meet architectural constraints while maintaining required airflow area

**Outputs:**
- Required duct area (ft² / in²)
- Rectangular dimensions (W × H) respecting aspect ratio
- Circular diameter equivalent
- Velocity verification

### 2. 🏢 Space Cooling Load Calculator (Thermal Load)

**Envelope Heat Gain:** Evaluates conduction and solar radiation through walls, roofs, and glazing using surface area, U-values, and temperature differentials (ΔT).

**Internal Gains:** Computes sensible and latent loads from occupancy, lighting density (W/m²), and appliances.

**Safety Margins & Output:** Applies safety factors and delivers total cooling capacity in **BTU/h, kW, and Tons of Refrigeration (TR)**.

### 3. 🌀 Airflow Rate Estimator (CFM)

**Supply Air Calculation:**
```
CFM = Q_sensible / (1.08 × (T_room - T_supply))
```

**Air Change Rate (ACH):** Checks volumetric air turnover based on space classification.

### 4. 🔄 Multi-Unit Engineering Converter

Integrated real-time unit conversion widget tailored for MEP engineers — built by you:

- **Cooling Capacity:** BTU/h ↔ kW ↔ TR
- **Air Flow Rate:** CFM ↔ m³/h ↔ L/s
- **Pressure Drop:** in.wg/100ft ↔ Pa/m
- **Air Velocity:** FPM ↔ m/s
- **Temperature:** °F ↔ °C
- **Area:** ft² ↔ m²

Real-time conversion as you type — no page reload.

---

## 🧠 Formulas Used

```ts
// 1. Duct Sizing - Base
Area = CFM / Velocity (FPM)

// 2. Rectangular Duct with Aspect Ratio Constraint
// Given required Area and max Aspect Ratio (W/H)
// Solve: W × H = Area, with W/H ≤ maxRatio
// Algorithm selects optimal W, H that fits ceiling

// 3. Circular Equivalent
Diameter = sqrt((4 × Area) / π)

// 4. Cooling Load (simplified)
Q = U × A × ΔT
Q_total = Q_envelope + Q_occupants + Q_lighting + Safety Factor

// 5. Airflow from Load
CFM = Q_sensible / (1.08 × ΔT)

// 6. Unit Conversions
1 TR = 12000 BTU/h = 3.517 kW
1 CFM = 1.699 m³/h = 0.4719 L/s
```

---

## 🛠 Tech Stack & Architecture

| Category | Stack |
|----------|-------|
| **Framework** | Next.js (App Router, Server/Client Component Architecture) |
| **Language** | TypeScript (Strict types for thermal & fluid parameters) |
| **Styling** | Tailwind CSS (Industrial dark/light clean engineering UI) |
| **Icons & UI** | Lucide React |
| **Deployment** | Vercel (CI/CD Pipeline) |

---

## 📦 Installation & Setup

```bash
# Clone repository
git clone https://github.com/omar-khatab/HVAC-Calculator.git

# Navigate into directory
cd HVAC-Calculator

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## ✨ What Makes This Different

**You built:**
- ✅ **Multi-Unit Converter** — real-time BTU/h ↔ kW ↔ TR, CFM ↔ m³/h, etc.
- ✅ **Aspect Ratio Constraints** — W:H restrictions for false ceiling limits
- ✅ **Algorithm Selection** — duct sizing method selection
- ✅ **Constraint validation** — ensures ducts fit architectural limits
- ✅ No Huebscher — honest about what you implemented

This is more than a simple `Area = CFM/V` calculator — you added real engineering constraints that MEP designers actually face.

---

## 🗺️ Roadmap

- [x] BTU / Cooling Load calculator
- [x] Duct Sizer with algorithm selection
- [x] Aspect Ratio (W:H) constraints
- [x] Multi-Unit Converter (BTU/h, kW, TR, CFM, m³/h, Pa/m, FPM, m/s)
- [x] Input validation & TypeScript
- [x] Live on Vercel
- [ ] Add Psychrometric chart
- [ ] Add U-Value calculator
- [ ] PDF export

---

## 👨‍💻 Author

**Omar Khatab** — Engineering Software Developer | Frontend Developer

- 🎓 Mechanical Power Engineering, Ain Shams University (2026)
- 🔧 Intern: National Authority for Tunnels — HVAC & Ventilation Systems
- 🌐 Portfolio: https://e-commerce-three-coral-58.vercel.app/
- 💼 LinkedIn: https://www.linkedin.com/in/omar-essam-319c/
- 📧 omaressam0870@gmail.com
- 🔗 HVAC Live: https://hvac-calculator-ebon.vercel.app/

---

<div align="center">

**© 2026 Omar Khatab — Engineering × Frontend**

`Thermodynamics → Fluid Mechanics → TypeScript → UI`

[[Live](https://img.shields.io/badge/Live-hvac--calculator--ebon.vercel.app-22C55E?style=for-the-badge)](https://hvac-calculator-ebon.vercel.app/)

</div>

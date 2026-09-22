import Link from "next/link";
import Footer from "./components/Footer";
import { Wind, Calculator, ArrowRight, Box, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-[80] pb-20 flex flex-col items-center text-center">
      {/* Hero */}
      <div className="mb-16 max-w-2xl">
        <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text- font-semibold mb-6 border border-accent/20">
          <Box className="w-3.5 h-3.5" />
          Next.js • TypeScript • Tailwind
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight leading-tight">
          HVAC Engineering <span className="text-accent">Calculator</span>
        </h1>
        <p className="text-secondary text- leading-6">
          Interactive tools that apply real HVAC formulas — cooling load
          estimation and duct sizing — built to bridge Mechanical Power
          Engineering with frontend development.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">

        <Link
          href="/BTUCalculator"
          className="group bg-head border border-border rounded- p-8 text-left rounded-2xl
                  hover:border-primary/20 hover:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]
                    transition-all hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
            <Calculator className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text- font-bold text-primary mb-2">
            BTU Calculator
          </h2>
          <p className="text- text-secondary leading-5 mb-5">
            Estimate cooling load based on room area, occupancy, and sun exposure.
          </p>
          <span className="text-primary text- font-semibold inline-flex items-center gap-1.5">
            Open calculator
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/DuctSizer"
          className="group bg-head border border-border rounded- p-8 text-left rounded-2xl
                     hover:border-primary/20 hover:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]
                     transition-all hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-border flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <Wind className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text- font-bold text-primary mb-2">
            Duct Sizer
          </h2>
          <p className="text- text-secondary leading-5 mb-5">
            Calculate duct area, diameter, and suggested rectangular sizes.
          </p>
          <span className="text-primary text- font-semibold inline-flex items-center gap-1.5">
            Open calculator
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      {/* Small trust bar */}
      <div className="mt-12 flex items-center gap-6 text- text-secondary/60">
        <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Real formulas</span>
        <span className="flex items-center gap-1.5"><Box className="w-3.5 h-3.5" /> No backend</span>
        <span className="flex items-center gap-1.5"><Wind className="w-3.5 h-3.5" /> SMACNA based</span>
      </div>

      <Footer/>
    </div>
  );
}
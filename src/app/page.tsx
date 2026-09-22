import Link from "next/link";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-[100] pb-[80] flex flex-col items-center text-center">
      {/* Hero */}
      <div className="mb-16 max-w-2xl">
        <span className="inline-block bg-secondary/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-4">
          Next.js • TypeScript • Tailwind
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          HVAC Engineering Calculator
        </h1>
        <p className="text-secondary text-lg">
          Interactive tools that apply real HVAC formulas — cooling load
          estimation and duct sizing — built to bridge Mechanical Power
          Engineering with frontend development.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">

        <Link
          href="/BTUCalculator"
          className="group bg-primary text-accent rounded-2xl p-8 text-left
                     border-2 border-transparent hover:border-accent
                     transition-all hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-3 3m3-3l3 3m-3 15l-3-3m3 3l3-3M3 12h18m-18 0l3-3m-3 3l3 3m15-3l-3-3m3 3l-3 3" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-head mb-2">
            BTU Calculator
          </h2>
          <p className="text-sm text-accent/80 mb-4">
            Estimate cooling load based on room area, occupancy, and sun exposure.
          </p>
          <span className="text-surface text-sm font-semibold inline-flex items-center gap-1">
            Open calculator
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </Link>

        <Link
          href="/DuctSizer"
          className="group bg-primary text-accent rounded-2xl p-8 text-left
                     border-2 border-transparent hover:border-accent
                     transition-all hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="9" width="18" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-head mb-2">
            Duct Sizer
          </h2>
          <p className="text-sm text-accent/80 mb-4">
            Calculate duct area, diameter, and suggested rectangular sizes.
          </p>
          <span className="text-surface text-sm font-semibold inline-flex items-center gap-1">
            Open calculator
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </Link>

      </div>
      <Footer/>
    </div>
  );
}
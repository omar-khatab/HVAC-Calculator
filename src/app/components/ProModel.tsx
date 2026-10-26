import Image from "next/image"
import { useEffect } from "react";

type Prop = {
    showPro: boolean
    setShowPro: (value: boolean) => void
}


export default function ProModel({showPro, setShowPro} : Prop) {

    // Handle escape key to close modal
    useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && showPro) setShowPro(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
}, [showPro, setShowPro]);

return (
    <>
    {showPro && (
            <div data-testid="pro-modal-overlay" className="fixed inset-0 bg-black/20 z-100 flex items-center justify-center p-4 backdrop-blur-md"
                onClick={() => setShowPro(false)}>
                <div className="relative w-full max-w-[380] rounded-2xl border border-border bg-head p-6 shadow-2xl 
                flex flex-col gap-1.5"
                onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between">
                        <Image
                        width={160}
                        height={42}
                        alt="hvac-calculator Logo"
                        src="/Logo.svg"
                        className="h-9 sm:h-9 w-auto object-contain"
                        priority
                    />
                        <button data-testid="pro-modal-close" 
                        onClick={() => setShowPro(false)} 
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center
                        text-primary transition-colors cursor-pointer hover:bg-surface/20">
                            ✕
                        </button>
                    </div>
                    <h3 className="text-primary text-lg font-semibold">Pro features coming soon</h3>
                    <p className="text-secondary text-[12px] opacity-80">
                        Export to PDF, SMACNA tables, project save & share, and advanced friction calculations. Portfolio-ready tools for HVAC engineers.
                    </p>
                </div>
            </div>
        )}
    </>
    ) 
}

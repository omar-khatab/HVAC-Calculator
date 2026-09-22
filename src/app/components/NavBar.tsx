"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import ProModel from "./ProModel"

export default function NavBar() {
    const path = usePathname()
    const [open, setOpen] = useState(false)
    const [showPro, setShowPro] = useState(false)
    const navLinks = [
        {id: 0, title: "Home", link: "/"},
        {id: 1, title: "DuctSizer", link: "/DuctSizer"},
        {id: 2, title: "BTUCalculator", link: "/BTUCalculator"},
    ]

    return (
        <>
        <div className="border-b border-border bg-head/80 backdrop-blur-md w-full fixed top-0 left-0 z-50">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <Image
                        width={160}
                        height={42}
                        alt="hvac-calculator Logo"
                        src="/Logo.svg"
                        className="h-9 sm:h-9 w-auto object-contain"
                        priority
                    />
                </Link>
                {/* Desktop Links */}
                <div className="hidden md:flex items-center bg-surface/40 gap-1 rounded-full p-1 font-bold">
                    {navLinks.map((l) => (
                        <Link
                            key={l.id}
                            href={l.link}
                            className={`${
                                path === l.link
                                ? "bg-head text-primary shadow-sm"
                                : "text-secondary hover:text-primary"
                            } rounded-full px-4 py-1.5 text-[14px] transition-all`}
                        >
                            {l.title}
                        </Link>
                    ))}
                </div>
                {/* Desktop btn */}
                <button className="hidden md:block bg-accent text-head rounded-full px-5 py-2 text-sm font-bold hover:bg-accentHover transition-colors 
                        cursor-pointer"
                        onClick={() => setShowPro(true)}>
                    Get Pro
                </button>
                {/* Mobile Burger(icon) */}
                <button 
                    onClick={() => setOpen(!open)}
                    className="md:hidden w-9 h-9 rounded-full bg-surface/50 flex items-center justify-center cursor-pointer">
                    <span className="text-[18px]">{open ? "X" : "☰"}</span>
                </button>
            </div>
            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-border bg-head p-4 flex flex-col gap-2">
                    {navLinks.map((l) => (
                        <Link
                            key={l.id}
                            href={l.link}
                            onClick={() => setOpen(false)}
                            className={`${
                                path === l.link
                                ? "bg-surface text-primary"
                                : "text-secondary"
                            } rounded-full px-4 py-1.5 text-[16px] font-bold transition-all`}
                        >
                            {l.title}
                        </Link>
                    ))}
                    <button className="mt-2 bg-accent text-head rounded-xl py-3 text-sm font-bold hover:bg-accentHover transition-colors 
                            cursor-pointer"
                    onClick={() => {
                        setShowPro(true)
                        setOpen(false)
                        }}>
                        Get Pro
                    </button>
                </div>
            )}
        </div>
        <ProModel showPro = {showPro} setShowPro={setShowPro}/>
        </>
    )
}
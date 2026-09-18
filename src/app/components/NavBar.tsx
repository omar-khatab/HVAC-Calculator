"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
export default function NavBar() {
    const path = usePathname()
    const navLinks : {id : number, title : string}[] = [
        {id : 1, title : "DuctSizer"}, 
        {id : 2 , title : "BTUCalculator"},
    ]
    const navHead = navLinks.map((l) => {
                return <Link key={l.id}  href={`/${l.title}`} 
                className={`${path == "/" + l.title ? "bg-gray-900 text-gray-100" : ""}  rounded-xl p-2 text-[16px]`}>          
                    {l.title}
                </Link>
    })
    return (
        <div className="mb-5 w-full bg-white p-5 flex justify-center">
            <div className="bg-gray-100 w-fit flex gap-5 rounded-2xl p-2 font-bold">
                {navHead}
            </div>
        </div>
    )
}

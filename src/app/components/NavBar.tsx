"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
export default function NavBar() {
    const path = usePathname()
    const navLinks : {id : number, title : string, link : string}[] = [
        {id : 0 , title : "home" , link : "/"},
        {id : 1, title : "DuctSizer", link : "/DuctSizer"}, 
        {id : 2 , title : "BTUCalculator", link: "/BTUCalculator"},
    ]
    const navHead = navLinks.map((l) => {
                return <Link key={l.id}  href={`${l.link}`} 
                className={`${path == l.link ? "bg-surface text-primary" : ""} rounded-xl p-2 text-[16px]`}>          
                    {l.title}
                </Link>
    })
    return (
        <div className=" border-b-2 border-surface bg-secondary text-surface w-full p-3 flex justify-center fixed top-0 left-0">
            <div className=" bg-primary/50 w-fit flex gap-5 rounded-2xl p-2 font-bold">
                {navHead}
            </div>
        </div>
    )
}

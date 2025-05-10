"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Sidebar() {
    let [openSubMenu, setOpenSubMenu] = useState(false)


    return <div className="relative">
        <div className="bg-white h-[100vh] w-72 fixed top-0 left-0 z-20 rounded-tl-[20px] rounded-bl-[20px] shadow-[0px_16px_44px_0px_#00000012]">
            <div className="relative h-full pb-10">

                <div className="pt-5 text-center">
                    <Link href="/" className="test-secondary text-base font-semibold uppercase text-center">logo</Link>
                </div>
                <div className="relative h-full flex flex-col justify-between overflow-y-auto custom-scrollbar pb-10 pt-10">
                    <div className="flex flex-col gap-y-8 px-3">
                        <button className="cursor-pointer">
                            <Image src="/images/location.svg" alt="location" height={48} width={48} unoptimized={true} />
                        </button>

                        <Link href="/dashboard" className="cursor-pointer bg-dark w-full py-2.5 px-3 rounded-[10px]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Image src="/sidebarIcons/dashboard.svg" alt="dashboard" height={22} width={22} unoptimized={true} />
                                    <div className="text-sm text-primary font-semibold">Dashboard</div>
                                </div>
                                <Image src="/images/arrow-down.svg" alt="arrow" height={20} width={20} unoptimized={true} className={`transition duration-400 ease-in-out ${openSubMenu ? "rotate-180" : "rotate-0"}`} />
                            </div>
                        </Link>
                        <div>
                        </div>
                    </div>

                    <div>
                        <div className="border-b-2 border-border2 mb-8" />
                        <Image src="/images/avatar1.png" alt="avatar" height={56} width={56} className="h-14 w-14 rounded-full border border-border2" />
                    </div>
                </div>
            </div>
        </div>
    </div>
}



const MenuItem = ({ i, e, submenu }) => {
    let [openSubMenu, setOpenSubMenu] = useState(false)
    const pathname = useRouter().pathname

    if (submenu) {
        const s = submenu.find(sub => pathname === sub.link || pathname === (sub.link + "/[id]"))
        if (s)
            openSubMenu = true
    }

    return <li key={i}>
        {submenu ? <div>
            <div onClick={() => { setOpenSubMenu(!openSubMenu) }}
                className={`${openSubMenu ? "from-transparent to-border-color bg-bc2" : "hover:from-transparent hover:to-border-color"} transition-all duration-300 ease-in relative px-4 py-3 laptop:text-sm tablet:text-xs flex items-center justify-between cursor-pointer`}>
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        <Image src="/sidebarIcons/dashboard.svg" alt="dashboard" height={22} width={22} unoptimized={true} />
                        <div className="text-sm text-primary font-semibold">Dashboard</div>
                    </div>
                    <span className="ml-3 capitalize leading-[normal]">{e.title}</span>
                </div>
                <Image src="/images/arrow-down.svg" alt="arrow" height={20} width={20} unoptimized={true} className={`transition duration-400 ease-in-out ${openSubMenu ? "rotate-180" : "rotate-0"}`} />
            </div>
            {openSubMenu && <ul>
                {submenu && submenu.map((sub, i) => <li key={i} >
                    <Link href={sub.link}
                        className={`${(pathname === sub.link || pathname === (sub.link + "/[id]")) ? "bg-border-color border-l-3 border-primary" : "hover:to-bc2"} transition-all duration-300 ease-in before:transition-all flex items-center pr-4 pl-10 py-3 laptop:text-sm tablet:text-xs`}>
                        <span className="flex items-center justify-center">
                            <Icon icon={sub.i} sizes={60} className="laptop:text-lg tablet:text-sm" />
                        </span>
                        <span className="ml-3 capitalize leading-[normal]">{sub.title}</span>
                    </Link>
                </li>
                )}
            </ul>}
        </div> :
            <Link href={e.link} className={`${(pathname === e.link || pathname === (e.link + "/[id]")) ? "bg-border-color border-l-3 border-primary" : "hover:to-bc2"} transition-all duration-300 ease-in relative flex items-center px-4 py-3 laptop:text-sm tablet:text-xs`}>
                <span className="flex items-center justify-center">
                    <Icon icon={e.i} sizes={60} className="laptop:text-lg tablet:text-sm" />
                </span>
                <span className="ml-3 capitalize leading-[normal]">{e.title}</span>
            </Link>
        }
    </li>
}
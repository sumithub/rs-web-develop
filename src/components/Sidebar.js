"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router"
import { usePathname } from "next/navigation";
import { title } from "process";

export default function Sidebar() {
    const pathname = useRouter.pathname
    let [openSubMenu, setOpenSubMenu] = useState(false)

    const list = [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Customers", link: "/campaigns", submenu: [{ title: "User Management", link: "/users" }] },

        { title: "Reviews", link: "/reviews", submenu: [{ title: "Review", link: "/review" }] },

        { title: "Campaigns", link: "/campaigns", submenu: [{ title: "Campaign Dashboard", link: "/campaign-dashboard" }, { title: "Manage Campaigns", link: "/manage-campaigns" }, { title: "Campaigns Templates", link: "/campaigns-templates" }] },
    ]

    return <div className="relative">
        <div className="bg-white h-[100vh] w-72 fixed top-0 left-0 z-20 rounded-tl-[20px] rounded-bl-[20px] shadow-[0px_16px_44px_0px_#00000012]">
            <div className="relative h-full pb-10">

                <div className="pt-5 text-center">
                    <Link href="/" className="test-secondary text-base font-semibold uppercase text-center">logo</Link>
                </div>
                <div className="relative h-full flex flex-col justify-between overflow-y-auto custom-scrollbar pb-10 pt-10">
                    <div>
                        <div className="px-3 mb-4">
                            <div className="flex gap-1 items-center px-4 py-3 text-sm rounded-[10px] bg-primary text-white">
                                <Image src="/sidebarIcons/location.svg" alt="location" height={20} width={20} unoptimized={true} />

                                <div className="text-xs font-medium line-clamp-1">4517 Washington Ave. Manchester, Kentucky 39495</div>
                                <button className="cursor-pointer"><Image src="/images/arrow-up.svg" alt="arrow" height={20} width={20} unoptimized={true} /></button>

                                <button className="cursor-pointer"><Image src="/images/add1.svg" alt="add" height={25} width={25} unoptimized={true} /></button>
                            </div>
                        </div>

                        <ul className="flex flex-col gap-y-3 px-3">
                            {list.map((e, i) => {
                                const submenu = e?.submenu
                                return <MenuItem key={i} e={e} i={i} submenu={submenu} />
                            })}
                        </ul>
                        <div>
                        </div>
                    </div>

                    <div>
                        <div className="border-b-2 border-border2 mb-8" />
                        <Image src="/images/avatar1.png" alt="avatar" height={56} width={56} className="h-14 w-14 rounded-full border border-border2 mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

const MenuItem = ({ i, e, submenu }) => {
    let [openSubMenu, setOpenSubMenu] = useState(false)
    const pathname = usePathname()

    if (submenu) {
        const s = submenu.find(sub => pathname === sub.link || pathname === (sub.link + "/[id]"))
        if (s)
            openSubMenu = true
    }

    return <li key={i}>
        {submenu ? <div>
            <div onClick={() => { setOpenSubMenu(!openSubMenu) }}
                className={`${openSubMenu ? "bg-light" : ""} relative px-4 py-3 text-sm flex items-center justify-between cursor-pointer mb-1`}>
                <div className="flex items-center gap-2">
                    <Image src="/sidebarIcons/customer.svg" alt="customer" height={20} width={20} />
                    <span className="capitalize leading-[normal] text-sm text-text3 font-medium">{e.title}</span>
                </div>
                <Image src="/images/arrow-down.svg" alt="arrow" height={20} width={20} unoptimized={true} className={`transition duration-400 ease-in-out ${openSubMenu ? "rotate-180" : "rotate-0"}`} />
            </div>
            {openSubMenu && <ul>
                {submenu && submenu.map((sub, i) => <li key={i}>
                    <Link href={sub.link}
                        className={`${(pathname === sub.link || pathname === (sub.link + "/[id]")) ? "bg-dark text-primary" : "text-text3"} relative flex items-center px-4 py-3 text-sm rounded-[10px]`}>
                        <span className="flex items-center justify-center">
                            <Image src="/sidebarIcons/message.svg" alt="message" height={22} width={22} unoptimized={true} />
                        </span>
                        <span className="ml-2 capitalize leading-[normal]">{sub.title}</span>
                    </Link>
                </li>
                )}
            </ul>}
        </div> :
            <Link href={e.link} className={`${(pathname === e.link || pathname === (e.link + "/[id]")) ? "bg-dark text-primary" : "text-text3"} relative flex items-center px-4 py-3 text-sm rounded-[10px]`}>
                <span className="flex items-center justify-center">
                    <Image src="/sidebarIcons/dashboard.svg" alt="dashboard" height={22} width={22} unoptimized={true} />
                </span>
                <span className="ml-3 capitalize leading-[normal]">{e.title}</span>
            </Link>
        }
    </li>
}
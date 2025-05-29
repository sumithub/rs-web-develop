"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const list = [
        { title: "Dashboard", link: "/dashboard", icon: "dashboard" },
        {
            title: "Customers", link: "/campaigns", icon: "customer",
            submenu: [{ title: "Manage Customers", link: "/customers" }, { title: "Customer Tagging", link: "/customer-tagging" }]
        },
        // { title: "Customers", link: "/campaigns", icon: "customer", submenu: [{ title: "User Management", link: "/users" }] },
        {
            title: "Reviews", link: "/reviews", icon: "message",
            submenu: [{ title: "Manage Reviews", link: "/review" }, { title: "Review Widgets", link: "/review-widgets" }, { title: "Review Sources", link: "/review-sources" }]
        },
        {
            title: "Campaigns", link: "/campaigns", icon: "campaign",
            submenu: [{ title: "Campaign Dashboard", link: "/campaign-dashboard" }, { title: "Manage Campaigns", link: "/manage-campaigns" }, { title: "Templates", link: "/campaigns-templates" }]
        },
        {
            title: "Reports", link: "", icon: "report",
            submenu: [{ title: "Review Analytics", link: "/review-analytics" }, { title: "Campaign Performance", link: "/campaign-performance" }, { title: "Sentiment Analysis", link: "/sentiment-analysis" }]
        },
        // { title: "Campaigns", link: "/campaigns", icon: "campaign", submenu: [{ title: "Campaign Dashboard", link: "/campaign-dashboard" }, { title: "Manage Campaigns", link: "/manage-campaigns" }, { title: "Templates", link: "/campaigns-templates" }] },

        { title: "Settings", icon: "settings", submenu: [{ title: "Users", link: "/users" }] },
    ]

    return <div className="relative z-0">
        <div className="bg-white h-[100vh] w-72 fixed top-0 left-0 z-20 rounded-tl-[20px] rounded-bl-[20px] shadow-[0px_16px_44px_0px_#00000012]">
            <div className="relative h-full pb-10">

                <div className="pt-5 text-center">
                    <Link href="/" className="test-secondary text-xl font-semibold uppercase text-center">logo</Link>
                </div>
                <div className="relative h-full flex flex-col justify-between overflow-y-auto custom-scrollbar pb-10 pt-10 scrollbar-none">
                    <div>
                        <div className="px-3 mb-4">
                            <div className="flex gap-1 items-center px-4 py-3 text-sm rounded-[10px] bg-primary text-white">
                                <Image src="/sidebar-icons/location.svg" alt="location" height={20} width={20} unoptimized={true} />

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
                className={`${openSubMenu ? "bg-light" : ""} relative px-4 py-3 text-sm flex items-center justify-between cursor-pointer mb-1 z-1`}>
                <div className={`flex items-center gap-2 ${openSubMenu ? "text-primary" : "text-text3"}`}>
                    <Image src={`/sidebar-icons/${e.icon || "customer"}${openSubMenu ? "-active" : ""}.svg`} alt={e.title} height={20} width={20} />
                    <span className="capitalize leading-[normal] text-sm  font-medium">{e.title}</span>
                </div>
                <Image src="/images/arrow-down.svg" alt="arrow" height={20} width={20} unoptimized={true} className={`transition duration-400 ease-in-out ${openSubMenu ? "rotate-180" : "rotate-0"}`} />
            </div>
            {openSubMenu && <ul className="w-[90%]">
                {submenu && submenu.map((sub, i) => {
                    const isActive = (pathname === sub.link || pathname === (sub.link + "/[id]"))
                    return <li key={i} className="ml-[44px] relative">
                        <div className={`absolute w-10 h-full bg-transparent -top-1/2 -left-3 border-l border-[#24222029] ${i === (submenu.length - 1) ? "rounded-b-md" : ""}`}>
                            <Image src='/sidebar-icons/side-line.svg' alt="icon" height={100} width={20} className="h-full w-auto -ml-[1px]" />
                        </div>
                        <Link href={sub.link}
                            className={`${isActive ? "bg-primary/5 text-secondary font-semibold" : "text-text3 font-medium"} hover:bg-primary/5 hover:text-secondary hover:font-semibold relative flex items-center px-2 py-3 text-sm rounded-[10px]`}>
                            <span className="ml-2 capitalize leading-[normal]">{sub.title}</span>
                        </Link>
                    </li>
                })}
            </ul>}
        </div> :
            <Link href={e.link} className={`${(pathname === e.link || pathname === (e.link + "/[id]")) ? "bg-dark text-primary" : "text-text3"} relative flex items-center px-4 py-3 text-sm rounded-[10px]`}>
                <span className="flex items-center justify-center">
                    <Image src="/sidebar-icons/dashboard.svg" alt="dashboard" height={22} width={22} unoptimized={true} />
                </span>
                <span className="ml-3 capitalize leading-[normal]">{e.title}</span>
            </Link>
        }
    </li>
}
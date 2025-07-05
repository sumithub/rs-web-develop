"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar({ collapse, toggleSidebar, role }) {
    const [list, setList] = useState([])
    useEffect(() => {
        const userList = [
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
                submenu:
                    [
                        { title: "Report Templates", link: "/report-templates" },
                        { title: "Schedule & Delivery", link: "/schedule-delivery" },
                        { title: "Report History", link: "/report-history" },
                        { title: "Sentiment Analysis", link: "/sentiment-analysis" }
                    ]
            },

            {
                title: "Notifications and Alerts", link: "", icon: "notification",
                submenu:
                    [
                        { title: "Notifications", link: "/notifications-management" },
                        { title: "Notification Preferences", link: "/notification-preferences-management" },
                        { title: "Alerts", link: "/alerts-management" },
                        { title: "Notification Log", link: "/audit-logs-dashboard" },
                    ]
            },

            {
                title: "Rules and Automations", link: "", icon: "rule",
                submenu: [{ title: "Custom Rules", link: "/client-rules-management" }]
            },

            // { title: "Campaigns", link: "/campaigns", icon: "campaign", submenu: [{ title: "Campaign Dashboard", link: "/campaign-dashboard" }, { title: "Manage Campaigns", link: "/manage-campaigns" }, { title: "Templates", link: "/campaigns-templates" }] },

            {
                title: "Settings", icon: "settings",
                submenu:
                    [
                        { title: "Users", link: "/users" },
                        { title: "Locations", link: "/location-screen" },
                        { title: "Business Profile", link: "/setting" }
                    ]
            },
        ]

        const adminList = [
            { title: "Dashboard", link: "/admin/dashboard", icon: "dashboard" },

            {
                title: "Business Management", link: "", icon: "business",
                submenu:
                    [
                        { title: "Clients", link: "/admin/business-management/clients-management" },
                        { title: "Locations", link: "/admin/business-management/locations-management" },
                        { title: "Manage Customers", link: "/admin/business-management/manage-customers" },
                        { title: "Customers Journey", link: "/admin/customer-journey" },
                        { title: "Tagging", link: "/admin/business-management/customer-tagging" },
                    ]
            },

            {
                title: "Users & Roles", link: "", icon: "sms-star",
                submenu:
                    [
                        { title: "Users", link: "/admin/organization/users-management" },
                        { title: "Roles & Permissions", link: "/admin/organization/roles-permissions" },
                    ]
            },

            {
                title: "Templates", link: "/admin/template", icon: "template",
            },

            {
                title: "Reviews", link: "", icon: "sms-star",
                submenu:
                    [
                        { title: "Manage Reviews", link: "/admin/reviews-oversight" },
                        { title: "Widgets", link: "/admin/widgets-management" },
                    ]
            },

            {
                title: "Campaigns", link: "/admin/campaigns-management", icon: "profile",
            }

        ]
        if (role === "ADMIN") {
            setList(adminList)
        } else {
            setList(userList)
        }
    }, [role])

    return <div className="relative z-50">
        <div className={`bg-white h-[100vh] ${collapse ? "w-20" : "w-72"} transition-all fixed top-0 left-0 z-20 rounded-tl-[20px] rounded-bl-[20px] shadow-[0px_16px_44px_0px_#00000012]`}>
            <div className="relative h-full pb-10">
                <div className="pt-5 text-center relative h-12">
                    <Link href="/" className={`test-secondary ${collapse ? "text-base" : "text-xl"}  transition-all font-semibold uppercase text-center`}>logo</Link>
                    <button type="button" onClick={toggleSidebar} className={`absolute -right-3 z-5 ${collapse ? "rotate-180" : ""} transition-all`}>
                        <Image src="/images/expand-collapse.svg" alt="" className="h-7 w-7" height={20} width={20} />
                    </button>
                </div>
                <div className="relative h-full flex flex-col justify-between overflow-y-auto custom-scrollbar pb-10 pt-10 scrollbar-none">
                    <div>
                        <div className="px-3 mb-4">
                            <div className="flex gap-1 items-center px-4 py-3 text-sm rounded-[10px] bg-primary text-white">
                                <Image className="shrink-0" src="/sidebar-icons/location.svg" alt="location" height={20} width={20} unoptimized={true} />

                                <div className="text-xs font-medium line-clamp-1">4517 Washington Ave. Manchester, Kentucky 39495</div>
                                <button className="cursor-pointer"><Image src="/images/arrow-up.svg" alt="arrow" height={20} width={20} unoptimized={true} /></button>

                                <button className="cursor-pointer"><Image src="/images/add1.svg" alt="add" height={25} width={25} unoptimized={true} /></button>
                            </div>
                        </div>

                        <ul className="flex flex-col gap-y-3 px-3">
                            {list.map((e, i) => {
                                const submenu = e?.submenu
                                return <MenuItem key={i} e={e} i={i} submenu={submenu} collapse={collapse} toggleSidebar={toggleSidebar} />
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

const MenuItem = ({ i, e, submenu, collapse, toggleSidebar }) => {
    let [openSubMenu, setOpenSubMenu] = useState(false)
    const pathname = usePathname()

    if (submenu) {
        const s = submenu.find(sub => pathname === sub.link || pathname === (sub.link + "/[id]"))
        if (s)
            openSubMenu = true
    }

    return <li key={i}>
        {submenu ? <div>
            <div onClick={() => {
                if (collapse) {
                    toggleSidebar()
                }
                setOpenSubMenu(!openSubMenu)
            }}
                className={`${openSubMenu ? "bg-light" : ""} relative px-4 py-3 text-sm flex items-center justify-between cursor-pointer mb-1 z-1`}>
                <div className={`flex overflow-hidden items-center gap-2 ${openSubMenu ? "text-primary" : "text-text3"}`}>
                    <Image src={`/sidebar-icons/${e.icon || "customer"}${openSubMenu ? "-active" : ""}.svg`} alt={e.title} height={20} width={20} className="shrink-0" />
                    <span className={`capitalize leading-[normal] text-sm  font-medium ${collapse ? "w-0" : "w-auto"}`}>{e.title}</span>
                </div>
                {!collapse && <Image src="/images/arrow-down.svg" alt="arrow" height={20} width={20} unoptimized={true} className={`transition duration-400 ease-in-out ${openSubMenu ? "rotate-180" : "rotate-0"}`} />}
            </div>
            {openSubMenu && <ul className="w-[90%]">
                {submenu && submenu.map((sub, i) => {
                    const isActive = (pathname === sub.link || pathname === (sub.link + "/[id]"))
                    if (collapse) {
                        return <></>
                    }
                    return <li key={sub.link || i} className="ml-[44px] relative">
                        <div className={`absolute w-10 h-full bg-transparent -top-1/2 -left-3 border-l border-[#24222029] ${i === (submenu.length - 1) ? "rounded-b-md" : ""}`}>
                            <Image unoptimized={true} src='/sidebar-icons/side-line.svg' alt="icon" height={100} width={20} className="h-full w-auto -ml-[1px]" />
                        </div>
                        <Link href={sub.link}
                            className={`${isActive ? "bg-primary/5 text-secondary font-semibold" : "text-text3 font-medium"} hover:bg-primary/5 hover:text-secondary hover:font-semibold relative flex items-center px-2 py-3 text-sm rounded-[10px]`}>
                            <span className="ml-2 capitalize leading-[normal]">{sub.title}</span>
                        </Link>
                    </li>
                })}
            </ul>}
        </div> : <>
            <Link href={e.link} className={`${(pathname === e.link || pathname === (e.link + "/[id]")) ? "bg-dark text-primary" : "text-text3"}  relative flex gap-2 items-center px-4 py-3 text-sm rounded-[10px]`}>
                <div className="flex gap-2 overflow-hidden">
                    <Image src={`/sidebar-icons/${e.icon || "customer"}${(pathname === e.link || pathname === (e.link + "/[id]")) ? "-active" : ""}.svg`} alt={e.title} height={20} width={20} className="shrink-0" />

                    {/* <Image src="/sidebar-icons/dashboard.svg" alt="dashboard" height={20} width={20} unoptimized={true} className="shrink-0" /> */}

                    <span className={`capitalize leading-[normal] ${collapse ? "w-0" : "w-auto"}`}>{e.title}</span>
                </div>
            </Link>
        </>
        }
    </li>
}
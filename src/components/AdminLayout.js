"use client"
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children, headerChild, headerSearch, cardClass = "", noCard = false, class_ = "", mainClass = "" }) {
    const [collapse, setCollapse] = useState(false)
    const [role, setRole] = useState("loading")
    const router = useRouter();

    const toggleSidebar = () => {
        setCollapse(!collapse)
    }
    useEffect(() => {
        const r = localStorage.getItem("role")
        if (!r) {
            router.push(`/login`)
        } else {
            setRole(r)
        }
    }, [])

    if (role === "loading") {
        return <Loading />
    }
    return <div className="bg-light">
        <Header headerChild={headerChild} headerSearch={headerSearch} collapse={collapse} />
        <Sidebar collapse={collapse} toggleSidebar={toggleSidebar} role={role} />
        <div className={`pb-2 min-h-screen px-0`}>
            <div className={`py-4  ${mainClass}`}>
                <div className={`${collapse ? "pl-[92px]" : "pl-[305px]"} pr-3 mt-[85px] ${class_}`}>
                    <div className={`${noCard ? "min-h-[calc(100dvh-130px)]" : "bg-white p-5 rounded-[10px] min-h-[calc(100dvh-140px)] shadow-sm"}  ${cardClass}`}>{children}</div>
                </div>
            </div>
        </div>
    </div>
}
"use client"
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children, headerChild, headerSearch, cardClass = "", noCard = false, class_ = "", mainClass = "" }) {
    const [collapse, setCollapse] = useState(false)

    const toggleSidebar = () => {
        setCollapse(!collapse)
    }

    return <div className="bg-light">
        <Header headerChild={headerChild} headerSearch={headerSearch} collapse={collapse} />
        <Sidebar collapse={collapse} toggleSidebar={toggleSidebar} />
        <div className={`pb-2 min-h-screen px-0`}>
            <div className={`py-4  ${mainClass}`}>
                <div className={`${collapse ? "pl-[92px]" : "pl-[305px]"} pr-3 mt-[85px] ${class_}`}>
                    <div className={`${noCard ? "min-h-[calc(100dvh-130px)]" : "bg-white p-5 rounded-[10px] min-h-[calc(100dvh-140px)] shadow-sm"}  ${cardClass}`}>{children}</div>
                </div>
            </div>
        </div>
    </div>
}
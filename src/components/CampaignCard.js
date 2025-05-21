"use client"
import Image from "next/image"
import Status from "../components/Status"
import { useEffect, useState } from "react"

export default function CampaignCard({ children, title, status,expandAll }) {
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        setOpen(expandAll)
    },[expandAll])
    return <main>

        <div className="bg-dark rounded-[15px] p-4 mb-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="text-secondary text-lg text-semibold">{title}</div>
                    <Status status={status} />
                </div>
                <button className="cursor-pointer"><Image src="/images/arrow-up1.svg" className={open?"rotate-180":"rotate-0"} alt="arrow" height={16} width={16} unoptimized={true}
                    onClick={() => { setOpen(!open) }} /></button>
            </div>
            {open ? children : ""}
        </div>
    </main>
}
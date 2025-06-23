"use client"
import Image from "next/image"
import Status from "../components/Status"
import { useEffect, useState } from "react"

export default function CampaignCard({ children, title, status, expandAll, openByDefault = false }) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (expandAll !== undefined) {
            setOpen(expandAll);
        } else if (openByDefault) {
            setOpen(true);
        }
    }, [expandAll, openByDefault]);

    return <main>
        <div className="bg-dark rounded-[15px] p-4 mb-3">
            <div onClick={() => { setOpen(!open) }} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                    <div className="text-secondary text-lg font-semibold">{title}</div>
                    <Status status={status} />
                </div>
                {/* <button className="cursor-pointer"><Image src="/images/arrow-up1.svg" className={open ? "rotate-180" : "rotate-0"} alt="arrow" height={25} width={25} unoptimized={true}
                    onClick={() => { setOpen(!open) }} /></button> */}

                <button type="button">
                    {open ? <Image src="/images/expand.svg" alt="expand" height={26} width={26} unoptimized={true} /> :

                        <Image src="/images/collapse.svg" alt="expand" height={26} width={26} unoptimized={true} />}
                </button>
            </div>
            {open ? children : ""}
        </div>
    </main>
}
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

                <button>
                    {open ? <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="#ADADAD" d="M20 13H4a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 16 16"><path fill="#ADADAD" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" /></svg>}
                </button>
            </div>
            {open ? children : ""}
        </div>
    </main>
}
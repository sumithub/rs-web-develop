"use client"
import Image from "next/image"
import Status from "../components/Status"

export default function CampaignCard({ children, title, status }) {
    return <main>
        <div className="bg-dark rounded-[15px] p-4 mb-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="text-secondary text-lg text-semibold">{title}</div>
                    <Status status={status} />
                </div>
                <button className="cursor-pointer"><Image src="/images/arrow-up1.svg" alt="arrow" height={16} width={16} unoptimized={true} /></button>
            </div>
            {children}
        </div>
    </main>
}
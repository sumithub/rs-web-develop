"use client"

import Image from "next/image"
import Status from "../Status"
import SecondaryButton from "../common/SecondaryButton"
import CancelButton from "../common/CancelButton"
import { useState } from "react"
import UpgradePlan from '../setting/UpgradePlan'

export default function Subscription() {
    const [open, setOpen] = useState(false)
    return (<>
        {open &&
            <UpgradePlan
                onClose={() => { setOpen(false) }} />
        }
        <div className="flex justify-between">
            <h2 className="text-lg font-semibold py-[11px]">My Subscription Details</h2>
            <div className="flex gap-[10px]">
                <CancelButton title="Cancel Subscription" class_="text-danger" />
                <button className="py-[13.5px] px-5 text-sm border border-primary hover:bg-primary hover:text-white text-primary rounded-[10px] disabled:pointer-events-none disabled:opacity-50">View Usage Details</button>
                <SecondaryButton title="Upgrade Plan" onClick={() => { setOpen(true) }} />
            </div>
        </div>
        <hr className="border border-border2 my-5" />
        <div className="bg-secondary2 p-5 rounded-[15px] grid grid-cols-4 gap-5">
            <div>
                <h2 className="pb-[15px] capitalize text-base">Subscription Status</h2>
                <Status status="Active" />
            </div>
            <div>
                <h2 className="pb-[15px] capitalize text-base">Current Plan</h2>
                <h3 className="text-lg font-medium">Pro plan</h3>
            </div>
            <div>
                <h2 className="pb-[15px] capitalize text-base">Next billing date</h2>
                <h3 className="text-lg font-medium">Jan 25, 2025</h3>
            </div>
            <div>
                <h2 className="pb-[15px] capitalize text-base">billing summary</h2>
                <h3 className="text-lg font-medium">$99 / Month</h3>
            </div>
        </div>
        <div className="pt-5">
            <h2 className="text-base">Features Included:</h2>
            <div className="pt-[15px]">
                <div className="flex items-center gap-[10px]">
                    <Image src="/images/tick.svg" alt="tick" width={24} height={24} />
                    <h2 className="text-base">Advanced Analytics</h2>
                </div>
                <div className="flex items-center gap-[10px] pt-2.5">
                    <Image src="/images/tick.svg" alt="tick" width={24} height={24} />
                    <h2 className="text-base">Multi-Channel Monitoring</h2>
                </div>
                <div className="flex items-center gap-[10px] pt-2.5">
                    <Image src="/images/tick.svg" alt="tick" width={24} height={24} />
                    <h2 className="text-base">Custom Branding</h2>
                </div>
            </div>
        </div>
    </>)
}
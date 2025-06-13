import { useState } from "react";
import Model from "../Models/Model";
import { toast } from "react-toastify";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import Image from "next/image";


export default function SubscriptionCancelled({ onClose }) {

    return (
        <Model onClose={onClose} title="Subscription Cancelled" modalClass="w-[40%]!">
            <div className="font-semibold">Your Subscription Has Been Successfully Canceled. You Will Continue To Have Access Until The End Of Your Current Billing Period. </div>

            <div className="mt-4 flex gap-2.5 items-center">
                <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                <h2 className="text-sm font-medium capitalize">You will no longer be billed after this Access Ends On  Apr 30, 2025 </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <SecondaryButton title="download invoice" onClick={() => {
                    toast.success("Downloaded Successfully")
                    onClose()
                }}
                    class_="bg-white! hover:bg-primary! text-primary! hover:text-white!" />
                <SecondaryButton title="back to dashboard" onClick={onClose} />
            </div>
        </Model >
    )
}
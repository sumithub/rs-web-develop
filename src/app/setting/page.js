"use client"
import AdminLayout from "../../components/AdminLayout"
import UserProfileManagement from "../../components/setting/UserProfileManagement"
import { useState } from "react";
import Subscription from "../../components/setting/Subscription";
import Usage from "../../components/setting/Usage";
import PaymentInvoices from "../../components/setting/PaymentInvoices";
import UpgradePlanDetails from "../../components/setting/UpgradePlanDetails"

export default function Setting() {
    const [tab, setTab] = useState(1);

    return (<AdminLayout>
        <div className="grid grid-cols-[1.1fr_0fr_5fr] gap-[18px]">
            <div className="flex flex-col gap-2.5">
                <button
                    onClick={() => setTab(1)}
                    className="inline-block text-left"
                >
                    <h2 className={`text-sm py-3 px-5 rounded-[10px] ${tab === 1 ? 'bg-primary text-white' : 'hover:bg-gray-100'
                        }`}>
                        My Profile
                    </h2>
                </button>
                <button
                    onClick={() => setTab(2)}
                    className="inline-block text-left">
                    <h2 className={`text-sm py-3 px-5 rounded-[10px] ${tab === 2 ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100'
                        }`}>
                        My Subscription Details
                    </h2>
                </button>
                <button
                    onClick={() => setTab(3)}
                    className="inline-block text-left"
                >
                    <h2 className={`text-sm py-3 px-5 rounded-[10px] ${tab === 3 ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100'
                        }`}>
                        My Usage Summary
                    </h2>
                </button>
                <button
                    onClick={() => setTab(4)}
                    className="inline-block text-left"
                >
                    <h2 className={`text-sm py-3 px-5 rounded-[10px] ${tab === 4 ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100'
                        }`}>
                        Payment & Invoices
                    </h2>
                </button>

                <button
                    onClick={() => setTab(5)}
                    className="inline-block text-left"
                >
                    <h2 className={`text-sm py-3 px-5 rounded-[10px] ${tab === 5 ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100'
                        }`}>
                        Upgrade Plan
                    </h2>
                </button>
            </div>
            <hr className="border border-border2 h-auto" />
            <div>
                {tab === 1 && <UserProfileManagement />}
                {tab === 2 && <Subscription />}
                {tab === 3 && <Usage />}
                {tab === 4 && <PaymentInvoices />}
                {tab === 5 && <UpgradePlanDetails />}
            </div>
        </div>
    </AdminLayout>
    )
}
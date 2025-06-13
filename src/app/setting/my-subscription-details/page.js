"use client"
import Subscription from "../../../components/setting/Subscription";
import AdminLayout from "../../../components/AdminLayout";
import Link from "next/link";
export default function MySubscriptionDetails() {
    return (<>
        <AdminLayout>
            <div className="grid grid-cols-[1.1fr_0fr_5fr] gap-[18px]">
                <div className="flex flex-col gap-2.5">
                    <Link href="/setting" className="inline-block">
                        <h2 className="text-sm  py-3 px-5 rounded-[10px]">My Profile</h2>
                    </Link>
                    <Link href="/setting/my-subscription-details" className="inline-block">
                        <h2 className="text-sm font-semibold bg-primary text-white py-3 px-5 rounded-[10px]">My Subscription Details</h2>
                    </Link>
                    <h2 className="text-sm py-3 px-5 rounded-[10px]">My Usage Summary</h2>
                    <h2 className="text-sm py-3 px-5 rounded-[10px]">Payment & Invoices</h2>
                </div>
                <hr className="border border-border2 h-auto" />
                <div>
                    <Subscription />
                </div>
            </div>
        </AdminLayout>
    </>)
}
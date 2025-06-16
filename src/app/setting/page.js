"use client"
import Link from "next/link";
import AdminLayout from "../../components/AdminLayout";
import Profile from "../../components/setting/Profile";
export default function Setting() {
    return (<>
        <AdminLayout>
            <div className="grid grid-cols-[1.1fr_0fr_5fr] gap-[18px]">
                <div className="flex flex-col gap-2.5">
                    <Link href="/setting" className="inline-block">
                        <h2 className="text-sm font-semibold bg-primary text-white py-3 px-5 rounded-[10px]">My Profile</h2>
                    </Link>
                    <Link href="/setting/my-subscription-details" className="inline-block">
                        <h2 className="text-sm py-3 px-5 rounded-[10px]">My Subscription Details</h2>
                    </Link>
                    <Link href="/setting/my-usage-summary" className="inline-block">
                        <h2 className="text-sm py-3 px-5 rounded-[10px]">My Usage Summary</h2>
                    </Link>
                    <Link href="/setting/payment-invoices" className="inline-block">
                        <h2 className="text-sm py-3 px-5 rounded-[10px]">Payment & Invoices</h2>
                    </Link>
                </div>
                <hr className="border border-border2 h-auto" />
                <div>
                    <Profile />
                </div>
            </div>
        </AdminLayout>
    </>)
}
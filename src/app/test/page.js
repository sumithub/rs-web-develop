"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import SelectedCustomers from "../../components/Models/manage-campaigns/SelectedCustomers"

export default function Test() {
    const [open, setOpen] = useState(false)
    return <AdminLayout>

        {open &&
            <SelectedCustomers
                onClose={() => {
                    setOpen(false)
                }}

                onSave={() => {
                    setOpen(true)
                }} />
        }

        <div className="flex flex-col gap-y-3">
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpen(true) }}>Selected Customers
            </div>

        </div>
    </AdminLayout>
}
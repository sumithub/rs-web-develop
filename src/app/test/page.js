"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

import Clone from "../../components/Models/templates/Clone"

export default function Test() {
    const [openClone, setOpenClone] = useState(false)

    return <AdminLayout>

        {openClone &&
            <Clone
                onClose={() => {
                    setOpenClone(false)
                }}

                onSave={() => {
                    setOpenClone(true)
                }} />}

        <div className="flex flex-col gap-y-3">
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenClone(true) }}>Clone
            </div>
        </div>
    </AdminLayout>
}
"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import SelectedCustomers from "../../components/Models/manage-campaigns/SelectedCustomers"
import SelectedFromCustomers from "../../components/Models/manage-campaigns/SelectedFromCustomers"
import EmailTemplate from "../../components/Models/manage-campaigns/EmailTemplate"
import Clone from "../../components/Models/templates/Clone"

export default function Test() {
    const [openClone, setOpenClone] = useState(false)
    const [open, setOpen] = useState(false)
    const [openSelect, setOpenSelect] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)

    return <AdminLayout>

        {openClone &&
            <Clone
                onClose={() => {
                    setOpenClone(false)
                }}

                onSave={() => {
                    setOpenClone(true)
                }} />}

        {open &&
            <SelectedCustomers
                onClose={() => {
                    setOpen(false)
                }}

                onSave={() => {
                    setOpen(true)
                }} />
        }

        {openSelect &&
            <SelectedFromCustomers
                onClose={() => {
                    setOpenSelect(false)
                }}

                onSave={() => {
                    setOpenSelect(true)
                }} />
        }

        {openEmail &&
            <EmailTemplate
                onClose={() => {
                    setOpenEmail(false)
                }}

                onSave={() => {
                    setOpenEmail(true)
                }} />
        }

        <div className="flex flex-col gap-y-3">
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenClone(true) }}>Clone
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpen(true) }}>Selected Customers
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenSelect(true) }}>Select from Customer List
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenEmail(true) }}>Email Template
            </div>
        </div>
    </AdminLayout>
}
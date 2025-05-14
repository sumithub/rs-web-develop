"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import SelectedCustomers from "../../components/Models/manage-campaigns/SelectedCustomers"
import SelectedFromCustomers from "../../components/Models/manage-campaigns/SelectedFromCustomers"
import EmailTemplate from "../../components/Models/manage-campaigns/EmailTemplate"
import ScheduleCampaign from "../../components/Models/manage-campaigns/ScheduleCampaign"

export default function Test() {
    const [open, setOpen] = useState(false)
    const [openSelect, setOpenSelect] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    const [openSchedule, setOpenSchedule] = useState(false)

    return <AdminLayout>

        {openSchedule &&
            <ScheduleCampaign
                onClose={() => {
                    setOpenSchedule(false)
                }}

                onSave={() => {
                    setOpenSchedule(true)
                }}
            />
        }


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
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenSchedule(true) }}>Schedule Campaign
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
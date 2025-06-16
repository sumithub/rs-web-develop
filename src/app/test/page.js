"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import ReviewResponseTemplates from "../../components/Models/review/ReviewResponseTemplates";
import ReportTemplate from "../../components/Models/reports/ReportTemplate";
import ScheduleEarlyPayment from "../../components/setting/ScheduleEarlyPayment";
import 'react-range-slider-input/dist/style.css';

export default function Test() {
    const [openResponse, setOpenResponse] = useState(false)
    const [openSave, setOpenSave] = useState(false)
    const [open, setOpen] = useState(false)
    return <AdminLayout>

        {openSave &&
            <ReportTemplate
                onClose={() => {
                    setOpenSave(false)
                }}

                onSave={() => {
                    setOpenSave(true)
                }} />
        }

        {openResponse &&
            <ReviewResponseTemplates
                onClose={() => {
                    setOpenResponse(false)
                }}

                onSave={() => {
                    setOpenResponse(true)
                }} />
        }

        {open &&
            <ScheduleEarlyPayment
                onClose={() => {
                    setOpen(false)
                }}

                onSave={() => {
                    setOpen(true)
                }} />
        }

        <div className="flex flex-col gap-y-3">
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenResponse(true) }}>Review Response Templates
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenSave(true) }}>Report Template
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpen(true) }}>Schedule Early Payment
            </div>
        </div>
    </AdminLayout>
}
"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import ReviewResponseTemplates from "../../components/Models/review/ReviewResponseTemplates";
import NoActionRequiredState from "../../components/Models/review/NoActionRequiredState";
import ResendReportEmail from "../../components/Models/reports/ResendReportEmail";
import ReportTemplate from "../../components/Models/reports/ReportTemplate";

export default function Test() {
    const [openResponse, setOpenResponse] = useState(false)
    const [openTest, setOpenTest] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    const [openSave, setOpenSave] = useState(false)
    return <AdminLayout>

        {openEmail &&
            <ResendReportEmail
                onClose={() => {
                    setOpenEmail(false)
                }}

                onSave={() => {
                    setOpenEmail(true)
                }} />
        }

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

        {openTest &&
            <NoActionRequiredState
                onClose={() => {
                    setOpenTest(false)
                }}

                onSave={() => {
                    setOpenTest(true)
                }} />
        }

        <div className="flex flex-col gap-y-3">

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenResponse(true) }}>Review Response Templates
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenTest(true) }}>No Action Required State
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenEmail(true) }}>Resend Report Email
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenSave(true) }}>Report Template
            </div>
        </div>
    </AdminLayout>
}
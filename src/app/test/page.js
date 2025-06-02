"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import SelectedCustomers from "../../components/Models/manage-campaigns/SelectedCustomers"
import ReviewResponseTemplates from "../../components/Models/review/ReviewResponseTemplates";
import ConnectReviewSource from "../../components/Models/review/ConnectReviewSource";
import DisconnectReviewSourceConfirmation from "../../components/Models/review/DisconnectReviewSourceConfirmation";
import CodePreviewBox from "../../components/Models/review/CodePreviewBox";
import NoActionRequiredState from "../../components/Models/review/NoActionRequiredState";
import ResendReportEmail from "../../components/Models/reports/ResendReportEmail";
import ReportTemplate from "../../components/Models/reports/ReportTemplate";

export default function Test() {
    const [open, setOpen] = useState(false)
    const [openResponse, setOpenResponse] = useState(false)
    const [openCarousel, setOpenCarousel] = useState(false)
    const [openConnect, setOpenConnect] = useState(false)
    const [openDisconnect, setOpenDisconnect] = useState(false)
    const [openCode, setOpenCode] = useState(false)
    const [openTest, setOpenTest] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    const [openSave, setOpenSave] = useState(false)
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

        {openConnect &&
            <ConnectReviewSource
                onClose={() => {
                    setOpenConnect(false)
                }}

                onSave={() => {
                    setOpenConnect(true)
                }} />
        }

        {openDisconnect &&
            <DisconnectReviewSourceConfirmation
                onClose={() => {
                    setOpenDisconnect(false)
                }}

                onSave={() => {
                    setOpenDisconnect(true)
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
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpen(true) }}>Selected Customers
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenResponse(true) }}>Review Response Templates
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenConnect(true) }}>Connect Review Source
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenDisconnect(true) }}>Disconnect Review Source Confirmation
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
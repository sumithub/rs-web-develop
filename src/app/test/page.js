"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import SelectedCustomers from "../../components/Models/manage-campaigns/SelectedCustomers"
import SelectedFromCustomers from "../../components/Models/manage-campaigns/SelectedFromCustomers"
import EmailTemplate from "../../components/Models/manage-campaigns/EmailTemplate"
import TemplateList from "../../components/Models/boost/TemplateList"
import BoostRequest from "../../components/Models/boost/BoostRequest";
import ReviewDetails from "../../components/Models/review/ReviewDetails";
import ReviewResponseTemplates from "../../components/Models/review/ReviewResponseTemplates";
import ShareOnSocialMedia from "../../components/Models/review/ShareOnSocialMedia";
import ShareViaEmail from "../../components/Models/review/ShareViaEmail";
import AssignReviewToUser from "../../components/Models/review/AssignReviewToUser";

export default function Test() {
    const [open, setOpen] = useState(false)
    const [openSelect, setOpenSelect] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    const [openTemplate, setOpenTemplate] = useState(false)
    const [openBoost, setOpenBoost] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [openResponse, setOpenResponse] = useState(false)
    const [openMedia, setOpenMedia] = useState(false) 
    const [openShare, setOpenShare] = useState(false) 
    const [openAssign, setOpenAssign] = useState(false) 

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

        {openTemplate &&
            <TemplateList
                onClose={() => {
                    setOpenTemplate(false)
                }}

                onSave={() => {
                    setOpenTemplate(true)
                }} />
        }

        {openBoost &&
            <BoostRequest
                onClose={() => {
                    setOpenBoost(false)
                }}

                onSave={() => {
                    setOpenBoost(true)
                }} />
        }

        {openDetail &&
            <ReviewDetails
                onClose={() => {
                    setOpenDetail(false)
                }}

                onSave={() => {
                    setOpenDetail(true)
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

        {openMedia &&
            <ShareOnSocialMedia
                onClose={() => {
                    setOpenMedia(false)
                }}

                onSave={() => {
                    setOpenMedia(true)
                }} />
        }

        {openShare &&
            <ShareViaEmail
                onClose={() => {
                    setOpenShare(false)
                }}

                onSave={() => {
                    setOpenShare(true)
                }} />
        }

        {openAssign &&
            <AssignReviewToUser
                onClose={() => {
                    setOpenAssign(false)
                }}

                onSave={() => {
                    setOpenAssign(true)
                }} />
        }

        <div className="flex flex-col gap-y-3">
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpen(true) }}>Selected Customers
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenSelect(true) }}>Select from Customer List
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenEmail(true) }}>Email Template
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenTemplate(true) }}>Template List
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenBoost(true) }}>Boost Request
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenDetail(true) }}>Review Details
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenResponse(true) }}>Review Response Templates
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenMedia(true) }}>Share On Social Media
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenShare(true) }}>Share Via Email
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenAssign(true) }}>Assign Review To User
            </div>
        </div>
    </AdminLayout>
}
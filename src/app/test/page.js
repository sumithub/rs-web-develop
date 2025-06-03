"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import SelectedCustomers from "../../components/Models/manage-campaigns/SelectedCustomers"
import ReviewDetails from "../../components/Models/review/ReviewDetails";
import ReviewResponseTemplates from "../../components/Models/review/ReviewResponseTemplates";
import ShareOnSocialMedia from "../../components/Models/review/ShareOnSocialMedia";
import ShareViaEmail from "../../components/Models/review/ShareViaEmail";
import AssignReviewToUser from "../../components/Models/review/AssignReviewToUser";
import Carousel from "../../components/Models/review/Carousel";
import TestimonialWidget from "../../components/Models/review/TestimonialWidget";
import StarBadgeWidget from "../../components/Models/review/StarBadgeWidget";
import FloatingButtonWidget from "../../components/Models/review/FloatingButtonWidget";
import ConnectReviewSource from "../../components/Models/review/ConnectReviewSource";
import DisconnectReviewSourceConfirmation from "../../components/Models/review/DisconnectReviewSourceConfirmation";
import CodePreviewBox from "../../components/Models/review/CodePreviewBox";
import ReviewDetail from "../../components/Models/review/ReviewDetail";
import NoActionRequiredState from "../../components/Models/review/NoActionRequiredState";
import RequestUpdate from "../../components/Models/review/RequestUpdate";

export default function Test() {
    const [open, setOpen] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [openResponse, setOpenResponse] = useState(false)
    const [openMedia, setOpenMedia] = useState(false)
    const [openShare, setOpenShare] = useState(false)
    const [openAssign, setOpenAssign] = useState(false)
    const [openCarousel, setOpenCarousel] = useState(false)
    const [openTestimonial, setOpenTestimonial] = useState(false)
    const [openStar, setOpenStar] = useState(false)
    const [openFloating, setOpenFloating] = useState(false)
    const [openConnect, setOpenConnect] = useState(false)
    const [openDisconnect, setOpenDisconnect] = useState(false)
    const [openCode, setOpenCode] = useState(false)
    const [openReviewDetail, setOpenReviewDetail] = useState(false)
    const [openTest, setOpenTest] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
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

        {openCarousel &&
            <Carousel
                onClose={() => {
                    setOpenCarousel(false)
                }}

                onSave={() => {
                    setOpenCarousel(true)
                }} />
        }

        {openTestimonial &&
            <TestimonialWidget
                onClose={() => {
                    setOpenTestimonial(false)
                }}

                onSave={() => {
                    setOpenTestimonial(true)
                }} />
        }

        {openStar &&
            <StarBadgeWidget
                onClose={() => {
                    setOpenStar(false)
                }}

                onSave={() => {
                    setOpenStar(true)
                }} />
        }

        {openFloating &&
            <FloatingButtonWidget
                onClose={() => {
                    setOpenFloating(false)
                }}

                onSave={() => {
                    setOpenFloating(true)
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

        {openCode &&
            <CodePreviewBox
                onClose={() => {
                    setOpenCode(false)
                }}

                onSave={() => {
                    setOpenCode(true)
                }} />
        }

        {openReviewDetail &&
            <ReviewDetail
                onClose={() => {
                    setOpenReviewDetail(false)
                }}

                onSave={() => {
                    setOpenReviewDetail(true)
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

        {openUpdate &&
            <RequestUpdate
                onClose={() => {
                    setOpenUpdate(false)
                }}

                onSave={() => {
                    setOpenUpdate(true)
                }} />
        }

        <div className="flex flex-col gap-y-3">
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpen(true) }}>Selected Customers
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

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenCarousel(true) }}>Carousel
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenTestimonial(true) }}> Testimonial Widget
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenStar(true) }}>Star Badge Widget
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenFloating(true) }}>Floating Button Widget
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenConnect(true) }}>Connect Review Source
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenDisconnect(true) }}>Disconnect Review Source Confirmation
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenCode(true) }}>Code Preview Box
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenReviewDetail(true) }}>Review Detail
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenTest(true) }}>No Action Required State
            </div>

            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenUpdate(true) }}>Request Update
            </div>
        </div>
    </AdminLayout>
}
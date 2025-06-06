"use client"
import Image from "next/image";
import AdminLayout from "../../components/AdminLayout";
import ReviewCard from "../../components/ReviewCard"
import GridWidget from "../../components/Models/review/GridWidget";
import CancelButton from "../../components/common/CancelButton";
import { useState } from "react";
import SecondaryButton from "../../components/common/SecondaryButton";
import TestimonialWidget from "../../components/Models/review/TestimonialWidget";
import FloatingButtonWidget from "../../components/Models/review/FloatingButtonWidget";
import StarBadgeWidget from "../../components/Models/review/StarBadgeWidget";
import Carousel from "../../components/Models/review/Carousel";

export default function ReviewWidgets() {
    const [openCarousel, setOpenCarousel] = useState(false)
    // const [openStar, setOpenStar] = useState(false)
    // const [openFloating, setOpenFloating] = useState(false)
    // const [openTestimonial, setOpenTestimonial] = useState(false)
    // const [openGrid, setOpenGrid] = useState(false)
    const [modalTitle, setModalTitle] = useState("");

    const handleOpenModal = (title) => {
        setModalTitle(title);
        setOpenCarousel(true);
    };
    return (<AdminLayout>
        {/* {openGrid &&
            <GridWidget
                onClose={() => {
                    setOpenGrid(false)
                }}

                onSave={() => {
                    setOpenGrid(true)
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

        {openFloating &&
            <FloatingButtonWidget
                onClose={() => {
                    setOpenFloating(false)
                }}

                onSave={() => {
                    setOpenFloating(true)
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
        } */}

        {openCarousel &&
            <Carousel
                title={modalTitle}
                onClose={() => {
                    setOpenCarousel(false)
                }}

                onSave={() => {
                    setOpenCarousel(true)
                }} />
        }
        <main className="grid grid-cols-3 gap-3">
            <div className="border border-border-color rounded-md">
                <div className="mt-2 p-2">
                    <ReviewCard />
                </div>

                <div className="p-4">
                    <div className="border border-border-color rounded-md mt-3 p-4">
                        <div className="flex gap-2.5 ">
                            <Image src="/images/google.svg" alt="google.svg" width={20} height={20.47} unoptimized={true} />
                            Verified On Google
                        </div>
                    </div>
                </div>

                <div className="mt-3 p-4 mb-3">
                    <SecondaryButton
                        title="Carousel Review Widget"
                        onClick={() => handleOpenModal("Carousel")}
                    />
                </div>
            </div>

            <div className="border border-border-color rounded-md">
                <div className="mt-2 p-2">
                    <ReviewCard />
                </div>

                <div className="p-4">
                    <div className="border border-border-color rounded-md mt-3 p-4">
                        <div className="flex gap-2.5 ">
                            <Image src="/images/google.svg" alt="google.svg" width={20} height={20.47} unoptimized={true} />
                            Verified On Google
                        </div>
                    </div>
                </div>

                <div className="mt-3 p-4 mb-3">
                    <CancelButton
                        title="Grid Review Widget"
                        onClick={() => handleOpenModal("GridWidget")}
                    />
                </div>
            </div>

            <div className="border border-border-color rounded-md">
                <div className="mt-2 p-2">
                    <ReviewCard />
                </div>

                <div className="p-4">
                    <div className="border border-border-color rounded-md mt-3 p-4">
                        <div className="flex gap-2.5 ">
                            <Image src="/images/google.svg" alt="google.svg" width={20} height={20.47} unoptimized={true} />
                            Verified On Google
                        </div>
                    </div>
                </div>

                <div className="mt-3 p-4 mb-3">
                    <CancelButton
                        title="Testimonial Card Widget"
                        onClick={() => handleOpenModal("TestimonialWidget")}
                    />
                </div>
            </div>

            <div className="border border-border-color rounded-md">
                <div className="mt-2 p-2">
                    <ReviewCard />
                </div>

                <div className="p-4">
                    <div className="border border-border-color rounded-md mt-3 p-4">
                        <div className="flex gap-2.5 ">
                            <Image src="/images/google.svg" alt="google.svg" width={20} height={20.47} unoptimized={true} />
                            Verified On Google
                        </div>
                    </div>
                </div>

                <div className="mt-3 p-4 mb-3">
                    <CancelButton
                        title="Floating Review"
                        onClick={() => handleOpenModal("FloatingButtonWidget")}
                    />
                </div>
            </div>

            <div className="border border-border-color rounded-md">
                <div className="mt-2 p-2">
                    <ReviewCard />
                </div>

                <div className="p-4">
                    <div className="border border-border-color rounded-md mt-3 p-4">
                        <div className="flex gap-2.5 ">
                            <Image src="/images/google.svg" alt="google.svg" width={20} height={20.47} unoptimized={true} />
                            Verified On Google
                        </div>
                    </div>
                </div>

                <div className="mt-3 p-4 mb-3">
                    <CancelButton
                        title="Star Rating Badge"
                        onClick={() => handleOpenModal("StarBadgeWidget")}
                    />
                </div>
            </div>

        </main>
    </AdminLayout>

    )
}
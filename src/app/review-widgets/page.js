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
import ProgressBar from "@ramonak/react-progress-bar";
import Slider from "react-slick";

export default function ReviewWidgets() {
    const [openCarousel, setOpenCarousel] = useState(false)
    // const [openStar, setOpenStar] = useState(false)
    // const [openFloating, setOpenFloating] = useState(false)
    // const [openTestimonial, setOpenTestimonial] = useState(false)
    // const [openGrid, setOpenGrid] = useState(false)
    const [modalTitle, setModalTitle] = useState("");

    // var settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    // };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        swipe: false,          // disable swiping
        draggable: false,      // disable dragging with mouse
        autoplay: false,       // disable auto-play
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
    };

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
        <main className="grid grid-cols-3 gap-5">
            <div>
                <Slider {...settings}>
                    {[1, 2].map((_, i) => (
                        <div key={i} className="border border-border-color rounded-[10px] p-8 pb-5">
                            <div className="w-full">
                                <div className="bg-dark rounded-[10px] h-[170px] w-full p-3.5 flex items-end">
                                    <button className="flex gap-2.5 p-2.5 text-sm font-medium border border-primary rounded-lg">
                                        <Image src="/images/google.svg" alt="google" width={20} height={20} unoptimized />
                                        Verified On Google
                                    </button>
                                </div>
                                <div className="flex justify-between gap-8 items-start mt-3.5">
                                    <div className="w-2/3">
                                        <div className="bg-border2 w-full p-3 rounded-sm"></div>
                                        <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                                            <div className="bg-border2 w-full rounded-sm p-2"></div>
                                            <div className="bg-border2 w-full rounded-sm p-2"></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <Image src="/images/star.svg" alt="star" width={21} height={21} />
                                        <Image src="/images/star.svg" alt="star" width={21} height={21} />
                                        <Image src="/images/star.svg" alt="star" width={21} height={21} />
                                        <Image src="/images/star.svg" alt="star" width={21} height={21} />
                                        <Image src="/images/star2.svg" alt="half star" width={21} height={21} />
                                    </div>
                                </div>
                                <SecondaryButton
                                    class_="text-lg mt-5"
                                    title="Carousel Review Widget"
                                    onClick={() => handleOpenModal("Carousel")}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>

            </div>
            <div className="border border-border-color rounded-[10px] p-5 flex flex-col justify-between">
                <div className="flex gap-3.5">
                    <Image unoptimized={true} src="/images/image.svg" alt="user" height={71} width={71} />
                    <div className="w-full">
                        <div className="bg-border2 w-full p-2.5 rounded-sm" />
                        <div className="bg-border2 w-2/6 p-1 rounded-sm my-2.5" />
                        <div className="flex gap-1">
                            <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                            <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                            <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                            <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                            <Image unoptimized={true} src="/images/star2.svg" alt="star2.svg" width={21} height={21} />
                        </div>
                    </div>
                </div>
                <div className="bg-border2 w-full p-7 rounded-sm mt-5" />
                <button className="flex gap-2.5 border border-primary text-sm font-medium rounded-lg mt-3.5 px-2.5 py-3.5">
                    <Image src="/images/google.svg" alt="google.svg" width={20} height={20.47} unoptimized={true} />
                    Verified On Google
                </button>

                <CancelButton
                    title="Grid Review Widget"
                    class_="mt-5! bg-white border-primary text-primary! rounded-[10px] hover:bg-primary! hover:text-white!"
                    onClick={() => handleOpenModal("GridWidget")}
                />
            </div>

            <div className="border border-border-color rounded-[10px] p-5 flex flex-col justify-between">
                <div className="flex items-center gap-3.5">
                    <Image unoptimized={true} src="/images/image.svg" alt="user" height={66} width={66} />
                    <div className="w-full">
                        <div className="bg-border2 w-full p-3 rounded-sm" />
                        <div className="bg-border2 w-2/6 p-2 rounded-sm mt-3" />
                    </div>
                </div>
                <div className="flex justify-between mt-2.5">
                    <div className="flex gap-1">
                        <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                        <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                        <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                        <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                        <Image unoptimized={true} src="/images/star2.svg" alt="star2.svg" width={21} height={21} />
                    </div>
                    <button className="flex items-center gap-2.5 border border-primary text-xs font-medium rounded-lg px-2.5 py-2">
                        <Image src="/images/google.svg" alt="google.svg" width={18} height={18} unoptimized={true} />
                        Verified On Google
                    </button>
                </div>
                <div className="bg-border2 w-full p-10 rounded-sm mt-3.5" />
                <CancelButton
                    title="Testimonial Card Widget"
                    class_="mt-5! bg-white border-primary text-primary! rounded-[10px] hover:bg-primary! hover:text-white!"
                    onClick={() => handleOpenModal("TestimonialWidget")}
                />
            </div>

            <div className="border border-border-color rounded-[10px] p-5 flex flex-col justify-end">
                <div className="shadow-[0px_0px_22px_0px_#0000000F] p-3.5 rounded-[10px] w-4/5">
                    <div className="flex items-start gap-3.5">
                        <Image unoptimized={true} src="/images/image.svg" alt="user" height={50} width={50} />
                        <div className="w-full">
                            <div className="bg-border2 w-[90%] p-2 rounded-sm" />
                            <div className="flex gap-1 mt-2.5">
                                <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                                <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                                <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                                <Image unoptimized={true} src="/images/star.svg" alt="star.svg" width={21} height={21} />
                                <Image unoptimized={true} src="/images/star2.svg" alt="star2.svg" width={21} height={21} />
                            </div>
                        </div>
                        <button className="border border-primary rounded-lg px-1.5 py-1.5">
                            <Image src="/images/google.svg" alt="google.svg" width={20} height={20} unoptimized={true} />
                        </button>
                    </div>
                    <div className="bg-border2 w-full p-6 rounded-sm mt-2.5" />
                </div>


                <CancelButton
                    title="Floating Review"
                    class_="mt-5! bg-white border-primary text-primary! rounded-[10px] hover:bg-primary! hover:text-white!"
                    onClick={() => handleOpenModal("FloatingButtonWidget")}
                />
            </div>

            <div className="border border-border-color rounded-[10px] p-5">
                <div>
                    <div className="text-lg font-semibold mb-4">Star Rating Badge</div>
                    <div className="grid grid-cols-[1fr_auto_1.2fr] items-end gap-3.5">
                        <div className="text-end">
                            {/* <div className="text-xs font-semibold">Total</div> */}
                            <div className="text-2xl text-end font-semibold">4.5</div>
                            <div className="flex gap-2.5 pt-[5px] justify-end">
                                <div className="flex items-center gap-1">
                                    <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                    <Image src="/images/star2.svg" alt="star2" height={16} width={16} unoptimized={true} />
                                </div>
                                <h2 className="text-sm text-primary font-semibold">&#40;862&#41;</h2>
                            </div>
                            <div className="pt-[5px]">
                                <h2 className="text-text3 text-sm">Food 4.5</h2>
                                <h2 className="text-text3 text-sm py-[5px]">Ambience 3.7</h2>
                                <h2 className="text-text3 text-sm">Service 4.2</h2>
                            </div>
                        </div>
                        <hr className="border border-border2 h-full" />
                        <div>
                            <div className="flex gap-2.5 items-center justify-between">
                                <div className="flex gap-[5px] shrink-0">
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                </div>
                                <div className="grid grid-cols-[0.9fr_auto] gap-2 w-full items-center justify-between">
                                    <ProgressBar completed={50} bgColor="#ADADAD" height="4px"
                                        isLabelVisible={false} borderRadius="12px"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2.5 items-center justify-between mt-2.5">
                                <div className="flex gap-[5px] shrink-0">
                                    <Image unoptimized={true} src="/images/star5.svg" alt="star2" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                </div>
                                <div className="grid grid-cols-[0.9fr_auto] gap-2 w-full items-center justify-between">
                                    <ProgressBar completed={40} bgColor="#ADADAD" height="4px"
                                        isLabelVisible={false} borderRadius="12px"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2.5 items-center justify-between mt-2.5">
                                <div className="flex gap-[5px] shrink-0">
                                    <Image unoptimized={true} src="/images/star5.svg" alt="star2" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star5.svg" alt="star2" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                </div>
                                <div className="grid grid-cols-[0.9fr_auto] gap-2 w-full items-center justify-between">
                                    <ProgressBar completed={60} bgColor="#ADADAD" height="4px"
                                        isLabelVisible={false} borderRadius="12px"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2.5 items-center justify-between mt-2.5">
                                <div className="flex gap-[5px] shrink-0">
                                    <Image unoptimized={true} src="/images/star5.svg" alt="star2" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star5.svg" alt="star2" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star5.svg" alt="star2" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star" width={12} height={12} />
                                </div>
                                <div className="grid grid-cols-[0.9fr_auto] gap-2 w-full items-center justify-between">
                                    <ProgressBar completed={15} bgColor="#ADADAD" height="4px"
                                        isLabelVisible={false} borderRadius="12px"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2.5 items-center justify-between mt-2.5">
                                <div className="flex gap-[5px] shrink-0">
                                    <Image unoptimized={true} src="/images/star5.svg" alt="star5" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star5.svg" alt="star5" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star5.svg" alt="star5" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star5.svg" alt="star5" width={12} height={12} />
                                    <Image unoptimized={true} src="/images/star4.svg" alt="star4" width={12} height={12} />
                                </div>
                                <div className="grid grid-cols-[0.9fr_auto] gap-2 w-full items-center justify-between">
                                    <ProgressBar completed={5} bgColor="#ADADAD" height="4px"
                                        isLabelVisible={false} borderRadius="12px"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <CancelButton
                    title="Star Rating Badge"
                    class_="mt-5! bg-white border-primary text-primary! rounded-[10px] hover:bg-primary! hover:text-white!"
                    onClick={() => handleOpenModal("StarBadgeWidget")}
                />
            </div>
        </main>
    </AdminLayout>
    )
}

function CustomNextArrow({ onClick }) {
    return (
        <div onClick={onClick} className="absolute right-4 top-36 -translate-y-1/2 z-10 cursor-pointer">
            <Image src="/images/arrow-right.svg" alt="Next" width={18} height={18} />
        </div>
    );
}

function CustomPrevArrow({ onClick }) {
    return (
        <div onClick={onClick} className="absolute left-4 top-36 -translate-y-1/2 z-10 cursor-pointer">
            <Image src="/images/arrow-right.svg" alt="Prev" width={18} height={18} className="rotate-180" />
        </div>
    );
}
import Image from "next/image";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import ShareOnSocialMedia from "./ShareOnSocialMedia";
import { useState } from "react";
import ShareViaEmail from "./ShareViaEmail";

export default function ReviewDetails({ onClose, onSave }) {
    const [openMedia, setOpenMedia] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    return (
        <Model onClose={onClose} title="Review Details" modalClass="w-[50%]!">
            {openMedia &&
                <ShareOnSocialMedia
                    onClose={() => {
                        setOpenMedia(false)
                    }}

                    onSave={() => {
                        setOpenMedia(true)
                    }} />
            }

            {openEmail &&
                <ShareViaEmail
                    onClose={() => {
                        setOpenEmail(false)
                    }}

                    onSave={() => {
                        setOpenEmail(true)
                    }} />
            }
            <div>
                <div className="flex pt-1 items-center justify-between">
                    <div className="flex items-start w-full gap-[15px]">
                        <Image src="/images/request.png" alt="request" width={46} height={46} />
                        <div className="w-full">
                            <div className="flex justify-between">
                                <div className="">
                                    <h2 className="text-base font-semibold">Zain Levin</h2>
                                    <h3 className="text-sm text-text3 pt-1.5">ZainLevin@gmail.com</h3>
                                </div>
                                <div className="flex items-center gap-[15px]">
                                    <div className="flex items-center gap-3">
                                        <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                    </div>
                                    <h2 className="text-sm">Jun 11,2024</h2>
                                </div>
                            </div>
                            <h2 className="text-xs pt-[15px] capitalize">Great service, highly recommended!</h2>
                        </div>
                    </div>
                </div>
                <div className="mt-[30px]">
                    <h2 className="text-base font-medium">Share this review:</h2>
                    <div className="grid grid-cols-3 gap-[15px] mt-[15px]">
                        <SecondaryButton title="Share on social media" onClick={() => { setOpenMedia(true) }} />
                        <SecondaryButton title="share via email" onClick={() => { setOpenEmail(true) }} />
                        <CancelButton title="copy link" />
                    </div>
                </div>
                <div className="mt-[30px] grid grid-cols-6 gap-[18px]">
                    <div className="text-center">
                        <Image src="/images/fb.png" alt="fb" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Facebook</h2>
                    </div>
                    <div className="text-center">
                        <Image src="/images/twitter.png" alt="twitter" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Twitter</h2>
                    </div>
                    <div className="text-center">
                        <Image src="/images/in.png" alt="in" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Linkedin</h2>
                    </div>
                    <div className="text-center">
                        <Image src="/images/insta.png" alt="insta" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Instagram</h2>
                    </div>
                    <div className="text-center">
                        <Image src="/images/dribble.png" alt="dribble" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Dribble</h2>
                    </div>
                    <div className="text-center">
                        <Image src="/images/more.png" alt="more" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">More</h2>
                    </div>
                </div>
            </div>
        </Model>
    )
}
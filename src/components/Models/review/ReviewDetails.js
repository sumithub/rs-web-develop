import Image from "next/image";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import Link from "next/link";
import { useState } from "react";
import ShareOnSocialMedia from "../review/ShareOnSocialMedia"
import ShareViaEmail from "../review/ShareViaEmail"
import { toast } from "react-toastify";
import { getError } from "../../../../helper";

export default function ReviewDetails({ onClose, onSave }) {
    const [openMedia, setOpenMedia] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)

    const Copy = async () => {
        try {
            toast.success("Copied Successfully")
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
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
                        <Image unoptimized={true} src="/images/request.png" alt="request" width={46} height={46} />
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
                                        <Image src="/images/rating-star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                    </div>
                                    <h2 className="text-sm">Jun 11,2024</h2>
                                </div>
                            </div>
                            <h2 className="text-xs pt-[15px] capitalize">Great service, highly recommended!</h2>
                        </div>
                    </div>
                </div>
                <div className="mt-[30px]">
                    <h2 className="text-base capitalize font-medium">Share this review:</h2>
                    <div className="grid grid-cols-3 gap-[15px] mt-[15px]">
                        <SecondaryButton title="Share on social media" onClick={() => { setOpenMedia(true) }} />
                        <SecondaryButton title="share via email" onClick={() => { setOpenEmail(true) }} />
                        <CancelButton title="copy link" onClick={Copy} />
                    </div>
                </div>
                <div className="mt-[30px] grid grid-cols-6 gap-[18px]">
                    <Link href="https://www.facebook.com/" target="_blank" className="text-center">
                        <Image unoptimized={true} src="/images/fb.svg" alt="fb" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Facebook</h2>
                    </Link>
                    <Link href="https://x.com/" target="_blank" className="text-center">
                        <Image unoptimized={true} src="/images/x.svg" alt="twitter" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Twitter</h2>
                    </Link>
                    <Link href="https://www.linkedin.com/" target="_blank" className="text-center">
                        <Image unoptimized={true} src="/images/in.svg" alt="in" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Linkedin</h2>
                    </Link>
                    <Link href="https://www.instagram.com/" target="_blank" className="text-center">
                        <Image unoptimized={true} src="/images/insta.svg" alt="insta" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Instagram</h2>
                    </Link>
                    <Link href="https://dribbble.com/" target="_blank" className="text-center">
                        <Image unoptimized={true} src="/images/dribbble1.svg" alt="dribble" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Dribble</h2>
                    </Link>
                    <button className="text-center">
                        <Image unoptimized={true} src="/images/more.svg" alt="more" width={41} height={41} className="mx-auto rounded-[9px]" />
                        <h2 className="mt-[15px] text-sm font-medium">More</h2>
                    </button>
                </div>
            </div >
        </Model >
    )
}
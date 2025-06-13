"use client"
import Image from "next/image";
import Input from "../../form/Input";
import Model from "../Model";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ShareOnSocialMedia({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Share on social media" modalClass="w-[50%]!" modalBodyClass="max-h-[90vh]!">
            <div>
                <div className="font-semibold">
                    Share This Review:
                </div>
                <div className="mt-2.5 grid grid-cols-6 gap-[18px]">
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
                <div>
                    <Input
                        hideOptional={true}
                        icon="/images/copy2.svg"
                        onIconClick={() => {
                            toast.success("Copied Successfully")
                            onClose()
                        }}
                        class_="mt-[25px]!"
                        inputClass="border-primary/10"
                        placeholder=""
                        label=""
                    />
                </div>
            </div>
        </Model>
    )
}
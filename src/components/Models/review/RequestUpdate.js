import Image from "next/image";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import HtmlEditor from "../../../components/form/editor/HtmlEditor";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RequestUpdate({ onClose, onSave }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async () => {
        try {
            toast.success("Requsted Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Request Update" modalClass="w-[80%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-[1.5fr_1fr] gap-5 pt-1">
                    <div>
                        <h2 className="text-[19px] font-medium">Are you sure you want to request an update for this review?</h2>
                        <div className="flex pt-5 items-center justify-between w-4/5">
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
                                    <h2 className="text-xs pt-[15px] capitalize">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the .</h2>
                                </div>
                            </div>
                        </div>

                        <div className="pt-5">
                            <div>Message</div>
                            <HtmlEditor />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-50">
                            <CancelButton title="cancel" onClick={onClose} />
                            <SecondaryButton title="Request update" type="submit" disabled={sending} />
                        </div>
                    </div>

                    <div className="bg-white rounded-[15px] shadow-sm">
                        <div className='bg-primary/10 py-[18px] px-5 rounded-t-[15px] '>
                            <div className='flex items-center gap-2.5'>
                                <Image unoptimized={true} src="/images/eye1.svg" alt="eye1" width={22} height={22} />
                                <div className='text-secondary text-lg font-semibold'>Email Preview</div>
                            </div>
                        </div>

                        <div className='p-5'>
                            <div className='p-2.5 border border-border2 rounded-[10px]'>
                                <div>
                                    <h2 className="text-xs">Dear  &#123;John Deo&#125;&#44;</h2>
                                    <p className="text-xs pt-[15px] capitalize">Thank you for taking the time to share your feedback regarding your recent experience with [Business Name]. We truly value your opinion and are committed to continually improving our service.
                                        Since your review, we have made significant changes to address the issues you mentioned, including:</p>
                                </div>
                                <div className="pt-[15px]">
                                    <h2 className="text-xs capitalize">Since your review, we have made significant changes to address the issues you mentioned, including:</h2>
                                    <ul className="list-disc inline-block pl-5 py-1">
                                        <li className="text-xs capitalize">[Briefly mention a key improvement]</li>
                                        <li className="text-xs capitalize">[Another improvement, if applicable]</li>
                                    </ul>
                                    <p className="text-xs capitalize">We would be grateful if you could take a moment to update your review based on your latest experience. Your updated feedback not only helps us grow but also guides other customers in making informed decisions</p>
                                </div>
                                <div className="py-[15px]">
                                    <h2 className="text-xs font-semibold capitalize">To update your review, please click the link below:</h2>
                                    <p className="text-xs font-medium text-primary underline underline-offset-1">Update Your Review Now</p>
                                </div>
                                <div>
                                    <h2 className="capitalize text-xs">If you have any questions or need further assistance, please feel free to reply to this email.</h2>
                                    <h2 className="capitalize text-xs">Thank you again for your time and for helping us serve you better.</h2>
                                    <h2 className="capitalize text-xs">Warm regards,</h2>
                                    <h2 className="capitalize text-xs">[john deo]</h2>
                                    <h2 className="capitalize text-xs">[manager]</h2>
                                    <h2 className="capitalize text-xs">[Business Name]</h2>
                                    <h2 className="capitalize text-xs">[+91 98569 58965]</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Model >
    )
}
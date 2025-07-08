"use client"
import { toast } from "react-toastify"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import Model from "../Model"
import { getError } from "../../../../helper"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import ManualReply from "../../Models/reviews-oversight/ManualReply"
import Image from "next/image"

function ReviewDetails({ onClose, onSave }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)
    const [open, setOpen] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if ("add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }
            if (onSave) {
                onSave(data)
            }
            toast.success("Deleted Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return <Model onClose={onClose} title="Review Details" modalClass="w-1/2!" >
        {open &&
            <ManualReply
                onClose={() => {
                    setOpen(false)
                }}

                onSave={() => {
                    setOpen(true)
                }} />
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="flex justify-between">
                    <h2 className="text-base capitalize text-text3">Customer</h2>
                    <h2 className="text-base capitalize font-medium">John Doe
                    </h2>
                </div>
                <hr className="border-t border-border2 w-full my-3.5" />

                <div className="flex justify-between">
                    <h2 className="text-base capitalize text-text3">Email</h2>
                    <h2 className="text-base capitalize font-medium">john@example.com
                    </h2>
                </div>
                <hr className="border-t border-border2 w-full my-3.5" />

                <div className="flex justify-between">
                    <h2 className="text-base capitalize text-text3">Phone</h2>
                    <h2 className="text-base capitalize font-medium">+61412345678
                    </h2>
                </div>
                <hr className="border-t border-border2 w-full my-3.5" />

                <div className="flex justify-between">
                    <h2 className="text-base capitalize text-text3">Business</h2>
                    <h2 className="text-base capitalize font-medium">ABC Dental - Melbourne
                    </h2>
                </div>
                <hr className="border-t border-border2 w-full my-3.5" />

                <div className="flex justify-between">
                    <h2 className="text-base capitalize text-text3">Review Source</h2>
                    <h2 className="text-base capitalize font-medium">Google
                    </h2>
                </div>
                <hr className="border-t border-border2 w-full my-3.5" />

                <div className="flex justify-between">
                    <h2 className="text-base capitalize text-text3">Rating</h2>
                    <div className="flex items-center gap-2">
                        <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                        <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                        <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                        <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                        <Image src="/images/rating-star.svg" alt="star" height={16} width={16} unoptimized={true} />
                    </div>
                </div>
                <hr className="border-t border-border2 w-full my-3.5" />

                <div className="flex justify-between">
                    <h2 className="text-base capitalize text-text3">Sentiment</h2>
                    <h2 className="text-base capitalize font-medium">Positive
                    </h2>
                </div>
                <hr className="border-t border-border2 w-full my-3.5" />

                <div className="flex justify-between">
                    <h2 className="text-base capitalize text-text3">Status</h2>
                    <h2 className="text-base capitalize font-medium">Approved
                    </h2>
                </div>
                <hr className="border-t border-border2 w-full my-3.5" />

                <div className="flex justify-between">
                    <h2 className="text-base capitalize text-text3">Timestamp</h2>
                    <h2 className="text-base capitalize font-medium">Jun 18,2024 | 10:00AM
                    </h2>
                </div>
                <hr className="border-t border-border2 w-full my-3.5" />

                <div className="flex justify-between">
                    <h2 className="text-base capitalize text-text3">Review Text</h2>
                    <h2 className="text-base capitalize font-medium">Great service, highly recommend!
                    </h2>
                </div>
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-5 mt-[30px]">
                <CancelButton title="Delete" type="submit" disabled={sending} class_="text-lg!" />
                <SecondaryButton title="Manual Reply" class_="text-lg! bg-white! text-primary! hover:text-white! hover:bg-primary! disabled:bg-dark! disabled:border disabled:border-dark! disabled:text-text3! cursor-not-allowed" onClick={() => setOpen(true)} />
                <SecondaryButton title="view full log" onClick={onClose} class_="text-lg!" />
                <div>
                    <Image src="/images/component34.svg" alt="component34" width={47} height={47} />
                </div>
            </div>
        </form>
    </Model>
}

export default ReviewDetails
import Image from "next/image";
import Model from "../Models/Model";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function CancelUpcomingPayment({ onClose, id }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)


    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Cancelled Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    const Project = [
        { title: "plan", Price: "Growth Plan($99.00/Mo)" },
        { title: "due date", Price: "Apr 1, 2025" },
        { title: "payment method", Price: "Visa **** 1234" },
    ]

    return (
        <Model onClose={onClose} title="Cancel Upcoming Payment" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 flex gap-2.5 items-center bg-custom-yellow-light/10 p-2.5 rounded-lg">
                    <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                    <h2 className="text-sm font-medium capitalize">Are you sure you want to cancel the upcoming payment for your subscription?</h2>
                </div>
                <div className="mt-3">
                    {Project.map((e, i) => <div key={i}>
                        <div className="flex justify-between ">
                            <div className="text-text3 capitalize text-base">{e.title}</div>
                            <div className="font-semibold text-base">{e.Price}</div>
                        </div>
                        {i !== Project.length - 1 && (
                            <hr className="my-3 border-t border-secondary/5" />
                        )}
                    </div>)}
                </div>
                <div className="mt-4 flex gap-2.5 items-center bg-custom-yellow-light/10 p-2.5 rounded-lg">
                    <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                    <h2 className="text-sm font-medium capitalize">This Will Not Cancel Your Subscription.</h2>
                </div>

                <div className="mt-4 flex gap-2.5 items-center bg-custom-yellow-light/10 p-2.5 rounded-lg">
                    <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                    <h2 className="text-sm font-medium capitalize">You May lose Access If Payment Is Missed.</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <CancelButton title="Cancel payment" type="submit" disabled={sending} class_="text-lg!" />
                    <SecondaryButton title="keep payment" onClick={onClose} class_="text-lg!" />
                </div>
            </form>
        </Model >
    )
}
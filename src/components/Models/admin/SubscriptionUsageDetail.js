import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";

export default function SubscriptionUsageDetail({ onClose, id }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState("")

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Upgraded Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }


    return (
        <Model onClose={onClose} title="Subscription Usage Details" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="flex justify-between items-center mt-2">
                        <h2 className="text-text3 capitalize text-base">Client</h2>
                        <h3 className="text-base font-medium capitalize">ABC Corp</h3>
                    </div>

                    <hr className="border-t border-border2 w-full my-3.5" />

                    <div className="flex justify-between items-center">
                        <h2 className="text-text3 capitalize text-base">plan</h2>
                        <h3 className="text-base font-medium capitalize">basic</h3>
                    </div>

                    <hr className="border-t border-border2 w-full my-3.5" />
                    <div className="flex justify-between items-center">
                        <h2 className="text-text3 capitalize text-base">Email Quota Used</h2>
                        <h3 className="text-base font-medium capitalize">500/1,000</h3>
                    </div>

                    <hr className="border-t border-border2 w-full my-3.5" />

                    <div className="flex justify-between items-center">
                        <h2 className="text-text3 capitalize text-base">SMS Quota Used</h2>
                        <h3 className="text-base font-medium capitalize"> 50/100</h3>
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="View Details" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Upgrade Plan" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  
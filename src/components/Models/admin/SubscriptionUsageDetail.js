import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import { SubscriptionUsage } from "../../../constent/constArray";

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
                {SubscriptionUsage.map((e, i) => <div key={i}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-text3 capitalize text-base">{e.name}</h2>
                        <h3 className="text-base font-medium capitalize">{e.title}</h3>
                    </div>
                    {i !== SubscriptionUsage.length - 1 && (
                        <hr className="border-t border-border2 w-full my-3.5" />
                    )}
                </div>)}
                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="View Details" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Upgrade Plan" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  
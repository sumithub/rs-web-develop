import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import Status from "../../Status";

export default function ViewNotification({ onClose, id }) {
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

            toast.success("Deleted Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title="View Notification" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-base capitalize text-text3">Client</h2>
                            <h3 className="text-base font-medium capitalize">ABC Corp</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-base capitalize text-text3">Type</h2>
                            <h3 className="text-base font-medium capitalize">Review Alert</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-base capitalize text-text3">Urgency Level</h2>
                            <h3 className="text-base font-medium capitalize">High</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-base text-text3">status</h2>
                            <Status status="Unread" />
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-base capitalize text-text3">Timestamp</h2>
                            <h3 className="text-base font-medium capitalize">Jun 18,2024 | 10:00AM</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-base capitalize text-text3">Message</h2>
                            <h3 className="text-base font-medium capitalize">Service was slow and staff was rude.</h3>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-5 mt-7">
                    <CancelButton title="Delete" type="submit" disabled={sending} class_="text-lg!" />
                    <SecondaryButton title="Acknowledge" class_="text-lg! bg-white! border border-primary! text-primary! hover:text-white! hover:bg-primary!" />
                    <SecondaryButton title="mark as read" class_="text-lg!" onClick={onClose} />
                </div>
            </form>
        </Model>
    )
}  
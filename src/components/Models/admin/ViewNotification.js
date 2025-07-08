import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";

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
                <div className="grid grid-cols-3 gap-5 mt-7">
                    <CancelButton title="Delete" type="submit" disabled={sending} class_="text-lg!" />
                    <SecondaryButton title="Acknowledge" class_="text-lg! bg-white! border border-primary! text-primary! hover:text-white! hover:bg-primary!" />
                    <SecondaryButton title="mark as read" class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  
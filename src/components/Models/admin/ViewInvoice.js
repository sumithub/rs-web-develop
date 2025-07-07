import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";

export default function ViewInvoice({ onClose, id }) {
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

            toast.success("Downloaded Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title="View Invoice" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Send Reminder" onClick={() => {
                        onClose()
                        toast.success("Sended Successfuly")
                    }} class_="text-lg!" />
                    <SecondaryButton title="Download PDF" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  
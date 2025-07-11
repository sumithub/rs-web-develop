import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";

export default function PublishToUser({ onClose }) {
    const [sending, setSending] = useState("")

    const onSubmit = async () => {
        try {
            setSending(true)
            toast.success("Confirmed Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title="Publish To User" modalClass="w-1/2!">
            <div className="flex align-items justify-center text-xl font-semibold">
                Publish User
            </div>

            <div className="flex align-items justify-center font-normal mb-4 mt-2.5 text-sm capitalize text-text3">
                Are you sure you want to publish this user.
            </div>

            <div className="grid grid-cols-2 gap-5 mt-7">
                <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                <SecondaryButton title="Confirm" onClick={onSubmit} disabled={sending} class_="text-lg!" />
            </div>
        </Model>
    )
}  
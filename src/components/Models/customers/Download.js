import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";

export default function Download({ onClose }) {
    const [sending, setSending] = useState(false)

    const onSubmit = async () => {
        try {
            setSending(true)
            toast.success("Downloaded Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Download" modalClass="w-1/2!">
            <div className="flex align-items justify-center text-xl font-semibold">
                Download CSV
            </div>

            <div className="flex align-items justify-center font-normal mb-4 capitalize text-text3">
                Allows users to retrieve imported data.
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
                <CancelButton title="Cancel" onClick={onClose} />
                <SecondaryButton title="save" onClick={onSubmit} disabled={sending} />
            </div>
        </Model>
    )
}
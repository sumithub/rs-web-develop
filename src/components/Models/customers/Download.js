import { useForm } from "react-hook-form";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";

export default function Download({ onClose }) {
    const { handleSubmit } = useForm();
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex align-items justify-center text-xl font-semibold">
                    Download CSV
                </div>

                <div className="flex align-items justify-center font-thin mb-4">
                    Allows users to retrieve imported data.
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="save" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}
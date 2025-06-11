import { useForm } from "react-hook-form";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";

export default function AssignToUser({ onClose }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async () => {
        try {
            setSending(true)
            toast.success("Assigned Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Assign to User" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex align-items justify-center text-xl font-semibold">
                    Assign to User
                </div>

                <div className="flex align-items justify-center font-normal mb-4 capitalize text-text3">
                    Are you sure you want mark selected reviews as flagged.
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="confirm" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}
import { toast } from "react-toastify";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { getError } from "../../../../helper";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function DisconnectReviewSourceConfirmation({ onClose, onSave }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async () => {
        try {
            toast.success("Disconnected Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Disconnect Review Source Confirmation" modalClass="w-[60%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="font-semibold">
                        Disconnect from Yelp
                    </div>
                </div>

                <div>
                    <div className="border border-border-color rounded-md mt-4 bg-[#0396FF1a]">Are you sure you want to disconnect This will stop fetching new reviews </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="Confirm Disconnect" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}
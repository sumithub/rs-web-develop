import { useForm } from "react-hook-form";
import { getError } from "../../../../helper";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Status from "../../Status";
import Model from "../Model";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SuspendUser({ onClose }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async () => {
        try {
            toast.success("Suspended Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Suspend User" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="font-semibold text-lg capitalize">are you sure you want to suspend these users?</div>

                <div className="mt-6 font-semibold text-lg">
                    Selected Users (03)
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="font-medium">
                        John Doe  (Manager)
                    </div>

                    <div><Status status="Active" /></div>
                </div>

                <hr className="border border-border2 my-3" />

                <div className="flex justify-between items-center">
                    <div className="font-medium">
                        Lisa Smith  (Owner)
                    </div>

                    <div><Status status="Active" /></div>
                </div>

                <hr className="border border-border2 my-3" />

                <div className="flex justify-between items-center">
                    <div className="font-medium items-center">
                        Lisa Smith  (Manager)
                    </div>

                    <div><Status status="Active" /></div>
                </div>

                <div className="capitalize text-primary mt-6">You can reactivate suspended users later.</div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="Confirm & Suspend" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}
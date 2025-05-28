import Model from "../Model"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import Status from "../../Status"
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function SuspendUsers({ onClose, isSuspended, onStatusChange }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async () => {
        try {
            setSending(true);

            const newStatus = !isSuspended;

            await axios.put("/api", { suspended: newStatus });

            toast.success(`Users ${newStatus ? "suspended" : "reactivated"} successfully`);
            onStatusChange?.(newStatus);
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };
    return <Model title="Suspend User" onClose={onClose} modalClass="w-1/2!">
        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
            <div>
                <div className="text-secondary text-xl font-semibold capitalize">are you sure you want to suspend these users?</div>
                <div className="text-secondary text-base font-semibold mt-5">Selected Users (03)</div>

                <div>

                    <div className="flex items-center justify-between mt-5">
                        <div className="text-base font-medium text-secondary capitalize">John Doe  (manager)</div>
                        <div className="text-base text-text3 capitalize"><Status status="Active" /></div>
                    </div>
                    <hr className="border-t border-border-color mt-3" />

                    <div className="flex items-center justify-between mt-5">
                        <div className="text-base font-medium text-secondary capitalize">John Doe  (manager)</div>
                        <div className="text-base text-text3 capitalize"><Status status="Active" /></div>
                    </div>
                    <hr className="border-t border-border-color mt-3" />

                    <div className="flex items-center justify-between mt-5">
                        <div className="text-base font-medium text-secondary capitalize">John Doe  (manager)</div>
                        <div className="text-base text-text3 capitalize"><Status status="Active" /></div>
                    </div>
                    <div className="text-primary text-sm font-medium capitalize mt-8">You can reactivate suspended users later.</div>
                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <CancelButton title="Cancel" onClick={onClose} />
                        <SecondaryButton title="Confirm & Suspend" type="submit" disabled={sending} />
                    </div>
                </div>
            </div>
        </form>
    </Model>
}
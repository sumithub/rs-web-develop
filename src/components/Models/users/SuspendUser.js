import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import Model from "../Model";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import { getError } from "../../../../helper";

export default function SuspendUser({ onClose, isSuspended, onStatusChange }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async () => {
        try {
            setSending(true);

            const newStatus = !isSuspended;

            await axios.put("/api", { suspended: newStatus });

            toast.success(`User ${newStatus ? "suspended" : "reactivated"} successfully`);
            onStatusChange?.(newStatus);
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    return (
        <Model title="Suspend/Reactivate User" onClose={onClose} modalClass="w-[45%]!">
            <form onSubmit={handleSubmit(onSubmit)} className="text-center">
                <div className="text-secondary text-xl font-semibold capitalize mb-2">
                    Confirm Action
                </div>

                <div className="text-text3 capitalize">
                    Are you sure you want to {isSuspended ? "reactivate" : "suspend"} this user?
                    <br />
                    This will {isSuspended ? "grant" : "restrict"} access immediately.
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="Confirm" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    );
}

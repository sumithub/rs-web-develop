import Model from "../Model";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";

export default function SendInvite({ onClose }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async () => {
        try {
            setSending(true);
            await axios.put("/api");
            toast.success("Send Invite Successfully");
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };
    return <Model title="Send Invite" onClose={onClose} modalClass="w-[45%]!">
        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
            <div className="text-secondary text-xl font-semibold capitalize text-center">the invited user receives an email to verify their address and create a password.</div>

            <div className="grid grid-cols-2 gap-3 mt-6">
                <CancelButton title="Cancel" onClick={onClose} />
                <SecondaryButton title="ok" type="submit" disabled={sending}/>
            </div>
        </form>
    </Model>
}
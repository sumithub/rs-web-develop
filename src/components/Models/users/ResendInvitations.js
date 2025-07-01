import Image from "next/image";
import Model from "../Model";
import Status from "../../Status";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

export default function ResendInvitations({ onClose }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async (data) => {
        try {
            setSending(true);
            await axios.post("/api", data);
            toast.success("Invitations resent successfully");
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    const resendInvitations = [
        { name: "john deo", email: "johan@exmaple.com", detail: "Pending Invite" },
        { name: "john deo", email: "johan@exmaple.com", detail: "Pending Invite" },
        { name: "john deo", email: "johan@exmaple.com", detail: "Pending Invite" },
    ]

    const removedUsers = [
        { name: "Kadin Vetrovs", email: "kadinvetrovs @exmaple.com", status: "Active" },
        { name: "Kadin Vetrovs", email: "kadinvetrovs @exmaple.com", status: "Active" },
    ]


    return <Model title="Resend Invitations" onClose={onClose} modalClass="w-1/2!">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="text-secondary text-xl font-semibold capitalize">The following users will receive a new invite email.</div>
                {resendInvitations.map((e, i) => <div key={i}>
                    <div className="flex items-center justify-between mt-5">
                        <div className="text-base font-medium text-secondary">{e.name} ({e.email})</div>
                        <div className="text-base text-text3 capitalize">{e.detail}</div>
                    </div>
                    {i !== resendInvitations.length - 1 && (
                        <hr className="mt-3 border-t border-border-color" />
                    )}
                </div>)}

                <div>
                    <div className="flex items-center gap-2 my-5">
                        <Image unoptimized={true} src="/images/warning.svg" alt="warning" height={22} width={22} />
                        <div className="text-danger text-lg font-semibold capitalize">The following users were removed because they are active:</div>
                    </div>

                    {removedUsers.map((e, i) => <div key={i}>
                        <div className="flex items-center justify-between mt-5">
                            <div className="text-base font-medium text-secondary">{e.name} ({e.email} )</div>
                            <div className="text-base text-text3 capitalize"><Status status={e.status} /></div>
                        </div>
                        {i !== removedUsers.length - 1 && (
                            <hr className="mt-3 border-t border-border-color" />
                        )}
                    </div>)}

                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <CancelButton title="Cancel" onClick={onClose} />
                        <SecondaryButton title="Confirm & resend" type="submit" disabled={sending} />
                    </div>
                </div>
            </div>
        </form>
    </Model>
}
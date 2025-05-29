import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Model from "../Model";
import InputForm from "../../form/InputForm";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { getError, validEmailRgx } from "../../../../helper";

export default function ResendInvitation({ onClose, user }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [sending, setSending] = useState(false);

    const onSubmit = async (data) => {
        try {
            setSending(true);
            await axios.post("/api", data);
            toast.success("Invitation resent successfully");
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    return (
        <Model title="Resend Invite Confirmation" onClose={onClose} modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-secondary text-xl font-semibold capitalize">
                    Are you sure you want to resend the invite to
                </div>

                <InputForm
                    label={user?.name || "User"}
                    placeholder="Enter email"
                    isRequired={true}
                    class_="mt-4!"
                    formProps={{
                        ...register("email", {
                            required: true,
                            pattern: {
                                value: validEmailRgx,
                                message: "Email is invalid."
                            },
                        }),
                    }}
                    errors={errors}
                />

                <div className="text-secondary text-xl font-semibold capitalize mt-4">
                    A new invitation email will be sent.
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="Resend Invite" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    );
}

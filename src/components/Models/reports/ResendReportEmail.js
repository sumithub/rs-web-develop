"use client"
import Image from "next/image";
import Model from "../Model";
import Radio from "../../form/Radio";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import InputForm from "../../form/InputForm";

export default function ResendReportEmail({ onClose, id, onSave }) {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Report Sended Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Resend Report Email" modalClass="w-[60%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-[_1fr_auto]">
                    <div className="font-thin">
                        Report
                    </div>

                    <div >
                        Monthly Review Report
                    </div>
                </div>
                <hr className="border-t border-border-color mt-3" />

                <div className="grid grid-cols-[_1fr_auto] mt-3">
                    <div className="font-thin">
                        Client (Optional)
                    </div>

                    <div>
                        ABC Corp
                    </div>
                </div>
                <hr className="border-t border-border-color mt-3" />

                <div className="grid grid-cols-[_1fr_auto] mt-3">
                    <div className="font-thin">
                        Report Date
                    </div>

                    <div>
                        Feb 28, 2025
                    </div>
                </div>
                <hr className="border-t border-border-color mt-3" />

                <div className="grid grid-cols-[_1fr_auto] mt-3">
                    <div className="font-thin">
                        Email (Optional)
                    </div>

                    <div>
                        john@email.com
                    </div>
                </div>

                <div className="flex gap-3 mt-3">
                    <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                    <div>
                        Failed to Deliver (Lisa)
                    </div>
                </div>

                <div className="mt-3">
                    <div>
                        Resend to Existing Recipients?
                    </div>

                    <div className="flex gap-3">
                        <Radio label="Yes" />
                        <Radio label="No" />
                    </div>
                </div>

                <div className="grid grid-cols-[_1fr_auto] gap-3 mt-3">
                    <InputForm
                        label="Add Additional Recipients"
                        class_="mt-0! w-full!"
                        icon="/images/copy2.svg"
                        formProps={{ ...register("addAdditionalRecipients", { required: false }) }}
                        errors={errors}
                    />

                    <div className="mt-6.5">
                        <SecondaryButton title="Add" onClick={onSave} />
                    </div>
                </div>

                <div className="mt-3">
                    <InputForm
                        label="Add Custom Message"
                        class_="mt-0! w-full!"
                        isTextArea={true}
                        formProps={{ ...register("addCustomMessage", { required: false }) }}
                        errors={errors}
                        placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="Send Report Again" type="submit" disabled={sending} />
                </div>
            </form>
        </Model >
    )
}
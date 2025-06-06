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
        <Model onClose={onClose} title="Resend Report Email" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between">
                    <h2 className="text-base text-text3">Report</h2>
                    <h2 className="text-base font-medium">Monthly Review Report</h2>
                </div>
                <hr className="border-t border-secondary/5 my-3.5" />
                <div className="flex justify-between">
                    <h2 className="text-base text-text3">Client (Optional)</h2>
                    <h2 className="text-base font-medium">ABC Corp</h2>
                </div>
                <hr className="border-t border-secondary/5 my-3.5" />
                <div className="flex justify-between">
                    <h2 className="text-base text-text3">Report Date</h2>
                    <h2 className="text-base font-medium">Feb 28, 2025</h2>
                </div>
                <hr className="border-t border-secondary/5 my-3.5" />
                <div className="flex justify-between">
                    <h2 className="text-base text-text3">Email (Optional)</h2>
                    <h2 className="text-base font-medium">john@email.com</h2>
                </div>
                <div className="flex items-center gap-2.5 mt-3.5">
                    <Image unoptimized={true} src="/images/warning.svg" alt="warning" height={22} width={22} />
                    <h2 className="text-sm font-medium">Failed to Deliver (Lisa)</h2>
                </div>
                <div className="mt-3.5">
                    <h2 className="text-sm">Resend to Existing Recipients?</h2>
                    <div className="flex gap-5 pt-5">
                        <Radio label="Yes" class_="mt-0!" />
                        <Radio label="No" class_="mt-0!" />
                    </div>
                </div>

                <div className="flex items-end gap-3.5 pt-3.5">
                    <div className="w-full">
                        <h2 className="text-sm pb-2.5 font-medium">Add Additional Recipients<span className="font-normal text-text3">(Optional)</span></h2>
                        <div className="w-full border border-primary/10 rounded-lg p-2.5 flex justify-between items-center">
                            <div className="flex gap-[15px]">
                                <div className="flex gap-[7px] border border-primary/10 rounded-lg p-[5px] items-center">
                                    <Image src="/images/request.png" alt="request" width={17} height={17} />
                                    <h2 className="text-sm">Richard</h2>
                                    <Image unoptimized={true} src="/images/close-square.svg" alt="close-square" width={14} height={14} />
                                </div>
                                <div className="flex gap-[7px] border border-primary/10 rounded-lg p-[5px] items-center">
                                    <Image src="/images/request.png" alt="request" width={17} height={17} />
                                    <h2 className="text-sm">Sophia</h2>
                                    <Image unoptimized={true} src="/images/close-square.svg" alt="close-square" width={14} height={14} />
                                </div>
                            </div>
                            <div>
                                <Image unoptimized={true} src="/images/copy2.svg" alt="copy2" width={20} height={20} />
                            </div>
                        </div>
                    </div>
                    <div className="w-[20%] shrink-0">
                        <SecondaryButton title="Add" onClick={onSave}
                            class_="py-4! px-2.5! text-sm font-normal!"
                        />
                    </div>
                </div>

                <div className="mt-3">
                    <InputForm
                        label="Add Custom Message"
                        class_="mt-0! w-full!"
                        isTextArea={true} inputClass="mt-2.5"
                        formProps={{ ...register("addCustomMessage", { required: false }) }}
                        errors={errors}
                        rows={5}
                        placeholder="Add Custom Message"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg! py-3! font-normal!" />
                    <SecondaryButton title="Send Report Again" type="submit" disabled={sending} class_="text-lg! py-3! font-normal!" />
                </div>
            </form>
        </Model >
    )
}
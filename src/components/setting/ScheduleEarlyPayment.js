import Image from "next/image";
import Model from "../Models/Model";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputForm from "../form/InputForm";

export default function ScheduleEarlyPayment({ onClose, id }) {
    const { handleSubmit, register, formState: { errors } } = useForm();
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

            toast.success("Paid Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title="Schedule Early Payment" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 flex gap-2.5 items-center">
                    <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                    <h2 className="text-sm font-medium capitalize"> pay now to avoid automatic charge</h2>
                </div>

                <div className="flex justify-between mt-3">
                    <div className="text-text3 capitalize text-base">plan</div>
                    <div className="font-semibold">Growth Plan($99.00/Mo)</div>
                </div>

                <hr className="border border-border2 my-3" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize text-base">scheduled date</div>
                    <div className="font-semibold">Apr 1, 2025</div>
                </div>

                <hr className="border border-border2 my-3" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize text-base">payment method</div>
                    <div className="font-semibold">Visa **** 1234</div>
                </div>

                <hr className="border border-border2 my-3" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize text-base">cardholder name</div>
                    <div className="font-semibold">John Deo</div>
                </div>

                <InputForm
                    label="Choose New Payment Date"
                    isRequired={true}
                    inputType="date"
                    formProps={{ ...register("date", { required: true }) }}
                    errors={errors}
                    placeholder="" />

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <CancelButton title="schedule for later" onClick={() => {
                        toast.success("Scheduled Successfully")
                        onClose()
                    }} />
                    <SecondaryButton title="pay now" type="submit" disabled={sending} />
                </div>
            </form>
        </Model >
    )
}
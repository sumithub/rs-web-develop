import Image from "next/image";
import Model from "../Models/Model";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePickerForm from "../form/DatePickerForm";

export default function ScheduleEarlyPayment({ onClose, id }) {
    const { handleSubmit, register, clearErrors, watch, setValue, formState: { errors } } = useForm();
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

    const Early = [
        { title: "plan", price: "growth plan ($99.00)" },
        { title: "scheduled date", price: "Apr 01, 2025" },
        { title: "payment method", price: "Visa **** 1234" },
        { title: "cardholder name", price: "john deo" },
    ]

    return (
        <Model onClose={onClose} title="Schedule Early Payment" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 flex gap-2.5 items-center bg-custom-yellow-light/10 p-2.5 rounded-lg">
                    <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                    <h2 className="text-sm font-medium capitalize"> pay now to avoid automatic charge</h2>
                </div>
                <div className="mt-4">
                    {Early.map((e, i) =>
                        <div key={i}>
                            <div className="flex w-full justify-between mt-3">
                                <div className="text-text3 capitalize text-base">{e.title}</div>
                                <div className="font-semibold capitalize">{e.price}</div>
                            </div>
                            {i !== Early.length - 1 && (
                                <hr className="my-3 border-t border-secondary/5" />
                            )
                            }</div>)}
                </div>

                <DatePickerForm
                    label="Choose New Payment Date"
                    labelClass="font-medium"
                    isRequired={true}
                    icon={true}
                    formProps={{ ...register("date", { required: true }) }}
                    mainClass="border-primary/10!"
                    errors={errors} clearErrors={clearErrors} setValue={setValue} watch={watch}
                />

                <div className="grid grid-cols-2 gap-4 mt-7">
                    <CancelButton title="schedule for later" class_="text-lg!" onClick={() => {
                        toast.success("Scheduled Successfully")
                        onClose()
                    }} />
                    <SecondaryButton title="pay now" type="submit" class_="text-lg!" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}
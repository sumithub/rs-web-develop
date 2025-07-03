import { useState } from "react";
import InputForm from "../form/InputForm";
import { useForm } from "react-hook-form";
import SelectForm from "../form/SelectForm";
import Model from "../Models/Model";
import { toast } from "react-toastify";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import { getError } from "../../../helper";
import axios from "axios";
import Image from "next/image";
import SubscriptionCancelled from "./SubscriptionCancelled";


export default function CancelSubscription({ onClose, id }) {
    const { register, handleSubmit, setValue, watch, formState: { errors }, clearErrors, getValues, trigger } = useForm({
        mode: 'onChange',
        defaultValues: {
            select: "",
        }
    });
    const [sending, setSending] = useState(false)
    const [openCancelled, setOpenCancelled] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success(" Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    const Project = [
        { title: "Current Plan", price: "Growth Plan ($99.00/Mo)" },
        { title: "Nect Renewal Date", price: "Jan 25, 2025" },
        { title: "Auto Renew", price: "Enabled" },
    ]

    const handleCancelClick = async (e) => {
        e.preventDefault()

        // Get current form values
        const values = getValues()

        // Manual validation check
        let hasErrors = false
        const newErrors = {}

        if (!values.select || values.select.trim() === '') {
            hasErrors = true
        }

        if (hasErrors) {
            // Trigger validation to show errors
            await trigger(['select'])
            // toast.error("Please fill all required fields correctly")
            return
        }

        // All fields are valid, clear errors and open modal
        clearErrors()
        setOpenCancelled(true)
    }

    return (
        <Model onClose={onClose} title="Cancel Subscription" modalClass="w-[70%]!">

            {openCancelled &&
                <SubscriptionCancelled
                    onClose={() => {
                        setOpenCancelled(false)
                        onClose()
                    }} />
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 flex gap-2.5 p-2.5 items-center bg-custom-yellow-light/10 rounded-lg">
                    <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                    <h2 className="text-sm font-medium capitalize">Are you sure you want to cancel your subscription? You will still have access until the end of the current billing period. </h2>
                </div>

                <div className="mt-5">
                    {Project.map((e, i) => <div key={i}>
                        <div className="flex justify-between mt-3">
                            <div className="text-text3">{e.title}</div>
                            <div className="font-medium">{e.price}</div>
                        </div>
                        {i !== Project.length - 1 && (
                            <hr className="mt-3 border-t border-secondary/5" />
                        )}
                    </div>)}
                    <div className="font-semibold text-xl mt-5">
                        Select A Reason
                    </div>

                    <SelectForm label=""
                        class_="mt-2.5!"
                        selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                        defaultOption="select"
                        formProps={{ ...register("select", { required: true }) }}
                        errors={errors}
                        clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="tooExpensive">Too Expensive</option>
                        <option value="noLongerNeeded">No Longer Needed</option>
                        <option value="switchingToAnotherProvider">Switching to Another Provider</option>
                        <option value="notGettingEnoughValue">Not Getting Enough Value</option>
                        <option value="other">Other (Please specify)</option>
                    </SelectForm>

                    <InputForm
                        label="Additional Comments"
                        class_="mt-5! w-full!"
                        isTextArea={true} inputClass="mt-2.5"
                        formProps={{ ...register("additional", { required: false }) }}
                        errors={errors}
                        rows={5}
                        placeholder="XYZ.."
                    />

                    <div className="font-semibold mt-5">
                        Wait! Get 20% Off For 3 Months Instead Of Canceling, Enjoy A 20% Discount For The Next 3 Billing Cycles.
                    </div>

                    <div className="grid grid-cols-4 gap-5 mt-7">
                        <CancelButton title="Cancel Subscription" type="button"
                            disabled={sending}
                            onClick={handleCancelClick} class_="text-danger! bg-danger/10!" />
                        <SecondaryButton title="Switch To A Lower Plan" onClick={() => {
                            toast.success("Switched Successfully")
                            onClose()
                        }} class_="bg-white! hover:bg-primary! text-primary! hover:text-white!" />
                        <SecondaryButton title="Apply 20% Discount" class_="bg-white! hover:bg-primary! text-primary! hover:text-white!" onClick={() => {
                            toast.success("Applied Successfully")
                            onClose()
                        }} />
                        <SecondaryButton title="keep subscription" onClick={onClose} />
                    </div>
                </div>
            </form>
        </Model >
    )
}
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


export default function UpgradePlan({ onClose, id }) {
    const { register, setValue, handleSubmit, clearErrors, formState: { errors }, watch } = useForm();
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

            toast.success("Upgraded Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Upgrade Plan" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    label="Current Plan"
                    placeholder="Enter plan"
                    inputClass="border-primary/10"
                    isRequired={true}
                    formProps={{ ...register("plan", { required: true }) }}
                    errors={errors}
                    setValue={setValue}
                />

                <SelectForm label="Available Plans"
                    selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                    isRequired={true}
                    defaultOption="select"
                    formProps={{ ...register("availablePlan", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors} setValue={setValue} watch={watch}>
                    <option value="plan">Enterprise Plan</option>
                </SelectForm>

                <div className="mt-3">
                    <div className="font-semibold text-xl">Price Comparison</div>

                    <div className="flex justify-between mt-3">
                        <div>Sub Total</div>
                        <div className="font-semibold">$900</div>
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="flex justify-between">
                        <div>GST</div>
                        <div className="font-semibold">$50</div>
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="flex justify-between">
                        <div>Discount</div>
                        <div className="font-semibold">$50</div>
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="flex justify-between">
                        <div className="font-semibold text-xl">Total</div>
                        <div className="font-semibold text-xl">$950</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Upgrade Now" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}
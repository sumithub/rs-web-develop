import { useState, useEffect } from "react";
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

    // Set default values after component mounts
    useEffect(() => {
        setValue("currentPlan", "Enterprise Plan");
        setValue("availablePlan", "professional-plan");
    }, [setValue]);

    // Watch the selected plan
    const selectedPlan = watch("availablePlan");

    // Dynamic pricing based on selected plan
    const getPriceComparison = () => {
        switch (selectedPlan) {
            case "basic-plan":
                return [
                    { title: "Sub Total", price: "$300" },
                    { title: "GST", price: "$30" },
                    { title: "Discount", price: "$0" },
                ];
            case "professional-plan":
                return [
                    { title: "Sub Total", price: "$600" },
                    { title: "GST", price: "$60" },
                    { title: "Discount", price: "$30" },
                ];
            case "enterprise-plan":
                return [
                    { title: "Sub Total", price: "$900" },
                    { title: "GST", price: "$50" },
                    { title: "Discount", price: "$50" },
                ];
            default:
                return [
                    { title: "Sub Total", price: "$0" },
                    { title: "GST", price: "$0" },
                    { title: "Discount", price: "$0" },
                ];
        }
    };

    // Calculate total
    const getTotal = () => {
        switch (selectedPlan) {
            case "basic-plan":
                return "$330";
            case "professional-plan":
                return "$630";
            case "enterprise-plan":
                return "$950";
            default:
                return "$0";
        }
    };

    const PriceComparison = getPriceComparison();

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
                    class_="mt-0!" inputClass="py-3.5!"
                    label="Current Plan"
                    placeholder="Enter plan"
                    isRequired={true}
                    formProps={{
                        ...register("currentPlan", { required: true }),
                        readOnly: true
                    }}
                    errors={errors}
                    setValue={setValue}
                    disabled={true}
                />

                <SelectForm label="Available Plans"
                    selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                    isRequired={true}
                    formProps={{ ...register("availablePlan", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors} setValue={setValue} watch={watch}>
                    <option value="basic-plan">Basic Plan</option>
                    <option value="professional-plan">Professional Plan</option>
                    <option value="enterprise-plan">Enterprise Plan</option>
                </SelectForm>

                <div className="mt-5">
                    <div className="font-semibold text-xl">Price Comparison</div>

                    {PriceComparison.map((e, i) => <div key={i}>
                        <div className="flex justify-between mt-3">
                            <div>{e.title}</div>
                            <div className="font-semibold">{e.price}</div>
                        </div>

                        <hr className="border border-secondary/5 my-3" />
                    </div>)}

                    <div className="flex justify-between">
                        <div className="font-bold text-xl">Total</div>
                        <div className="font-bold text-xl">{getTotal()}</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Upgrade Now" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}
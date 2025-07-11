import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import SelectForm from "../../form/SelectForm";
import InputForm from "../../form/InputForm";
import CancelButton from "../../common/CancelButton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import SelectClientList from "../../Models/admin/SelectClientList"

export default function NewSubscription({ onClose, id }) {
    const { register, handleSubmit, setValue, formState: { errors }, watch, clearErrors } = useForm();
    const [sending, setSending] = useState("")
    const [openClient, setOpenClient] = useState(false)

    useEffect(() => {
        setValue("currentPlan", "Basic")
    }, [setValue])

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success(!id ? "Subscribed Successfully" : "Upgraded Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title={!id ? "New Subscription" : "Upgrade Plan"} modalClass="w-1/2!">
            {openClient &&
                <SelectClientList
                    onClose={() => {
                        setOpenClient(false)
                    }}

                    onSave={() => {
                        setOpenClient(true)
                    }} />
            }
            <form onSubmit={handleSubmit(onSubmit)}>

                {!id && <SelectForm
                    label="Client"
                    labelClass="mb-2.5!"
                    class_="mt-0!"
                    isRequired={true}
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("client", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="abcCorp">ABC Corp</option>
                </SelectForm>}


                {id && <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Current Plan"
                    labelClass="mb-2.5!"
                    class_="mt-0!"
                    isRequired={true}
                    disabled={true}
                    placeholder=""
                    formProps={{ ...register("currentPlan", { required: true }) }}
                    errors={errors}
                />}


                <SelectForm
                    label={!id ? "Plan" : "New Plan"}
                    labelClass="mb-2.5!"
                    isRequired={true}
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("plan", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                </SelectForm>


                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    labelClass="mb-2.5!"
                    label={`${!id ? "Start" : "Effective"} Date `}
                    isRequired={true}
                    inputType="date"
                    placeholder="Enter price"
                    formProps={{ ...register("price", { required: true }) }}
                    errors={errors}
                />

                {!id && <SelectForm
                    label="Payment Method"
                    labelClass="mb-2.5!"
                    isRequired={true}
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("paymentMethod", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="payPal">Pay Pal</option>
                </SelectForm>}

                {id && <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Prorated Billing"
                    labelClass="mb-2.5!"
                    isRequired={true}
                    placeholder="Enter bill"
                    formProps={{ ...register("proratedBilling", { required: true }) }}
                    errors={errors}
                />}

                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title={!id ? "Subscribe" : "Upgrade"} type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  
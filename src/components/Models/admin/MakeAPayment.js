import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import InputForm from "../../form/InputForm";
import SelectForm from "../../form/SelectForm";

export default function MakeAPayment({ onClose, id }) {
    const { handleSubmit, register, formState: { errors }, clearErrors, setValue, watch } = useForm();
    const [sending, setSending] = useState("")

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
        <Model onClose={onClose} title="Make A Payment" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    class_="mt-0!"
                    label="Client"
                    labelClass="mb-2.5!"
                    rows={5}
                    isRequired={true}
                    placeholder="Enter client"
                    formProps={{ ...register("client", { required: true }) }}
                    errors={errors}
                />

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Invoice"
                    labelClass="mb-2.5!"
                    rows={5}
                    isRequired={true}
                    placeholder="Enter invoice"
                    formProps={{ ...register("invoice", { required: true }) }}
                    errors={errors}
                />

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Amount Due"
                    labelClass="mb-2.5!"
                    rows={5}
                    isRequired={true}
                    placeholder="Enter amount"
                    formProps={{ ...register("amount", { required: true }) }}
                    errors={errors}
                    icon2="/images/calendar1.svg"
                />

                <SelectForm
                    label="Payment Method"
                    labelClass="mb-2.5!"
                    isRequired={true}
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("paymentMethod", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="payPal">Pay Pal</option>
                </SelectForm>

                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Pay Now" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  
import { useState } from "react";
import InputForm from "../form/InputForm";
import { useForm } from "react-hook-form";
import Model from "../Models/Model";
import { toast } from "react-toastify";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import { getError } from "../../../helper";
import axios from "axios";
import RadioForm from "../form/RadioForm";

export default function UpdatePaymentMethod({ onClose, id }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
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

            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    const Project = [
        { title: "card number", price: "4242 4242 4242 4242" },
        { title: "expiry date", price: "Apr 1, 2025" },
        { title: "CVV", price: "***" },
        { title: "cardholder name", price: "John Deo" },
        { title: "billing address", price: "XYZ.." },
    ]
    return (
        <Model onClose={onClose} title={id === "update" ? "Update Payment Method" : "Current Payment Method"} modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>

                <InputForm
                    label="Card Number"
                    class_="mt-3! w-full!"
                    inputType="number"
                    isRequired={true} inputClass="mt-2.5"
                    formProps={{ ...register("additional", { required: true }) }}
                    errors={errors}
                    rows={5}
                    placeholder="Enter card number"
                />

                <div className="flex justify-between items-center">
                    <div>
                        <div className="font-medium mt-4">
                            Select Payment Method
                        </div>

                        <div className="flex gap-2">
                            <RadioForm label="Credit Card" inputClass='mb-2!'
                                name="paymentMethod"
                                value="credit"
                                formProps={{ ...register("paymentMethod", { required: false }) }}
                                errors={errors} />
                            <RadioForm label="Bank Transfer" inputClass='mb-2!'
                                name="paymentMethod"
                                value="bank"
                                formProps={{ ...register("paymentMethod", { required: false }) }}
                                errors={errors} />
                        </div>
                    </div>

                    <div className="mt-2">
                        <SecondaryButton title="add new payment method" type="button" />
                    </div>
                </div>
                {Project.map((e, i) =>
                    <div key={i}>
                        <div className="flex justify-between mt-3">
                            <div className="text-text3 capitalize text-base">{e.title}</div>
                            <div className="font-semibold">{e.price}</div>
                        </div>

                        {i !== Project.length - 1 && (
                            <hr className="my-3 border-t border-border-color" />
                        )}
                    </div>)}



                <div className="grid grid-cols-2 gap-4 mt-6">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Save Payment Method" type="submit" class_="text-lg!" disabled={sending} />
                </div>
            </form>
        </Model >
    )
}
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
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [sending, setSending] = useState(false)

    const formatCardNumber = (value) => {
        // Remove all non-digits
        const digitsOnly = value.replace(/\D/g, '');

        // Limit to 16 digits
        const limitedDigits = digitsOnly.substring(0, 16);

        // Add spaces every 4 digits
        const formatted = limitedDigits.replace(/(\d{4})(?=\d)/g, '$1 ');

        return formatted;
    };

    // Improved handler for input change
    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        e.target.value = formatted;
        // Update the form value to ensure react-hook-form tracks it
        setValue('cardNumber', formatted);
    };

    const onSubmit = async (data) => {
        try {
            setSending(true)
            // Remove spaces from card number before sending to API
            const cleanCardNumber = data.cardNumber.replace(/\s/g, '');
            const submitData = { ...data, cardNumber: cleanCardNumber };

            let res = null

            if (id !== "add") {
                res = await axios.put("/api", submitData)
            } else {
                res = await axios.post("/api", submitData)
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
        { title: "card number", detail: "4242 4242 4242 4242" },
        { title: "expiry date", detail: "Apr 1, 2025" },
        { title: "CVV", detail: "***" },
        { title: "cardholder name", detail: "John Deo" },
        { title: "billing address", detail: "XYZ.." },
    ]

    return (
        <Model onClose={onClose} title={id === "update" ? "Update Payment Method" : "Current Payment Method"} modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>

                <InputForm
                    label="Card Number"
                    class_="mt-3! w-full!"
                    inputType="text"
                    isRequired={true}
                    inputClass="mt-2.5"
                    formProps={{
                        ...register("cardNumber", {
                            required: "Card number is required",
                            validate: (value) => {
                                const digitsOnly = value.replace(/\s/g, '');
                                if (digitsOnly.length !== 16) {
                                    return "Please enter a valid 16-digit card number";
                                }
                                // Basic Luhn algorithm check (optional)
                                return true;
                            }
                        }),
                        onChange: handleCardNumberChange,
                        maxLength: 19 // 16 digits + 3 spaces
                    }}
                    errors={errors}
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
                            <div className="font-semibold">{e.detail}</div>
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
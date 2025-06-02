"use client"
import { toast } from "react-toastify"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import RadioForm from "../../form/RadioForm"
import SelectForm from "../../form/SelectForm"
import Model from "../Model"
import { getError } from "../../../../helper"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import PhoneForm from "../../form/PhoneForm"
import Image from "next/image"

function AddCustomer({ onClose, id }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors }, } = useForm();
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

            toast.success("Customer Added Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return <Model onClose={onClose} title="Add new Customer" modalClass="w-[65%]!">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="flex gap-4 items-center">
                    <button type="button"><Image src="/images/arrow-box.svg" alt="arrow" height={30} width={30} unoptimized={true} /></button>

                    <RadioForm
                        label="manually"
                        class_="mt-0!"

                    />
                    <RadioForm label="import"
                        class_="mt-0!"

                    />
                </div>

                <div>
                    <InputForm label="Customer Name" placeholder="Enter your name" isRequired={true}
                        formProps={{ ...register("customerName", { required: true }) }}
                        errors={errors} />

                    <InputForm label="Email" placeholder="Enter email" isRequired={true}
                        formProps={{ ...register("email", { required: true }) }}
                        errors={errors} />

                    <PhoneForm label="Primary Phone"
                        placeholder="Enter phone number"
                        isRequired={true}
                        formProps={{ ...register("phone", { required: true }) }}
                        errors={errors}
                        clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch} />

                    <SelectForm label="Tag" isRequired={false} selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                        formProps={{ ...register("tag", { required: false }) }} errors={errors} clearErrors={clearErrors}>
                        <option value="high value">High Value</option>
                        <option value="loyal">Loyal</option>
                        <option value="instead of source">instead of source</option>
                    </SelectForm>
                </div>

                {/* <div className="mt-8">
                    <ImportCustomer />
                </div> */}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" onClick={onClose} />
                <SecondaryButton title=" Apply Changes" type="submit" disabled={sending} />
            </div>
        </form>
    </Model>

}

export default AddCustomer
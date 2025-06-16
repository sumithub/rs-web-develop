"use client"
import { toast } from "react-toastify"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import Model from "../Model"
import { getError } from "../../../../helper"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import PhoneForm from "../../form/PhoneForm"

function AddNewLocation({ onClose, id, onSave, type = "addNewLocation" }) {
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
            if (onSave) {
                onSave(data)
            }
            { type === "addNewLocation" ? toast.success("Location Added Successfully") : toast.success("Edited Successfully") }
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return <Model onClose={onClose} title={type === "addNewLocation" ? "Add New Location (Client)" : "Edit Location (Client)"} modalClass="w-1/2!" >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                        <div>
                            <InputForm label="Name" placeholder="Enter your name" isRequired={true}
                                formProps={{ ...register("name", { required: true }) }}
                                errors={errors} />

                            <InputForm label="Address" placeholder="Enter your address" isRequired={false}
                                formProps={{ ...register("address", { required: false, }) }}
                                errors={errors} />

                            <InputForm label="City" placeholder="Enter your city" isRequired={false}
                                formProps={{ ...register("city", { required: false, }) }}
                                errors={errors} />

                            <InputForm label="State" placeholder="Enter your state" isRequired={false}
                                formProps={{ ...register("state", { required: false, }) }}
                                errors={errors} />

                            <InputForm label="Country" placeholder="Enter your country name" isRequired={false}
                                formProps={{ ...register("country", { required: false, }) }}
                                errors={errors} />

                            <InputForm label="Postal Code" placeholder="" isRequired={false}
                                formProps={{ ...register("postalCode", { required: false, }) }}
                                errors={errors} />

                            <PhoneForm label="Phone Number"
                                placeholder="Enter phone number"
                                isRequired={false}
                                formProps={{ ...register("phoneNumber", { required: false }) }}
                                errors={errors}
                                clearErrors={clearErrors}
                                setValue={setValue}
                                watch={watch} />
                        </div>
            </div>
                
            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                <SecondaryButton title={type === "addNewLocation" ? "Save Location" : "Update Location"} type="submit" disabled={sending} class_="text-lg!" />
            </div>
        </form>
    </Model>
}

export default AddNewLocation
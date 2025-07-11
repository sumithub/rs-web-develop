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
import SelectForm from "../../form/SelectForm"

function AddNewLocation({ onClose, id, onSave, type, showOnlyEdit }) {
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
            { !type && (!id ? toast.success("Location Added Successfully") : toast.success("Edited Successfully")) }
            { type && toast.success("Saved Successfully") }
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return <Model onClose={onClose} title={`${!id ? "Add New" : "Edit"} ${(showOnlyEdit && id) ? "" : "Location"} ${!type ? "(Client)" : ""}`} modalClass="w-1/2!" >
        {/* <Model onClose={onClose} title={(!id ? "Add New Location" : "Edit Location") + (id ? " (Client)" : "")} modalClass="w-1/2!" > */}

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    {type && <SelectForm
                        label="Client"
                        isRequired={true}
                        class_="mt-0!"
                        selectClass_="bg-white! py-[13.6px]! focus:border-primary/60! border-primary/10!"
                        formProps={{ ...register("client", { required: true }) }}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}>
                        <option value="client">Client A</option>
                        <option value="client">Client B</option>
                        <option value="client">Client C</option>
                        <option value="client">Client D</option>
                    </SelectForm>}

                    <InputForm label="Name"
                        placeholder="Enter your name"
                        isRequired={true}
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

            <div className="grid grid-cols-2 gap-5 mt-[30px]">
                <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                <SecondaryButton title={(!id || showOnlyEdit) ? "Save Location" : "Update Location"} type="submit" disabled={sending} class_="text-lg!" />
            </div>
        </form>
    </Model>
}

export default AddNewLocation
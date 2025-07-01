"use client"
import { useState } from "react"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import SelectForm from "../../form/SelectForm"
import Model from "../Model"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { getError } from "../../../../helper"
import CheckboxForm from "../../form/CheckboxForm"

function EditNotificationPreferences({ onClose, id }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors } } = useForm();
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

            toast.success("Edited Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return <Model onClose={onClose} title="Edit Notification Preference" modalClass="w-1/2!">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <InputForm
                    class_="mt-0!"
                    inputClass="py-3.5!"
                    placeholder="CR-001"
                    label="Edit Notification Preference"
                    isRequired={false}
                    errors={errors}
                    disabled={true}
                    formProps={{
                        ...register("condition", {
                            required: false,
                        })
                    }}
                />

                <SelectForm label="Preference Type"
                    selectClass_="py-3.5! px-2.5! border-primary/10!"
                    isRequired={true}
                    formProps={{ ...register("preferenceType", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors} setValue={setValue} watch={watch}>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="alert">Alert</option>
                </SelectForm>

                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        formProps={{ ...register("enabled") }} errors={errors} />
                    <div>
                        Enabled
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                <SecondaryButton title="Save" type="submit" disabled={sending} class_="text-lg!" />
            </div>
        </form>
    </Model>
}

export default EditNotificationPreferences
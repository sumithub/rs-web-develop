"use client"
import { toast } from "react-toastify"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import Model from "../Model"
import { getError, validEmailRgx } from "../../../../helper"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import SelectForm from "../../form/SelectForm"

function EditRole({ onClose, onSave }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if ("add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }
            if (onSave) {
                onSave(data)
            }
            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return <Model onClose={onClose} title="Edit Role" modalClass="w-1/2!" >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <SelectForm
                        label="Role Name"
                        class_="mt-0!"
                        selectClass_="py-3.5! px-2.5!"
                        isRequired={true}
                        formProps={{ ...register("role", { required: true }) }}
                        errors={errors} clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="admin">Admin</option>
                        <option value="owner">Owner</option>
                        <option value="manager">Manager</option>
                        <option value="guest">Guest</option>
                    </SelectForm>

                    <SelectForm
                        label="Permissions"
                        selectClass_="py-3.5! px-2.5!"
                        isRequired={true}
                        formProps={{ ...register("permissions", { required: true }) }}
                        errors={errors} clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="permissions1">Permissions-1</option>
                        <option value="permissions2">Permissions-2</option>
                        <option value="permissions3">Permissions-3</option>
                        <option value="permissions4">Permissions-4</option>
                    </SelectForm>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-[30px]">
                <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                <SecondaryButton title="save" type="submit" disabled={sending} class_="text-lg!" />
            </div>
        </form>
    </Model>
}

export default EditRole
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
import { useRole } from "../../../utils/hooks"


function EditCustomerList({ onClose, id, onSave }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)
      const { isAdmin } = useRole();

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
            toast.success("Customer Updated Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return <Model onClose={onClose} title={(isAdmin? "Rename":"Edit Customer List")} modalClass="w-1/2!">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <InputForm
                    inputClass="py-3.5!"
                        class_="mt-0!"
                        label="List Name"
                        placeholder="Enter List Name"
                        isRequired={true}
                        formProps={{ ...register("listName", { required: true }) }}
                        errors={errors} />

                {!isAdmin && <SelectForm label="Tags"
                        setValue={setValue}
                        watch={watch}
                        isRequired={false} selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                        formProps={{ ...register("tag", { required: false }) }}
                        errors={errors} clearErrors={clearErrors}>

                        <option value="high value">High Value</option>
                        <option value="loyal">Loyal</option>
                        <option value="instead of source">instead of source</option>
                    </SelectForm>}
                </div>

            {!isAdmin && <div>
                    <div className="mt-4">
                        <div className="text-sm text-secondary font-medium">Duplicate Handling<span className="text-danger">*</span></div>

                        <div className="flex items-center gap-4">
                            <RadioForm label="Ignore duplicates"
                                class_="mt-2!"
                                name="duplicateHandling"
                                formProps={{ ...register("duplicateHandling", { required: true }) }}
                                errors={errors}
                            />
                            <RadioForm
                                label="Overwrite existing"
                                class_="mt-2!"
                                name="duplicateHandling"
                                formProps={{ ...register("duplicateHandling", { required: true }) }}
                                errors={errors}
                            />
                            <RadioForm
                                label="Allow duplicates"
                                class_="mt-2!"
                                name="duplicateHandling"
                                formProps={{ ...register("duplicateHandling", { required: true }) }}
                                errors={errors} />
                        </div>
                    </div>
                </div>}
            </div>
            <div className="grid grid-cols-2 gap-5 mt-7">
                <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                <SecondaryButton title={(isAdmin? "save":"Apply changes")} type="submit" disabled={sending} class_="text-lg!" />
            </div>
        </form>
    </Model>
}

export default EditCustomerList
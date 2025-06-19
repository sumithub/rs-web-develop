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

function EditClientRule({ onClose, id }) {
    const { register, setValue, handleSubmit, clearErrors, watch, formState: { errors } } = useForm();
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

    return <Model onClose={onClose} title="Edit Client Rule" modalClass="w-1/2!">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <InputForm label="Client Rule ID" placeholder="Enter client id" isRequired={false} class_="mt-0!"
                    inputClass="border-primary/10"
                    formProps={{ ...register("clientRuleId", { required: false }) }}
                    errors={errors}
                    setValue={setValue}

                />

                <InputForm label="Event Type" placeholder="Enter type" isRequired={true} errors={errors}
                    inputClass="border-primary/10"
                    formProps={{
                        ...register("eventType", {
                            required: true,
                        })
                    }}
                />

                <InputForm label="Condition" placeholder="Enter condition" isRequired={true} errors={errors}
                    inputClass="border-primary/10"
                    formProps={{
                        ...register("condition", {
                            required: true,
                        })
                    }}
                />

                <SelectForm label="Action"
                    selectClass_="py-3.5! px-2.5! border-primary/10!"
                    isRequired={true}
                    formProps={{ ...register("action", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors} setValue={setValue} watch={watch}>
                    <option value="sendNotification">Send Notification</option>
                    <option value="sendAlert">Send Alert</option>
                </SelectForm>

                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        formProps={{ ...register("enabled") }} errors={errors} />
                    <div>
                        Enabled
                    </div>
                </div>

                <InputForm label="Client" placeholder="Enter client name" isRequired={true} errors={errors}
                    inputClass="border-primary/10"
                    formProps={{
                        ...register("client", {
                            required: true,
                        })
                    }}
                />

                <SelectForm label="Location"
                    selectClass_="py-3.5! px-2.5! border-primary/10!"
                    isRequired={true}
                    formProps={{ ...register("location", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="nyc">NYC</option>
                    <option value="la">LA</option>
                    <option value="mgBhu">MG BHU</option>
                    <option value="ghnFtgvVftttt">GHN FTGV VFTTTT</option>
                </SelectForm>


            </div>

            <div className="grid grid-cols-2 gap-3 mt-[30px]">
                <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                <SecondaryButton title="Update" type="submit" disabled={sending} class_="text-lg!" />
            </div>
        </form>
    </Model>

}

export default EditClientRule
"use client"
import Model from '../Model'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { getError } from '../../../../helper'
import { toast } from 'react-toastify'
import axios from 'axios'
import SelectForm from '../../form/SelectForm'
import Radio from '../../form/Radio'
import HtmlEditor from '../../form/HtmlEditor'
import CancelButton from '../../common/CancelButton'
import SecondaryButton from '../../common/SecondaryButton'

function AddTemplate({ onClose, id }) {
    const { handleSubmit, register, setValue, watch, formState: { errors }, clearErrors } = useForm();
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

            toast.success("Deleted Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return <Model onClose={onClose} title="Manual Reply To Review" modalBodyClass='max-h-[85vh]'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Radio />
            <SelectForm
                label="Select Template"
                labelClass="inline-block mb-0!"
                isRequired={true}
                formProps={{ ...register("selectTemplate", { required: true }) }}
                errors={errors}
                class_="mt-0!"
                selectClass_="border border-primary3/10 py-3.5! px-2.5! bg-white! text-sm!"
                clearErrors={clearErrors}
                setValue={setValue}
                watch={watch}
            >
                <option value="natureTemplate">Nature Template</option>
            </SelectForm>

            <div className="pt-5">
                <Radio />
                <HtmlEditor
                    label="Or Compose Reply"
                    isRequired={true}
                    formProps={{ ...register("orComposeReply", { required: false }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                />
            </div>

            <div className="grid grid-cols-2 gap-5 mt-[30px]">
                <CancelButton title="Delete" type="submit" disabled={sending} class_="text-lg!" />
                <SecondaryButton title="Copy reply to clipboard" onClick={onClose} class_="text-lg!" />
            </div>
        </form>
    </Model>
}

export default AddTemplate

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
import Image from 'next/image'

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

    return <Model onClose={onClose} title="Manual Reply To Review" modalBodyClass='max-h-[85vh] pt-5!'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-[1fr_0.8fr] gap-5'>
                <div>
                    <Radio
                        label="Select Template"
                        class_='mt-0!'
                    />
                    <SelectForm
                        // label="Select Template"
                        labelClass="inline-block mb-0!"
                        isRequired={true}
                        formProps={{ ...register("selectTemplate", { required: true }) }}
                        errors={errors}
                        class_="mt-2.5!"
                        selectClass_="border border-primary3/10 py-3.5! px-2.5! bg-white! text-sm!"
                        clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="natureTemplate">Nature Template</option>
                    </SelectForm>

                    <div className="pt-3.5">
                        <Radio label="Or Compose Reply"
                            class_='mt-0!'
                        />
                        <HtmlEditor
                            label=""
                            isRequired={true}
                            formProps={{ ...register("orComposeReply", { required: false }) }}
                            errors={errors}
                            clearErrors={clearErrors}
                            containerClass='mt-2.5!'
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5 mt-[30px]">
                        <CancelButton title="Delete" type="submit" disabled={sending} class_="text-lg!" />
                        <SecondaryButton title="Copy reply to clipboard" onClick={onClose} class_="text-lg!" />
                    </div>
                </div>
                <div className='rounded-[15px] shadow-[0px_0px_40px_0px_#0000000F]'>
                    <div className='bg-primary/10 flex items-center gap-2.5 p-5 rounded-t-[15px]'>
                        <Image src="/images/eye1.svg" alt='eye1' width={22} height={22} />
                        <h2 className='text-lg font-semibold'>Preview Reply</h2>
                    </div>
                    <div className='p-2.5 border border-border2 m-5 rounded-[10px] min-h-[50vh]'>
                        <h2 className='text-xs capitalize'>Thank you for your feedback! We appreciate your input and will use it to improve our service.</h2>
                    </div>
                </div>
            </div>
        </form>
    </Model>
}

export default AddTemplate

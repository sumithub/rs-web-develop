"use client"
import AdminLayout from "../../components/AdminLayout"
import InputForm from "../../components/form/InputForm"
import HtmlEditor from "../../components/form/HtmlEditor"
import CancelButton from "../../components/common/CancelButton"
import SecondaryButton from "../../components/common/SecondaryButton"
import { toast } from "react-toastify"
import { getTextLength } from "../../utils/editorHelper"
import axios from "axios"
import { getError } from "../../../helper"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Image from "next/image"
import CheckboxForm from "../../components/form/CheckboxForm"

export default function CreateReviewResponse() {
    const id = ""
    const { register, handleSubmit, clearErrors, watch, setValue, formState: { errors }, } = useForm({ defaultValues: { type: "email" } });
    const [sending, setSending] = useState(false)

    const onSubmit = async (data) => {
        try {
            if (getTextLength(data.body) > 160) {
                toast.error('Message must be 160 characters or less')
                return;
            }
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }
            toast.success("Saved Successfully");

            setSending(false)
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    let body = watch("body") || []

    return <AdminLayout>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex items-start gap-4'>
                <div className='w-[60%]'>
                    <div>
                        <h2 className="capitalize text-lg font-semibold">Create review response</h2>
                        <InputForm
                            inputClass='border-primary/10! focus:border-primary/60!'
                            label="Template Name"
                            isRequired={true}
                            class_='mt-2!'
                            placeholder="Enter Template Name"
                            formProps={{ ...register("name", { required: true }) }}
                            errors={errors}
                        />

                        <div className="pt-5">
                            <h2 className="text-sm font-medium">Rating Applied<span className="text-danger">*</span></h2>
                            <div className="flex items-center gap-5 pt-2.5">
                                <div className="flex items-center gap-2.5">
                                    <CheckboxForm />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckboxForm />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckboxForm />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckboxForm />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckboxForm />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                    <Image src="/images/star.svg" alt="star" width={18} height={18} />
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <HtmlEditor
                                label="Response Test"
                                isRequired={true}
                                value={body}
                                onChange={(value) => {
                                    clearErrors("body")
                                    setValue("body", value)
                                }}
                                shoeMenu={true}
                                dynamicFields={true}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-5 mt-7">
                            <CancelButton title="Cancel" class_="text-lg!" />
                            <SecondaryButton title="Save" type="submit" disabled={sending} class_="text-lg!" />
                        </div>
                    </div>
                </div>

                <div className='w-[40%] mt-4'>
                    <div className='shadow-sm rounded-[10px]'>

                        <div className='bg-[#0396FF1a] px-5 py-4 rounded-tl-[10px] rounded-tr-[10px]'>
                            <div className='flex items-center gap-3'>
                                <Image src="/images/eye1.svg" alt='eye' height={22} width={22} unoptimized={true} />
                                <div className='text-secondary text-lg font-semibold capitalize'>Preview</div>
                            </div>
                        </div>
                        <div className='p-5'>
                            <div className='border border-border-color rounded-[10px] p-5 text-secondary text-sm mb-8 leading-normal'>
                                <div className='tiptap'
                                    dangerouslySetInnerHTML={{ __html: body }}
                                />
                            </div>
                            {/* <SecondaryButton title="Test Send" type="button" disabled={sending} class_="text-lg!"
                                onClick={() => setOpenPreview(true)} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </AdminLayout>
}
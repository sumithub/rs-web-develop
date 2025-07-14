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
import Checkbox from "../../components/form/Checkbox"
import { useRouter } from "next/navigation"

export default function CreateReviewResponse() {
    const id = ""
    const { register, handleSubmit, clearErrors, watch, setValue, formState: { errors }, } = useForm({ defaultValues: { type: "email" } });
    const [sending, setSending] = useState(false)
    const [ratings, setRatings] = useState([]);
    const router = useRouter()

    const onSubmit = async (data) => {
        try {
            if (getTextLength(data.body) > 160) {
                toast.error('Message must be 160 characters or less')
                return;
            }

            // Add validation for ratings
            if (ratings.length === 0) {
                toast.error('Please select at least one rating level')
                return;
            }

            setSending(true)

            // Include selectedRatings in the data being sent
            const formData = {
                ...data,
                ratings
            };

            let res = null

            if (id !== "add") {
                res = await axios.put("/api", formData)
            } else {
                res = await axios.post("/api", formData)
            }
            toast.success("Saved Successfully");

            setSending(false)
            router.push("/review-responses")

        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }


    let body = watch("body") || []
    let templateName = watch("name") || ""

    return <AdminLayout>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex items-start gap-4'>
                <div className='w-[60%]'>
                    <div>
                        {/* <h2 className="capitalize text-lg font-semibold">{`${id && id !== "create" ? "Edit" : "Create"} Review Response`}</h2> */}
                        <h2 className="capitalize text-lg font-semibold">Create Review Response</h2>

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
                            <h2 className="text-sm font-medium">Rating Applied <span className="text-danger">*</span></h2>
                            <div className="flex items-center gap-5 pt-2.5">
                                {[1, 2, 3, 4, 5].map((r) => (
                                    <div key={r} className="flex items-center gap-2.5 cursor-pointer"
                                        onClick={(checked) => {
                                            if (checked) {
                                                setRatings((prev) => [...prev, r]);
                                            } else {
                                                setRatings((prev) => prev.filter((item) => item !== r));
                                            }
                                        }}>
                                        <Checkbox checked={ratings.includes(r)} />
                                        <div className="flex items-center gap-3">
                                            {Array.from({ length: r }, (_, index) => (
                                                <Image
                                                    key={index}
                                                    src="/images/star.svg"
                                                    alt="star"
                                                    width={20}
                                                    height={20}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
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
                                type={"reviewResponseTemplate"}
                            />
                            {/* <div className="flex justify-end mt-4">
                                <Link href={"/review-responses"} className="text-primary"><span className="">Insert Dynamic Fields</span> <span>+</span></Link>
                            </div> */}
                        </div>
                        {/* <textarea placeholder="Type here" className="border border-border2 rounded-[10px] p-4 w-full mt-4" /> */}
                        <div className="grid grid-cols-2 gap-5 mt-7">
                            <CancelButton title="Cancel" class_="text-lg!" onClick={() => router.push("/review-responses")} />
                            <SecondaryButton title="Save" type="submit" disabled={sending} class_="text-lg!" />
                        </div>
                    </div>
                </div>

                <div className='w-[40%]'>
                    <div className='shadow-sm rounded-[10px]'>

                        <div className='bg-primary/10 px-5 py-4 rounded-tl-[10px] rounded-tr-[10px]'>
                            <div className='flex items-center gap-3'>
                                <Image src="/images/eye1.svg" alt='eye' height={22} width={22} unoptimized={true} />
                                <div className='text-secondary text-lg font-semibold capitalize'>Preview</div>
                            </div>
                        </div>
                        <div className='p-5'>
                            {/* Template Name Preview */}
                            <div className='mb-4'>
                                <div className='text-sm font-medium mb-2 capitalize'>Template Name: {templateName || ""} </div>
                                {/* <div className='text-base font-semibold text-secondary'>
                                    {templateName || "Enter template name"}
                                </div> */}
                            </div>

                            {/* Rating Preview */}
                            {/* <div className='mb-4'>
                                <div className='text-sm font-medium mb-2'>Rating Applied:</div>
                                <div className='flex items-center gap-1'>
                                    {rating > 0 ? (
                                        Array.from({ length: rating }, (_, index) => (
                                            <Image
                                                key={index}
                                                src="/images/star.svg"
                                                alt="star"
                                                width={20}
                                                height={20}
                                            />
                                        ))
                                    ) : (
                                        <span className='text-text3 text-sm '>No rating selected</span>
                                    )}
                                </div>
                            </div> */}

                            {/* Response Content Preview */}
                            <div className='mb-4'>

                                <div className='border border-border-color rounded-[10px] p-5 text-secondary text-sm leading-normal'>
                                    <div className='tiptap'
                                        dangerouslySetInnerHTML={{ __html: body || "<p>Enter response content...</p>" }}
                                    />
                                </div>
                            </div>
                            {/* <SecondaryButton title="Test Send" type="button" disabled={sending} class_="text-lg!"
                                onClick={() => setOpenPreview(true)} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </AdminLayout >
}
"use client"
import Model from "../Model";
import Checkbox from "../../form/Checkbox";
import SecondaryButton from "../../common/SecondaryButton";
import CodePreviewBox from "./CodePreviewBox";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../helper";
import CancelButton from "../../common/CancelButton";
import { useForm } from "react-hook-form";
import SelectForm from "../../form/SelectForm";
import InputForm from "../../form/InputForm";

export default function TestimonialWidget({ onClose, OnSave, id }) {
    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false)
    const [open, setOpen] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title="Testimonial Widget" modalClass="w-[60%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                {open &&
                    <CodePreviewBox
                        onClose={() => {
                            setOpen(false)
                        }}

                        onSave={() => {
                            setOpen(true)
                        }} />
                }
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div>
                            <div className="border border-border-color bg-[#0396FF1a] rounded-md">
                                <div className="mt-2 pl-2 font-semibold text-lg">
                                    Design
                                </div>

                                <div className="grid grid-cols-3 gap-2 p-2">
                                    <InputForm label="Color Scheme" isRequired={false} placeholder="Select Color"
                                        formProps={{ ...register("colorScheme", { required: false }) }}
                                        errors={errors} />
                                    <SelectForm defaultOption="Select" label="Font Family" isRequired={false}
                                        formProps={{ ...register("select", { required: false }) }}
                                        errors={errors} clearErrors={clearErrors} >
                                        <option value="selectFont">Select Font</option>
                                    </SelectForm>
                                    <InputForm label="Border Radius" isRequired={false} placeholder="Select Border Color"
                                        formProps={{ ...register("borderRadius", { required: false }) }}
                                        errors={errors} />
                                </div>
                            </div>

                            <div className="border border-border-color bg-[#0396FF1a] rounded-md mt-2">
                                <div className="mt-2 pl-2 font-semibold text-lg">
                                    Content
                                </div>

                                <div className="grid grid-cols-2 gap-2 p-2 ">
                                    <InputForm label="Minimum Rating" isRequired={true} placeholder="Enter Filtering"
                                        formProps={{ ...register("minimumRating", { required: true }) }}
                                        errors={errors} />
                                    <SelectForm label="Sorting" isRequired={false} defaultOption="Enter sorting"
                                        formProps={{ ...register("sorting", { required: false }) }}
                                        errors={errors} clearErrors={clearErrors}>
                                        <option value="latest">Latest</option>
                                        <option value="highest rated">Highest Rated</option>
                                    </SelectForm>
                                </div>

                                <div className="p-2 mb-2">
                                    Show Reviewer Details
                                </div>
                            </div>
                        </div>

                        <div className="border border-border-color bg-[#0396FF1a] rounded-md mt-2 ">
                            <div className="font-semibold text-lg mt-2 pl-2">
                                Review Sources
                            </div>

                            <div className="pl-2">
                                Select up to 3
                            </div>

                            <div className="pl-2 flex gap-2 mb-2">
                                <Checkbox />
                                <div>Google</div>

                                <Checkbox />
                                <div>Trustpilot</div>

                                <Checkbox />
                                <div>Yelp</div>
                            </div>
                        </div>

                        <div className="mt-2 grid grid-cols-2 gap-4">
                            <SecondaryButton title="Save" type="submit" disabled={sending} />
                            <CancelButton title="Next" />
                        </div>
                    </div>

                    <div className="border border-border-color  rounded-md">
                        <div className='bg-[#0396FF1a] px-5 py-4 rounded-tl-[10px] rounded-tr-[10px]'>
                            <div className='flex items-center gap-3'>
                                <div className='text-secondary text-lg font-semibold'>Widget Preview</div>
                            </div>
                        </div>

                        <div className='p-5'>
                            <div className='border border-border-color rounded-[10px] p-5 text-secondary text-sm mb-8 leading-normal'>
                                <div>Hi {"John Deo"},</div>

                                <div className='my-5'>Thank you for your recent visit! We'd love to hear your feedback.</div>

                                <div>Click the link below to leave a review:{"review_link"} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>

                                <div className='mt-10'>business_name</div>
                            </div>
                        </div>

                        <div className="p-4">
                            <SecondaryButton title="Get Code" onClick={() => { setOpen(true) }} />
                        </div>
                    </div>
                </div>
            </form>
        </Model >
    )
}
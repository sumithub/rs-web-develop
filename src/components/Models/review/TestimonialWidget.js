"use client"
import Input from "../../form/Input";
import Select from "../../form/Select";
import Model from "../Model";
import Checkbox from "../../form/Checkbox";
import SecondaryButton from "../../common/SecondaryButton";
import CodePreviewBox from "./CodePreviewBox";
import { useState } from "react";

export default function TestimonialWidget({ onClose, OnSave }) {
    const [open, setOpen] = useState(false)

    return (
        <Model onClose={onClose} title="Testimonial Widget" modalClass="w-[60%]!">
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
                                <Input label="Color Scheme" placeholder="Select Color" />
                                <Select defaultOption="Select Font" label="Font Family" />
                                <Input label="Border Radius" placeholder="Select Border Color" />
                            </div>
                        </div>

                        <div className="border border-border-color bg-[#0396FF1a] rounded-md mt-2">
                            <div className="mt-2 pl-2 font-semibold text-lg">
                                Content
                            </div>

                            <div className="grid grid-cols-2 gap-2 p-2 ">
                                <Input label="Minimum Rating" placeholder="Enter Filtering" />
                                <Select label="Sorting" isRequired={true} defaultOption="Enter sorting" >
                                    <option value="latest">Latest</option>
                                    <option value="highest rated">Highest Rated</option>
                                </Select>
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
        </Model >
    )
}
"use client"
import Model from "../Model";
import Checkbox from "../../form/Checkbox";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import CodePreviewBox from "./CodePreviewBox";
import { useState } from "react";
import SelectForm from "../../form/SelectForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../helper";
import InputForm from "../../form/InputForm";
import Image from "next/image";
import Switch from "../../../components/form/Switch";
import GridWidget from "../../Models/review/GridWidget";

export default function Carousel({ title, onClose, OnSave, id, onNext }) {
    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false)
    const [open, setOpen] = useState(false)
    const normalizedTitle = title?.toLowerCase();


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
        <Model onClose={onClose} title={title} modalClass="w-[80%]!" >
            {/* {title === "gridWidget" && (
                <GridWidget
                    onNext={() => onNext("gridWidget")}
                />
            )} */}
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
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        {(normalizedTitle === "carousel" || normalizedTitle === "gridWidget") && (<div className="p-[15px] bg-dark rounded-[15px]">
                            <h2 className="text-lg font-semibold">Design</h2>
                            <div className="grid grid-cols-3 gap-[15px] pt-2.5">
                                <InputForm
                                    label="Color Scheme"
                                    isRequired={true}
                                    placeholder="Select Color"
                                    formProps={{ ...register("colorScheme", { required: true }) }}
                                    errors={errors}
                                    inputClass="border border-primary3/10 p-2.5! bg-white!"
                                    labelClass="pb-2.5! inline-block"
                                    class_="mt-0!"
                                />
                                <SelectForm
                                    defaultOption="Select"
                                    label="Font Family"
                                    labelClass="pb-2.5 inline-block mb-0!"
                                    isRequired={true}
                                    formProps={{ ...register("select", { required: true }) }}
                                    errors={errors}
                                    class_="mt-0!"
                                    selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                    clearErrors={clearErrors} >
                                    <option value="selectFont">Select Font</option>
                                </SelectForm>
                                <InputForm
                                    label="Border Radius"
                                    isRequired={true}
                                    placeholder="Select Border Color"
                                    formProps={{ ...register("colorScheme", { required: true }) }}
                                    errors={errors}
                                    inputClass="border border-primary3/10 p-2.5! bg-white!"
                                    labelClass="pb-2.5! inline-block"
                                    class_="mt-0!"
                                />
                            </div>
                        </div>)}

                        {(normalizedTitle === "carousel") && (<div className="p-[15px] bg-dark rounded-[15px] mt-5">
                            <h2 className="text-lg font-semibold">Content</h2>
                            <div className="grid grid-cols-2 gap-5">
                                {(normalizedTitle !== "testimonialWidget") && (<InputForm
                                    label="Number of Reviews"
                                    isRequired={true}
                                    placeholder="Enter review count"
                                    formProps={{ ...register("colorScheme", { required: true }) }}
                                    errors={errors}
                                    inputClass="border border-primary3/10 p-2.5! bg-white!"
                                    labelClass="pb-2.5! inline-block"
                                    class_="mt-0!"
                                />)}

                                {(normalizedTitle === "testimonialWidget") && (<div>
                                    <SelectForm
                                        defaultOption="Select sorting"
                                        label="Sorting"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        isRequired={true}
                                        formProps={{ ...register("select", { required: true }) }}
                                        errors={errors}
                                        class_="mt-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors} >
                                        <option value="latest">Latest</option>
                                        <option value="highest-rated">Highest Rated</option>
                                    </SelectForm>
                                    <div className="pt-2.5 flex gap-[15px] items-center">
                                        <h2 className="text-base font-medium">Show Reviewer Details</h2>
                                        <Switch />
                                    </div>
                                </div>)}

                                {(normalizedTitle === "floatingButtonWidget") && (<InputForm label="button label" isRequired={true}
                                    formProps={{ ...register("buttonLabel", { required: true }) }}
                                    errors={errors}
                                    inputClass="border border-primary3/10 p-2.5! bg-white!"
                                    labelClass="pb-2.5! inline-block"
                                    class_="mt-0!"
                                />)}

                                {(normalizedTitle === "carousel") && (<InputForm
                                    label="Minimum Rating"
                                    isRequired={true}
                                    placeholder="Enter Filtering"
                                    formProps={{ ...register("colorScheme", { required: true }) }}
                                    errors={errors}
                                    inputClass="border border-primary3/10 p-2.5! bg-white!"
                                    labelClass="pb-2.5! inline-block"
                                    class_="mt-0!"
                                />)}
                                <SelectForm
                                    defaultOption="Select Minimum Rating"
                                    label="Minimum Rating"
                                    labelClass="pb-2.5 inline-block mb-0!"
                                    isRequired={true}
                                    formProps={{ ...register("select", { required: true }) }}
                                    errors={errors}
                                    class_="mt-0!"
                                    selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                    clearErrors={clearErrors} >
                                    <option value="selectFont">Select Font</option>
                                </SelectForm>
                            </div>

                            <div>
                                {(normalizedTitle === "carousel") && (<InputForm
                                    label="sorting"
                                    isRequired={true}
                                    placeholder="Enter sorting"
                                    formProps={{ ...register("colorScheme", { required: true }) }}
                                    errors={errors}
                                    inputClass="border border-primary3/10 p-2.5! bg-white!"
                                    labelClass="pb-2.5! inline-block"
                                    class_="mt-2.5!"
                                />)}

                                {(normalizedTitle !== "carousel") && (<SelectForm
                                    defaultOption="Select sorting"
                                    label="Sorting"
                                    labelClass="pb-2.5 inline-block mb-0!"
                                    isRequired={true}
                                    formProps={{ ...register("select", { required: true }) }}
                                    errors={errors}
                                    class_="mt-2.5!"
                                    selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                    clearErrors={clearErrors} >
                                    <option value="latest">Latest</option>
                                    <option value="highest-rated">Highest Rated</option>
                                </SelectForm>)}
                            </div>

                            <div className="pt-2.5 flex gap-[15px] items-center">
                                <h2 className="text-base font-medium">Show Reviewer Details</h2>
                                <Switch />
                            </div>
                        </div>)}

                        {(normalizedTitle === "gridWidget" || normalizedTitle === "carousel" || normalizedTitle === "testimonialWidget" || normalizedTitle === "floatingButtonWidget" || normalizedTitle === "starBadgeWidget") && (<div className="p-[15px] bg-dark rounded-[15px] mt-5">
                            <h2 className="text-lg font-semibold">Review Sources</h2>
                            <h3 className="text-base pt-2.5 font-medium">Select up to 3</h3>
                            <div className="flex gap-[15px] items-center pt-[15px]">
                                <div className="flex gap-2.5 items-center">
                                    <Checkbox />
                                    <div>Google</div>
                                </div>
                                <div className="flex gap-2.5 items-center">
                                    <Checkbox />
                                    <div>Trustpilot</div>
                                </div>
                                <div className="flex gap-2.5 items-center">
                                    <Checkbox />
                                    <div>Yelp</div>
                                </div>
                            </div>
                        </div>)}

                        {(normalizedTitle === "carousel") && (<div className="p-[15px] bg-dark rounded-[15px] mt-5">
                            <h2 className="text-lg font-semibold">Behavior</h2>
                            <div className="0">
                                <SelectForm
                                    defaultOption="Select Transitions"
                                    label="Transitions"
                                    labelClass="pb-2.5 inline-block mb-0!"
                                    isRequired={true}
                                    formProps={{ ...register("select", { required: true }) }}
                                    errors={errors}
                                    class_="mt-0!"
                                    selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                    clearErrors={clearErrors} >
                                    <option value="selectFont">Select Font</option>
                                </SelectForm>
                            </div>
                            <div className="flex gap-[15px] items-center mt-2.5">
                                <h2 className="text-base font-medium">Auto-Scroll</h2>
                                <Switch />
                            </div>
                        </div>)}

                        {(normalizedTitle === "floatingButtonWidget") && (<div className="p-[15px] bg-dark rounded-[15px] mt-5">
                            <h2 className="text-lg font-semibold">Behavior</h2>
                            <div className="0">
                                <SelectForm
                                    defaultOption="Select Popup"
                                    label="Popup Delay"
                                    labelClass="pb-2.5 inline-block mb-0!"
                                    isRequired={true}
                                    formProps={{ ...register("select", { required: true }) }}
                                    errors={errors}
                                    class_="mt-0!"
                                    selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                    clearErrors={clearErrors} >
                                    <option value="selectFont">Select Font</option>
                                </SelectForm>
                            </div>
                            <div className="flex gap-[15px] items-center mt-2.5">
                                <h2 className="text-base font-medium">Auto-Trigger Popup</h2>
                                <Switch />
                            </div>
                        </div>)}

                        <div className="mt-[30px] grid grid-cols-2 gap-5">
                            <SecondaryButton title="Save" type="submit" disabled={sending} class_="bg-white! text-primary!" />
                            <SecondaryButton title="Next" onClick={() => onNext?.(title)} />
                        </div>
                    </div>

                    <div className="shadow-sm rounded-[15px]">
                        <div className="bg-primary/10 rounded-t-[15px] px-5 py-[18px] flex gap-2.5 items-center">
                            <Image unoptimized={true} src="/images/eye1.svg" alt="eye1" width={22} height={22} />
                            <h2 className="text-lg font-semibold">Widget Preview</h2>
                        </div>
                        <div className="p-5">
                            <div className="border border-border2 rounded-[10px] p-5">
                                <div className="text-center">
                                    <Image src="/images/john-die.png" alt="john-die" width={46} height={46} className="mx-auto" />
                                    <h2 className="pt-[15px] pb-2.5 text-base font-medium">John Die</h2>
                                </div>
                                <div className="flex justify-between items-center gap-2.5">
                                    <Image unoptimized={true} src="/images/arrow-left.svg" alt="arrow-left" width={24} height={24} className="" />
                                    <h3 className="text-text3 text-xs font-medium">Aug 25, 2025</h3>
                                    <Image unoptimized={true} src="/images/arrow-right2.svg" alt="arrow-right2" width={24} height={24} className="" />
                                </div>
                                <p className="text-center text-xs capitalize">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br />
                                    <span className="font-medium text-primary">Read More</span></p>
                                <div className="my-10 flex justify-center">
                                    <button className="text-xs font-medium flex items-center gap-2.5 py-[7px] px-2.5 rounded-lg border border-primary">
                                        <span>
                                            <Image unoptimized={true} src="/images/google.svg" alt="google" width={18} height={18} className="" />
                                        </span>
                                        Verified On Google
                                    </button>
                                </div>
                                <div className="">
                                    <SecondaryButton title="Get Code" onClick={() => { setOpen(true) }} type="button" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Model >
    )
}
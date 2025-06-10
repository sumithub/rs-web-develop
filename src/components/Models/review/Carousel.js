"use client"
import Model from "../Model";
import CheckboxForm from "../../form/CheckboxForm";
import SecondaryButton from "../../common/SecondaryButton";
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
import ColorInputForm from "../../form/ColorInputForm";

export default function Carousel({ title, onClose, OnSave, id, onNext }) {
    const { register, setValue, watch, handleSubmit, clearErrors, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false)
    const [open, setOpen] = useState(false)
    const normalizedTitle = title?.toLowerCase();
    const [clickSwitch, setClickSwitch] = useState(false)
    const [clickSwitch1, setClickSwitch1] = useState(false)

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

    // Helper function to determine if widget needs design section
    const hasDesignSection = () => {
        return ["carousel", "gridwidget", "testimonialwidget", "starbadgewidget", "floatingbuttonwidget"].includes(normalizedTitle);
    }

    // Helper function to determine if widget needs content section
    const hasContentSection = () => {
        return ["carousel", "gridwidget", "testimonialwidget", "floatingbuttonwidget"].includes(normalizedTitle);
    }

    // Helper function to determine if widget needs behavior section
    const hasBehaviorSection = () => {
        return ["carousel", "floatingbuttonwidget"].includes(normalizedTitle);
    }

    return (
        <Model onClose={onClose} title={title} modalClass="w-[80%]!" >
            {open &&
                <CodePreviewBox
                    onClose={() => {
                        setOpen(false)
                    }}
                    onSave={() => {
                        setOpen(true)
                    }} />
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        {/* Design Section */}
                        {hasDesignSection() && (
                            <div className="p-[15px] bg-dark rounded-[15px]">
                                <h2 className="text-lg font-semibold">Design</h2>
                                <div className="grid grid-cols-3 items-center gap-[15px] pt-2.5">

                                    <ColorInputForm label="Color Scheme"
                                        isRequired={normalizedTitle.includes("carousel") ? true : false}
                                        class_="mt-0!"
                                        labelClass="pb-2.5! inline-block"
                                        bgClass="border border-primary3/10 bg-white!"
                                        formProps={{ ...register("colorScheme", { required: normalizedTitle.includes("carousel") ? true : false }) }}
                                        errors={errors}
                                        setValue={setValue}

                                    />
                                    {/* <InputForm
                                        label="Color Scheme"
                                        isRequired={normalizedTitle.includes("carousel") ? true : false}
                                        placeholder="Select Color"
                                        formProps={{ ...register("colorScheme", { required: normalizedTitle.includes("carousel") ? true : false }) }}
                                        errors={errors}
                                        inputClass="border border-primary3/10 p-2.5! bg-white!"
                                        labelClass="pb-2.5! inline-block"
                                        class_="mt-0!"
                                    />  */}

                                    <SelectForm
                                        label="Font Family"
                                        isRequired={normalizedTitle.includes("carousel") ? true : false}
                                        defaultOption="Select"
                                        formProps={{ ...register("fontFamily", { required: normalizedTitle.includes("carousel") ? true : false }) }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-3.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors} >
                                        <option value="inter">Inter</option>
                                        <option value="arial">Arial</option>
                                        <option value="helvetica">Helvetica</option>
                                    </SelectForm>
                                    <InputForm
                                        label="Border Radius"
                                        isRequired={normalizedTitle.includes("carousel") ? true : false}
                                        placeholder="Enter Border Radius"
                                        formProps={{ ...register("borderRadius", { required: normalizedTitle.includes("carousel") ? true : false }) }}
                                        errors={errors}
                                        inputClass="border border-primary3/10 py-[13.2px]! px-2.5! bg-white!"
                                        labelClass="pb-2.5! inline-block"
                                        class_="mt-0!"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Content Section */}
                        {hasContentSection() && (
                            <div className="p-[15px] bg-dark rounded-[15px] mt-5">
                                <h2 className="text-lg font-semibold">Content</h2>
                                <div className="grid grid-cols-2 gap-5">
                                    {/* Number of Reviews - for carousel and gridwidget */}
                                    {(normalizedTitle === "carousel" || normalizedTitle === "gridwidget") && (
                                        <InputForm
                                            label="Number of Reviews"
                                            isRequired={true}
                                            placeholder="Enter review count"
                                            formProps={{
                                                ...register("numberOfReviews", {
                                                    required: true,
                                                    min: { value: 1, message: "Must be at least 1" },
                                                    max: { value: 100, message: "Cannot exceed 100" }
                                                })
                                            }}
                                            errors={errors}
                                            inputClass="border border-primary3/10 p-2.5! bg-white!"
                                            labelClass="pb-2.5! inline-block"
                                            class_="mt-0!"
                                            type="number"
                                        />
                                    )}

                                    {/* Button Label - for floating button widget */}
                                    {normalizedTitle === "floatingbuttonwidget" && (
                                        <InputForm
                                            label="Button Label"
                                            isRequired={true}
                                            placeholder="Enter button text"
                                            formProps={{ ...register("buttonLabel", { required: true }) }}
                                            errors={errors}
                                            inputClass="border border-primary3/10 p-2.5! bg-white!"
                                            labelClass="pb-2.5! inline-block"
                                            class_="mt-0!"
                                        />
                                    )}

                                    {/* Minimum Rating */}
                                    {(normalizedTitle !== "testimonialwidget") && <SelectForm
                                        label="Minimum Rating"
                                        isRequired={true}
                                        defaultOption="Select"
                                        formProps={{ ...register("minimumRating", { required: true }) }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors} >
                                        <option value="1">Rating 1</option>
                                        <option value="2">Rating 2</option>
                                        <option value="3">Rating 3</option>
                                        <option value="4">Rating 4</option>
                                        <option value="5">Rating 5</option>
                                    </SelectForm>}
                                </div>

                                {/* Sorting */}
                                {normalizedTitle !== "testimonialwidget" && <div className="mt-2.5">
                                    <SelectForm
                                        label="Sorting"
                                        isRequired={true}
                                        defaultOption="Select"
                                        formProps={{ ...register("sorting", { required: true }) }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors} >
                                        <option value="latest">Latest</option>
                                        <option value="highest-rated">Highest Rated</option>
                                    </SelectForm>
                                </div>}

                                {(normalizedTitle === "testimonialwidget") && <div className="grid grid-cols-2 gap-5">
                                    <SelectForm
                                        label="Sorting"
                                        isRequired={true}
                                        defaultOption="Select"
                                        formProps={{ ...register("sorting", { required: true }) }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors} >
                                        <option value="latest">Latest</option>
                                        <option value="highest-rated">Highest Rated</option>
                                    </SelectForm>
                                    <SelectForm
                                        label="Minimum Rating"
                                        isRequired={false}
                                        defaultOption="Select"
                                        formProps={{ ...register("minimumRating", { required: false }) }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors} >
                                        <option value="1">Rating 1</option>
                                        <option value="2">Rating 2</option>
                                        <option value="3">Rating 3</option>
                                        <option value="4">Rating 4</option>
                                        <option value="5">Rating 5</option>
                                    </SelectForm>
                                </div>}
                                {/* Show Reviewer Details */}
                                <div className="pt-2.5 flex gap-[15px] items-center">
                                    <h2 className="text-base font-medium">Show Reviewer Details</h2>
                                    <Switch
                                        checked={clickSwitch1}
                                        onChange={() => setClickSwitch1(prev => !prev)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="p-[15px] bg-dark rounded-[15px] mt-5">
                            <h2 className="text-lg font-semibold">Review Sources</h2>
                            <h3 className="text-base pt-2.5 font-medium">Select up to 3</h3>
                            <div className="flex gap-[15px] items-center pt-[15px]">
                                <div className="flex gap-2.5 items-center">
                                    <CheckboxForm
                                        formProps={{ ...register("google") }} errors={errors}
                                    />
                                    <div>Google</div>
                                </div>
                                <div className="flex gap-2.5 items-center">
                                    <CheckboxForm
                                        formProps={{ ...register("trustpilot") }} errors={errors}
                                    />
                                    <div>Trustpilot</div>
                                </div>
                                <div className="flex gap-2.5 items-center">
                                    <CheckboxForm
                                        formProps={{ ...register("yelp") }} errors={errors}
                                    />
                                    <div>Yelp</div>
                                </div>
                            </div>
                        </div>

                        {/* Behavior Section */}
                        {hasBehaviorSection() && (
                            <div className="p-[15px] bg-dark rounded-[15px] mt-5">
                                <h2 className="text-lg font-semibold">Behavior</h2>
                                <div className="">
                                    {normalizedTitle === "carousel" && (
                                        <SelectForm
                                            label="Transition Effect"
                                            isRequired={true}
                                            defaultOption="Select"
                                            formProps={{ ...register("transitionEffect", { required: true }) }}
                                            errors={errors}
                                            class_="mt-0!"
                                            labelClass="pb-2.5 inline-block mb-0!"
                                            selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                            clearErrors={clearErrors} >
                                            <option value="slide">Slide</option>
                                            <option value="fade">Fade</option>
                                        </SelectForm>
                                    )}

                                    {normalizedTitle === "floatingbuttonwidget" && (
                                        <SelectForm
                                            label="Popup Delay"
                                            isRequired={true}
                                            defaultOption="Select"
                                            formProps={{ ...register("popupDelay", { required: true }) }}
                                            errors={errors}
                                            class_="mt-0!"
                                            labelClass="pb-2.5 inline-block mb-0!"
                                            selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                            clearErrors={clearErrors} >
                                            <option value="0">Immediate</option>
                                            <option value="1000">1 Second</option>
                                            <option value="3000">3 Seconds</option>
                                            <option value="5000">5 Seconds</option>
                                        </SelectForm>
                                    )}
                                </div>
                                <div className="flex gap-[15px] items-center mt-2.5">
                                    <h2 className="text-base font-medium">
                                        {normalizedTitle === "carousel" ? "Auto-Scroll" : "Auto-Trigger Popup"}
                                    </h2>
                                    <Switch
                                        checked={clickSwitch}
                                        onChange={() => setClickSwitch(prev => !prev)} />
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-[30px] grid grid-cols-2 gap-5">
                            <SecondaryButton
                                title="Save"
                                type="submit"
                                disabled={sending}
                                class_="bg-white! text-primary!"
                            />
                            <SecondaryButton
                                title="Next"
                                onClick={() => onNext?.(title)}
                                type="button"
                            />
                        </div>
                    </div>

                    {/* Widget Preview Section */}
                    <div className="shadow-sm rounded-[15px]">
                        <div className="bg-primary/10 rounded-t-[15px] px-5 py-[18px] flex gap-2.5 items-center">
                            <Image unoptimized={true} src="/images/eye1.svg" alt="eye1" width={22} height={22} />
                            <h2 className="text-lg font-semibold">Widget Preview</h2>
                        </div>
                        <div className="p-5">
                            {/* Different preview content based on widget type */}
                            {normalizedTitle === "starbadgewidget" ? (
                                <div className="border border-border2 rounded-[10px] p-5">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold mb-2">4.5</h2>
                                        <div className="flex justify-center mb-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span key={star} className="text-yellow-400">★</span>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600">Based on 150 reviews</p>
                                    </div>
                                    <div className="mt-5">
                                        <SecondaryButton title="Get Code" onClick={() => { setOpen(true) }} type="button" />
                                    </div>
                                </div>
                            ) : (
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
                                    <p className="text-center text-xs capitalize">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...<br />
                                        <span className="font-medium text-primary">Read More</span></p>
                                    <div className="my-10 flex justify-center">
                                        <button className="text-xs font-medium flex items-center gap-2.5 py-[7px] px-2.5 rounded-lg border border-primary" type="button">
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
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </Model >
    )
}
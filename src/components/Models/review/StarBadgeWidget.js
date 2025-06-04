"use client"
import Input from "../../form/Input";
import Select from "../../form/Select";
import Model from "../Model";
import Checkbox from "../../form/Checkbox";
import SecondaryButton from "../../common/SecondaryButton";
import { useState } from "react";
import CodePreviewBox from "./CodePreviewBox";
import InputForm from "../../form/InputForm";
import SelectForm from "../../form/SelectForm";
import { useForm } from "react-hook-form";
import CancelButton from "../../common/CancelButton";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import Image from "next/image";
import Switch from "../../form/Switch";
import ProgressBar from "@ramonak/react-progress-bar";

export default function StarBadgeWidget({ onClose, OnSave, id }) {
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
        <Model onClose={onClose} title="Star Badge Widget" modalClass="w-[80%]!">
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
                        <div className="p-[15px] bg-dark rounded-[15px]">
                            <h2 className="text-lg font-semibold">Design</h2>
                            <div className="grid grid-cols-3 gap-[15px] pt-2.5">
                                <InputForm
                                    label="Color Scheme"
                                    // isRequired={true}
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
                                    // isRequired={true}
                                    formProps={{ ...register("select", { required: true }) }}
                                    errors={errors}
                                    class_="mt-0!"
                                    selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                    clearErrors={clearErrors} >
                                    <option value="selectFont">Select Font</option>
                                </SelectForm>
                                <InputForm
                                    label="Border Radius"
                                    // isRequired={true}
                                    placeholder="Select Border Color"
                                    formProps={{ ...register("colorScheme", { required: true }) }}
                                    errors={errors}
                                    inputClass="border border-primary3/10 p-2.5! bg-white!"
                                    labelClass="pb-2.5! inline-block"
                                    class_="mt-0!"
                                />
                            </div>
                        </div>

                        <div className="p-[15px] bg-dark rounded-[15px] mt-5">
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
                        </div>

                        <div className="mt-[30px] grid grid-cols-2 gap-5">
                            <SecondaryButton title="Save" type="submit" disabled={sending} class_="bg-white! text-primary!" />
                            <CancelButton title="Next" class_="bg-primary text-white border border-primary" />
                        </div>
                    </div>

                    <div className="shadow-sm rounded-[15px]">
                        <div className="bg-primary/10 rounded-t-[15px] px-5 py-[18px] flex gap-2.5 items-center">
                            <Image src="/images/eye1.svg" alt="eye1" width={22} height={22} />
                            <h2 className="text-lg font-semibold">Widget Preview</h2>
                        </div>
                        <div className="p-5">
                            <div className="border border-border2 rounded-[10px] p-5">
                                <div className="">
                                    <div>
                                        <div className="text-secondary text-xl font-medium mb-[15px]">Star Rating Badge</div>
                                        <div className="grid grid-cols-[1fr_2fr]">
                                            <div className="text-secondary">
                                                {/* <div className="text-xs font-semibold">Total</div> */}
                                                <div className="text-[46px] text-end font-semibold">4.5</div>
                                                <div className="flex items-center gap-1">
                                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                                    <Image src="/images/star2.svg" alt="star2" height={14} width={14} unoptimized={true} />
                                                </div>
                                                <h2 className="text-sm font-semibold">&#40;200&#41;</h2>

                                                <div className="flex items-center justify-between mt-2">
                                                    <div>
                                                        <div className="2xl:text-sm lg:text-[10px] mb-1.5">Ratings</div>
                                                        <div className="2xl:text-base text-sm font-semibold">233</div>
                                                    </div>
                                                    <div>
                                                        <div className="2xl:text-sm lg:text-[10px] capitalize mb-1.5">Rating With Reviews</div>
                                                        <div className="2xl:text-base text-sm font-semibold">217</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                {/* <div className="grid grid-cols-[0.1fr_auto] items-center">
                                                    <div className="text-text3 text-sm">5</div>
                                                    <ProgressBar completed={100} bgColor="#FFC107" height="12px"
                                                        isLabelVisible={false} borderRadius="2px"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-[0.1fr_auto] items-center my-1.5">
                                                    <div className="text-text3 text-sm">4</div>
                                                    <ProgressBar completed={80} bgColor="#FFC107" height="12px"
                                                        isLabelVisible={false} borderRadius="2px"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-[0.1fr_auto] items-center">
                                                    <div className="text-text3 text-sm">3</div>
                                                    <ProgressBar completed={50} bgColor="#FFC107" height="12px"
                                                        isLabelVisible={false} borderRadius="2px"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-[0.1fr_auto] items-center my-1.5">
                                                    <div className="text-text3 text-sm">2</div>
                                                    <ProgressBar completed={50} bgColor="#FFC107" height="12px"
                                                        isLabelVisible={false} borderRadius="2px"
                                                    />
                                                </div> */}

                                                <div className="flex gap-5 items-center justify-between">
                                                    <div className="flex gap-[5px]">
                                                        <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                                        <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                                        <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                                        <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                                        <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                                    </div>
                                                    <div className="grid grid-cols-[0.6fr_auto] w-full items-center">
                                                        <ProgressBar completed={50} bgColor="#FFC107" height="8px"
                                                            isLabelVisible={false} borderRadius="2px"
                                                        />
                                                        <div className="text-text3 text-sm">0.5</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[30px]">
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
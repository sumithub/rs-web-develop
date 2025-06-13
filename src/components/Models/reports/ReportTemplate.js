"use client"
import { toast } from "react-toastify";
import Model from "../Model";
import { getError } from "../../../../helper";
import axios from "axios";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import SelectForm from "../../form/SelectForm";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Checkbox from "../../form/Checkbox";
import Image from "next/image";
import CheckboxForm from "../../form/CheckboxForm";

export default function ReportTemplate({ onClose, id, onSave }) {
    const { register, handleSubmit, clearErrors, formState: { errors }, } = useForm();
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

            toast.success("Changes Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    const delete1 = async () => {
        try {
            toast.success("Deleted Successfully")
            onClose()
        } catch (error) {
            toast.error(getError(error))
        }
    }
    return (
        <Model onClose={onClose} title="Report Template" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <SelectForm
                        defaultOption="select"
                        label="Template Name"
                        class_="mt-0!"
                        selectClass_="py-2.5! px-2.5!"
                        isRequired={true}
                        formProps={{ ...register("templateName", { required: true }) }}
                        errors={errors} clearErrors={clearErrors}>

                        <option value="naturalTemplate">Natural Template</option>
                    </SelectForm>
                </div>

                <div className="mt-3.5">
                    <div className="font-semibold text-xl">
                        Select Report Sections
                    </div>

                    <div className="flex items-center gap-5 mt-3.5">
                        <CheckboxForm
                            formProps={{ ...register("reviewsOverview") }} errors={errors}
                        />
                        <div>Reviews Overview</div>

                        <CheckboxForm
                            formProps={{ ...register("sentimentAnalysis") }} errors={errors}
                        />
                        <div>Sentiment Analysis</div>

                        <CheckboxForm
                            formProps={{ ...register("campaignPerformance") }} errors={errors}
                        />
                        <div>Campaign Performance</div>
                    </div>
                </div>

                <div className="mt-3.5 inline-block ">
                    <SecondaryButton
                        title="Add Custom Section"
                        class_="text-sm! font-normal! py-2.5! px-2.5!"
                        onClick={onSave}
                    />
                </div>

                <div className="mt-3.5">
                    <div className="font-semibold text-xl">
                        Default Charts
                    </div>

                    <div className="mt-3.5">
                        <div className="flex gap-2.5">
                            <Image src="/images/Frame.png" alt="frame" width={25} height={10} />
                            <h2 className="text-sm">Review Over Time</h2>
                            <CheckboxForm
                                formProps={{ ...register("reviewOverTime") }} errors={errors}
                            />
                        </div>

                        <div className="flex gap-2.5 mt-3.5">
                            <Image src="/images/Frame1.png" alt="frame1" width={25} height={10} />
                            <h2 className="text-sm">Review Rating Distribution</h2>
                            <CheckboxForm
                                formProps={{ ...register("reviewRatingDistribution") }} errors={errors} />
                        </div>

                        <div className="flex gap-2.5 mt-3.5">
                            <Image src="/images/Frame2.png" alt="frame2" width={25} height={10} />
                            <h2 className="text-sm">Top Review Sources</h2>
                            <CheckboxForm
                                formProps={{ ...register("topReviewSources") }} errors={errors}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <SelectForm
                        defaultOption="select"
                        label="Default Schedule"
                        class_="mt-3.5!"
                        selectClass_="py-2.5! px-2.5!"
                        isRequired={true}
                        formProps={{ ...register("select", { required: true }) }}
                        errors={errors} clearErrors={clearErrors}>
                        <option value="weekly">Weekly</option>
                    </SelectForm>
                </div>

                <div className="grid grid-cols-[_1fr_auto] gap-3 mt-3.5 ">
                    <div className="flex items-end gap-3.5">
                        <div className="w-full">
                            <h2 className="text-sm pb-2.5 font-medium">Default Recipients<span className="text-danger">*</span></h2>
                            <div className="w-full border border-primary/10 rounded-lg p-2.5 flex justify-between items-center">
                                <div className="flex gap-[15px]">
                                    <div className="flex gap-[7px] border border-primary/10 rounded-lg p-[5px] items-center">
                                        <Image src="/images/request.png" alt="request" width={17} height={17} />
                                        <h2 className="text-sm">Richard</h2>
                                        <Image unoptimized={true} src="/images/close-square.svg" alt="close-square" width={14} height={14} />
                                    </div>
                                    <div className="flex gap-[7px] border border-primary/10 rounded-lg p-[5px] items-center">
                                        <Image src="/images/request.png" alt="request" width={17} height={17} />
                                        <h2 className="text-sm">Sophia</h2>
                                        <Image unoptimized={true} src="/images/close-square.svg" alt="close-square" width={14} height={14} />
                                    </div>
                                </div>
                                <div>
                                    <Image unoptimized={true} src="/images/copy2.svg" alt="copy2" width={20} height={20} />
                                </div>
                            </div>
                        </div>
                        <div className="w-[20%] mb-1 shrink-0">
                            <SecondaryButton title="Add" onClick={onSave}
                                class_="py-3! px-2.5! text-base! font-normal!"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-[30px]">
                    <CancelButton title="Delete Template" onClick={delete1} class_="text-lg! py-[9px]!" />
                    <SecondaryButton title="Save Changes" type="submit" disabled={sending} class_="text-lg! py-[9px]!" />
                </div>
            </form>
        </Model>
    )
}
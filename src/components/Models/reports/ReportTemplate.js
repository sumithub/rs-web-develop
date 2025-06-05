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
import InputForm from "../../form/InputForm";
import Image from "next/image";

export default function ReportTemplate({ onClose, id, onSave }) {
    const { register, handleSubmit, formState: { errors }, } = useForm();
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
        <Model onClose={onClose} title="Resend Report Email" modalClass="w-[60%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <SelectForm
                        defaultOption="select"
                        label="Template Name"
                        isRequired={true}
                        formProps={{ ...register("select", { required: true }) }}
                        errors={errors}>
                        <option value="naturalTemplate">Natural Template</option>
                    </SelectForm>
                </div>

                <div className="mt-3">
                    <div className="font-semibold text-xl">
                        Select Report Sections
                    </div>

                    <div className="flex justfy-between align-center gap-2 mt-3">
                        <Checkbox />
                        <div>Reviews Overview</div>

                        <Checkbox />
                        <div>Sentiment Analysis</div>

                        <Checkbox />
                        <div>Campaign Performance</div>
                    </div>
                </div>

                <div className="mt-3 inline-block">
                    <SecondaryButton title="Add Custom Section" onClick={onSave} />
                </div>

                <div className="mt-3">
                    <div className="font-semibold text-xl">
                        Default Charts
                    </div>

                    <div className="mt-3">
                        <div className="flex gap-2">
                            <Image src="/images/Frame.png" alt="frame" width={25} height={10} />
                            Review Over Time
                            <Checkbox />
                        </div>

                        <div className="flex gap-2 mt-2">
                            <Image src="/images/Frame1.png" alt="frame1" width={25} height={10} />
                            Review Rating Distribution
                            <Checkbox />
                        </div>

                        <div className="flex gap-2 mt-2">
                            <Image src="/images/Frame2.png" alt="frame2" width={25} height={10} />
                            Top Review Sources
                            <Checkbox />
                        </div>
                    </div>
                </div>

                <div>
                    <SelectForm
                        defaultOption="select"
                        label="Default Schedule"
                        isRequired={true}
                        formProps={{ ...register("select", { required: true }) }}
                        errors={errors}>
                        <option value="naturalTemplate">Weekly</option>
                    </SelectForm>
                </div>

                <div className="grid grid-cols-[_1fr_auto] gap-3 mt-2">
                    <InputForm
                        label="Default Recipients"
                        icon="/images/copy2.svg"
                        isRequired={true}
                        formProps={{ ...register("defaultRecipients", { required: true }) }}
                        errors={errors}
                    />

                    <div className="mt-10">
                        <SecondaryButton title="Add" onClick={onSave} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                    <CancelButton title="Delete Template" onClick={delete1} />
                    <SecondaryButton title="Save Changes" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}
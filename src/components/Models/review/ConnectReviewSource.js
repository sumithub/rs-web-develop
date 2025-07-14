"use client"
import axios from "axios";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import InputForm from "../../form/InputForm";
import SelectForm from "../../form/SelectForm";

export default function ConnectReviewSource({ onClose, onSave, id, data }) {
    const { register, handleSubmit, clearErrors, formState: { errors }, watch, setValue } = useForm();
    const [sending, setSending] = useState(false)
    const { name, url } = data

    useEffect(() => {
        setValue("url", url);
    }, [setValue, url]);

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Connected Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }


    return (
        <Model onClose={onClose} title="Connect Review Source" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>

                {id && <SelectForm
                    class_="mb-3.5 mt-0!"
                    label="Choose Client"
                    isRequired={true}
                    defaultOption="Select"
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("cooldownPeriod", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}>
                    <option value="johnDeo">John Deo</option>
                </SelectForm>}

                <div>
                    <h2 className="text-lg font-semibold">Connect to {name}</h2>
                    <Image unoptimized={true} src="/images/yelp-logo.svg" alt="yelp-logo" width={116} height={47} className="pt-2.5" />
                </div>
                <InputForm
                    label="Business Profile URL"
                    placeholder=""
                    hideOptional={true}
                    isRequired={true}
                    icon2="/images/add-link.svg"
                    defaultValue={watch("url") || ""}
                    infoIcon="/images/url.svg"
                    formProps={{ ...register("url", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                />
                <div className="flex items-center gap-2.5 bg-danger/10 p-2.5 rounded-[7px] mt-[15px]">
                    <Image unoptimized={true} src="/images/warning.svg" alt="warning" width={22} height={22} className="" />
                    <h2 className="text-sm">Paste your business profile URL from the platform's website.</h2>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-[30px]">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg! font-medium!" />
                    <SecondaryButton title="Connect" type="submit" disabled={sending} class_="text-lg! font-medium!" />
                </div>
            </form>
        </Model>
    )
}
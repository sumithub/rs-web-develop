"use client"
import axios from "axios";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputForm from "../../form/InputForm";

export default function ConnectReviewSource({ onClose, onSave, id }) {
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

            toast.success("Connected Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Connect Review Source" modalClass="w-[60%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="font-semibold">
                        Connect to Yelp
                    </div>
                </div>

                <div>
                    <InputForm class_="mt-2!"
                        label="Business Profile URL"
                        isRequired={true}
                        placeholder="https//www.google.com"
                        formProps={{ ...register("tagName", { required: true }) }}
                        errors={errors}
                    />
                    <div className="border border-border-color rounded-md mt-4 bg-[#0396FF1a]">Paste your business profile URL from the platform's website. </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="Connect" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}
"use client"
import axios from "axios";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../../form/Input";
import Image from "next/image";

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
        <Model onClose={onClose} title="Connect Review Source" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className="text-lg font-semibold">Connect to Yelp</h2>
                    <Image unoptimized={true} src="/images/yelp-logo.svg" alt="yelp-logo" width={116} height={47} className="pt-2.5" />
                </div>
                <Input
                    label="Business Profile URL"
                    placeholder="https//www.google.com"
                    hideOptional={true}
                    isRequired={true}
                    icon="/images/add-link.svg"
                    infoIcon="/images/url.svg"
                />
                <div className="flex items-center gap-2.5 bg-danger/10 p-2.5 rounded-[7px] mt-[15px]">
                    <Image unoptimized={true} src="/images/warning.svg" alt="warning" width={22} height={22} className="" />
                    <h2 className="text-sm">Paste your business profile URL from the platform's website.</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[30px]">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg! font-medium! py-3!" />
                    <SecondaryButton title="Connect" type="submit" disabled={sending} class_="text-lg! font-medium! py-3!" />
                </div>
            </form>
        </Model>
    )
}
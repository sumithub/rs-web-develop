import Image from "next/image";
import Model from "../Models/Model";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../../components/form/Input"


export default function TemplatePreview({ onClose, id }) {
    const { handleSubmit } = useForm();
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

            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    const Project = [
        { title: "Customer Name", subtitle: "Johan Deo" },
        { title: "Eamil", subtitle: "Johandeo@gmail.com" },
    ]

    return (
        <Model onClose={onClose} title="Template Preview" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-3">
                    {Project.map((e, i) => <div key={i}>
                        <div className="flex justify-between ">
                            <div className="text-text3 capitalize text-base">{e.title}</div>
                            <div className="font-semibold text-base">{e.subtitle}</div>
                        </div>
                        {i !== Project.length - 1 && (
                            <hr className="my-3 border-t border-secondary/5" />
                        )}
                    </div>)}
                    <hr className="my-3 border-t border-secondary/5" />

                    <Input
                        labelClass="text-base! text-text3!"
                        label="SMS"
                        isTextArea={true} />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                    <CancelButton title="test send" class_="text-lg!" onClick={onClose} />
                    <SecondaryButton title="Edit Template" class_="bg-white! hover:bg-primary! font-normal! text-lg! text-primary! hover:text-white!" isLink={true} link='/create-email-template' />
                    <SecondaryButton title="Confirm & Save" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model >
    )
}
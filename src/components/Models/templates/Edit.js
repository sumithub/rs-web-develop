import { useForm } from "react-hook-form";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import InputForm from "../../form/InputForm";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../helper";
export default function EditTemplate({ onClose, id }) {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)


    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api" + id, data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Updated Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Edit" modalClass="w-1/2! ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputForm label="Template Name" isRequired={true} placeholder="enter name"
                        formProps={{ ...register("template-name", { required: true }) }}
                        errors={errors}
                    />
                    <InputForm label="Type"
                        formProps={{ ...register("type", { required: false }) }}
                        errors={errors}
                    />
                    <InputForm label="Subject"
                        formProps={{ ...register("subject", { required: false }) }}
                        errors={errors}
                    />
                    <InputForm label="Last Updated"
                        formProps={{ ...register("last-updated", { required: false }) }}
                        errors={errors}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="save" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}
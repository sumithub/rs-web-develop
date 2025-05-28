import { useState } from "react";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import InputForm from "../../form/InputForm";
import Model from "../Model";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../helper";

export default function CreateTag({ onClose, id }) {
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
        <Model onClose={onClose} title="Create New Tag" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputForm label="Tag Name" isRequired={true} placeholder="Enter Name"
                        formProps={{ ...register("tag-name", { required: true }) }}
                        errors={errors}
                    />
                    <InputForm label="Color Picker"
                        formProps={{ ...register("color-picker", { required: false }) }}
                        errors={errors}
                    />
                    <InputForm label="Description" isTextArea={true}
                        formProps={{ ...register("description", { required: false }) }}
                        errors={errors}
                    />
                    <InputForm label="Tagged Customers"
                        formProps={{ ...register("tagged-customers", { required: false }) }}
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
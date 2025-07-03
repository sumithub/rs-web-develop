import { useForm } from "react-hook-form";
import { getError } from "../../../../helper";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { useState } from "react";
import { toast } from "react-toastify";
import InputForm from "../../form/InputForm";
import SelectForm from "../../form/SelectForm";
import axios from "axios";

export default function AddNewClient({ onClose, id }) {
    const { handleSubmit, register, setValue, watch, formState: { errors }, clearErrors } = useForm();
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
    return (
        <Model onClose={onClose} title={!id ? "Add New Client" : "Edit"} modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    label="Client Name"
                    class_="mt-0!"
                    placeholder="Enter client name"
                    isRequired={true}
                    formProps={{ ...register("name", { required: true }) }}
                    errors={errors} />

                <InputForm
                    label="Industry"
                    placeholder="Enter industry"
                    isRequired={true}
                    formProps={{ ...register("industry", { required: true }) }}
                    errors={errors} />

                <SelectForm
                    label="Subscription Plan"
                    isRequired={true}
                    defaultOption="select"
                    formProps={{ ...register("plan", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="plan">Professional Plan</option>
                </SelectForm>

                <SelectForm
                    label="Status"
                    isRequired={true}
                    defaultOption="select"
                    formProps={{ ...register("status", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </SelectForm>
                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="Save" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}
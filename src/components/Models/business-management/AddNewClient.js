import { useForm } from "react-hook-form";
import { getError } from "../../../../helper";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { useState } from "react";
import { toast } from "react-toastify";
import InputForm from "../../form/InputForm";
import SelectForm from "../../form/SelectForm";

export default function AddNewClient({ onClose }) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async () => {
        try {
            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Add New Client" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    label="Client Name"
                    isRequired={true}
                    formProps={{ ...register("name", { required: true }) }}
                    errors={errors} />

                <InputForm
                    label="Industry"
                    isRequired={true}
                    formProps={{ ...register("industry", { required: true }) }}
                    errors={errors} />

                <SelectForm
                    label="Subscription Plan"
                    isRequired={true}
                    defaultOption="select"
                    formProps={{ ...register("plan", { required: true }) }}
                    errors={errors}
                >
                    <option value="plan">Professional Plan</option>
                </SelectForm>

                <SelectForm
                    label="Status"
                    isRequired={true}
                    defaultOption="select"
                    formProps={{ ...register("status", { required: true }) }}
                    errors={errors}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </SelectForm>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="Save" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}
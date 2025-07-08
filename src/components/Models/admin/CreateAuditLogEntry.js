import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import InputForm from "../../form/InputForm";
import SelectForm from "../../form/SelectForm";

export default function CreateAuditLogEntry({ onClose, id }) {
    const { handleSubmit, register, formState: { errors }, clearErrors, setValue, watch } = useForm();
    const [sending, setSending] = useState("")

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
        <Model onClose={onClose} title={`${!id ? "Create" : "Edit"} Audit Log Entry`} modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>

                <SelectForm
                    label="Subscription Id"
                    isRequired={true}
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("subscriptionId", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="sub101">SUB-101</option>
                    <option value="sub102">SUB-102</option>
                    <option value="sub103">SUB-103</option>
                </SelectForm>

                <SelectForm
                    label="Action"
                    isRequired={true}
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("action", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="created">Created</option>
                    <option value="updated">Updated</option>
                    <option value="cancelled">Cancelled</option>
                </SelectForm>

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Detail"
                    rows={5}
                    isRequired={false}
                    isTextArea={true}
                    placeholder="XYZ.."
                    formProps={{ ...register("detail", { required: false }) }}
                    errors={errors}
                />

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Preformed By"
                    rows={5}
                    isRequired={true}
                    placeholder=""
                    formProps={{ ...register("performedBy", { required: true }) }}
                    errors={errors}
                />

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Timestamp"
                    rows={5}
                    inputType="date"
                    isRequired={true}
                    placeholder=""
                    formProps={{ ...register("timestamp", { required: true }) }}
                    errors={errors}
                />

                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Save Entry" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  
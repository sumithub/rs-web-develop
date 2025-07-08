import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import InputForm from "../../form/InputForm";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import SelectClientList from "../../Models/admin/SelectClientList"
import SelectForm from "../../form/SelectForm";

export default function CreateNewAlert({ onClose, id }) {
    const { register, handleSubmit, formState: { errors }, clearErrors, setValue, watch } = useForm();
    const [sending, setSending] = useState("")
    const [openClient, setOpenClient] = useState(false)

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
        <Model onClose={onClose} title={` ${!id ? "Create" : "Edit"} New Alert`} modalClass="w-1/2!">
            {openClient &&
                <SelectClientList
                    onClose={() => {
                        setOpenClient(false)
                    }}

                    onSave={() => {
                        setOpenClient(true)
                    }} />
            }
            <form onSubmit={handleSubmit(onSubmit)}>

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    class_="mt-0!"
                    label="Alert Name"
                    labelClass="mb-2.5"
                    rows={5}
                    isRequired={true}
                    placeholder="Enter alert name"
                    formProps={{ ...register("alertName", { required: true }) }}
                    errors={errors}
                />

                <SelectForm
                    label="Client Scope"
                    isRequired={true}
                    defaultOption=""
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("clientScope", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="allClient">All Client</option>
                    <option value="xyzAuto">XYZ Auto</option>
                </SelectForm>

                <SelectForm
                    label="Trigger Event"
                    isRequired={true}
                    defaultOption=""
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("triggerEvent", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="rating">Rating</option>
                    <option value="smsFailure">SMS Failure</option>
                </SelectForm>

                <SelectForm
                    label="Delivery Method"
                    isRequired={true}
                    defaultOption=""
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("deliveryMethod", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="email+inApp">Email + In-App</option>
                    <option value="inAppOnly">In-App Only</option>
                </SelectForm>

                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Save Rule" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  
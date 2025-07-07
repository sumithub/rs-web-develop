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

export default function CreateFeature({ onClose, id }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
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
        <Model onClose={onClose} title={` ${!id ? "Create" : "Edit"} Feature`} modalClass="w-1/2!">
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
                    label="Feature Name"
                    labelClass="mb-2.5"
                    rows={5}
                    isRequired={true}
                    placeholder="Enter feature name"
                    formProps={{ ...register("name", { required: true }) }}
                    errors={errors}
                />

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Description"
                    labelClass="mb-2.5"
                    rows={5}
                    isRequired={true}
                    placeholder="Enter description"
                    formProps={{ ...register("description", { required: true }) }}
                    errors={errors}
                />

                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Save" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  
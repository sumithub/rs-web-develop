"use client"
import { useState } from "react";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import InputForm from "../../form/InputForm";
import Model from "../Model";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../helper";
import SelectForm from "../../form/SelectForm";
import SelectedCustomers from "../manage-campaigns/SelectedFromCustomers";

export default function CreateCustomersTag({ onClose, id }) {
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, setValue, watch, formState: { errors }, clearErrors } = useForm();
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
        <Model onClose={onClose} title={!id ? "Create Customer Tag" : "Edit Customer Tag"} modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                {open &&
                    <SelectedCustomers
                        onClose={() => {
                            setOpen(false)
                        }}

                        onSave={() => {
                            setOpen(true)
                        }}
                    />
                }
                <div>
                    <SelectForm
                        label="Link Client"
                        defaultOption="Select Clients"
                        class_="mt-0!"
                        selectClass_="py-2.5! px-2.5!"
                        isRequired={false}
                        formProps={{ ...register("linkClients", { required: false }) }}
                        errors={errors} clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="client1">Client 1</option>
                        <option value="client2">Client 2</option>
                    </SelectForm>

                    <InputForm
                        class_="mt-2!"
                        label="Tag Name"
                        isRequired={true}
                        placeholder="Enter Tag Name"
                        formProps={{ ...register("tagName", { required: true }) }}
                        errors={errors}
                    />

                    <InputForm class_="mt-2!"
                        label="Description"
                        isRequired={true}
                        isTextArea={true}
                        placeholder="Enter Description"
                        formProps={{ ...register("description", { required: true }) }}
                        errors={errors}
                    />

                    <div className="flex justify-between items-center mt-3.5">
                        <div className="font-semibold text-lg">
                            Select Customers From List
                        </div>
                        <SecondaryButton title="add customers" type="button" onClick={() => { setOpen(true) }} class_="text-xs font-normal py-2.5!" />
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="save tag" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}
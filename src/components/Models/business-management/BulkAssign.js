"use client"
import { useState } from "react";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../helper";
import SelectForm from "../../form/SelectForm";

export default function BulkAssign({ onClose, id }) {
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

            toast.success("Tag Removed Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title="Bulk Assign" modalClass="w-[70%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <SelectForm
                        label="Filter By Clients"
                        defaultOption="Clients"
                        class_="mt-0!"
                        selectClass_="py-2.5! px-2.5!"
                        isRequired={true}
                        formProps={{ ...register("filterByClients", { required: true }) }}
                        errors={errors} clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="clientA">Client A</option>
                        <option value="clientB">Client B</option>
                    </SelectForm>

                    <div className="flex justify-between mt-3">
                        <div className="text-primary">Selected Items</div>
                        <div className="text-primary">45 Customers</div>
                    </div>

                    <div className="mt-3">
                        <div className="font-semibold">Available Tags</div>
                        <SelectForm class_="w-[10%]! text-primary" defaultOption="select"
                            setValue={setValue}
                            watch={watch}
                        >
                            <option value="vip1">VIP (01)</option>
                            <option value="vip2">VIP (02)</option>
                            <option value="vip3">VIP (03)</option>
                            <option value="vip4">VIP (04)</option>
                            <option value="vip5">VIP (05)</option>
                        </SelectForm>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Assign Tag to Selected" onClick={() => {
                        toast.success("Assigned Successfully")
                        onClose()
                    }} class_="text-lg! bg-white! hover:bg-primary! text-lg! text-primary! hover:text-white!" />
                    <SecondaryButton title="Remove Tag from Selected" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}
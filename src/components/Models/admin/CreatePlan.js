import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import SelectForm from "../../form/SelectForm";
import InputForm from "../../form/InputForm";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import CheckboxForm from "../../form/CheckboxForm";
import SelectClientList from "../../Models/admin/SelectClientList"

export default function CreatePlan({ onClose, id }) {
    const { register, handleSubmit, setValue, formState: { errors }, watch, clearErrors } = useForm();
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
        <Model onClose={onClose} title={` ${!id ? "Create" : "Edit"} Plan`} modalClass="w-1/2!">
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

                <SelectForm
                    label="Plan Name"
                    isRequired={true}
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                    formProps={{ ...register("planName", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                </SelectForm>


                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Price ($/Mo)"
                    isRequired={false}
                    placeholder="Enter price"
                    formProps={{ ...register("price", { required: false }) }}
                    errors={errors}
                />

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Discount (%)"
                    rows={5}
                    isRequired={false}
                    placeholder="Enter discount"
                    formProps={{ ...register("discount", { required: false }) }}
                    errors={errors}
                />

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="Email Quota"
                    rows={5}
                    isRequired={false}
                    placeholder="Enter email quota"
                    formProps={{ ...register("email", { required: false }) }}
                    errors={errors}
                />

                <InputForm
                    inputClass='border-primary/10! focus:border-primary/60!'
                    label="SMS Quota"
                    rows={5}
                    isRequired={false}
                    placeholder="Enter SMS quota"
                    formProps={{ ...register("sms", { required: false }) }}
                    errors={errors}
                />

                <div className="mt-3">
                    <div>Features</div>
                    <div className="flex items-start gap-4">
                        <CheckboxForm
                            label="Features-1"
                            class_='flex flex-row-reverse gap-4'
                        />
                        <CheckboxForm
                            label="Features-2"
                            class_='flex flex-row-reverse gap-4'
                        />
                        <CheckboxForm
                            label="Features-3"
                            class_='flex flex-row-reverse gap-4'
                        />
                        <CheckboxForm
                            label="Features-4"
                            class_='flex flex-row-reverse gap-4'
                        />
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Save" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  
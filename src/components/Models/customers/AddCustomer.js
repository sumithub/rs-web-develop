import { toast } from "react-toastify"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import Radio from "../../form/Radio"
import SelectForm from "../../form/SelectForm"
import Model from "../Model"
import { getError } from "../../../../helper"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"

function AddCustomer({ onClose, id }) {
    const { register, handleSubmit, clearErrors, formState: { errors }, } = useForm();
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

            toast.success("Customer Added Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return <Model onClose={onClose} title="Add new Customer" modalClass="w-1/2!">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="flex items-center">
                    <Radio label="manually" />
                    <Radio label="import" />
                </div>
                <div>
                    <InputForm label="Customer Name" placeholder="Enter your name" isRequired={true} class_="mt-0!"
                        formProps={{ ...register("customer-name", { required: true }) }}
                        errors={errors} />
                    <InputForm label="Email" placeholder="Enter email" isRequired={true}
                        formProps={{ ...register("email", { required: true }) }}
                        errors={errors} />
                    <InputForm label="Phone" placeholder="Enter phone number" inputType="number" isRequired={true}
                        formProps={{ ...register("phone", { required: true }) }}
                        errors={errors} />
                    <SelectForm label="Tag" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                        formProps={{ ...register("tag", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    >
                        <option value="high value">High Value</option>
                    </SelectForm>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" onClick={onClose} />
                <SecondaryButton title=" Apply Changes" type="submit" disabled={sending} />
            </div>
        </form>
    </Model>

}

export default AddCustomer
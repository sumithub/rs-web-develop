"use client"
import { toast } from "react-toastify"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import Radio from "../../form/Radio"
import SelectForm from "../../form/SelectForm"
import Model from "../Model"
import { getError, validEmailRgx } from "../../../../helper"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import PhoneForm from "../../form/PhoneForm"
import Image from "next/image"
import ImportCustomer from "../customers/ImportCustomer"
import { useRole } from "../../../utils/hooks"

function AddCustomer({ onClose, id, onSave }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)
    const [type, setType] = useState("manually")
    const [activeStep, setActiveStep] = useState(1);
    const { isAdmin } = useRole();


    const handleViewChange = (event) => {
        setType(event.target.value);
    };

    const handleBackClick = () => {
        setType("manually");
    };

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }
            if (onSave) {
                onSave(data)
            }
            toast.success(!id ? "Customer Added Successfully" : "Customer Updated Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return <Model onClose={onClose} title={activeStep === 6 ? "Customers Imported Successfully!" : type === "import" ? "Import Customers" : (!id ? "Add New Customer" : "Edit Customer")} modalClass={`${type === "manually" ? "w-1/2!" : "w-[60%]!"}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {!id && activeStep !== 6 && <div className="flex gap-4 items-center">
                    <button type="button" onClick={handleBackClick}><Image src="/images/arrow-box.svg" alt="arrow" height={30} width={30} unoptimized={true} /></button>

                    <Radio
                        label="manually"
                        class_="mt-0!"
                        value="manually"
                        checked={type === 'manually'}
                        onChange={handleViewChange}
                    />
                    <Radio label="import"
                        class_="mt-0!"
                        value="import"
                        checked={type === 'import'}
                        onChange={handleViewChange}
                    />
                </div>}

                {type === "manually" && <div>
                    <div>
                        <div>
                            <InputForm
                                inputClass="py-3.5!"
                                class_={`${!id ? "" : "mt-0!"}`}
                                label="Customer Name"
                                placeholder="Enter your name"
                                isRequired={true}
                                formProps={{ ...register("customerName", { required: true }) }}
                                errors={errors} />

                            <InputForm
                                inputClass="py-3.5!"
                                label="Email"
                                placeholder="Enter email"
                                isRequired={true}
                                formProps={{
                                    ...register("email", {
                                        required: true, pattern: {
                                            value: validEmailRgx,
                                            message: "Email is invalid."
                                        },
                                    })
                                }}
                                errors={errors} />

                            <PhoneForm label="Primary Phone"
                                placeholder="Enter phone number"
                                isRequired={true}
                                formProps={{ ...register("phone", { required: true }) }}
                                errors={errors}
                                clearErrors={clearErrors}
                                setValue={setValue}
                                watch={watch} />
                        </div>

                        {!isAdmin && <SelectForm label="Tag"
                            setValue={setValue}
                            watch={watch}
                            isRequired={false} selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                            formProps={{ ...register("tag", { required: false }) }}
                            errors={errors} clearErrors={clearErrors}>

                            <option value="high value">High Value</option>
                            <option value="loyal">Loyal</option>
                            <option value="instead of source">instead of source</option>
                        </SelectForm>}

                        {isAdmin && <InputForm
                            inputClass="py-3.5!"
                            label="Tags"
                            isRequired={true}
                            formProps={{ ...register("tags", { required: true }) }}
                            errors={errors} />}


                        {isAdmin && <InputForm
                            inputClass="py-3.5!"
                            label="Client"
                            isRequired={true}
                            formProps={{ ...register("client", { required: true }) }}
                            errors={errors} />}
                    </div>
                </div>}
            </div>

            {type === "manually" && <div className="grid grid-cols-2 gap-5 mt-7">
                <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                <SecondaryButton title="Apply Changes" type="submit" disabled={sending} class_="text-lg!" />
            </div>}
        </form>

        {type === "import" && !id && <div>
            <ImportCustomer
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                onClose={onClose} />
        </div>}
    </Model>
}

export default AddCustomer
"use client"
import { toast } from "react-toastify"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import RadioForm from "../../form/RadioForm"
import Radio from "../../form/Radio"
import SelectForm from "../../form/SelectForm"
import Model from "../Model"
import { getError } from "../../../../helper"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import PhoneForm from "../../form/PhoneForm"
import Image from "next/image"
import ImportCustomer from "../customers/ImportCustomer"

function AddCustomer({ onClose, id }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)
    const [type, setType] = useState("manually")
    const [activeStep, setActiveStep] = useState(1);

    const handleViewChange = (event) => {
        setType(event.target.value);
    };

    const handleBackClick = () => {
        setType("manually");
    };

    //  const handleBackClick = () => {
    //     if (type === "import") {

    //         setType("manually");
    //     } else {
    //         onClose();
    //     }
    // };


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
    return <Model onClose={onClose} title={activeStep === 6 ? "Customers Imported Successfully!" : type === "import" ? "Import Customers" : (!id ? "Add new Customer" : "Edit Customers List")} modalClass="w-[65%]!">
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
                        {!id && <div>
                            <InputForm label="Customer Name" placeholder="Enter your name" isRequired={true}
                                formProps={{ ...register("customerName", { required: true }) }}
                                errors={errors} />

                            <InputForm label="Email" placeholder="Enter email" isRequired={true}
                                formProps={{ ...register("email", { required: true }) }}
                                errors={errors} />

                            <PhoneForm label="Primary Phone"
                                placeholder="Enter phone number"
                                isRequired={true}
                                formProps={{ ...register("phone", { required: true }) }}
                                errors={errors}
                                clearErrors={clearErrors}
                                setValue={setValue}
                                watch={watch} />
                        </div>}
                        {id && <InputForm label="List Name" placeholder="Enter List Name" isRequired={true}
                            formProps={{ ...register("listName", { required: true }) }}
                            errors={errors} />}

                        <SelectForm label="Tag" isRequired={false} selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                            formProps={{ ...register("tag", { required: false }) }} errors={errors} clearErrors={clearErrors}>
                            <option value="high value">High Value</option>
                            <option value="loyal">Loyal</option>
                            <option value="instead of source">instead of source</option>
                        </SelectForm>
                    </div>

                    {id && <div>
                        <div className="mt-4">
                            <div className="text-sm text-secondary font-medium">Duplicate Handling<span className="text-danger">*</span></div>

                            <div className="flex items-center gap-4">
                                <RadioForm label="Ignore duplicates"
                                    class_="mt-2!"
                                    name="duplicateHandling"
                                    formProps={{ ...register("duplicateHandling", { required: true }) }}
                                    errors={errors}
                                />
                                <RadioForm
                                    label="Overwrite existing"
                                    class_="mt-2!"
                                    name="duplicateHandling"
                                    formProps={{ ...register("duplicateHandling", { required: true }) }}
                                    errors={errors}
                                />
                                <RadioForm
                                    label="Allow duplicates"
                                    class_="mt-2!"
                                    name="duplicateHandling"
                                    formProps={{ ...register("duplicateHandling", { required: true }) }}
                                    errors={errors} />
                            </div>
                        </div>
                    </div>}
                </div>}
            </div>

            {type === "manually" && <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" onClick={onClose} />
                <SecondaryButton title=" Apply Changes" type="submit" disabled={sending} />
            </div>}
        </form>

        {type === "import" && <div className="mt-8">
            <ImportCustomer
                activeStep={activeStep}
                setActiveStep={setActiveStep} />
        </div>}
    </Model>

}

export default AddCustomer
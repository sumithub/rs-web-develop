"use client"
import { toast } from "react-toastify"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import Model from "../Model"
import { getError, validEmailRgx } from "../../../../helper"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import SelectForm from "../../form/SelectForm"
import ResetPassword from "../organization/Password"

function UserCreation({ onClose, id, onSave }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)
    const [open, setOpen] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if ("add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }
            if (onSave) {
                onSave(data)
            }
            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return <Model onClose={onClose} title={!id ? "User Creation" : "Edit User"} modalClass="w-1/2!" >
        {open &&
            <ResetPassword
                onClose={() => {
                    setOpen(false)
                }}

                onSave={() => {
                    setOpen(true)
                }} />
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <InputForm label="Name"
                        placeholder="Enter your name"
                        class_="mt-0!"
                        isRequired={true}
                        formProps={{ ...register("name", { required: true }) }}
                        errors={errors} />

                    <InputForm
                        label="Email"
                        name="email"
                        clearValue={true}
                        placeholder="Enter Your Email Address"
                        isRequired={true}
                        errors={errors}
                        formProps={{
                            ...register("email", {
                                required: true,
                                pattern: {
                                    value: validEmailRgx,
                                    message: "Please enter a valid email address.",
                                },
                            }),
                        }}
                        setValue={setValue}
                        watch={watch}
                    />

                    <SelectForm
                        label="Role"
                        selectClass_="py-2.5! px-2.5!"
                        isRequired={true}
                        formProps={{ ...register("role", { required: true }) }}
                        errors={errors} clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="admin">Admin</option>
                        <option value="owner">Owner</option>
                        <option value="manager">Manager</option>
                        <option value="guest">Guest</option>
                    </SelectForm>

                    <SelectForm
                        label="Status"
                        selectClass_="py-2.5! px-2.5!"
                        isRequired={true}
                        formProps={{ ...register("status", { required: true }) }}
                        errors={errors} clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="activate">Activate</option>
                    </SelectForm>

                    <SelectForm
                        label="Assign To Client"
                        selectClass_="py-2.5! px-2.5!"
                        isRequired={true}
                        formProps={{ ...register("assignToClient", { required: true }) }}
                        errors={errors} clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="client1">Client 1</option>
                        <option value="client2">Client 2</option>
                    </SelectForm>

                    <SelectForm
                        label="Assign To Location"
                        selectClass_="py-2.5! px-2.5!"
                        isRequired={true}
                        formProps={{ ...register("assignToLocation", { required: true }) }}
                        errors={errors} clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="location1">Location 1</option>
                        <option value="location2">Location 2</option>
                    </SelectForm>

                    <div className="mt-5">
                        <div className="font-semibold">Password Management</div>

                        <div className="flex justify-between items-center mt-4">
                            <div>Reset Password Link</div>
                            <button type="button" onClick={() => setOpen(true)}>
                                <div className="text-primary underline">Sends A Reset Link To Email</div>
                            </button>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                            <div>Change Password</div>
                            <button type="button">
                                <div className="text-primary underline">Opens Password Update Form</div>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-[30px]">
                <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                <SecondaryButton title="save changes" type="submit" disabled={sending} class_="text-lg!" />
            </div>
        </form>
    </Model>
}

export default UserCreation
"use client"
import { useState } from "react"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import PhoneForm from "../../form/PhoneForm"
import SelectForm from "../../form/SelectForm"
import Model from "../Model"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { getError, validEmailRgx } from "../../../../helper"
import SendInvite from "./SendInvite"

function AddUser({ onClose, id, isInvite }) {
    const { register, setValue, handleSubmit, clearErrors, formState: { errors }, watch, trigger, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            status: '',
            role: ''
        }
    });
    const [sending, setSending] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const onSubmit = async (data) => {
        if (isInvite) {
            // For invite, just open the modal after validation
            setOpenModal(true)
            return
        }

        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Changes Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    const handleInviteClick = async (e) => {
        e.preventDefault()

        // Get current form values
        const values = getValues()

        // Manual validation check
        let hasErrors = false
        const newErrors = {}

        if (!values.name || values.name.trim() === '') {
            hasErrors = true
        }

        if (!values.email || values.email.trim() === '') {
            hasErrors = true
        } else if (!validEmailRgx.test(values.email)) {
            hasErrors = true
        }

        if (!values.status || values.status === '') {
            hasErrors = true
        }

        if (!values.role || values.role === '') {
            hasErrors = true
        }

        if (hasErrors) {
            // Trigger validation to show errors
            await trigger(['name', 'email', 'status', 'role'])
            toast.error("Please fill all required fields correctly")
            return
        }

        // All fields are valid, clear errors and open modal
        clearErrors()
        setOpenModal(true)
    }

    return <Model onClose={onClose} title={(!id ? "Invite New User" : "Edit User Details")} modalClass="w-1/2!">
        {openModal &&
            <SendInvite
                onClose={() => {
                    setOpenModal(false)
                }} />
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <InputForm label="Full Name" placeholder="Enter your name" isRequired={true} class_="mt-0!"
                    formProps={{
                        ...register("name", {
                            required: "Full name is required",
                            onChange: () => {
                                if (errors.name) clearErrors('name')
                            }
                        })
                    }}
                    errors={errors}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                <InputForm label="Email Address" placeholder="Enter email" isRequired={true} errors={errors}
                    formProps={{
                        ...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: validEmailRgx,
                                message: "Email is invalid."
                            },
                            onChange: () => {
                                if (errors.email) clearErrors('email')
                            }
                        })
                    }}
                    clearErrors={clearErrors}
                    setValue={setValue}
                />

                <PhoneForm label="Primary Phone"
                    placeholder="Enter phone number (optional)"
                    formProps={{ ...register("phone", { required: false }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch} />

                <SelectForm label="Status"
                    selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                    isRequired={true}
                    formProps={{
                        ...register("status", {
                            required: "Status is required",
                            onChange: () => {
                                if (errors.status) clearErrors('status')
                            }
                        })
                    }}
                    errors={errors}
                    clearErrors={clearErrors} defaultOption="Select Status">
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending invite">Pending Invite</option>
                </SelectForm>

                <SelectForm label="Role" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                    formProps={{
                        ...register("role", {
                            required: "Role is required",
                            onChange: () => {
                                if (errors.role) clearErrors('role')
                            }
                        })
                    }}
                    errors={errors}
                    clearErrors={clearErrors}
                    defaultOption="Select Role">
                    <option value="owner">Owner</option>
                    <option value="manager">Manager</option>
                    <option value="viewer">Viewer</option>
                </SelectForm>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" onClick={onClose} />
                {isInvite && (
                    <SecondaryButton
                        title="Send Invite"
                        type="button"
                        disabled={sending}
                        onClick={handleInviteClick}
                    />
                )}
                {!isInvite && <SecondaryButton title="Save changes" type="submit" disabled={sending} />}
            </div>
        </form>
    </Model>
}

export default AddUser
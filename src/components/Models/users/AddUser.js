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
    const { register, setValue, handleSubmit, clearErrors, formState: { errors }, watch } = useForm();
    // const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            { !isInvite && toast.success("Changes Saved Successfully") }
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    //    const onSubmit = async (data) => {
    //     try {
    //         setSending(true)
    //         let res = null

    //         if (id !== "add") {
    //             res = await axios.put("/api/users/" + id, data)
    //         } else {
    //             res = await axios.post("/api/users", data)
    //         }
    //         if (res.status === 200) {
    //             toast.success("Updated Successfully")
    //             setSending(false)

    //         } else {
    //             toast.error("Something went wrong")
    //             setSending(false)
    //         }
    //     } catch (error) {
    //         toast.error(error)
    //         setSending(false)
    //     }
    // }
    //     try {
    //         setLoading(true);
    //         let res = await axios.post("/", data);
    //         if (res.status === 200) {
    //             toast.success("Submitted Successfully");
    //             {
    //                 setSending(false);
    //                 setValue("")
    //             };
    //         }

    //     } catch (error) {
    //         setSending(false);
    //         toast.error("Something went wrong");
    //     }
    // };

    return <Model onClose={onClose} title={isInvite ? "Invite New User" : "Edit User Details"} modalClass="w-1/2!">
        {openModal &&
            <SendInvite
                onClose={() => {
                    setOpenModal(false)
                }} />
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <InputForm label="Full Name" placeholder="Enter your name" isRequired={true} class_="mt-0!"
                    formProps={{ ...register("name", { required: true }) }}
                    errors={errors}
                    setValue={setValue}

                />

                <InputForm label="Email Address" placeholder="Enter email" isRequired={true} errors={errors}
                    formProps={{
                        ...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: validEmailRgx,
                                message: "Email is invalid."
                            },

                        })
                    }}
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
                    formProps={{ ...register("status", { required: true }) }} errors={errors} clearErrors={clearErrors}>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending invite">Pending Invite</option>
                </SelectForm>

                <SelectForm label="Role" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                    formProps={{ ...register("role", { required: true }) }} errors={errors} clearErrors={clearErrors}>
                    <option value="owner">Owner</option>
                    <option value="manager">Manager</option>
                    <option value="viewer">Viewer</option>
                </SelectForm>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" onClick={onClose} />
                {isInvite && <SecondaryButton title="Send Invite" type="submit" disabled={sending} onClick={() => { setOpenModal(true) }} />}
                {!isInvite && <SecondaryButton title="Save changes" type="submit" disabled={sending} />}
            </div>
        </form>
    </Model>

}

export default AddUser
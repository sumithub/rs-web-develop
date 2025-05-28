"use client"
import { useState } from "react"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import SelectForm from "../../form/SelectForm"
import Model from "../Model"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { getError, validEmailRgx } from "../../../../helper"

function AddUser({ onClose, id }) {
    const { register, setValue, handleSubmit, clearErrors, formState: { errors }, } = useForm();
    // const [loading, setLoading] = useState(false);
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

            toast.success("Invite New User Successfully")
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
    console.log(errors)

    return <Model onClose={onClose} title={`${!id ? "Invite New" : "Edit"} User`} modalClass="w-1/2!">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <InputForm label="Full Name" placeholder="Enter your name" isRequired={true} class_="mt-0!"
                    formProps={{ ...register("name", { required: true, pattern: { message: "Name is required" } }) }}
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

                <InputForm label="Phone Number" placeholder="Enter phone number" inputType="number"
                    formProps={{ ...register("phone", { required: false }) }}
                    errors={errors}
                    setValue={setValue}

                />

                <SelectForm label="Status"
                    selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                    isRequired={true}
                    formProps={{ ...register("status", { required: true }) }} errors={errors} clearErrors={clearErrors}
                >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending invite">Pending Invite</option>
                </SelectForm>

                {/* <Select label="Status" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!">
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending invite">Pending Invite</option>
                </Select> */}

                <SelectForm label="Role" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                    formProps={{ ...register("role", { required: true }) }} errors={errors} clearErrors={clearErrors}>
                    <option value="owner">Owner</option>
                    <option value="manager">Manager</option>
                    <option value="viewer">Viewer</option>
                </SelectForm>
                {/* <Select label="Role" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!">
                    <option value="owner">Owner</option>
                    <option value="manager">Manager</option>
                    <option value="viewer">Viewer</option>
                </Select> */}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" onClick={onClose} />
                <SecondaryButton title="Send Invite" type="submit" disabled={sending} />
            </div>
        </form>
    </Model>

}

export default AddUser
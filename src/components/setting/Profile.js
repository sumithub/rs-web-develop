"use client"
import Image from "next/image";
import InputForm from "../form/InputForm";
import SelectForm from "../form/SelectForm";
import SecondaryButton from "../common/SecondaryButton";
import CancelButton from "../common/CancelButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { getError, validEmailRgx, validPasswordRgx } from "../../../helper";
import { toast } from "react-toastify";
import PhoneForm from "../form/PhoneForm";
export default function Profile({ id }) {
    const { register, setValue, handleSubmit, clearErrors, formState: { errors }, watch } = useForm();
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

            toast.success("Changes Saved Successfully")
            setSending(false)
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <div>
            <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h2 className="text-lg font-semibold py-[11px]">My Profile</h2>
                        <div className="flex items-center pt-[15px] gap-[15px]">
                            <Image src="/images/profile-pic.png" alt="profile-pic" width={70} height={70} />
                            <CancelButton title="Upload New Picture" class_="bg-primary/5! text-primary! p-2.5 text-sm rounded-[10px]" />
                        </div>
                    </div>
                    <div className="pt-[25px]">
                        <h2 className="text-lg font-semibold">Basic Information</h2>
                        <div className="grid grid-cols-2 gap-5 pt-[25px]">
                            <InputForm
                                label="Full Name"
                                placeholder="Enter name"
                                inputClass="border-primary/10"
                                class_="mt-0!"
                                isRequired={true}
                                formProps={{ ...register("name", { required: true }) }}
                                errors={errors}
                                setValue={setValue}
                            />
                            <InputForm
                                label="E-Mail"
                                placeholder="Enter email"
                                inputClass="border-primary/10"
                                class_="mt-0!"
                                isRequired={true}
                                formProps={{
                                    ...register("email", {
                                        required: true,
                                        pattern: {
                                            value: validEmailRgx,
                                            message: "Email is invalid."
                                        },
                                    })
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5 pt-5">
                            <PhoneForm
                                label="Phone Number"
                                placeholder="Enter phone number "
                                formProps={{ ...register("phone", { required: false }) }}
                                errors={errors}
                                clearErrors={clearErrors}
                                setValue={setValue}
                                watch={watch} />
                            <SelectForm label="Time Zone"
                                selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                                isRequired={false}
                                defaultOption="select"
                                formProps={{ ...register("timeZone", { required: false }) }} errors={errors} clearErrors={clearErrors}>
                                <option value="email template">(GMT+10:00) Sydney</option>
                            </SelectForm>
                        </div>
                        <div className="pt-5">
                            <InputForm
                                label="Company"
                                labelClass=""
                                placeholder="Enter company name"
                                inputClass="border-primary/10"
                                class_="mt-0!"
                                isRequired={true}
                                formProps={{ ...register("company", { required: true }) }}
                                errors={errors}
                                setValue={setValue}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5 pt-6">
                            <CancelButton title=" Cancel Changes" class_="text-lg!" />
                            <SecondaryButton title="Save Changes" type="submit" disabled={sending} class_="text-lg!" />
                        </div>
                    </div>
                </form>
            </>

            <div className="pt-[25px]">
                <h2 className="text-lg font-semibold">Change Password</h2>
                <div className="grid grid-cols-2 gap-5 pt-[25px]">
                    <InputForm
                        label="Password"
                        labelClass=""
                        placeholder="Enter Password"
                        inputType="password"
                        inputClass="border-primary/10"
                        class_="mt-0!"
                        isRequired={true}
                        formProps={{
                            ...register("password", {
                                required: true,
                                pattern: {
                                    value: validPasswordRgx,
                                    message:
                                        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
                                },
                            }),
                        }}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                    />

                    <InputForm
                        label="New Password"
                        labelClass=""
                        placeholder="Enter New Password"
                        inputType="password"
                        inputClass="border-primary/10"
                        class_="mt-0!"
                        isRequired={true}
                        formProps={{
                            ...register("newPassword", {
                                required: true,
                                pattern: {
                                    value: validPasswordRgx,
                                    message:
                                        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
                                },
                                validate: (value) =>
                                    value !== watch("password") ||
                                    "New password must be different from current password.",
                            }),
                        }}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                    />
                </div>

                <div className="flex items-center gap-[10px] pt-[25px]">
                    <Image src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                    <h2 className="capitalize text-sm font-medium">This action is irreversible!</h2>
                </div>

                <div className="grid grid-cols-2 gap-5 pt-[25px] pb-8">
                    <CancelButton title="Delete Account" class_="text-lg!" />
                    <SecondaryButton
                        title="Update Password"
                        class_="text-lg!"
                        type="submit"
                        disabled={sending}
                    />
                </div>
            </div>
        </div>
    )
}
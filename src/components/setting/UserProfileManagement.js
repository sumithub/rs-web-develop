"use client"
import Image from "next/image";
import InputForm from "../form/InputForm";
import SelectForm from "../form/SelectForm";
import SecondaryButton from "../common/SecondaryButton";
import CancelButton from "../common/CancelButton";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { getError, validEmailRgx, validPasswordRgx } from "../../../helper";
import { toast } from "react-toastify";
import PhoneForm from "../form/PhoneForm";
import Loading from "../Loading";

export default function Profile({ id }) {
    // Profile form
    const profileForm = useForm();
    // Password form
    const passwordForm = useForm();
    
    const [sending, setSending] = useState(false);
    const [updatingPassword, setUpdatingPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Load profile data on component mount
    useEffect(() => {
        if (id && id !== "add") {
            loadProfileData();
        }
    }, [id]);

    const loadProfileData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/profile/${id}`);
            const data = res.data;
            
            // Set profile form values
            profileForm.setValue("name", data.name || "");
            profileForm.setValue("email", data.email || "");
            profileForm.setValue("phone", data.phone || "");
            profileForm.setValue("timeZone", data.timeZone || "");
            profileForm.setValue("company", data.company || "");
            
            setLoading(false);
        } catch (error) {
            toast.error(getError(error));
            setLoading(false);
        }
    };

    // Handle profile form submission
    const onProfileSubmit = async (data) => {
        try {
            setSending(true);
            let res = null;

            if (id !== "add") {
                res = await axios.put(`/api/profile/${id}`, data);
            } else {
                res = await axios.post("/api/profile", data);
            }

            toast.success("Profile updated successfully");
            setSending(false);
        } catch (error) {
            toast.error(getError(error));
            setSending(false);
        }
    };

    // Handle password form submission
    const onPasswordSubmit = async (data) => {
        try {
            setUpdatingPassword(true);
            
            const passwordData = {
                currentPassword: data.password,
                newPassword: data.newPassword
            };

            await axios.put(`/api/profile/${id}/password`, passwordData);
            
            toast.success("Password updated successfully");
            passwordForm.reset();
            setUpdatingPassword(false);
        } catch (error) {
            toast.error(getError(error));
            setUpdatingPassword(false);
        }
    };

    // Handle profile picture upload
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            const res = await axios.post(`/api/profile/${id}/picture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Profile picture updated successfully");
        } catch (error) {
            toast.error(getError(error));
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action is irreversible!")) {
            try {
                await axios.delete(`/api/profile/${id}`);
                toast.success("Account deleted successfully");
                // Redirect or handle post-deletion logic here
            } catch (error) {
                toast.error(getError(error));
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-40"><Loading/></div>;
    }

    return (
        <div>
            <>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                    <div>
                        <h2 className="text-lg font-semibold py-[11px]">My Profile</h2>
                        <div className="flex items-center pt-[15px] gap-[15px]">
                            <Image src="/images/profile-pic.png" alt="profile-pic" width={70} height={70} />
                            <label htmlFor="profile-upload" className="bg-primary/5 text-primary p-2.5 text-sm rounded-[10px] cursor-pointer">
                                Upload New Picture
                            </label>
                            <input 
                                id="profile-upload" 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleImageUpload}
                            />
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
                                formProps={{ ...profileForm.register("name", { required: "Name is required" }) }}
                                errors={profileForm.formState.errors}
                                setValue={profileForm.setValue}
                            />
                            <InputForm
                                label="E-Mail"
                                placeholder="Enter email"
                                inputClass="border-primary/10"
                                class_="mt-0!"
                                isRequired={true}
                                formProps={{
                                    ...profileForm.register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: validEmailRgx,
                                            message: "Email is invalid."
                                        },
                                    })
                                }}
                                errors={profileForm.formState.errors}
                                setValue={profileForm.setValue}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5 pt-5">
                            <PhoneForm
                                label="Phone Number"
                                placeholder="Enter phone number"
                                formProps={{ ...profileForm.register("phone", { required: false }) }}
                                errors={profileForm.formState.errors}
                                clearErrors={profileForm.clearErrors}
                                setValue={profileForm.setValue}
                                watch={profileForm.watch} 
                            />
                            <SelectForm 
                                label="Time Zone"
                                selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                                isRequired={false}
                                defaultOption="select"
                                formProps={{ ...profileForm.register("timeZone", { required: false }) }} 
                                errors={profileForm.formState.errors} 
                                clearErrors={profileForm.clearErrors}
                            >
                                <option value="GMT+10:00">(GMT+10:00) Sydney</option>
                                <option value="GMT+00:00">(GMT+00:00) London</option>
                                <option value="GMT-05:00">(GMT-05:00) New York</option>
                                <option value="GMT-08:00">(GMT-08:00) Los Angeles</option>
                            </SelectForm>
                        </div>
                        <div className="pt-5">
                            <InputForm
                                label="Company"
                                placeholder="Enter company name"
                                inputClass="border-primary/10"
                                class_="mt-0!"
                                isRequired={true}
                                formProps={{ ...profileForm.register("company", { required: "Company is required" }) }}
                                errors={profileForm.formState.errors}
                                setValue={profileForm.setValue}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5 pt-6">
                            <CancelButton 
                                title="Cancel Changes" 
                                class_="text-lg!" 
                                onClick={() => profileForm.reset()}
                                type="button"
                            />
                            <SecondaryButton 
                                title="Save Changes" 
                                type="submit" 
                                disabled={sending} 
                                class_="text-lg!" 
                            />
                        </div>
                    </div>
                </form>
            </>

            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                <div className="pt-[25px]">
                    <h2 className="text-lg font-semibold">Change Password</h2>
                    <div className="grid grid-cols-2 gap-5 pt-[25px]">
                        <InputForm
                            label="Current Password"
                            placeholder="Enter Current Password"
                            inputType="password"
                            inputClass="border-primary/10"
                            class_="mt-0!"
                            isRequired={true}
                            formProps={{
                                ...passwordForm.register("password", {
                                    required: "Current password is required",
                                    pattern: {
                                        value: validPasswordRgx,
                                        message:
                                            "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
                                    },
                                }),
                            }}
                            errors={passwordForm.formState.errors}
                            setValue={passwordForm.setValue}
                            watch={passwordForm.watch}
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
                                ...passwordForm.register("newPassword", {
                                    required: "New password is required",
                                    pattern: {
                                        value: validPasswordRgx,
                                        message:
                                            "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
                                    },
                                    validate: (value) =>
                                        value !== passwordForm.watch("password") ||
                                        "New password must be different from current password.",
                                }),
                            }}
                            errors={passwordForm.formState.errors}
                            setValue={passwordForm.setValue}
                            watch={passwordForm.watch}
                        />
                    </div>

                    <div className="flex items-center gap-[10px] pt-[25px]">
                        <Image src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                        <h2 className="capitalize text-sm font-medium">This action is irreversible!</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-5 pt-[25px] pb-8">
                        <CancelButton 
                            title="Delete Account" 
                            class_="text-lg!" 
                            onClick={handleDeleteAccount}
                            type="button"
                        />
                        <SecondaryButton
                            title="Update Password"
                            class_="text-lg!"
                            type="submit"
                            disabled={updatingPassword}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
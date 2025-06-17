"use client"
import Image from "next/image";
import InputForm from "../form/InputForm";
import SelectForm from "../form/SelectForm";
import SecondaryButton from "../common/SecondaryButton";
import CancelButton from "../common/CancelButton";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { validEmailRgx, validPasswordRgx } from "../../../helper";
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
    const [profileImage, setProfileImage] = useState("/images/profile-pic.png"); // Default image

    // Load profile data on component mount
    useEffect(() => {
        if (id && id !== "add") {
            loadProfileData();
        }
        // Load saved profile image from localStorage
        loadSavedProfileImage();
    }, [id]);

    const loadSavedProfileImage = () => {
        try {
            const savedImage = localStorage.getItem(`profileImage_${id}`);
            if (savedImage) {
                setProfileImage(savedImage);
            }
        } catch (error) {
            console.error("Error loading saved profile image:", error);
        }
    };

    const loadProfileData = async () => {
        try {
            setLoading(true);
            // Since you don't have API, you can load from localStorage or set default values
            const savedProfile = localStorage.getItem(`profile_${id}`);
            
            if (savedProfile) {
                const data = JSON.parse(savedProfile);
                
                // Set profile form values
                profileForm.setValue("name", data.name || "");
                profileForm.setValue("email", data.email || "");
                profileForm.setValue("phone", data.phone || "");
                profileForm.setValue("timeZone", data.timeZone || "");
                profileForm.setValue("company", data.company || "");
            }
            
            setLoading(false);
        } catch (error) {
            console.error("Error loading profile data:", error);
            setLoading(false);
        }
    };

    // Handle profile form submission
    const onProfileSubmit = async (data) => {
        try {
            setSending(true);
            
            // Save to localStorage since no API is available
            localStorage.setItem(`profile_${id}`, JSON.stringify(data));
            
            toast.success("Profile updated successfully");
            setSending(false);
        } catch (error) {
            toast.error("Error updating profile");
            setSending(false);
        }
    };

    // Handle password form submission
    const onPasswordSubmit = async (data) => {
        try {
            setUpdatingPassword(true);
            
            // In a real app, you'd validate current password against stored hash
            // For demo purposes, we'll just simulate success
            setTimeout(() => {
                toast.success("Password updated successfully");
                passwordForm.reset();
                setUpdatingPassword(false);
            }, 1000);
            
        } catch (error) {
            toast.error("Error updating password");
            setUpdatingPassword(false);
        }
    };

    // Handle profile picture upload - Updated to work without API
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image file");
            return;
        }

        // Validate file size (e.g., max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        try {
            // Create a FileReader to convert image to base64
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const base64Image = e.target.result;
                
                // Update the profile image state
                setProfileImage(base64Image);
                
                // Save to localStorage
                localStorage.setItem(`profileImage_${id}`, base64Image);
                
                toast.success("Profile picture updated successfully");
            };
            
            reader.onerror = () => {
                toast.error("Error reading the image file");
            };
            
            // Read the file as data URL (base64)
            reader.readAsDataURL(file);
            
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Error uploading profile picture");
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action is irreversible!")) {
            try {
                // Clear all stored data for this user
                localStorage.removeItem(`profile_${id}`);
                localStorage.removeItem(`profileImage_${id}`);
                
                toast.success("Account deleted successfully");
                // Reset form and image
                profileForm.reset();
                setProfileImage("/images/profile-pic.png");
            } catch (error) {
                toast.error("Error deleting account");
            }
        }
    };

    // Reset profile image to default
    const handleResetImage = () => {
        setProfileImage("/images/profile-pic.png");
        localStorage.removeItem(`profileImage_${id}`);
        toast.success("Profile picture reset to default");
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
                            <div className="relative">
                                <Image 
                                    src={profileImage} 
                                    alt="profile-pic" 
                                    width={70} 
                                    height={70}
                                    className="rounded-full object-cover"
                                    style={{ width: '70px', height: '70px' }}
                                />
                                {/* {profileImage !== "/images/profile-pic.png" && (
                                    <button
                                        type="button"
                                        onClick={handleResetImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                        title="Reset to default"
                                    >
                                        ×
                                    </button>
                                )} */}
                            </div>
                                <label htmlFor="profile-upload" className="bg-primary/5 text-primary p-2.5 text-sm rounded-[10px] cursor-pointer hover:bg-primary/10 transition-colors">
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
                                labelClass=""
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
                                onClick={() => {
                                    profileForm.reset();
                                    loadProfileData(); // Reload saved data
                                }}
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
                            labelClass=""
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
"use client";

import { SignupFormData, signupSchema } from "./schemas/signupSchema";
import { useEffect, useState } from "react";

import CheckboxForm from "./form/CheckboxForm";
import Image from "next/image";
import InputForm from "./form/InputForm";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signup() {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const route = useRouter();

useEffect(() => {
  setValue("userType", "USER");
}, [setValue]);

    const onSubmit = async (data: SignupFormData) => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_RS_API_BASE_URL || "http://localhost:8080";
            if (!API_BASE) {
                throw new Error("API base URL is not defined in environment variables.");
            }
            setLoading(true);
            await axios.post(`${API_BASE}/api/users/register`, data);
            toast.success("Account created! Please check your email to verify your account.");
            route.push("/verification-email");
        } catch (error: any) {
            console.error("Signup error:", error);
            setError(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary text-center">Sign Up</h2>
            <p className="text-xs sm:pt-1.5 pt-2.5 pb-2.5 capitalize text-center text-[#616E7C]">
                Let&#39;s get you all set up so you can access your personal account.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("userType")} value="USER" />
                <InputForm
                    class_="mt-0!"
                    label="Full Name"
                    clearValue={true}
                    inputType="text"
                    placeholder="Enter Your Full Name"
                    icon="/images/close.svg"
                    formProps={{ ...register("name") }}
                    isRequired={true}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    infoIcon={null}
                    labelClass=""
                    disabled={loading}
                    isTextArea={false}
                    rows={undefined}
                />

                <InputForm
                    label="Email ID"
                    clearValue={true}
                    placeholder="Enter Your Email Address"
                    icon="/images/close.svg"
                    isRequired={true}
                    errors={errors}
                    formProps={{ ...register("email") }}
                    setValue={setValue}
                    watch={watch}
                    infoIcon={null}
                    labelClass=""
                    disabled={loading}
                    isTextArea={false}
                    rows={undefined}
                />

                <InputForm
                    label="Password"
                    inputType="password"
                    placeholder="Create A Password"
                    formProps={{ ...register("password") }}
                    isRequired={true}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    infoIcon={null}
                    labelClass=""
                    icon="/images/close.svg"
                    disabled={loading}
                    clearValue={true}
                    isTextArea={false}
                    rows={undefined}
                />

                <CheckboxForm
                    class_="flex justify-end items-center flex-row-reverse mt-[10px]"
                    inputClass="ml-0! mr-1"
                    id="termsAccepted"
                    name=""
                    checked={watch("termsAccepted")}
                    errors={errors}
                    formProps={{ ...register("termsAccepted") }}
                    disabled={loading}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue("termsAccepted", e.target.checked, { shouldValidate: true })}
                    label={
                        <div className="text-sm text-secondary capitalize">
                            I Agree To The{" "}
                            <Link href="/" className="text-primary">Privacy Policy</Link> and{" "}
                            <Link href="/" className="text-secondary">
                                <span className="text-primary"> Terms </span> of use.
                            </Link>
                        </div>
                    }
                />

                {error && (
                    <div className="flex gap-2.5 justify-center mt-[15px]">
                        <Image unoptimized={true} src="/images/error.svg" alt="error" width={15} height={14} />
                        <h2 className="text-xs text-danger capitalize">{error}</h2>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={Object.keys(errors).length > 0 || loading}
                    className="disabled:bg-primary/50 text-text text-lg mt-3 rounded-[10px] border border-primary hover:bg-text hover:text-primary cursor-pointer font-medium text-center py-3 px-3.5 w-full bg-primary"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <h2 className="text-sm text-center mt-3 capitalize text-secondary">
                    Already have an account?
                    <Link href="/login" className="text-primary underline underline-offset-[3px]"> Login</Link>
                </h2>
            </form>
        </div>
    );
}

"use client"
import { useForm } from "react-hook-form";
import Checkbox2 from "./form/Checkbox2";
import Link from "next/link";
import { useState } from "react";
import InputForm from "./form/InputForm";
import Success from "./common/Success";
import axios from "axios";
import Image from "next/image";
import { validEmailRgx, validPasswordRgx } from "../../helper";

export default function Signup() {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors, isValid },  // ✅ Add isValid
    } = useForm({ mode: "onChange" });   // ✅ Enable onChange mode

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await axios.post("/api", data);
            setLoading(true);
        } catch (error) {
            console.error("Signup error:", error);
            setLoading(false);
            setError(error?.message);
        }
    };

    if (loading) {
        return (
            <Success
                message="Registration Successful! Please Verify Your Email Address To Activate Your Account"
                link="/dashboard"
                buttonTitle="Continue"
            />
        );
    }

    return (
        <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary text-center">Sign Up</h2>
            <p className="text-xs sm:pt-1.5 pt-2.5 pb-2.5 capitalize text-center text-[#616E7C]">
                Let&#39;s get you all set up so you can access your personal account.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    class_="mt-0!"
                    label="Full Name"
                    clearValue={true}
                    name="name"
                    inputType="text"
                    placeholder="Enter Your Full Name"
                    icon="/images/close.svg"
                    formProps={{
                        ...register("name", {
                            required: "Name is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Please enter a valid name (letters only)",
                            },
                        }),
                    }}
                    isRequired={true}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                />

                <InputForm
                    label="Email ID"
                    name="email"
                    clearValue={true}
                    placeholder="Enter Your Email Address"
                    icon="/images/close.svg"
                    isRequired={true}
                    errors={errors}
                    formProps={{
                        ...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: validEmailRgx,
                                message: "Email is invalid.",
                            },
                        }),
                    }}
                    setValue={setValue}
                    watch={watch}
                />

                <InputForm
                    label="Password"
                    name="password"
                    inputType="password"
                    placeholder="Create A Password"
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
                    isRequired={true}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                />

                <label htmlFor="terms" className="mt-[10px] gap-1.5 flex items-center">
                    <Checkbox2 id="terms"
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)} />
                    <div className="text-sm text-secondary">
                        I Agree To The{" "}
                        <Link href="/" className="text-primary">Privacy Policy</Link> and{" "}
                        <Link href="/" className="text-secondary">
                            <span className="text-primary"> Terms </span> of use wherever it&#39;s displayed.
                        </Link>
                    </div>
                </label>

                {error && (
                    <div className="flex gap-2.5 justify-center mt-[15px]">
                        <Image src="/images/error.svg" alt="error" width={15} height={14} />
                        <h2 className="text-xs text-danger capitalize">{error}</h2>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!isValid || loading || !termsAccepted}  // ✅ Disable if not valid or loading
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

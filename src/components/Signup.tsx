"use client"

import { RegisterFormData, registerSchema } from "../app/schemas/registerSchema";

import Checkbox2 from "./form/Checkbox2";
import InputForm from "./form/InputForm";
import Link from "next/link";
import Success from "./common/Success";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signup() {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: RegisterFormData) => {
        try {
            console.log("Form submitted with data:", data);
            setLoading(true);
        } catch (error) {
            console.error("Signup error:", error);
        }
    };
    
    if (loading) {
        return <Success message="Registration Successful! Please Verify Your Email Address To Activate Your Account" 
        link="/" 
        buttonTitle="Continue" />
    }
    return (<>
        <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary text-center">Sign Up</h2>
            <p className="text-xs pt-2.5 pb-[25px] capitalize text-center text-[#616E7C]">Let&#39;s get you all st up so you can access your personal account.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    label="Full Name"
                    name="name"
                    inputType="text"
                    placeholder="Enter Your Full Name"
                    icon="/images/close.svg"
                    formProps={{ ...register("name") }}
                    isRequired={true} errors={errors}
                    setValue={setValue}
                    watch={watch}
                />
                <InputForm
                    label="Email ID"
                    name="email"
                    placeholder="Enter Email"
                    icon="/images/close.svg"
                    isRequired={true}
                    errors={errors}
                    formProps={{ ...register("email") }}
                    setValue={setValue}
                    watch={watch}
                />

                <InputForm
                    label="Password"
                    name="password"
                    inputType="password"
                    placeholder="Create A Password"
                    formProps={{ ...register("password") }}
                    isRequired={true} 
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                />

                <label htmlFor="terms" className="mt-[15px] gap-1.5 flex items-center">
                    <Checkbox2
                        id="terms" />
                    <div className="text-sm text-secondary">
                        I Agree To Our{" "}
                        <Link href="/" className="text-primary">
                            Terms & Conditions
                        </Link>{" "}
                        And{" "}
                        <Link href="/" className="text-primary">
                            Privacy Policy
                        </Link>
                    </div>
                </label>
                <button
                    type="submit"
                    disabled={loading}
                    className="disabled:bg-primary/50 text-text text-lg mt-5 rounded-[10px] border border-primary hover:bg-text hover:text-primary cursor-pointer font-medium text-center py-3 px-3.5 w-full bg-primary"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <h2 className="text-sm text-center mt-5 capitalize text-secondary">
                    Already have an account?
                    <Link href="/login" className="text-primary underline underline-offset-[3px]">
                        {" "}
                        Login
                    </Link>
                </h2>
            </form>
        </div>
    </>
    );
}

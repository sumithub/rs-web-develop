"use client"
import { useForm } from "react-hook-form";
import Checkbox2 from "./form/Checkbox2";
import Link from "next/link";
import { useState } from "react";
import InputForm from "./form/InputForm";
import Success from "./common/Success";
import Verify from "./form/Verify";
import Image from "next/image";

export default function Signin() {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onSubmit = async () => {
        try {
            setLoading(true);
        } catch (error) {
            console.error("Signup error:", error);
            setError("Invalid email or password. Please try again.");
        }
    };

    // if (loading) {
    //     return <Success message="Registration Successful! Please Verify Your Email Address To Activate Your Account" link="/" buttonTitle="Continue" />
    // }
    return (<>
        <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary text-center">Login to your account</h2>
            <p className="text-xs sm:pt-1.5 pt-2.5 pb-2.5 capitalize text-center text-[#616E7C]">Hey! We soar you working welcome back!</p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <InputForm
                    label="Email ID"
                    name="email"
                    placeholder="Enter Email"
                    icon="/images/close.svg"
                    isRequired={true}
                    errors={errors}
                    formProps={{
                        ...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email is invalid."
                            },
                            validate: (value) =>
                                !["test@gmail.com", "admin@gmail.com"].includes(value) ||
                                "This email address is already in use. Please try another."
                        })
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
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/,
                                message: "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
                            }
                        })
                    }} isRequired={true} errors={errors}
                    setValue={setValue}
                    watch={watch}
                />


                <Verify />
                <div className='flex justify-between mt-5'>
                    <div className='flex gap-1.5 items-center'>
                        <Checkbox2 class_="border-text-3"
                            required={false} />
                        <h2 className='text-sm capitalize text-secondary'>Remember me</h2>
                    </div>
                    <Link href="/forgot-password">
                        <h2 className='text-sm capitalize text-primary'>Forgot Password ?</h2>
                    </Link>
                </div>
                <div>
                    {error && <div className='flex gap-2.5 justify-center mt-[15px]'>
                        <Image src="/images/error.svg" alt='error.svg' width={15} height={14} />
                        <h2 className="text-xs text-danger capitalize">{error}</h2>
                    </div>}
                    <button
                        disabled={loading}
                        className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-2.5 py-3 rounded-[10px] border border-primary cursor-pointer">Login</button>

                    <h2 className='text-sm capitalize text-secondary pt-2.5 text-center'>Don&#39;t have an account? <Link href="/register" className='text-primary underline underline-offset-3'>Sign Up</Link></h2>
                </div>
            </form>
        </div>
    </>
    );
}

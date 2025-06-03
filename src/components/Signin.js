"use client"
import { useForm } from "react-hook-form";
import Checkbox2 from "./form/Checkbox2";
import Link from "next/link";
import { useEffect, useState } from "react";
import InputForm from "./form/InputForm";
import Verify from "./form/Verify";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { validEmailRgx } from "../../helper"
import { toast } from "react-toastify";

export default function Signin() {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false)
    const router = useRouter()
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        if (verificationSuccess) {
            setTimeout(() => {
                setVerificationSuccess(null)
            }, 5000)
        }
    }, [verificationSuccess])

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await axios.post("/api", data)
            setTimeout(() => {
                router.push("/dashboard")
            }, 1000);
        } catch (error) {
            toast.error("Invalid email or password.Please try again.")
            setLoading(false)
            setError(error?.message);
        }
    };

    return (<>
        <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary text-center">Login To Your Account</h2>
            <p className="text-xs sm:pt-1.5 pt-2.5 pb-2.5 capitalize text-center text-[#616E7C]">Hey! We soar you working welcome back!</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    label="Email ID"
                    name="email"
                    clearValue={true}
                    placeholder="Enter Email"
                    icon="/images/close.svg"
                    isRequired={true}
                    formProps={{
                        ...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: validEmailRgx,
                                message: "Please enter a valid email address."
                            },
                        })
                    }}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                />

                <InputForm
                    label="Password"
                    name="password"
                    inputType="password"
                    placeholder="Enter Password"
                    formProps={{
                        ...register("password", {
                            required: true,
                            pattern: {
                                message: "Password cannot be empty."
                            }
                        })
                    }} isRequired={true} errors={errors}
                    setValue={setValue}
                    watch={watch}
                />


                {verificationSuccess !== null && <Verify verificationSuccess={verificationSuccess} onClick={() => { setVerificationSuccess(true) }} />}
                <div className='flex justify-between mt-5'>
                    <label className='flex gap-1.5 items-center' htmlFor="remember">
                        <Checkbox2 class_="border-text-3"
                            id="remember"
                            checked={checked}
                            onChange={(checked) => setChecked(checked)}
                            required={false} />
                        <h2 className='text-sm capitalize text-secondary'>Remember me</h2>
                    </label>
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
                        type="submit"
                        disabled={!isValid || loading || !checked}
                        className="disabled:bg-primary/50 text-text text-lg mt-3 rounded-[10px] border border-primary hover:bg-text hover:text-primary cursor-pointer font-medium text-center py-3 px-3.5 w-full bg-primary">Login</button>
                    <h2 className='text-sm capitalize text-secondary pt-2.5 text-center'>Don&#39;t have an account? <Link href="/register" className='text-primary underline underline-offset-3'>Sign Up</Link></h2>
                </div>
            </form>
        </div>
    </>
    );
}

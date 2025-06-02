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
    const [verificationSuccess, setVerificationSuccess] = useState(false)
    const router = useRouter()

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
                router.push("/")
            }, 1000);
        } catch (error) {
            setLoading(false)
            setError(error?.message);
        }
    };

    return (<>
        <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary text-center">Login to your account</h2>
            <p className="text-xs sm:pt-1.5 pt-2.5 pb-2.5 capitalize text-center text-[#616E7C]">Hey! We soar you working welcome back!</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    label="Email ID"
                    name="email"
                    clearValue={true}
                    placeholder="Enter Email"
                    icon="/images/close.svg"
                    isRequired={true}
                    errors={errors}
                    formProps={{ ...register("email", { required: "Email is required" }) }}
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
                            required: true
                        })
                    }} isRequired={true} errors={errors}
                    setValue={setValue}
                    watch={watch}
                />


                {verificationSuccess !== null && <Verify verificationSuccess={verificationSuccess} onClick={() => { setVerificationSuccess(true) }} />}
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

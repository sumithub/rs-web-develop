"use client"
import React, { useState } from 'react';
import AuthLayout from "../../components/common/AuthLayout";
import Link from 'next/link';
import Image from 'next/image';
import InputForm from '../../components/form/InputForm';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Success from '../../components/common/Success';
import { getError, validEmailRgx } from "../../../helper"
import { useRouter } from 'next/navigation';

function ForgotPassword() {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await axios.post("/api", data)
            setSuccess(true)
        } catch (error) {
            setLoading(false)
            router.push(`/reset-password-error?error=${getError(error)}`)
            setError(error?.message);
        }
    };
    return (<AuthLayout>
        {success ? <Success message="Check your email to reset the password." /> : <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Forgot password</h2>
            <p className="text-xs pt-2.5 pb-[25px] capitalize text-center text-[#616E7C]">No Worries, We’ll Send Your Reset Instruction.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputForm
                        label="New Email"
                        name="newEmail"
                        clearValue={true}
                        inputType="text"
                        placeholder="Enter Email ID "
                        isRequired={true}
                        icon="/images/close.svg"
                        errors={errors}
                        formProps={{
                            ...register("email", {
                                required: "Email is required", pattern: {
                                    value: validEmailRgx,
                                    message: "Incorrect Email"
                                }
                            },)
                        }}
                        setValue={setValue}
                        watch={watch}
                    />
                </div>
                {error && <div className='flex gap-2.5 justify-center mt-[15px]'>
                    <Image src="/images/error.svg" alt='error.svg' width={15} height={14} />
                    <h2 className="text-xs text-danger capitalize">{error}</h2>
                </div>}
                <button type='submit' disabled={loading} className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary cursor-pointer">Send Reset Link</button>
            </form>
            <div className='flex justify-center mt-5'>
                <Link href="/login" className="flex gap-[15px]">
                    <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                    <h2 className='text-sm text-secondary'>Back To Login</h2>
                </Link>
            </div>
        </div>}
    </AuthLayout>
    )
}

export default ForgotPassword
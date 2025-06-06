"use client"
import AuthLayout from '../../components/common/AuthLayout';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validPasswordRgx } from '../../../helper';
import InputForm from '../../components/form/InputForm';
import Success from '../../components/common/Success';
import Error from '../../components/common/Error';
import axios from 'axios';

export default function ResetPasswordPage() {
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

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await axios.post("/api", data)
            setSuccess(true)
        } catch (error) {
            setLoading(false)
            setError(error?.message);
        }
    };
    return (<AuthLayout>
        {success ? <Success
            message="Your password has been successfully reset!"
            buttonTitle="Return to Login"
        /> : (error ? <Error
            error={error}
            onClick={() => { setError('') }} /> : <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Reset Password</h2>
            <p className="text-xs pt-2.5 pb-[25px] capitalize text-center text-[#616E7C]">A password reset link has been sent to your email</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputForm
                        label="Password"
                        name="password"
                        inputType="password"
                        placeholder="Enter Password"
                        formProps={{
                            ...register("password", {
                                required: true, pattern: {
                                    value: validPasswordRgx,
                                    message: "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
                                }
                            })
                        }}
                        isRequired={true} errors={errors}
                        setValue={setValue}
                        watch={watch}
                    />

                    <InputForm
                        label="Confirm Password"
                        name="confirmPassword"
                        inputType="password"
                        placeholder="Enter Confirm Password"
                        formProps={{
                            ...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match",
                            }),
                        }}
                        isRequired={true}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                    />
                </div>
                <button type='submit' disabled={loading} className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary cursor-pointer capitalize">reset password</button>
            </form>
            <div className='flex justify-center mt-5'>
                <Link href="/login" className="flex gap-[15px]">
                    <Image unoptimized={true} src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                    <h2 className='text-sm text-secondary'>Back To Login</h2>
                </Link>
            </div>
        </div>)}
    </AuthLayout>)
}
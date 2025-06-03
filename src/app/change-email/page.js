"use client"
import React, { useState } from 'react';
import AuthLayout from "../../components/common/AuthLayout";
import Link from 'next/link';
import Image from 'next/image';
import Success from '../../components/common/Success';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import InputForm from '../../components/form/InputForm';

function ChangeEmail() {
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
        <div>
            {!success && <div>
                <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Change Email</h2>
                <p className="text-xs pt-2.5 pb-[25px] capitalize text-center text-text3">No Worries, We’ll Send Your Reset Instruction.</p>

                <div className='flex items-center justify-between'>
                    <div className='text-base text-[#616E7C] capitalize'>current email</div>
                    <div className='text-base text-secondary font-medium'>anu@gmail.com</div>
                </div>

                <div className='mt-5'>
                    <div className='flex gap-2'>
                        <Image src="images/warning.svg" alt='warning' height={22} width={22} />
                        <div className='text-sm text-secondary font-medium capitalize'>if you entered the wrong email, update it below</div>
                    </div>

                    <div className='flex gap-2 mt-2'>
                        <Image src="images/warning.svg" alt='warning' height={22} width={22} />
                        <div className='text-sm text-secondary font-medium capitalize'>a new verification email will be sent to the updated email.</div>
                    </div>

                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <InputForm
                            label="New Email"
                            name="newEmail"
                            inputType="text"
                            placeholder="Enter Email ID "
                            isRequired={true}
                            icon="/images/close.svg"
                            errors={errors}
                            formProps={{ ...register("email", { required: "Email is required" }) }}
                            setValue={setValue}
                            watch={watch}
                        />
                    </div>
                    {error && <div className='flex gap-2.5 justify-center mt-[15px]'>
                        <Image src="/images/error.svg" alt='error.svg' width={15} height={14} />
                        <h2 className="text-xs text-danger capitalize">{error}</h2>
                    </div>}
                    <div className='grid grid-cols-2 gap-4'>
                        <Link href="/login">
                            <button type='button' className="text-lg font-medium bg-dark hover:bg-white text-text3 w-full mt-5 py-3 rounded-[10px] border border-dark hover:border-border-color cursor-pointer">Cancel</button>
                        </Link>
                        <button disabled={loading} type='submit' className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary cursor-pointer capitalize"                        >update email</button>
                    </div>
                </form>
                <div className='flex justify-center mt-5'>
                    <Link href="/login" className="flex gap-[15px]">
                        <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                        <h2 className='text-sm text-secondary'>Back To Login</h2>
                    </Link>
                </div>
            </div>}
            {success && <div>
                <Success message="your email has been verified successfully!" desc="your account is now active. you can log in and start using the platform." buttonTitle="go to login" link="/login" />
            </div>}
        </div>
    </AuthLayout >
    )
}

export default ChangeEmail
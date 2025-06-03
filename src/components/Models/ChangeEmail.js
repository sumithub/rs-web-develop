"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import InputForm from '../../components/form/InputForm';
import Model from './Model';
import { validEmailRgx } from '../../../helper';
import { toast } from 'react-toastify';

function ChangeEmail({ onClose, id }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)


    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Email updated successfully! Please check your inbox for verification.")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error("Unable to update email. Please try again later.")
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title="Change Email" modalClass="w-[50%]!">
            <div>
                <div>
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
                                clearValue={true}
                                inputType="text"
                                placeholder="Enter Email ID "
                                isRequired={true}
                                icon="/images/close.svg"
                                formProps={{
                                    ...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: validEmailRgx,
                                            message: "Please enter a valid email address.",
                                        },
                                    }),
                                }}
                                errors={errors}
                                clearErrors={clearErrors}
                                setValue={setValue}
                                watch={watch}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <button type='button' className="text-lg font-medium bg-dark hover:bg-white text-text3 w-full mt-5 py-3 rounded-[10px] border border-dark hover:border-border-color cursor-pointer" onClick={onClose}>Cancel</button>
                            <button type='submit' disabled={sending} className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary cursor-pointer capitalize">update email</button>
                        </div>
                    </form>
                    <div className='flex justify-center mt-5'>
                        <Link href="/login" className="flex gap-[15px]">
                            <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                            <h2 className='text-sm text-secondary'>Back To Login</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </Model >
    )
}

export default ChangeEmail
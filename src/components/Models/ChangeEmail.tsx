"use client"
import React, { useContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import InputForm from '../form/InputForm';
import Model from './Model';
import { toast } from 'react-toastify';
import AuthContext from '../../contexts/AuthContext';
import { changeEmail } from '../../api/authApi';
import { ChangeEmailFormData, ChangeEmailSchema } from '../schemas/ChangeEmailSchema'

function ChangeEmail({ onClose, id }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors } } = useForm<ChangeEmailFormData>({
            resolver: zodResolver(ChangeEmailSchema),
            mode: "onBlur",
        })
    const [sending, setSending] = useState(false)
    const {unVerifiedEmail, setEmail}= useContext(AuthContext)
    const [currentEmail, setCurrentEmail] = useState(unVerifiedEmail);


    useEffect(()=>{},[currentEmail])
    const onSubmit = async (formData: ChangeEmailFormData) => {
        
        try {
          
            localStorage.removeItem("mockVerificationLink");    
            setSending(true)
                // Calls the centralized authApi signup function
                if(currentEmail === formData.newEmail) {
                    toast.error("This is your current email. Please enter a different one.");
                    setSending(false)
                    return;
                }
                const parsedData = await changeEmail(formData,);
                // Save mock verification link to localStorage (for dev only)
                if (parsedData?.mockVerificationLink) {
                  localStorage.setItem("mockVerificationLink", parsedData.mockVerificationLink);
                }
                // Update context with unverified email
                toast.success("Email updated successfully! Please check your inbox for verification.")
                setSending(false)
                setEmail(formData.newEmail);
                setCurrentEmail(formData.newEmail);
                onClose()
        } catch (error) {
            console.error("Error", error)
            // Check if the error response has the expected shape
            const apiMessage = error?.response?.data?.message;
            const fallbackMessage = "Unable to update email. Please try again later.";
            toast.error(apiMessage || fallbackMessage);
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
                        <div className='text-base text-secondary font-medium'>{unVerifiedEmail}</div>
                    </div>

                    <div className='mt-5'>
                        <div className='flex gap-2'>
                            <Image unoptimized={true} src="images/warning.svg" alt='warning' height={22} width={22} />
                            <div className='text-sm text-secondary font-medium capitalize'>if you entered the wrong email, update it below</div>
                        </div>

                        <div className='flex gap-2 mt-2'>
                            <Image unoptimized={true} src="images/warning.svg" alt='warning' height={22} width={22} />
                            <div className='text-sm text-secondary font-medium capitalize'>a new verification email will be sent to the updated email.</div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                         
                             <input type="hidden" {...register("currentEmail")} value={currentEmail} />
                               <InputForm
  label="Email ID"
  clearValue={true}
  placeholder="Enter Your Email Address"
  icon="/images/close.svg"
  isRequired={true}
  errors={errors}
  formProps={{ ...register("newEmail") }}
  setValue={setValue}
  watch={watch}
  infoIcon={null}
  labelClass=""
  disabled={null}
  isTextArea={false}
  rows={undefined}
/>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <button type='button' className="text-lg font-medium bg-dark hover:bg-white text-text3 w-full mt-5 py-3 rounded-[10px] border border-dark hover:border-border-color cursor-pointer" onClick={onClose}>Cancel</button>
                            <button type='submit' disabled={sending || Object.keys(errors).length > 0} className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary cursor-pointer capitalize">update email</button>
                        </div>
                    </form>
                    <div className='flex justify-center mt-5'>
                        <Link href="/login" className="flex gap-[15px]">
                            <Image unoptimized={true} src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                            <h2 className='text-sm text-secondary'>Back To Login</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </Model >
    )
}

export default ChangeEmail
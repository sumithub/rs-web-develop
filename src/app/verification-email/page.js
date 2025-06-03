"use client"
import AuthLayout from "../../components/common/AuthLayout";
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ChangeEmail from "../../components/Models/ChangeEmail";

function VerificationEmail() {
    const { handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            await axios.put("/api", data)
            setTimeout(() => {
                setLoading(false)
            }, 1000 * 60);
            toast.success("Verification email sent successfully! Check your inbox or spam folder.")
        } catch (error) {
            toast.error("Unable to resend verification email. Please try again later.")
            setTimeout(() => {
                setLoading(false)
            }, 1000 * 60);
        }
    }
    return (<AuthLayout>
        {open &&
            <ChangeEmail
                onClose={() => {
                    setOpen(false)
                }}

                onSave={() => {
                    setOpen(true)
                }}
            />
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">verification email sent</h2>

                <div className='flex items-center justify-between mt-8'>
                    <div className='text-base text-text3 capitalize'>a new verification email has been sent to</div>
                    <div className='text-base text-secondary font-medium'>anu@gmail.com</div>
                </div>

                <div className='mt-5'>
                    <div className='flex gap-2'>
                        <Image src="images/warning.svg" alt='warning' height={22} width={22} />
                        <div className='text-sm text-secondary font-medium capitalize'>please check your inbox(or spam folder) and click the verification link.</div>
                    </div>

                    <div className='flex gap-2 mt-2'>
                        <Image src="images/warning.svg" alt='warning' height={22} width={22} />
                        <div className='text-sm text-secondary font-medium capitalize'>of you don’t receive an email, wait 60 second before trying again.</div>
                    </div>
                </div>

                <button className="text-lg font-medium bg-dark hover:bg-white text-text3 w-full mt-5 py-3 rounded-[10px] border border-dark hover:border-border-color cursor-pointer" disabled={loading} type="submit">Resend</button>

                <div className='flex items-center justify-between mt-5'>
                    <Link href="#" onClick={() => { setOpen(true) }} className='text-sm text-primary font-medium underline underline-offset-4'>Change Email</Link>
                    <div className='text-sm text-secondary'>00.59</div>
                </div>

                <div className='flex justify-center mt-5'>
                    <Link href="/login" className="flex gap-[15px]">
                        <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                        <h2 className='text-sm text-secondary'>Back To Login</h2>
                    </Link>
                </div>
            </div>
        </form>
    </AuthLayout>
    )
}

export default VerificationEmail
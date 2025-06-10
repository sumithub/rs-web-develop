"use client"
import AuthLayout from "../../components/common/AuthLayout";
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ChangeEmail from "../../components/Models/ChangeEmail";
import SecondaryButton from "../../components/common/SecondaryButton";

function VerificationEmail() {
    const { handleSubmit } = useForm();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [sec, setSec] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);

    useEffect(() => {
        let interval = null;
        if (isTimerActive && sec > 0) {
            interval = setInterval(() => {
                setSec(seconds => seconds - 1);
            }, 1000);
        } else if (sec === 0) {
            setIsTimerActive(false);
            setLoading(false);
            setSec(59);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive, sec]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setIsTimerActive(true);
            setSec(59);
            await axios.put("/api", data);
            toast.success("Verification email sent successfully! Check your inbox or spam folder.");
        } catch (error) {
            toast.error("Unable to resend verification email. Please try again later.");
            setIsTimerActive(false);
            setLoading(false);
            setSec(59);
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}.${secs.toString().padStart(2, '0')}`;
    };

    return (
        <AuthLayout>
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
                        <div className='text-[15px] text-text3 capitalize'>A verification email has been sent to your email address: </div>
                        <div className='text-[15px] text-secondary font-medium disabled'>anu@gmail.com</div>
                    </div>

                    <div className='mt-5'>
                        <div className='flex gap-2'>
                            <Image unoptimized={true} src="images/warning.svg" alt='warning' height={22} width={22} />
                            <div className='text-sm text-secondary font-medium capitalize'>please check your inbox(or spam folder) and click the verification link.</div>
                        </div>

                        <div className='flex gap-2 mt-2'>
                            <Image unoptimized={true} src="images/warning.svg" alt='warning' height={22} width={22} />
                            <div className='text-sm text-secondary font-medium capitalize'>if you don't receive an email, wait 60 seconds before trying again.</div>
                        </div>
                    </div>

                    <SecondaryButton title="Resend Verification Email"
                        disabled={loading}
                        type="submit"
                        class_="disabled:bg-dark! disabled:text-text3! disabled:border-dark! py-3! mt-5!"/>
                   

                    <div className='flex items-center justify-between mt-5'>
                        <Link href="#" onClick={() => { setOpen(true) }} className='text-sm text-primary font-medium underline underline-offset-4'>Change Email</Link>
                        <div className='text-sm text-secondary'>
                            {isTimerActive ? formatTime(sec) : '00.59'}
                        </div>
                    </div>

                    <div className='flex justify-center mt-5'>
                        <Link href="/login" className="flex gap-[15px]">
                            <Image unoptimized={true} src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                            <h2 className='text-sm text-secondary'>Back To Login</h2>
                        </Link>
                    </div>
                </div>
            </form>
        </AuthLayout>
    )
}

export default VerificationEmail
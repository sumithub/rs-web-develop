import React from 'react';
import AuthLayout from "../../components/common/AuthLayout";
import Input from '../../components/form/Input';
import Link from 'next/link';
import Image from 'next/image';

function ForgotPassword() {
    return (<AuthLayout>
        <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Forgot password</h2>
            <p className="text-xs pt-2.5 pb-[25px] capitalize text-center text-[#616E7C]">A password reset link has been sent to your email</p>
            <div>
                <Input
                    label="Email ID"
                    name="name"
                    inputType="text"
                    placeholder="Enter Email ID "
                    isRequired={true}
                    icon="/images/close.svg"
                    error="Incorrect Email"
                />
            </div>
            <button className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary ">Send Reset Link</button>
            <div className='flex justify-center mt-5'>
                <Link href="/login" className="flex gap-[15px]">
                    <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                    <h2 className='text-sm text-secondary'>Back To Login</h2>
                </Link>
            </div>
        </div>
    </AuthLayout>
    )
}

export default ForgotPassword
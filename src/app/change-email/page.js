"use client"
import React, { useState } from 'react';
import AuthLayout from "../../components/common/AuthLayout";
import Input from '../../components/form/Input';
import Link from 'next/link';
import Image from 'next/image';
import Success from '../../components/common/Success';

function ChangeEmail() {
    const [view, setView] = useState("email")

    return (<AuthLayout>
        <div>
            {view === "email" && <div>
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
                <div>
                    <Input
                        label="New Email"
                        name="newEmail"
                        inputType="text"
                        placeholder="Enter Email ID "
                        isRequired={true}
                        icon="/images/close.svg"
                        error="This email is already in use. Try another one."
                    />
                </div>
                <div className='flex gap-4'>
                    <button className="text-lg font-medium bg-dark hover:bg-white text-text3 w-full mt-5 py-3 rounded-[10px] border border-dark hover:border-border-color cursor-pointer">Cancel</button>

                    <button className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary cursor-pointer capitalize"
                        onClick={() => {
                            setView("success")
                        }}
                    >update email</button>
                </div>

                <div className='flex justify-center mt-5'>
                    <Link href="/login" className="flex gap-[15px]">
                        <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                        <h2 className='text-sm text-secondary'>Back To Login</h2>
                    </Link>
                </div>
            </div>}
            {view === "success" && <div>
                <Success message="your email has been verified successfully!" desc="your account is now active. you can log in and start using the platform." buttonTitle="got to login" link="/login" />
            </div>}
        </div>
    </AuthLayout>
    )
}

export default ChangeEmail
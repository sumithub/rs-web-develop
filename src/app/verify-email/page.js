"use client"
import React, { useState } from 'react';
import AuthLayout from "../../components/common/AuthLayout";
import Link from 'next/link';
import Image from 'next/image';

function VerifyEmail() {

    const [view, setView] = useState("verify")

    return (<AuthLayout>
        <div>
            {view === "verify" && <div>
                <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Verify Your Email</h2>

                <p className="text-xs pt-2.5 pb-[10px] capitalize text-center text-[#616E7C]">An email has been sent to your email address with a link to <br /> verify your account. You will need to verify your email to <br /> complete sign up.</p>

                <button className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary cursor-pointer"
                    onClick={() => {
                        setView("issue")
                    }}
                >Resend Verification Email</button>
                <h2 className='pt-[15px] text-xs font-medium text-text3 text-center capitalize'>A verification link has been resent to your email address</h2>
            </div>}

            {view === "issue" && <div>
                <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">verification link issue</h2>
                <div className='pt-2.5'>
                    <div className='text-center'>
                        <div className='inline-block rounded-[10px] bg-danger/5 p-2.5 text-xl text-danger font-medium'>Expired Token</div>
                        <h2 className='text-[#616E7C] text-xs pt-2.5 capitalize'>the verification link has expired. please request a new one.</h2>
                    </div>
                    <h2 className='text-center pt-5 text-sm text-secondary'>A New Verification Email Has Been Sent to <span className='font-semibold'>anu@gmail.com.</span> Please <br /> Check Your Inbox Or Spam Folder.</h2>
                    <h2 className='text-center pt-2.5 text-sm text-secondary'><span className='font-semibold'>59s</span> Remaining</h2>
                    <button className="text-text3 text-lg font-medium bg-dark border border-dark hover:bg-white w-full mt-5 py-3 rounded-[10px] border border-dark cursor-pointer"
                        onClick={() => {
                            setView("error")
                            setTimeout(() => {
                                setView(false)
                            }, 1000 * 60);
                        }}
                    >Resend Verification Email</button>
                </div>
            </div>}
            {view === "error" &&
                <div>
                    <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Reset Password</h2>
                    <div className='text-[34px] leading-none font-semibold text-danger capitalize text-center my-8'>Failed to reset<br /> password. Please Send <br />Reset Request</div>

                    <button className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full py-3 rounded-[10px] border border-primary cursor-pointer"
                        onClick={() => {
                            setView("verify")
                        }}
                    >Send</button>
                </div>
            }

            <div className='flex justify-center mt-8'>
                <Link href="/login" className="flex gap-[15px]">
                    <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                    <h2 className='text-sm text-secondary'>Back To Login</h2>
                </Link>
            </div>
        </div>
    </AuthLayout>
    )
}

export default VerifyEmail
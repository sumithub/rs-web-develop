import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function VerificationEmail() {
  return (<>
    <div>
      <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Verify Your Email</h2>
      <p className="text-xs pt-2.5 pb-[10px] capitalize text-center text-[#616E7C]">An email has been sent to your email address with a link to <br /> verify your account. You will need to verify your email to <br /> complete sign up.</p>
      <button className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary ">Resend Verification Email</button>
      <h2 className='pt-[15px] text-xs font-medium text-text3 text-center'>A verification link has been resent to your email address</h2>
      <div className='flex justify-center mt-5'>
        <Link href="/login" className="flex gap-[15px]">
          <Image unoptimized={true} src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
          <h2 className='text-sm text-secondary'>Back To Login</h2>
        </Link>
      </div>
    </div>
  </>
  )
}

export default VerificationEmail
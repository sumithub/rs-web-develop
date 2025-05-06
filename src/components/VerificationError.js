import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function VerificationError() {
  return (<>
    <div>
      <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">verification link issue</h2>
      <div className='pt-2.5'>
        <div className='text-center'>
          <div className='inline-block rounded-[10px] bg-danger/5 p-2.5 text-xl text-danger font-medium'>Expired Token</div>
          <h2 className='text-[#616E7C] text-xs pt-2.5'>the verification link has expired. please request a new one.</h2>
        </div>
        <h2 className='text-center pt-5 text-sm text-secondary'>A New Verification Email Has Been Sent to <span className='font-semibold'>anu@gmail.com.</span> Please <br /> Check Your Inbox Or Spam Folder.</h2>
        <h2 className='text-center pt-2.5 text-sm text-secondary'><span className='font-semibold'>59s</span> Remaining</h2>
        <button className="text-text3 text-lg font-medium bg-dark w-full mt-5 py-3 rounded-[10px] border border-dark ">Resend Verification Email</button>
        <div className='flex justify-center mt-5'>
          <Link href="/login" className="flex gap-[15px]">
            <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
            <h2 className='text-sm text-secondary'>Back To Login</h2>
          </Link>
        </div>
      </div>
    </div>
  </>
  )
}

export default VerificationError
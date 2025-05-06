import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Success() {
  return (<>
    <div>
      <Image src="/images/success.svg" alt='success.svg' width={96} height={96} className='mx-auto' />
      <h2 className='text-[34px] pt-2.5 leading-none font-semibold text-secondary capitalize text-center'>Registration Successful! Please Verify Your Email Address To Activate Your Account</h2>
      <Link href="/">
        <button className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-10 py-3 rounded-[10px] border border-primary cursor-pointer">Continue</button>
      </Link>
    </div>
  </>
  )
}

export default Success
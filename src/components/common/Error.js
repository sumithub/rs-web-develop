import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Error() {
  return (<>
    <div>
      <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Reset Password</h2>
      <h2 className="text-[34px] leading-none font-semibold text-danger pt-[30px] capitalize text-center">Failed to reset <br /> password. Please Send <br /> Reset Request</h2>
      <button className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-10 py-3 rounded-[10px] border border-primary ">Send</button>
      <div className='flex justify-center mt-10'>
        <Link href="/login" className="flex gap-[15px]">
          <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
          <h2 className='text-sm text-secondary'>Back To Login</h2>
        </Link>
      </div>
    </div>
  </>
  )
}

export default Error
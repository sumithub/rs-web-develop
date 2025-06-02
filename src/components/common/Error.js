import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Error({ onClick, error }) {
  return (<div>
    <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Reset Password</h2>

    <div className='bg-white shadow-sm rounded-2xl p-3 w-[80%]'>
      <div className='flex items-center'>
        <div className='h-16 w-2 bg-danger rounded-t-[20px] rounded-b-[20px] border-danger'>
        </div>
        <div className='pl-3'>
          <div className='text-danger text-base pl-1'>Error</div>
          <div className='text-text3 text-base font-medium pl-1'>Failed to reset password. Please try again later</div>
        </div>
      </div>
    </div>
    {/* <h2 className="text-[34px] leading-none font-semibold text-danger pt-[30px] capitalize text-center">
      {error || <>
        Failed to reset <br /> password. Please Send <br /> Reset Request
      </>}
    </h2> */}
    <button type='button' className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-10 py-3 rounded-[10px] border border-primary "
      onClick={() => {
        if (onClick)
          onClick()
      }}>Back</button>
    <div className='flex justify-center mt-10'>
      <Link href="/login" className="flex gap-[15px]">
        <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
        <h2 className='text-sm text-secondary'>Back To Login</h2>
      </Link>
    </div>
  </div>)
}

export default Error
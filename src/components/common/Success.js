import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Success({ message, link, buttonTitle }) {
  return (<>
    <div>
      <Image src="/images/success.svg" alt='success.svg' width={96} height={96} className='mx-auto' />
      <h2 className='text-[34px] pt-2.5 leading-none font-semibold text-secondary capitalize text-center'>{message}</h2>
      <Link href={link}>
        <button className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-10 py-3 rounded-[10px] border border-primary cursor-pointer">{buttonTitle}</button>
      </Link>
    </div>
  </>
  )
}

export default Success
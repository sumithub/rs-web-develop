import Link from 'next/link'
import React from 'react'

function Card({ children }) {
  return (<div>
    <Link href="/" className="mt-11 text-secondary inline-block font-semibold text-[34px]">LOGO</Link>
    <div className="mt-[114px] rounded-[15px] bg-white border border-[#F4F4F4] p-[30px] shadow-[_0px_0px_25px_0px_#00000008]">
      {children}
    </div>
  </div>
  )
}

export default Card
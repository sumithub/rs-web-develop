import React from 'react';
import Welcome from './Welcome';
import Card from './Card';
import Link from 'next/link';

export default function AuthLayout({ children, title = false, error = false, message = false, dangerClass }) {
  return (<div className="bg-[#FEFEFE]">
    <div className="max-w-7xl mx-auto xl:px-0 px-12">
      <div className="grid grid-cols-2 gap-16">
        <div>
          <Link href="/" className="mt-11 text-secondary inline-block font-semibold text-[34px]">LOGO</Link>
          <Card>
            <div className='text-[34px] font-semibold text-secondary text-center capitalize'>{title}</div>
            <div className={`text-[34px] font-semibold text-danger text-center capitalize ${dangerClass}`}>{error}</div>
            <div className='text-xs text-[#616E7C] text-center capitalize'>{message}</div>
            {children}
          </Card>
        </div>
        <Welcome />
      </div>
    </div>
  </div>
  )
}


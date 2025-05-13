import React from 'react';
import Welcome from './Welcome';
import Card from './Card';
import Link from 'next/link';

export default function AuthLayout({ cardClass = "", children, title = false, error = false, message = false, dangerClass }) {
  return (<div className="bg-text">
    <div className="max-w-7xl mx-auto xl:px-0 px-12 relative">
      <div className="grid grid-cols-2 gap-16">
        <div className='flex justify-between flex-col'>
          <Link href="/" className="text-secondary inline-block  font-semibold text-[34px] pt-5">LOGO</Link>

          <Card class_="flex-1 flex items-center w-full h-full" cardClass={cardClass}>
            <div className='w-full'>
              <div className='text-[34px] font-semibold text-secondary text-center capitalize'>{title}</div>
              <div className={`text-[34px] font-semibold text-danger text-center capitalize ${dangerClass}`}>{error}</div>
              {message && <div className='text-xs text-[#616E7C] text-center capitalize pt-2 pb-5'>{message}</div>}
              {children}
            </div>
          </Card>
        </div>
        <Welcome />
      </div>
    </div>
  </div>
  )
}


import React from 'react';
import Welcome from './Welcome';
import Card from './Card';
import Link from 'next/link';

export default function AuthLayout({ children }) {
  return (<div className="bg-[#FEFEFE]">
    <div className="max-w-7xl mx-auto xl:px-0 px-12">
      <div className="grid grid-cols-2 gap-16">
        <div>
          <Link href="/" className="mt-11 text-secondary inline-block font-semibold text-[34px]">LOGO</Link>
          <Card>
            {children}
          </Card>
        </div>
        <Welcome />
      </div>
    </div>
  </div>
  )
}


import React from 'react';

import AuthLayout from '../../components/common/AuthLayout';
import Input from '../../components/form/Input';
import Verify from '../../components/form/Verify';
import Checkbox2 from '../../components/form/Checkbox2';
import Link from 'next/link';
import Image from 'next/image';
function LoginPage() {
  return (<>
    <AuthLayout>
      <div>
        <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Login to your account</h2>
        <p className="text-xs pt-2.5 capitalize text-center text-[#616E7C]">Hey! We soar you working welcome back!</p>
        <div>
          <Input
            label="Email ID"
            name="name"
            inputType="text"
            placeholder="Enter Your Email Address"
            isRequired={true}
            icon="/images/close.svg"
            error="Incorrect Email"
          />
          <Input
            label="Password"
            name="password"
            inputType='password'
            placeholder="Enter Password"
            isRequired={true}
            error="Incorrect Password"
          />
          <Verify />
          <div className='flex justify-between mt-5'>
            <div className='flex gap-1.5 items-center'>
              <Checkbox2 class_="border-text-3" />
              <h2 className='text-sm capitalize text-secondary'>Remember me</h2>
            </div>
            <Link href="/forgot-password">
              <h2 className='text-sm capitalize text-primary'>Forgot Password ?</h2>
            </Link>
          </div>
          <div>
            <div className='flex gap-2.5 justify-center mt-[15px]'>
              <Image src="/images/error.svg" alt='error.svg' width={15} height={14} />
              <h2 className="text-xs text-danger capitalize">Invalid email or password. Please try again.</h2>
            </div>
            <button className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-2.5 py-3 rounded-[10px] border border-primary cursor-pointer">Login</button>
            <h2 className='text-sm capitalize text-secondary pt-2.5 text-center'>Don&#39;t have an account? <Link href="/register" className='text-primary underline underline-offset-3'>Sign Up</Link></h2>
          </div>
        </div>
      </div>
    </AuthLayout>
  </>

  )
}

export default LoginPage
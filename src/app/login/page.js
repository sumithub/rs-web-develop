import React from 'react';

import AuthLayout from '../../components/common/AuthLayout';
function LoginPage() {
  return (<>
    <AuthLayout>
      <div>
        <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Login to your account</h2>
        <p className="text-xs pt-2.5 pb-[25px] capitalize text-center text-[#616E7C]">Hey! We soar you working welcome back!</p>
      </div>
    </AuthLayout>
  </>

  )
}

export default LoginPage
import React from 'react';

import AuthLayout from '../../components/common/AuthLayout';
import Signin from '../../components/Signin'

function LoginPage() {
  return (<>
    <AuthLayout>
      <Signin />
    </AuthLayout>
  </>

  )
}

export default LoginPage
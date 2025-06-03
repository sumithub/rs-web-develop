import AuthLayout from '../../components/common/AuthLayout'
import React from 'react'
import Signup from '../../components/Signup'

function RegisterPage() {
  return (<AuthLayout cardClass='py-5!'>
    <Signup />
  </AuthLayout>
  )
}

export default RegisterPage
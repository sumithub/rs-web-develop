import React from 'react';
import Card from "../../components/Card"
import Welcome from '../../components/Welcome';
function LoginPage() {
  return (<>
    <div className="max-w-7xl mx-auto xl:px-0 px-12">
      <div className="grid grid-cols-2 gap-16">
        <Card>
          <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">Login to your account</h2>
            <p className="text-xs pt-2.5 pb-[25px] capitalize text-center text-[#616E7C]">Hey! We soar you working welcome back!</p>
          </div>
        </Card>
        <div className="bg-primary2 w-full rounded-[20px] my-[25px]">
          <Welcome />
        </div>
      </div>
    </div>
  </>

  )
}

export default LoginPage
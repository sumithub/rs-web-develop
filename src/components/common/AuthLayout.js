import React from 'react';
import Welcome from './Welcome';
import Card from './Card';

function AuthLayout({children}) {
  return (<div className="bg-[#FEFEFE]">
    <div className="max-w-7xl mx-auto xl:px-0 px-12">
      <div className="grid grid-cols-2 gap-16">
    <div>
        <div>Logo</div>
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

export default AuthLayout
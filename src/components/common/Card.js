import React from 'react'

function Card({ children, class_ = "", cardClass = "" }) {
  return (<div className={class_}>
    <div className={`${cardClass} w-full rounded-[15px] bg-white border border-input-border p-[30px] shadow-[_0px_0px_25px_0px_#00000008]`}>
      {children}
    </div>
  </div>
  )
}

export default Card
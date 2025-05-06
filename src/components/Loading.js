import Image from 'next/image'
import React from 'react'

function Loading({ isLight = false, isBigger = false, class_ = "" }) {
    return (
        <div className={`text-center flex justify-center items-center mx-auto min-h-[600px] w-full ${class_}`}>
            <Image src={isLight ? '/images/loading-light.svg' : '/images/loading.svg'} alt='loading' height={80} width={80} className={` ${isBigger ? 'h-60 w-60' : 'h-32 w-32'}`} />
        </div>
    )
}

export default Loading

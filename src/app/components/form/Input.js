"use client"

import Image from "next/image"

export default function Input({ isRequired = false, icon = "", label, placeholder, labelClass = "", inputClass = "", error, type, class_ = "", iconClass = "" }) {
    return <>
        <div className={`mt-[15px] ${class_}`}>
            <label className={`text-sm font-medium text-secondary ${labelClass}`}>{label}{isRequired ? <span className="text-danger">*</span> : ""}</label>
            <div className="relative">
                {icon && <Image unoptimized={true} src={icon} alt="icon" width={16} height={16} className={`absolute cursor-pointer top-4 right-2.5 ${iconClass}`} />}
                <input placeholder={placeholder} type={type} className={`border border-danger w-full rounded-lg py-3.5 px-2.5 text-sm text-secondary focus:outline-none ${inputClass}`} />
            </div>
            <h2 className="text-xs pt-[5px] capitalize text-danger">{error}</h2>
        </div>
    </>
}
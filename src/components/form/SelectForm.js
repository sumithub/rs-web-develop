"use client"

import Image from "next/image"

export default function SelectForm({infoIcon, isRequired, label, children, formProps, errors, disabled, onChange, defaultOption, clearErrors, selectClass_, class_, labelClass }
) {
    let error = ""
    if (errors)
        error = errors[formProps?.name]?.type
    if (error === "pattern") {
        error = errors[formProps?.name]?.message
    }
    return (<div className={`mt-4 text-lg relative ${class_}`}>
  
        {label && <label className={`text-sm flex items-start gap-2 font-medium text-secondary mb-1 block capitalize ${labelClass}`}>{label}{isRequired ? <span className="text-danger">*</span> : <span className="text-neutral-400"> (Optional)</span>} {infoIcon && <button type="button"> <Image
                                  unoptimized={true}
                                  src={infoIcon}
                                  alt="info"
                                  width={14}
                                  height={14}
                              /></button>}</label>}
     
        <div className="relative">
            <select className={`border border-primary/10 rounded-lg py-[8.5px] px-[2px] capitalize w-full focus-visible:outline-none text-[13px] text-text3 ${selectClass_}`}
                {...formProps} disabled={disabled}
                onChange={(e) => {
                    if (e.target.value && clearErrors) {
                        clearErrors(formProps?.name)
                    }
                    if (onChange) {
                        onChange(e)
                    }
                }}>
                <option value="">{defaultOption || `Select`}</option>
                {children}
            </select>
        </div>
        {error && <div className="capitalize text-xs font-medium text-red-500 mt-1">{error}</div>}
    </div>
    )
}
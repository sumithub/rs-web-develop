"use client"
export default function Select({ value = "", isRequired, label, children, disabled, onChange, defaultOption, selectClass_ = "", class_ = '', labelClass = "" }) {

    return (<div className={`mt-4 text-lg relative ${class_}`}>
        {label && <label className={`text-base text-black mb-1 font-bold block capitalize ${labelClass}`}>{label}{isRequired ? <span className="text-text">*</span> : ""}</label>}
        <div className="relative">
            <select className={`border border-[#ADADAD4D] rounded-lg py-2! capitalize px-2 w-full focus-visible:outline-none text-base text-[#ADADAD] ${selectClass_}`}
                value={value} disabled={disabled}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e)
                    }
                }}>
                {defaultOption !== "" && <option value="">{defaultOption || ``}</option>}
                {children}
            </select>
        </div>
    </div>
    )
}
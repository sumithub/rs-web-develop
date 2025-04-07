"use client"
export default function Select({ value = "", isRequired, label, children, disabled, onChange, defaultOption, selectClass_ = "", class_ = '', labelClass = "" }) {

    return (<div className={`mt-4 text-lg relative ${class_}`}>
        {label && <label className={`text-sm text-black mb-1 font-bold block capitalize ${labelClass}`}>{label}{isRequired ? <span className="text-text">*</span> : ""}</label>}
        <div className="relative">
            <select className={`border border-border-color rounded-lg py-[8.5px] px-2 capitalize w-full focus-visible:outline-none text-sm text-text3 ${selectClass_}`}
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
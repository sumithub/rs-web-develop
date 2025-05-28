"use client"


export default function Select({ value = "", isRequired, label, children, disabled, onChange, defaultOption, selectClass_ = "", class_ = '', labelClass = "" }) {
    return (<div className={`mt-4 text-lg relative ${class_}`}>
        {label && <label className={`text-sm font-medium text-secondary mb-1 block capitalize ${labelClass}`}>{label}{isRequired ? <span className="text-danger">*</span> : <span className="text-neutral-400"> (Optional)</span>}</label>}
        <div className="relative">
            <select className={`border border-border-color rounded-lg py-[8.5px] px-[2px] capitalize w-full focus-visible:outline-none text-[13px] text-text3 ${selectClass_}`}
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
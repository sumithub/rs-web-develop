"use client"
export default function Switch({ onChange, label, mb, checked, setValue, formProps, isVertical, disabled, class_ = "", switchClass_ } = "") {
    return <div className={`${mb ? mb : "md:mb-2 mb-[10px]"} flex ${isVertical ? "flex-col gap-[0.1rem] items-start" : "flex-row gap-2 items-center"} ${class_}`}>
        {label && <div className={`capitalize ${isVertical ? "" : "pb-1"} block font-medium text-xs `}>{label}:  </div>}
        <div className="leading-[0]">
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={checked || false} value="" className="sr-only peer" disabled={disabled}
                    onChange={(e) => {
                        if (onChange)
                            onChange(e.target.checked)
                        if (setValue && formProps)
                            setValue(formProps.name, e.target.checked)
                    }} />
                <div className={`${switchClass_} w-10 h-5 bg-[#D7D7D9] peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[3px] after:bg-white after:border-gray-300 after:rounded-full md:after:h-4 md:after:w-4 after:h-3 after:w-3 after:transition-all`}></div>            </label>
        </div>
    </div >
}
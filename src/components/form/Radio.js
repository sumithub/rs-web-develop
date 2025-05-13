export default function Radio({ disabled = false, label, checked, labelClass = "", inputClass = "", class_ = "", name, onChange, value }) {
    return (<div className={`text-sm ${class_}`}>
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                disabled={disabled}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e)
                    }
                }}
                type="radio" name={name} checked={checked} value={value} className={`${inputClass} border-4 border-border-color h-5 w-5 rounded-full text-text mb-4`} />
            <div className={`${labelClass} xl:text-[15px] font-medium text-sm capitalize xl:ml-1 ml-[2px] whitespace-pre`}>{label} </div>
        </label>
    </div>
    )
}
export default function RadioForm({ class_ = "", disabled, errors, formProps, label, checked, inputClass = "", labelClass = "", name, value, isRequired = false }) {
    let error = ""
    if (errors)
        error = errors[formProps?.name]?.type

    return <div className={`${class_} mt-4 text-lg`}>
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                {...formProps}
                disabled={disabled} value={value}
                type="radio" name={name} checked={checked}
                className={`${inputClass} border-4 border-border-color h-5 w-5 rounded-full text-text`} />
            <div className={`${labelClass} text-[15px] capitalize ml-1 whitespace-pre`}>{label}{isRequired && <span className="text-danger">*</span>}</div>
        </label>

        {error && <div className="capitalize text-xs font-medium text-red-500 mt-1">{error}</div>}
    </div>
}
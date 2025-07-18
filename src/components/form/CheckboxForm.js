"use client"
export default function CheckboxForm({ errors, id, label, name, checked, formProps, disabled, class_ = "", labelClass = "", inputClass = "" }) {

    let error = "";

    if (formProps?.name && errors?.[formProps.name]) {
        const fieldError = errors[formProps.name];
        if (fieldError.type === "pattern" || fieldError.type === "validate" || fieldError.type === "required") {
            error = fieldError.message || "Required";
        } else {
            error = "Required";
        }
    }
    return <div>
        <label className={`${class_} ${disabled ? "pointer-events-none" : ""}`} htmlFor={id || label}>
            <div className="pointer-events-none">
                <div className={`text-base text-secondary ${labelClass}`}>{label}</div>
                <div className="text-base text-secondary font-bold">{name}</div>
            </div>
            <input id={id || label} disabled={disabled} type="checkbox" className={`h-4 w-5 ml-auto mt-1 ${inputClass}`}
                {...formProps}
                checked={checked} />
        </label>  {error && <p className="text-xs pt-[5px] capitalize text-danger">{error}</p>}
    </div>
}
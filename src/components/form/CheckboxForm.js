"use client"
export default function CheckboxForm({ label, name, checked, formProps, disabled, class_ = "", labelClass = "" }) {
    return <label className={`${class_} ${disabled ? "pointer-events-none" : ""}`} htmlFor={label}>
        <div className="pointer-events-none">
            <div className={`text-base text-secondary ${labelClass}`}>{label}</div>
            <div className="text-base text-secondary font-bold">{name}</div>
        </div>
        <input id={label} disabled={disabled} type="checkbox" className="h-4 w-5 ml-auto mt-1"
            {...formProps}
            checked={checked} />
    </label>
}
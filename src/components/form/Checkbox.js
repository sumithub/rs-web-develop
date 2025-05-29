"use client"
export default function Checkbox({ label, name, checked, onChange, class_ = "", labelClass = "" }) {
    return <label className={`${class_}`} htmlFor={label}>
        <div>
            <div className={`text-base text-secondary ${labelClass}`}>{label}</div>
            <div className="text-base text-secondary font-bold">{name}</div>
        </div>
        <input id={label} type="checkbox" className="h-4 w-5 ml-auto mt-1"
            onChange={(e) => {
                if (onChange)
                    onChange(e.target.checked)
            }}
            checked={checked} />
    </label>
}
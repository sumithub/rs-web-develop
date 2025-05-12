"use client"
export default function Checkbox({ label, name, checked, onChange, class_ = "", labelClass = "" }) {
    return <div className={`${class_}`}>
        <div>
            <label className={`text-base text-secondary ${labelClass}`}>{label}</label>
            <div className="text-base text-secondary font-bold">{name}</div>
        </div>
        <input type="checkbox" className="h-4 w-5 ml-auto mt-1"
            onChange={() => { onChange(!checked) }}
            checked={checked} />
    </div>
}
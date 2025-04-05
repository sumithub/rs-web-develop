"use client"
export default function Input({ label, placeholder, labelClass = "", inputClass = "", error, }) {
    return <>
        <div className="">
            <label className={`text-sm font-medium text-secondary ${labelClass}`}>{label}</label>
            <input placeholder={placeholder} className={`border border-text2 w-full focus:outline-none ${inputClass}`} />
            <h2 className="text-xs text-text2">{error}</h2>
        </div>
    </>
}
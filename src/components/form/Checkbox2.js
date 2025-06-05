"use client";

export default function Checkbox2({ id = "", class_ = "", required = false, checked = false, onChange }) {
    return (
        <>
            <input
                type="checkbox"
                required={required}
                id={id}
                checked={checked}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e.target.checked);
                    }
                }}
                className={`accent-primary w-4 h-4 rounded-sm border border-[#ccc] ${class_}`}
            />
        </>
    );
}

"use client";

export default function Checkbox2({ id = "", class_ = "", required = false }) {
    return (
        <>
            <input
                type="checkbox"
                required={required}
                id={id}
                className={`accent-primary w-4 h-4 rounded-sm border border-[#ccc] ${class_}`}
            />
        </>
    );
}

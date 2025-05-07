"use client";

export default function Checkbox2({ id = "", class_ = "" }) {
    return (
        <>
            <input
                type="checkbox"
                required={true}
                id={id}
                className={`accent-primary w-4 h-4 rounded-sm border border-[#ccc] ${class_}`}
            />
        </>
    );
}

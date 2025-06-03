"use client";

import Image from "next/image";
import { useState } from "react";

export default function Input({ hideOptional = false, isTextArea, rows = 3, isRequired, label, placeholder, labelClass, inputType = "text", inputClass = "", error, icon, disabled, iconClass = "", class_ = "", onIconClick, infoIcon }) {
    const [type, setType] = useState("password")

    const handleClick = () => {
        if (inputType === "password") {
            setType(type === "password" ? "text" : "password");
        } else if (onIconClick) {
            onIconClick()
        }
    };

    return (
        <div className={`${class_} mt-[15px]`}>
            {infoIcon && (
                <span className="cursor-pointer" title="More information">
                    {typeof infoIcon === "string" ? (
                        <Image
                            unoptimized
                            src={infoIcon}
                            alt="info"
                            width={14}
                            height={14}
                        />
                    ) : (
                        infoIcon
                    )}
                </span>
            )}
            <label className={`text-sm font-medium text-secondary ${labelClass}`}>{label}{isRequired ? <span className="text-danger">*</span> : (hideOptional ? "" : <span className="text-neutral-400">(Optional)</span>)}</label>
            <div className="relative">
                {(inputType !== "password" && icon) && (
                    <img
                        unoptimized
                        src={icon}
                        alt=""
                        width={16}
                        height={16}
                        className={`absolute cursor-pointer top-4 right-2.5 ${iconClass}`}
                        onClick={handleClick} />
                )}
                {(inputType === "password") && (
                    <img
                        unoptimized
                        src={type !== "password" ? "/images/eyes.svg" : "/images/open-eye.svg"}
                        alt=""
                        width={16}
                        height={16}
                        className={`absolute cursor-pointer top-4 right-2.5 "w-6 h-6"`}
                        onClick={handleClick} />
                )}
                {isTextArea ? <textarea rows={rows}
                    placeholder={placeholder} disabled={disabled}
                    className={`border ${error ? "border-danger" : "border-[#F4F4F4]"} focus:outline-0 focus-visible:outline-0 focus:border-primary/60 w-full rounded-lg py-3 px-2.5 text-sm text-secondary ${inputClass}`}
                /> : <input
                    placeholder={placeholder} type={inputType === "password" ? type : (inputType || "text")}
                    disabled={disabled}
                    className={`border ${error ? "border-danger" : "border-[#F4F4F4]"} focus:outline-0 focus-visible:outline-0 focus:border-primary/60 w-full rounded-lg py-3 px-2.5 text-sm text-secondary ${inputClass}`}
                />}
            </div>
            {error && <p className="text-xs pt-[5px] capitalize text-danger">{error}</p>}
        </div>
    );
}

"use client";

import Image from "next/image";
import { useState } from "react";

export default function Input({ isRequired, label, placeholder, labelClass, inputType = "text", inputClass = "", error, icon, disabled, iconClass = "" }) {
    const [type, setType] = useState("password")


    const handleClick = () => {
        if (inputType === "password") {
            setType(type === "password" ? "text" : "password");
        }
    };

    return (
        <div className={`mt-[15px]`}>
            <label className={`text-sm font-medium text-secondary ${labelClass}`}> {label}{isRequired && <span className="text-danger">*</span>}</label>
            <div className="relative">
                {(inputType !== "password" && icon) && (
                    <Image
                        unoptimized
                        src={icon}
                        alt="icon"
                        width={16}
                        height={16}
                        className={`absolute cursor-pointer top-4 right-2.5 ${iconClass}`}
                        onClick={handleClick} />
                )}
                {(inputType === "password") && (
                    <Image
                        unoptimized
                        src={type !== "password" ? "/images/eyes.svg" : "/images/open-eye.svg"}
                        alt="icon"
                        width={16}
                        height={16}
                        className={`absolute cursor-pointer top-4 right-2.5 "w-6 h-6"`}
                        onClick={handleClick} />
                )}
                <input
                    placeholder={placeholder} type={inputType === "password" ? type : (inputType || "text")}
                    disabled={disabled}
                    className={`border ${error ? "border-danger" : "border-[#F4F4F4]"} focus:outline-0 focus-visible:outline-0 focus:border-primary/60 w-full rounded-lg py-3.5 px-2.5 text-sm text-secondary  ${inputClass}`}
                />
            </div>
            {error && <p className="text-xs pt-[5px] capitalize text-danger">{error}</p>}
        </div>
    );
}

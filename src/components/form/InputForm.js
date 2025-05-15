"use client";

import Image from "next/image";
import { useState } from "react";

export default function InputForm({ class_ = "", watch, setValue, clearValue = true, isRequired, label, placeholder, labelClass, inputType = "text", inputClass = "", formProps, errors, icon, disabled, iconClass = "" }) {
    const [type, setType] = useState("password")
    let error = "";

    if (formProps?.name && errors?.[formProps.name]) {
        const fieldError = errors[formProps.name];
        if (fieldError.type === "pattern" || fieldError.type === "validate") {
            error = fieldError.message;
        } else {
            error = "This field is required";
        }
    }


    const handleClick = () => {
        if (inputType === "password") {
            setType(type === "password" ? "text" : "password");
        } else if (clearValue) {
            setValue(formProps?.name, "")
        }
    };

    return (
        <div className={`mt-[15px] ${class_}`}>
            <label className={`text-sm font-medium text-secondary ${labelClass}`}> {label}{isRequired && <span className="text-danger">*</span>}</label>
            <div className="relative">
                {(inputType !== "password" && icon && watch(formProps?.name)) && (
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
                    {...formProps}
                    disabled={disabled}
                    className={`border ${error ? "border-danger" : "border-[#F4F4F4]"} focus:outline-0 focus-visible:outline-0 focus:border-primary/60 w-full rounded-lg py-3 px-2.5 text-sm text-secondary  ${inputClass}`}
                />
            </div>
            {error && <p className="text-xs pt-[3px] capitalize text-danger">{error}</p>}
        </div>
    );
}

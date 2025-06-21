"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image"

export default function SelectForm({
    infoIcon,
    isRequired,
    label,
    children,
    formProps,
    errors,
    disabled,
    defaultOption,
    clearErrors,
    selectClass_,
    class_,
    labelClass,
    setValue,
    watch,
    onChange
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownDirection, setDropdownDirection] = useState('down');
    let error = ""
    if (errors)
        error = errors[formProps?.name]?.type
    if (error === "pattern") {
        error = errors[formProps?.name]?.message
    }
    const ref = useRef(null);

    useEffect(() => {
        calculateDirection()
    }, [])
    const calculateDirection = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            if (spaceBelow < 100 && spaceAbove > 100) {
                setDropdownDirection('up');
            } else {
                setDropdownDirection('down');
            }
        }
    };

    const options = [];
    React.Children.forEach(children, child => {
        if (child?.type === 'option') {
            options.push({
                value: child.props.value,
                label: child.props.children
            });
        }
    });

    const getCurrentValue = () => {
        const currentValue = watch(formProps?.name);
        const v = options.find(e => e.value === currentValue);

        // If no option is selected or value is empty, show the defaultOption
        if (!v || !currentValue) {
            return defaultOption || "";
        }

        return v.label || "";
    };

    // const getCurrentValue = () => {
    //     const v = options.find(e => e.value === watch(formProps?.name)) || {}
    //     return v?.label || ""
    // };

    const handleSelect = (optionValue) => {
        setIsOpen(false);
        if (onChange) {
            onChange({
                target: {
                    value: optionValue
                }
            })
        }
        if (optionValue && clearErrors && formProps?.name) {
            clearErrors(formProps.name);
        }

        if (setValue && formProps?.name) {
            setValue(formProps.name, optionValue);
        }
    };

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        const checkIfClickedOutside = (e) => {
            if (ref.current && (!ref.current.contains(e.target))) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeydown);
        if (typeof window !== "undefined") {
            document.addEventListener('mousedown', checkIfClickedOutside);
            return () => {
                document.removeEventListener('keydown', handleKeydown);
                document.removeEventListener('mousedown', checkIfClickedOutside);
            };
        }
    }, []);

    return (
        <div className={`mt-4 text-lg relative ${class_}`}>
            {label && (
                <label className={`text-sm flex items-start gap-2 font-medium text-secondary mb-1 block capitalize ${labelClass}`}>
                    {label}
                    {isRequired ? <span className="text-danger">*</span> : <span className="text-neutral-400"> (Optional)</span>}
                    {infoIcon && (
                        <button type="button">
                            <Image
                                unoptimized={true}
                                src={infoIcon}
                                alt="info"
                                width={12}
                                height={12}
                            />
                        </button>
                    )}
                </label>
            )}

            <div ref={ref} className="relative">
                {/* Hidden real select for form compatibility */}
                <select
                    className="sr-only"
                    {...formProps}
                    disabled={disabled}
                >
                    <option value="">{defaultOption}</option>
                    {children}
                </select>

                {/* Custom select display */}
                <div
                    className={`${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-pointer"} border border-primary/10 rounded-lg py-[8.5px] px-[2px] capitalize w-full focus-visible:outline-none text-[13px] text-text3 flex justify-between items-center ${!isOpen ? 'rounded-lg' : 'rounded-t-lg rounded-b-none'} ${selectClass_}`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                >
                    <span className="capitalize truncate text-left flex-1 px-1">
                        {getCurrentValue() || label}
                    </span>
                    <div className="flex items-center gap-1 ml-2 pr-1">
                        <svg
                            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                {/* Dropdown options */}
                {isOpen && (
                    <div className={`absolute w-full bg-white rounded-lg border border-primary/10 z-[10001]  overflow-y-auto ${dropdownDirection === 'up'
                        ? 'bottom-full  rounded-t-lg rounded-b-none'
                        : 'top-full  rounded-b-lg rounded-t-none'
                        }`}>                        {/* Default option */}
                        {defaultOption && (
                            <div
                                className={`px-3 py-2 text-[13px] cursor-pointer capitalize ${getCurrentValue() === "" ? 'bg-primary text-white' : 'hover:bg-gray-50 text-text3'}`}
                                onClick={() => handleSelect("")}
                            >
                                {defaultOption}
                            </div>
                        )}

                        {/* Options */}
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={`px-3 py-2 text-[13px] cursor-pointer capitalize flex items-center gap-2 ${option.label === getCurrentValue()
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-50 text-text3'
                                    }`}
                                onClick={() => handleSelect(option.value)}
                            >
                                <span className="flex-1">{option.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && (
                <div className="capitalize text-xs font-medium text-red-500 mt-1">
                    {error}
                </div>
            )}
        </div>
    );
}
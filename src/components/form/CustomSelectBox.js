'use client'
import React, { useState, useRef, useEffect } from 'react';
export default function CustomSelectBox({
    value = "",
    isRequired,
    label,
    children,
    disabled,
    onChange,
    defaultOption,
    selectClass_ = "",
    class_ = '',
    labelClass = ""
}) {
    const [isOpen, setIsOpen] = useState(false);

    // Extract options from children for display
    const options = [];
    React.Children.forEach(children, child => {
        if (child?.type === 'option') {
            options.push({
                value: child.props.value,
                label: child.props.children
            });
        }
    });

    // Find the currently selected option label
    const selectedLabel = options.find(opt => opt.value === value)?.label || defaultOption || "";

    const handleSelect = (optionValue) => {
        setIsOpen(false);

        if (onChange) {
            // Create a synthetic event to mimic select onChange
            const event = {
                target: {
                    value: optionValue
                }
            };
            onChange(event);
        }
    };

    const ref = useRef(null);
    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        })

        const checkIfClickedOutside = (e) => {
            if (ref.current && (!ref.current.contains(e.target))) {
                setIsOpen(false)
            }
        };

        if (typeof window !== "undefined") {
            document.addEventListener('mousedown', checkIfClickedOutside);
            return () => {
                document.removeEventListener('mousedown', checkIfClickedOutside);
            };
        }
    }, []);

    return (<div ref={ref} className={`relative w-48 ${class_}`}>
        {label && (
            <label className={`text-sm font-medium text-secondary mb-1 block capitalize ${labelClass}`}>
                {label}{isRequired ? <span className="text-danger">*</span> : ""}
            </label>
        )}

        <div className="relative">
            {/* Hidden real select for form compatibility */}
            <select
                className="sr-only"
                value={value}
                disabled={disabled}
                onChange={onChange}
            >
                {children}
            </select>

            {/* Custom select button */}
            <button
                type="button"
                className={`w-full border border-border-color  py-[7.7px] px-1.5 capitalize focus-visible:outline-none text-[13px] text-text3 rounded-t-md flex justify-between items-center  ${!isOpen ? 'rounded-b-md' : ''} ${selectClass_}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span className="capitalize">{selectedLabel}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            {/* Dropdown options */}
            {isOpen && (
                <div className="absolute w-full bg-white rounded-b-md border border-t-0 border-border-color z-10">
                    {defaultOption !== "" && <div
                        className={`px-4 py-2 text-sm cursor-pointer capitalize ${value === "" ? 'bg-primary text-white' : 'hover:bg-dark text-text3'
                            }`}
                        onClick={() => handleSelect("")}
                    >{defaultOption || ``}</div>}
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`px-4 py-2 text-sm cursor-pointer capitalize ${option.value === value ? 'bg-primary text-white' : 'hover:bg-dark text-text3'
                                }`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    );
}
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
    labelClass = "",
    paddingClass = "",
    multiSelect = false,
    placeholder = "Select options..."
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

    const selectedValues = multiSelect
        ? (Array.isArray(value) ? value : (value ? [value] : []))
        : value;

    const getSelectedLabel = () => {
        if (multiSelect) {
            if (!selectedValues || selectedValues.length === 0) {
                return defaultOption || placeholder;
            }

            const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));
            return selectedOptions.map(opt => opt.label).join(', ');
        } else {
            return options.find(opt => opt.value === value)?.label || defaultOption || "";
        }
    };

    const handleSelect = (optionValue) => {
        if (multiSelect) {
            let newValues;
            if (selectedValues.includes(optionValue)) {
                newValues = selectedValues.filter(val => val !== optionValue);
            } else {
                newValues = [...selectedValues, optionValue];
            }

            if (onChange) {
                const event = {
                    target: {
                        value: newValues
                    }
                };
                onChange(event);
            }
        } else {
            setIsOpen(false);
            if (onChange) {
                const event = {
                    target: {
                        value: optionValue
                    }
                };
                onChange(event);
            }
        }
    };

    const handleClearAll = (e) => {
        e.stopPropagation();
        if (onChange) {
            const event = {
                target: {
                    value: multiSelect ? [] : ""
                }
            };
            onChange(event);
        }
    };

    const ref = useRef(null);
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

    const isOptionSelected = (optionValue) => {
        return multiSelect
            ? selectedValues.includes(optionValue)
            : optionValue === value;
    };

    return (<div ref={ref} className={`relative shrink-0 w-48 ${class_}`}>
        {label && (
            <label className={`text-sm font-medium text-secondary mb-1 block capitalize ${labelClass}`}>
                {label}{isRequired ? <span className="text-danger">*</span> : ""}
            </label>
        )}

        <div className="relative">
            {/* Hidden real select for form compatibility */}
            <select
                className="sr-only"
                value={multiSelect ? "" : value}
                disabled={disabled}
                onChange={onChange}
                multiple={multiSelect}>
                {children}
            </select>

            <button
                type="button"
                className={`w-full border border-border-color py-[7.7px] px-1.5 capitalize focus-visible:outline-none text-[13px] text-text3 rounded-t-md flex justify-between items-center ${!isOpen ? 'rounded-b-md' : ''} ${selectClass_}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span className="capitalize truncate text-left flex-1">
                    {getSelectedLabel()}
                </span>
                <div className="flex items-center gap-1 ml-2">
                    {multiSelect && selectedValues.length > 0 && (
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 p-0.5"
                            onClick={handleClearAll}
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    )}
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
            </button>

            {/* Dropdown options */}
            {isOpen && (
                <div className="absolute w-full bg-white rounded-b-md border border-t-0 border-border-color z-10 max-h-60 overflow-y-auto">
                    {/* Default option for single select */}
                    {!multiSelect && defaultOption !== "" && (
                        <div
                            className={`px-4 py-2 text-sm cursor-pointer capitalize ${paddingClass} ${value === "" ? 'bg-primary text-white' : 'hover:bg-dark text-text3'}`}
                            onClick={() => handleSelect("")}
                        >
                            {defaultOption || ``}
                        </div>
                    )}

                    {/* Options */}
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`px-4 py-2 text-sm cursor-pointer capitalize flex items-center gap-2 ${isOptionSelected(option.value)
                                ? 'bg-primary text-white'
                                : 'hover:bg-dark text-text3'
                                }`}
                            onClick={() => handleSelect(option.value)} >
                            <span className="flex-1">{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    );
}
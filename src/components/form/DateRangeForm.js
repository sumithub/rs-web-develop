"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { formatDate } from '../../../helper';

function DateRangeForm({ 
    onChange, 
    class_ = "", 
    inputClass = "", 
    watch, 
    setValue, 
    clearErrors,
    formProps, 
    errors, 
    label, 
    labelClass = "",
    isRequired = false,
    placeholder = "Date Range Selector",
    disabled = false 
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null);
    
    const currentValue = watch ? watch(formProps?.name) : null;
    
    let error = "";
    if (formProps?.name && errors?.[formProps.name]) {
        const fieldError = errors[formProps.name];
        if (fieldError.type === "pattern" || fieldError.type === "validate" || fieldError.type === "minLength") {
            error = fieldError.message;
        } else {
            error = "This field is required";
        }
    } else if (errors?.[formProps?.name]?.type) {
        error = errors[formProps?.name]?.message || "This field is required";
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        }

        const checkIfClickedOutside = (e) => {
            if (ref.current && (!ref.current.contains(e.target))) {
                setOpen(false)
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        if (typeof window !== "undefined") {
            document.addEventListener('mousedown', checkIfClickedOutside);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('mousedown', checkIfClickedOutside);
            };
        }
    }, []);

    const toggleDatePicker = () => {
        if (!disabled) {
            setOpen(!open)
        }
    }

    // Initialize state based on current form value or default
    const [state, setState] = useState(() => {
        if (currentValue && currentValue.startDate && currentValue.endDate) {
            return [{
                startDate: new Date(currentValue.startDate),
                endDate: new Date(currentValue.endDate),
                key: 'selection'
            }];
        }
        return [{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }];
    });

    const handleSelect = (ranges) => {
        setState([ranges.selection]);
    };

    const handleSave = () => {
        const { startDate, endDate } = state[0];
        const dateRange = { startDate, endDate };
        
        if (clearErrors && formProps?.name) {
            clearErrors(formProps.name);
        }
        
        if (setValue && formProps?.name) {
            setValue(formProps.name, dateRange, { 
                shouldValidate: true 
            });
        }
        
        if (onChange) {
            onChange(dateRange);
        }
        
        setOpen(false);
    };

    const getDisplayValue = () => {
        if (currentValue && currentValue.startDate && currentValue.endDate) {
            return `${formatDate(new Date(currentValue.startDate), "dd/MM/yyyy")} - ${formatDate(new Date(currentValue.endDate), "dd/MM/yyyy")}`;
        }
        return placeholder;
    };

    return (
        <div className={`mt-[15px] ${class_}`}>
            {label && (
                <label className={`text-sm font-medium text-secondary capitalize ${labelClass}`}>
                    {label}
                    {isRequired ? (
                        <span className="text-danger">*</span>
                    ) : (
                        <span className="text-neutral-500"> (Optional)</span>
                    )}
                </label>
            )}
            
            <div ref={ref} className="relative">
                <button
                    onClick={toggleDatePicker}
                    disabled={disabled}
                    className={`${inputClass} cursor-pointer flex items-center gap-2 border ${
                        error ? "border-danger" : "border-border-color"
                    } rounded-lg py-[7.7px] px-2 capitalize text-[13px] text-text3 w-full focus-visible:outline-none shrink-0 ${
                        disabled ? "opacity-50 cursor-not-allowed" : ""
                    } focus:border-primary/60`}
                >
                    {getDisplayValue()}
                    <Image 
                        src="/images/calendar1.svg" 
                        alt='calendar' 
                        height={16} 
                        width={16} 
                        unoptimized={true} 
                        className='ml-auto' 
                    />
                </button>

                {open && !disabled && (
                    <div>
                        <div className='overflow-hidden absolute z-50 top-full right-0 border border-dark rounded-lg shadow-[0px_0px_40px_rgba(0,_0,_0,_0.08)]'>
                            <DateRangePicker
                                dateDisplayFormat='dd/MM/yyyy'
                                showDateDisplay={false}
                                onChange={handleSelect}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={2}
                                ranges={state}
                                direction="horizontal"
                            />
                            <div className='absolute left-14 bottom-5 w-[12%]'>
                                <button 
                                    onClick={handleSave}
                                    className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full py-1 rounded-lg border border-primary cursor-pointer text-center"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {error && <p className="text-xs pt-[3px] capitalize text-danger">{error}</p>}
        </div>
    )
}

export default DateRangeForm
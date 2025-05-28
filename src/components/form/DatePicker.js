"use client"
import Image from 'next/image';
import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(({ value, onClick, class_ = "", icon }, ref) => (<>
    <div className="w-full cursor-pointer relative" onClick={onClick} ref={ref}>

        <div className={`${class_} border border-border-color rounded-lg py-[7.7px] px-2 capitalize text-[13px] text-text3 w-full focus-visible:outline-none shrink-0`}>{value ? value : "Select Date"}</div>
        {icon && <Image src="/images/calendar1.svg" alt='calendar' height={16} width={16} unoptimized={true} className='absolute top-2.5 right-2' />}
    </div>
</>
))

function DatePicker({ label = '', showTimeInput = false, icon = "", class_, value, labelClass = "", isRequired, minDate, maxDate, onChange, mainClass }) {
    return (<div className={`mt-4 relative w-full text-lg z-[11] ${mainClass}`}>
        {label && <label className={`text-sm text-secondary mb-1 block capitalize  ${labelClass}`}>{label}{isRequired ? <span>*</span> : <span className="text-neutral-400"> (Optional)</span>} </label>}
        <ReactDatePicker
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode="select"
            showTimeInput={showTimeInput}
            wrapperClassName='!w-full'
            popperPlacement='bottom-start'
            minDate={minDate}
            maxDate={maxDate}
            selected={value ? value : ''}
            onChange={(date) => {
                if (onChange)
                    onChange(date)
            }}
            customInput={<CustomInput icon={icon} class_={class_} value={value} />}
            dateFormat={showTimeInput ? "dd/MM/yyyy hh:mm a" : "dd/MM/yyyy"}
        />
    </div>
    );
}
export default DatePicker;

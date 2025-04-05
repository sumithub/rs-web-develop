"use client"
import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(({ value, onClick, class_ = "", icon }) => (<>
    <div className="w-full cursor-pointer relative" onClick={onClick} ref={ref}>
        {icon && icon}
        <div className={`${class_} text-primary-light font-bold montserrat text-[45px] leading-none w-full focus-visible:outline-none shrink-0`}>{value ? value : "Select"}</div>
    </div>
</>
))

function DatePicker({ label = '', showTimeInput = false, icon = "", class_, value, labelClass = "", isRequired, minDate, maxDate, onChange }) {
    return (<div className="mt-4 relative w-full text-lg z-[11]">
        {label && <label className={`text-base text-text mb-1 block capitalize  ${labelClass}`}>{label}{isRequired ? <span className="">*</span> : ""}</label>}
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

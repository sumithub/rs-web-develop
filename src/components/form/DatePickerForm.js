import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(({ value, onClick, icon, mainClass }, ref) => (<> <div className="w-full cursor-pointer relative" onClick={onClick} ref={ref}>
    <div className={`border border-input-border ${mainClass} rounded-lg py-3 px-2.5 capitalize text-sm text-text3 w-full items-center focus-visible:outline-none shrink-0`}>{value || "Select"}</div>
    {icon && <Image src="/images/calendar1.svg" alt='calendar' height={16} width={16} unoptimized={true} className='absolute top-3.5 right-2' />}
</div>
</>
))

function DatePickerForm({ label = '', icon = "", class_, mainClass = "", formProps, errors, labelClass = "", isRequired, setValue, watch, clearErrors, minDate, maxDate, onChange, showTimeInput = false }) {
    const error = errors?.[formProps?.name]?.message || errors?.[formProps?.name]?.type;
    const selectedDate = watch ? watch(formProps.name) : null;
    return (<div className="mt-4 relative w-full text-lg">
        {label && <label className={`text-sm text-secondary mb-1 block capitalize  ${labelClass}`}>{label}{isRequired ? <span className='text-danger'>*</span> : <span className="text-neutral-400"> (Optional)</span>} </label>}
        <ReactDatePicker
            popperClassName='!z-[99999]'
            showYearDropdown={true}
            showMonthDropdown={true}
            showTimeInput={showTimeInput}
            dropdownMode="select"
            wrapperClassName='!w-full'
            popperPlacement='bottom-start'
            minDate={minDate}
            maxDate={maxDate}
            selected={selectedDate ? selectedDate : ''}
            onChange={(date) => {
                setValue(formProps.name, date)
                clearErrors(formProps.name)
                if (onChange)
                    onChange()
            }}
            customInput={<CustomInput icon={icon} class_={class_} mainClass={mainClass} value={selectedDate} />}
            dateFormat={showTimeInput ? "MMM dd, yyyy HH:mm:ss" : "MMM dd, yyyy"}
            timeFormat="HH:mm:ss"
        />
        {error && <div className="capitalize text-xs font-medium text-danger mt-1">{error}</div>}
    </div>
    );
}
export default DatePickerForm;

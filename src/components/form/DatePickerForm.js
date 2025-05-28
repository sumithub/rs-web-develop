import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(({ value, onClick, }, ref) => (<> <div className="w-full cursor-pointer relative" onClick={onClick} ref={ref}>
    <div className={` border border-border-color rounded-lg py-[7.7px]! px-2 capitalize text-[13px] text-text3 w-full focus-visible:outline-none shrink-0`}>{value || "Select"}</div>
    {icon && <Image src="/images/calendar1.svg" alt='calendar' height={16} width={16} unoptimized={true} className='absolute top-2.5 right-2' />}
</div>
</>
))

function DatePickerForm({ label = '', icon = "", class_, formProps, errors, labelClass = "", isRequired, setValue, watch, clearErrors, minDate, maxDate, onChange, showTimeInput = false, aceInput = false }) {
    const { data } = useSession()
    const company = data?.company || {}
    const error = errors?.[formProps?.name]?.message || errors?.[formProps?.name]?.type;
    const selectedDate = watch ? watch(formProps.name) : null;
    return (<div className="mt-4 relative w-full text-lg">
        {label && <label className={`text-base text-danger mb-1 block capitalize  ${labelClass}`}>{label}{isRequired ? <span className="">*</span> : ""}</label>}
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
            customInput={<CustomInput icon={icon} class_={class_} value={selectedDate} />}
            dateFormat={aceInput ? "yyyy-MM-dd hh:mm aa" : getFormatOfDate(company, showTimeInput)}

            timeFormat="HH:mm:ss"
        />
        {error && <div className="capitalize text-xs font-medium text-danger mt-1">{error}</div>}
    </div>
    );
}
export default DatePickerForm;

"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { formatDate } from '../../../helper';

function DateRange({ onChange, class_ = "" }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null);
    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        })

        const checkIfClickedOutside = (e) => {
            if (ref.current && (!ref.current.contains(e.target))) {
                setOpen(false)
            }
        };

        if (typeof window !== "undefined") {
            document.addEventListener('mousedown', checkIfClickedOutside);
            return () => {
                document.removeEventListener('mousedown', checkIfClickedOutside);
            };
        }
    }, []);

    const toggleDatePicker = () => {
        setOpen(!open)
    }
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [savedRange, setSavedRange] = useState("");

    const handleSelect = (ranges) => {
        setState([ranges.selection]);
    };

    const handleSave = () => {
        const { startDate, endDate } = state[0];
        const formatted = `${formatDate(startDate, "dd/MM/yyyy")} - ${formatDate(endDate, "dd/MM/yyyy")}`;
        setSavedRange(formatted);
        if (onChange)
            onChange({ startDate, endDate });
        setOpen(false);
    };
    return (
        <div ref={ref} className={`relative ${class_}`}>
            <button
                onClick={toggleDatePicker}
                className="cursor-pointer flex items-center gap-2 border border-border-color rounded-lg py-[7.7px]! px-2 capitalize text-[13px] text-text3 w-full focus-visible:outline-none shrink-0">
                {savedRange || "Date Range Selector"}
                <Image src="/images/calendar1.svg" alt='calendar' height={16} width={16} unoptimized={true} />
            </button>

            {open &&
                <div>
                    <div className='overflow-hidden absolute top-full right-0 border border-dark rounded-lg shadow-[0px_0px_40px_rgba(0,_0,_0,_0.08)]'>
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
                            <button onClick={handleSave}
                                className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full py-1 rounded-lg border border-primary cursor-pointer text-center">Save</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default DateRange
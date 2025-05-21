"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function DateRange() {
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
    return (<div ref={ref} className='relative'>
        <button
            onClick={toggleDatePicker}
            className="cursor-pointer flex items-center gap-2 border border-border-color rounded-lg py-[7.7px]! px-2 capitalize text-[13px] text-text3 w-full focus-visible:outline-none shrink-0"        >
            Date Range Selector
            <Image src="/images/calendar1.svg" alt='calendar' height={16} width={16} unoptimized={true} />
        </button>

        {open &&
            <div>
                <div className='overflow-hidden absolute top-full right-0 border border-dark rounded-lg shadow-[0px_0px_40px_rgba(0,_0,_0,_0.08)]'>
                    <DateRangePicker
                        showDateDisplay={false}
                        onChange={item => setState([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                    />
                    <button onClick={() => { setOpen(false) }} className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-1/5 py-1 rounded-[10px] border border-primary cursor-pointer absolute left-0! bottom-3 ml-5">Save</button>
                </div>
            </div>
        }
    </div>)
}

export default DateRange
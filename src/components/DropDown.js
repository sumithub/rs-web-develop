import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options = [], onClickOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (<div className="relative inline-block" ref={dropdownRef}>
        <button
            onClick={toggleDropdown}><Image src="/images/action.svg" alt="action" height={28} width={28} unoptimized={true} className="cursor-pointer disabled:pointer-events-none" />
        </button>

        {isOpen && (
            <div className="fixed z-50 right-20 top-1/2  mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 ">
                <ul className="py-1">
                    {options.map((e, i) => {
                        return <li key={i}>
                            <button
                                className={`w-full text-left px-4 py-3 flex items-center hover:text-white hover:bg-primary cursor-pointer disabled:pointer-events-none`}
                                onClick={() => {
                                    if (onClickOption) {
                                        onClickOption(e.value)
                                    }
                                }}>
                                {e.icon && <Image src={e.icon || "/images/sms.svg"} alt='arrow' height={16} width={16} unoptimized={true} className='mr-3' />}
                                {e.label}
                            </button>
                        </li>

                    })}
                </ul>
            </div>
        )}
    </div>
    );
};

export default Dropdown;
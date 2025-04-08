import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
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

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* Dropdown button */}
            <button
                onClick={toggleDropdown}

            ><Image src="/images/action.svg" alt="action" height={28} width={28} unoptimized={true} className="cursor-pointer disabled:pointer-events-none" />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="fixed z-50 right-20 top-1/2  mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 ">
                    <ul className="py-1">
                        {/* Reply Now - with blue background */}
                        <li>
                            <button
                                className="w-full text-left px-4 py-3 flex items-center text-white bg-primary cursor-pointer disabled:pointer-events-none"
                                onClick={() => console.log('Reply Now clicked')}>
                                <Image src="/images/sms.svg" alt='arrow' height={16} width={16} unoptimized={true} className='mr-3' />
                                Reply Now
                            </button>
                        </li>

                        {/* Request Update */}
                        <li>
                            <button
                                className="w-full text-left px-4 py-3 flex items-center text-text3 text-sm hover:bg-gray-100 cursor-pointer disabled:pointer-events-none"
                                onClick={() => console.log('Request Update clicked')}>
                                <Image src="/images/arrow2.svg" alt='arrow' height={16} width={16} unoptimized={true} className='mr-3' />
                                Request Update
                            </button>
                        </li>

                        {/* Assign To User */}
                        <li>
                            <button
                                className="w-full text-left px-4 py-3 flex items-center text-text3 text-sm hover:bg-gray-100 cursor-pointer disabled:pointer-events-none"
                                onClick={() => console.log('Assign To User clicked')}>
                                <Image src="/images/user.svg" alt='arrow' height={16} width={16} unoptimized={true} className='mr-3' />
                                Assign To User
                            </button>
                        </li>

                        {/* Share */}
                        <li>
                            <button
                                className="w-full text-left px-4 py-3 flex items-center text-text3 text-sm hover:bg-gray-100 cursor-pointer disabled:pointer-events-none"
                                onClick={() => console.log('Share clicked')}>
                                <Image src="/images/share.svg" alt='arrow' height={16} width={16} unoptimized={true} className='mr-3' />
                                Share (Social Media, Email)
                            </button>
                        </li>

                        {/* Divider */}
                        <li className="border-t border-gray-200"></li>

                        {/* Delete - with red text */}
                        <li>
                            <button
                                className="w-full text-left px-4 py-3 flex items-center text-text2 text-sm hover:bg-gray-100 cursor-pointer disabled:pointer-events-none"
                                onClick={() => console.log('Delete clicked')}>
                                <Image src="/images/delete.svg" alt='arrow' height={16} width={16} unoptimized={true} className='mr-3' />
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { USER_ACTIONS } from '../constent/constArray';
import Link from 'next/link';

const Dropdown = ({ options = USER_ACTIONS, onClickOption, class_ = "", editLink = null, id = null }) => {
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

    const handleOptionClick = (optionValue) => {
        setIsOpen(false);

        if (onClickOption) {
            // Pass both the option value and the id
            onClickOption(optionValue, id);
        }
    };

    return (<div className="relative inline-block" ref={dropdownRef}>
        <button
            onClick={toggleDropdown}>
            <Image src="/images/action.svg" alt="action" height={28} width={28} unoptimized={true} className="cursor-pointer disabled:pointer-events-none" />
        </button>

        {isOpen && (
            <div className="fixed z-[9999] bg-white rounded-md shadow-lg border border-gray-200 w-64"
                style={{
                    top: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().bottom + window.scrollY + 4 : 0,
                    left: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().right + window.scrollX - 256 : 0
                }}>
                <ul className="py-1">
                    {options.map((option, i) => {
                        const isDeleteAction = option.label.toLowerCase().includes("delete") || option.label.toLowerCase().includes("remove");
                        const isEditAction = option.value === "edit";

                        if (isEditAction && editLink) {
                            return (
                                <li key={i} className="hover:text-white text-text3">
                                    <Link href={editLink}>
                                        <button
                                            className={`w-full text-left px-4 py-3 flex items-center hover:bg-primary cursor-pointer disabled:pointer-events-none group ${class_}`}
                                            onClick={() => handleOptionClick(option.value)}
                                        >
                                            {option.icon && (
                                                <Image
                                                    src={option.icon || "/images/sms.svg"}
                                                    alt='arrow'
                                                    height={16}
                                                    width={16}
                                                    unoptimized={true}
                                                    className='mr-3 group-hover:hidden'
                                                />
                                            )}
                                            {option.hoverIcon && (
                                                <Image
                                                    src={option.hoverIcon || "/images/sms.svg"}
                                                    alt='arrow'
                                                    height={16}
                                                    width={16}
                                                    unoptimized={true}
                                                    className='hidden mr-3 group-hover:block'
                                                />
                                            )}
                                            {option.label}
                                        </button>
                                    </Link>
                                </li>
                            );
                        }

                        return <li key={i} className={isDeleteAction ? "border-t border-t-border-color text-danger" : "hover:text-white text-text3"}>
                            <button
                                className={`w-full text-left px-4 py-3 flex items-center  hover:bg-primary cursor-pointer disabled:pointer-events-none group ${class_}`}
                                onClick={() => handleOptionClick(option.value)}>
                                {option.icon && <Image src={(isDeleteAction ? option.hoverIcon : option.icon) || "/images/sms.svg"} alt='arrow' height={16} width={16} unoptimized={true} className='mr-3 group-hover:hidden' />}

                                {option.hoverIcon && <Image src={option.hoverIcon || "/images/sms.svg"} alt='arrow' height={16} width={16} unoptimized={true} className='hidden mr-3 group-hover:block' />}
                                {option.label}
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
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { USER_ACTIONS } from '../constent/constArray';
import Link from 'next/link';

const Dropdown = ({ options = USER_ACTIONS, onClickOption, class_ = "", editLink = null }) => {
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
            onClickOption(optionValue);
        }
    };

    return (<div className="relative inline-block" ref={dropdownRef}>
        <button
            onClick={toggleDropdown}><Image src="/images/action.svg" alt="action" height={28} width={28} unoptimized={true} className="cursor-pointer disabled:pointer-events-none" />
        </button>

        {isOpen && (
            <div className="fixed z-50 right-20 top-1/2  mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 ">
                <ul className="py-1">
                    {options.map((e, i) => {
                        const isDeleteAction = e.label.toLowerCase().includes("delete") || e.label.toLowerCase().includes("remove");
                      const isEditAction = e.value === "edit";
                     
                          if (isEditAction && editLink) {
                                return (
                                    <li key={i} className="hover:text-white text-text3">
                                        <Link href={editLink}>
                                            <button
                                                className={`w-full text-left px-4 py-3 flex items-center hover:bg-primary cursor-pointer disabled:pointer-events-none group ${class_}`}
                                                onClick={() => handleOptionClick(e.value)}
                                            >
                                                {e.icon && (
                                                    <Image 
                                                        src={e.icon || "/images/sms.svg"} 
                                                        alt='arrow' 
                                                        height={16} 
                                                        width={16} 
                                                        unoptimized={true} 
                                                        className='mr-3 group-hover:hidden' 
                                                    />
                                                )}
                                                {e.hoverIcon && (
                                                    <Image 
                                                        src={e.hoverIcon || "/images/sms.svg"} 
                                                        alt='arrow' 
                                                        height={16} 
                                                        width={16} 
                                                        unoptimized={true} 
                                                        className='hidden mr-3 group-hover:block' 
                                                    />
                                                )}
                                                {e.label}
                                            </button>
                                        </Link>
                                    </li>
                                );
                            }
                     
                     return <li key={i} className={isDeleteAction ? "border-t border-t-border-color text-danger" : "hover:text-white text-text3"}>
                            <button
                                className={`w-full text-left px-4 py-3 flex items-center  hover:bg-primary cursor-pointer disabled:pointer-events-none group ${class_}`}
                                onClick={() => {
                                    if (onClickOption) {
                                        onClickOption(e.value)
                                    }
                                }}>
                                {e.icon && <Image src={(isDeleteAction ? e.hoverIcon : e.icon) || "/images/sms.svg"} alt='arrow' height={16} width={16} unoptimized={true} className='mr-3 group-hover:hidden' />}

                                {e.hoverIcon && <Image src={e.hoverIcon || "/images/sms.svg"} alt='arrow' height={16} width={16} unoptimized={true} className='hidden mr-3 group-hover:block' />}
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
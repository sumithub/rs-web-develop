import { useState } from "react";

export default function Tooltip({ children, content, position = "top" }) {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-1",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-1",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-1",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-1"
    };

    const arrowClasses = {
        top: "top-full left-1/2 transform -translate-x-1/2 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-50",
        bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-gray-50",
        left: "left-full top-1/2 transform -translate-y-1/2 border-t-[5px] border-b-[5px] border-l-[5px] border-t-transparent border-b-transparent border-l-gray-50",
        right: "right-full top-1/2 transform -translate-y-1/2 border-t-[5px] border-b-[5px] border-r-[5px] border-t-transparent border-b-transparent border-r-gray-50"
    };

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className="cursor-pointer"
            >
                {children}
            </div>
            {isVisible && (
                <div className={`absolute z-50 ${positionClasses[position]}`}>
                    <div className="bg-white text-gray-800 text-[13px] px-3 py-1 rounded border border-gray-200 shadow-md w-56">
                        {content}
                    </div>
                    <div className={`absolute w-0 h-0 ${arrowClasses[position]}`}></div>
                </div>
            )}
        </div>
    );
};
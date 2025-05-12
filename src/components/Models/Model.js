"use client"
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Model({ id = "", showHeader = true, customHeader = false, onClose, children, closeButton = true, closeButton2 = false, title, modalBodyClass = "", modalClass = "", modelHeaderClass = "" }) {
    const ref = useRef(null);
    useEffect(() => {
        document.addEventListener('keydown', (event) => {

            if (event.key === 'Escape') {
                onClose()

            }
        })

        const checkIfClickedOutside = (e) => {

            if (ref.current && (!ref.current.contains(e.target))) {

                onClose()

            }
        };

        if (typeof window !== "undefined") {
            document.addEventListener('mousedown', checkIfClickedOutside);

            return () => {

                document.removeEventListener('mousedown', checkIfClickedOutside);

            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);


    return (<div className="relative z-[9999]">

        <div className={`fixed inset-0 bg-black opacity-65 transition-opacity`}></div>

        <div className="fixed inset-0 z-10 flex items-center justify-center">

            <div className="flex items-center justify-center md:items-center p-4 md:p-0 w-full">

                <div ref={ref} className={`${modalClass} h-full relative transform overflow-y-hidden rounded-3xl bg-white text-left shadow-xl transition-all md:w-full w-[90%] 2xl:max-w-7xl xl:max-w-[85%] max-w-[90%]`}>

                    {showHeader ? <div className={`flex justify-between items-center rounded-t-3xl z-50 md:px-6 px-3 py-4 sticky top-0 bg-[#6FC3FF1a] ${modelHeaderClass}`}>

                        <p className="capitalize font-semibold text-lg">{title || ""}</p>

                        {closeButton && <div onClick={() => { onClose() }} className="cursor-pointer">
                            <Image src="/images/close1.svg" alt="close" height={24} width={24} unoptimized={true} />
                        </div>}

                        {closeButton2 && <div onClick={() => { onClose() }} className="cursor-pointer">
                            <Image src="/images/danger-close.svg" alt="close" height={24} width={24} unoptimized={true} />
                        </div>}

                    </div> : (customHeader ? <div className={`flex justify-between items-center rounded-t-3xl z-50 md:px-6 px-3 py-8 sticky top-0 bg-card ${modelHeaderClass}`}>
                        {customHeader}

                    </div> : "")}

                    <div id={id} className={`${modalBodyClass} pt-4 pb-8 md:px-6 px-3 max-h-[75vh] overflow-y-auto custom-scrollbar flex flex-col justify-between w-full`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>);

}

import Image from "next/image";
import { useState } from "react";
import Notification from "./Models/Notification";

export default function Header({ headerChild, headerSearch, mainHeading = "Hello users!", subHeading = "Welcome back to dashboard.", collapse }) {
    const [openNotification, setOpenNotification] = useState(false)

    const handleClick = () => {
        setOpenNotification(!openNotification);
    }
    return (
        <div className={`border-b border-border-color py-[18px] px-4 ${collapse ? "ml-20" : "ml-72"} transition-all bg-white fixed top-0 inset-x-0 z-50`}>
            {openNotification &&
                <Notification
                    onClose={() => {
                        setOpenNotification(false)
                    }} />}
            <div className="flex items-center justify-between w-full">
                <div>
                    <div className="text-secondary text-base font-semibold">{mainHeading}</div>
                    <div className="flex gap-2 mt-1">
                        <div className="text-text3 text-sm">{subHeading}</div>
                        {/*<Image src="/images/arrow-right.svg" alt="arrow" height={14} width={14} unoptimized={true} />
                    <div className="text-primary text-sm font-semibold capitalize">Manage Reviews</div>*/}
                    </div>
                </div>
                {headerSearch && <>{headerSearch}</>}

                <div className="flex items-center gap-4">
                    {headerChild && <>{headerChild}</>}
                    <button className="relative" onClick={handleClick}>
                        <span className="absolute z-20 -right-1/12 text-xs -top-1/28 bg-danger text-white h-3.5 w-3.5 flex items-center justify-center p-1 rounded-md">
                            <span className="text-[10px]">4</span>
                        </span>
                        <Image src="/images/notification.svg" alt="message" height={36} width={36} unoptimized={true} />
                    </button>
                    <Image src="/images/user3.jpg" alt="user" height={45} width={45} className="h-[45px] w-[45px] rounded-full flex items-center justify-center border border-gray-300 object-cover" />
                </div>
            </div>
        </div>
    )
}
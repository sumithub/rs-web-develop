"use client"
import Image from "next/image";
import AdminLayout from "../../../components/AdminLayout";
import CancelButton from "../../../components/common/CancelButton";
import Status from "../../../components/Status";
import SecondaryButton from "../../../components/common/SecondaryButton";
import { useState } from "react";
import Checkbox from "../../../components/form/Checkbox";

export default function MySubscriptionDetails() {
    const [tab, setTab] = useState("monthly")
    return (
        <AdminLayout>
            <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">
                    Upgrade Plan
                </div>

                <div className='bg-white shadow-sm rounded-[10px] overflow-hidden'>
                    <div className='flex items-center gap-10 px-[20px]'>
                        <div
                            onClick={() => {
                                setTab("monthly")
                            }}
                            className={`${tab === "monthly" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                        >
                            Monthly
                        </div>

                        <div
                            onClick={() => {
                                setTab("annually")
                            }}
                            className={`${tab === "annually" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                        >
                            Annually
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3.5">
                <div className="relative bg-white rounded-[15px] border border-border-color overflow-hidden w-full">
                    <div className="font-semibold px-5 pt-4 pb-3.5">
                        Basic Plan
                    </div>
                    <hr className="border-t border-border2 mb-3" />
                    <div className="flex items-end gap-1">
                        <div className="text-[30px] font-bold ml-5">
                            $300
                        </div>
                        <div className="text-text3 capitalize text-sm font-medium">
                            Per Month
                        </div>
                    </div>
                    <div className="px-5 pb-5 pt-10">
                        <CancelButton
                            title="Downgrade"
                            class_="bg-white! border-danger/40! hover:bg-danger! text-lg! text-danger! hover:text-white!" />
                    </div>
                    <hr className="border border-border2" />
                    <Card />
                </div>
                <div className="relative bg-white rounded-[15px] border border-border-color overflow-hidden w-full">
                    <div className="flex items-center px-5 pt-5 pb-3.5 justify-between">
                        <div className="font-semibold text-base">
                            Professional Plan
                        </div>
                        <div className=""><Status status="Active" /></div>
                    </div>

                    <hr className="border border-border2" />

                    <div className="flex items-end gap-1 px-5 pt-3.5">
                        <div className="text-[30px] font-bold">
                            $600
                        </div>

                        <div className="text-text3 text-sm font-medium capitalize">
                            Per Month
                        </div>
                    </div>

                    <div className="px-5 pb-5 pt-10">
                        <CancelButton title="Manage plan" class_="bg-white! border-primary/40! hover:bg-primary! text-lg! text-primary! hover:text-white!" />
                    </div>

                    <hr className="border border-border2" />
                    <Card />
                </div>
                <div className="relative bg-white rounded-[15px] border border-border-color overflow-hidden w-full">
                    <div className="font-semibold px-5 pb-3.5 pt-4">
                        Enterprise Plan
                    </div>

                    <hr className="border border-border2" />

                    <div className="flex items-end gap-1 px-5 pt-3.5">
                        <div className="text-[30px] font-bold">
                            $900
                        </div>

                        <div className="text-text3 capitalize text-sm font-medium">
                            Per Month
                        </div>
                    </div>

                    <div className="px-5 pb-5 pt-10">
                        <SecondaryButton title="Upgrade" />
                    </div>

                    <hr className="border border-border2 my-3" />

                    <Card />

                </div>
            </div>
        </AdminLayout>
    )
}

const Card = () => {
    const [isChecked, setIsChecked] = useState(false)
    const [isChecked1, setIsChecked1] = useState(false)
    const [isChecked2, setIsChecked2] = useState(false)
    const [isChecked3, setIsChecked3] = useState(false)
    const [isChecked4, setIsChecked4] = useState(false)
    return <div>
        <div className="p-5">
            <div className="font-bold text-base">Drive</div>

            <div className="flex justify-between items-center pt-3.5">
                <div className="text-sm">Storage</div>
                <div className="text-success text-sm font-semibold">10 GB</div>
            </div>

            <hr className="border border-border2 my-3.5" />

            <div className="flex justify-between items-center">
                <div className="text-sm">Per-File Upload Limit</div>
                <div className="text-success text-sm font-semibold">5 GB</div>
            </div>

            <hr className="border border-border2 my-3.5" />

            <div className="flex justify-between items-center">
                <div className="text-sm">E2EE File Storage</div>
                {/* <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} /> */}
                <Checkbox
                    checked={isChecked}
                    onChange={e => setIsChecked(e)} />
            </div>

            <hr className="border border-border2 my-3.5" />

            <div className="flex justify-between items-center">
                <div className="text-sm">E2EE Link Sharing</div>
                <Checkbox
                    checked={isChecked1}
                    onChange={e => setIsChecked1(e)} />
                {/* <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                             */}
            </div>

            <hr className="border border-border2 my-3.5" />

            <div className="flex justify-between items-center">
                <div className="text-sm">Optional Decentralized Storage</div>
                {/* <Image src="/images/close-square.png" alt="close" width={15} height={15} /> */}
                <Checkbox
                    checked={isChecked2}
                    onChange={e => setIsChecked2(e)} />
            </div>

            <hr className="border border-border2 my-3.5" />

            <div className="font-semibold text-lg mt-5 pb-3.5
                        ">Mail</div>

            <div className="flex justify-between items-center">
                <div className="text-sm">Short Address</div>
                {/* <Image src="/images/close-square.png" alt="close" width={15} height={15} /> */}
                <Checkbox
                    checked={isChecked3}
                    onChange={e => setIsChecked3(e)} />
            </div>

            <hr className="border border-border2 my-3.5" />

            <div className="flex justify-between items-center">
                <div className="text-sm">Quick Alias Reply</div>
                {/* <Image src="/images/close-square.png" alt="close" width={15} height={15} />
                        */}
                <Checkbox
                    checked={isChecked4}
                    onChange={e => setIsChecked4(e)} />
            </div>

            <hr className="border border-border2 my-3.5" />

            <div className="flex justify-between items-center">
                <div className="sm">Quick Aliases</div>
                <div className="text-success text-sm font-semibold">10</div>
            </div>

            <hr className="border border-border2 my-3.5" />

            <div className="flex justify-between items-center ">
                <div className="text-sm">Mail Filters</div>
                <div className="text-success text-sm font-semibold">2 Filters</div>
            </div>

            <hr className="border border-border2 my-3.5" />

            <div
                className="flex gap-1 place-content-center mt-6 cursor-pointer"
                onClick={() => setShowMore(!showMore)}
            >
                <div className="text-primary text-sm">
                    {showMore ? 'Show Less' : 'Show More'}
                </div>
                <svg
                    className={`w-4 h-4 text-primary transition-transform ${showMore ? 'rotate-180' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>

            {/* <div className="flex gap-1 place-content-center mt-6">
                <div className="text-primary text-sm">Show More</div>
                <Image src="/images/arrow-up.png" alt="arrow" width={16} height={16} />
            </div> */}
        </div>
    </div>
}
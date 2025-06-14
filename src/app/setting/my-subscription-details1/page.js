"use client"
import Image from "next/image";
import AdminLayout from "../../../components/AdminLayout";
import CancelButton from "../../../components/common/CancelButton";
import Status from "../../../components/Status";
import SecondaryButton from "../../../components/common/SecondaryButton";
import { useState } from "react";

export default function MySubscriptionDetails1() {
    const [tab, setTab] = useState("")
    return (
        <AdminLayout>
            <div className="flex justify-between">
                <div className="font-semibold text-lg mt-2">
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
                                setTab("annualy")
                            }}
                            className={`${tab === "annualy" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                        >
                            Annualy
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="relative bg-white rounded-[15px] border border-border-color overflow-hidden w-full">
                    <div className="font-semibold m-4">
                        Basic Plan
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="flex items-end gap-1">
                        <div className="text-2xl font-bold ml-4">
                            $300
                        </div>

                        <div className="text-text3 capitalize text-base">
                            Per Month
                        </div>
                    </div>

                    <div className="m-4">
                        <CancelButton title="Downgrade" class_="bg-white! hover:bg-primary! text-lg! text-danger! hover:text-white!" />
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="font-bold m-4 text-lg">Drive</div>

                    <div className="flex justify-between items-center m-4">
                        <div>Storage</div>
                        <div className="text-green-600">10 GB</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Per-File Upload Limit</div>
                        <div className="text-green-600">5 GB</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>E2EE File Storage</div>
                        <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>E2EE Link Sharing</div>
                        <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Optional Decentralized Storage</div>
                        <Image src="/images/close-square.png" alt="close" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="font-semibold m-4 text-lg">Mail</div>

                    <div className="flex justify-between items-center m-4">
                        <div>Short Address</div>
                        <Image src="/images/close-square.png" alt="close" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Quick Alias Reply</div>
                        <Image src="/images/close-square.png" alt="close" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Quick Aliases</div>
                        <div className="text-green-600">10</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Mail Filters</div>
                        <div className="text-green-600">2 Filters</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex gap-1 place-content-center mb-4">
                        <div className="text-primary">Show More</div>
                        <Image src="/images/arrow-up.png" alt="arrow" width={16} height={16} />
                    </div>
                </div>
                <div className="relative bg-white rounded-[15px] border border-border-color overflow-hidden w-full">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold m-4">
                            Professional Plan
                        </div>
                        <div className="m-4"><Status status="Active" /></div>
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="flex items-end gap-1">
                        <div className="text-2xl font-bold ml-4">
                            $600
                        </div>

                        <div className="text-text3 capitalize text-base">
                            Per Month
                        </div>
                    </div>

                    <div className="m-4">
                        <CancelButton title="Manage plan" class_="bg-white! hover:bg-primary! text-lg! text-primary! hover:text-white!" />
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="font-bold m-4 text-lg">Drive</div>

                    <div className="flex justify-between items-center m-4">
                        <div>Storage</div>
                        <div className="text-green-600">200 GB</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Per-File Upload Limit</div>
                        <div className="text-green-600">50 GB</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>E2EE File Storage</div>
                        <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>E2EE Link Sharing</div>
                        <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Optional Decentralized Storage</div>
                        <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="font-semibold m-4 text-lg">Mail</div>

                    <div className="flex justify-between items-center m-4">
                        <div>Short Address</div>
                        <div className="text-green-600">1</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Quick Alias Reply</div>
                        <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Quick Aliases</div>
                        <div className="text-green-600">Unlimited</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Mail Filters</div>
                        <div className="text-green-600">Unlimited</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex gap-1 place-content-center mb-4">
                        <div className="text-primary">Show More</div>
                        <Image src="/images/arrow-up.png" alt="arrow" width={16} height={16} />
                    </div>
                </div>
                <div className="relative bg-white rounded-[15px] border border-border-color overflow-hidden w-full">
                    <div className="font-semibold m-4">
                        Enterprise Plan
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="flex items-end gap-1">
                        <div className="text-2xl font-bold ml-4">
                            $900
                        </div>

                        <div className="text-text3 capitalize text-base">
                            Per Month
                        </div>
                    </div>

                    <div className="m-4">
                        <SecondaryButton title="Upgrade" />
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="font-bold m-4 text-lg">Drive</div>

                    <div className="flex justify-between items-center m-4">
                        <div>Storage</div>
                        <div className="text-green-600">1 TB</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Per-File Upload Limit</div>
                        <div className="text-green-600">150 GB</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>E2EE File Storage</div>
                        <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>E2EE Link Sharing</div>
                        <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Optional Decentralized Storage</div>
                        <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="font-semibold m-4 text-lg">Mail</div>

                    <div className="flex justify-between items-center m-4">
                        <div>Short Address</div>
                        <div className="text-green-600">2</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Quick Alias Reply</div>
                        <Image src="/images/tickSquare.png" alt="tick" width={15} height={15} />
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Quick Aliases</div>
                        <div className="text-green-600">Unlimited</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex justify-between items-center m-4">
                        <div>Mail Filters</div>
                        <div className="text-green-600">Unlimited</div>
                    </div>

                    <hr className="border border-border2 m-4" />

                    <div className="flex gap-1 place-content-center mb-4">
                        <div className="text-primary">Show More</div>
                        <Image src="/images/arrow-up.png" alt="arrow" width={16} height={16} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
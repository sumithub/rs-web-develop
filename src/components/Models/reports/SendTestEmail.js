"use client"
import Image from "next/image";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import UsersList from "../reports/UsersList"
import { useState } from "react";
import CancelButton from "../../common/CancelButton"

export default function SendTestEmail({ onClose }) {
    const [openUser, setOpenUser] = useState(false)
    return <Model onClose={onClose} title="Send Test Email" modalClass="w-[40%]!">

        {openUser &&
            <UsersList
                onClose={() => {
                    setOpenUser(false)
                }}

                onSave={() => {
                    setOpenUser(true)
                }}
            />
        }
        <div>
            <div>
                <div className="flex gap-5 items-center">
                    <h2 className="text-base text-text3">Report:</h2>
                    <h3 className="text-base font-medium">Weekly Review Report</h3>
                </div>
                <hr className="border-t border-secondary/5 my-3.5" />
                <div className="flex gap-5 items-center">
                    <h2 className="text-base text-text3">Business:</h2>
                    <h3 className="text-base font-medium">The Coffee Spot</h3>
                </div>
                <hr className="border-t border-secondary/5 my-3.5" />
            </div>
            <div>
                <h2 className="text-text3 text-base">Selected Charts</h2>
                <div className='pt-3.5'>
                    <div className='flex items-center gap-2'>
                        <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                        <div className='text-sm'>Review Over Time: 42 New Reviews</div>
                    </div>

                    <div className='flex items-center gap-2 py-3.5'>
                        <Image unoptimized={true} src="/images/star.svg" alt='review-time' width={20} height={20} />
                        <div className='text-sm'>Avg Rating: 4.5</div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                        <div className='text-sm'>Top Source: Google (28 reviews)</div>
                    </div>
                </div>
            </div>
            <hr className="border-t border-secondary/5 my-3.5" />
            <div>
                <h2 className='text-sm font-medium capitalize pb-2.5'>Send test Email To</h2>
                <div className="flex gap-[15px]">
                    <div className="w-full border border-primary/10 rounded-lg p-2.5 flex justify-between items-center">
                        <div className="flex gap-[15px]">
                            <div className="flex gap-[7px] border border-primary/10 rounded-lg p-[5px] items-center">
                                <Image src="/images/request.png" alt="request" width={17} height={17} />
                                <h2 className="text-sm">Richard</h2>
                                <Image unoptimized={true} src="/images/close-square.svg" alt="close-square" width={14} height={14} />
                            </div>
                            <div className="flex gap-[7px] border border-primary/10 rounded-lg p-[5px] items-center">
                                <Image src="/images/request.png" alt="request" width={17} height={17} />
                                <h2 className="text-sm">Sophia</h2>
                                <Image unoptimized={true} src="/images/close-square.svg" alt="close-square" width={14} height={14} />
                            </div>
                        </div>
                        <div>
                            <Image unoptimized={true} src="/images/copy2.svg" alt="copy2" width={20} height={20} />
                        </div>
                    </div>
                    <div className="w-[30%] shrink-0">
                        <SecondaryButton title="Add" onClick={() => { setOpenUser(true) }}
                            class_="py-3.5!"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-3.5">
                <h2 className="text-sm font-medium pb-2.5">Email Subject Preview</h2>
                <div className="p-2.5 bg-border-color/30 rounded-[10px]">
                    <h2 className="text-base font-medium capitalize">Your weekly review report - the coffee spot</h2>
                </div>
            </div>
            <div className="mt-3.5">
                <h2 className="text-sm font-medium pb-2.5">Email Subject Preview</h2>
                <div className='p-2.5 bg-border-color/30 rounded-[10px]'>
                    <div className=''>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs">Subject:</h2>
                            <h3 className="text-xs font-medium capitalize">Your weekly review report - the coffee spot</h3>
                        </div>
                        <div className='py-4 text-xs'>Hi (John Deo)</div>
                        <div className='capitalize text-xs'>Here&#39;s your weekly performance update:</div>
                    </div>

                    <div className='pt-4'>
                        <div className='flex items-center gap-2'>
                            <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                            <div className='text-sm'>Review Over Time: 42 New Reviews</div>
                        </div>

                        <div className='flex items-center gap-2 py-3.5'>
                            <Image unoptimized={true} src="/images/star.svg" alt='review-time' width={20} height={20} />
                            <div className='text-sm'>Avg Rating: 4.5</div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                            <div className='text-sm'>Top Source: Google (28 reviews)</div>
                        </div>
                    </div>

                    <SecondaryButton title="View Full Report" type='button' class_='text-sm! w-auto! font-normal! my-5!' />
                    <div className='text-sm capitalize'>
                        <div className='text-xs'><span className="font-black text-2xl leading-0">.</span> The coffee Spot Team</div>
                        <div className='text-xs'>[Unsubscribe]</div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-5 mt-[30px]'>
                <SecondaryButton title="Send Test Email" type='submit' />
                <CancelButton title="Cancel" onClick={onClose}/>
            </div>
        </div>
    </Model>
}
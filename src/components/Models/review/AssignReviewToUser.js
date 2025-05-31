import Image from "next/image";
import Checkbox from "../../form/Checkbox";
import Search from "../../form/Search";
import Model from "../Model";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import AssignToUser from "../review/AssignToUser"
import { useState } from "react";

export default function AssignReviewToUser({ onClose, onSave }) {
    const [openAssign, setOpenAssign] = useState(false)
    return (
        <Model onClose={onClose} title="Assign Review to a user" modalClass="w-[50%]!">
            {openAssign &&
                <AssignToUser
                    onClose={() => {
                        setOpenAssign(false)
                    }}
                    onSave={() => {
                        setOpenAssign(true)
                    }}
                />
            }
            <div className="flex pt-5 items-center justify-between">
                <div className="flex items-start w-full gap-[15px]">
                    <Image src="/images/request.png" alt="request" width={46} height={46} />
                    <div className="w-full">
                        <div className="flex justify-between">
                            <div className="">
                                <h2 className="text-base font-semibold">Zain Levin</h2>
                                <h3 className="text-sm text-text3 pt-1.5">ZainLevin@gmail.com</h3>
                            </div>
                            <div className="flex items-center gap-[15px]">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                </div>
                                <h2 className="text-sm">Jun 11,2024</h2>
                            </div>
                        </div>
                        <h2 className="text-xs pt-[15px] capitalize">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the .</h2>
                    </div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2">
                <div className="font-semibold mt-2">
                    Select User
                </div>

                <div>
                    <Search placeholder="Search by Name or Email" mainClass="w-full!" />
                </div>
            </div>

            <div>
                <div className="flex justfy-between align-center gap-3">
                    <Checkbox />
                    <div>John Deo</div>
                </div>

                <div className="flex justfy-between align-center gap-3">
                    <Checkbox />
                    <div>sarah Smith</div>
                </div>

                <div className="flex justfy-between align-center gap-3">
                    <Checkbox />
                    <div>Alex Brown</div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-[30px]">
                <CancelButton title="Cancel" class_="text-lg! font-medium!" onClick={onClose} />
                <SecondaryButton title="Assign" class_="text-lg! font-medium!" onClick={() => { setOpenAssign(true) }} />
            </div>
        </Model>
    )
}
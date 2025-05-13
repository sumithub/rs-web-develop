import AdminLayout from "../../../components/AdminLayout"
import ProgressBar from "../../../components/ProgressBar"
import CancelButton from "../../../components/common/CancelButton"
import SecondaryButton from "../../../components/common/SecondaryButton"
import Input from "../../../components/form/Input"
import CampaignCard from "../../../components/CampaignCard"
import Select from "../../../components/form/Select"
import Radio from "../../../components/form/Radio"
import Image from "next/image"

export default function Detail() {
    return <AdminLayout>
        <ProgressBar />
        <div className="bg-white p-5">
            <div className="flex items-center justify-between mb-4">
                <div className="text-secondary text-xl font-medium">Create New Campaign</div>
                <div className="flex items-center gap-2">
                    <CancelButton title="Collapse All" class_="text-sm! font-normal!" />
                    <SecondaryButton title="Expand All" class_="text-sm! font-normal!" />
                </div>
            </div>

            <div>
                <CampaignCard title="Campaign Details" status="Active">
                    <hr className="border-b border-border-color my-2" />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Campaign Name" placeholder="Enter Name" isRequired={true} inputClass="bg-white!" />
                        <div>
                            <div className="text-sm text-secondary font-medium capitalize mt-3 mb-2">Description</div>
                            <textarea
                                placeholder="Write a content post"
                                rows={1} className="rounded text-sm bg-white  w-full focus:border-primary focus:outline-0 focus-visible:outline-0 py-3.5 px-2.5 text-sm text-secondary! rounded-lg" />
                        </div>
                    </div>
                </CampaignCard>
            </div>

            <div>
                <CampaignCard title="Targeting" status="Active">
                    <hr className="border-b border-border-color my-2" />
                    <div className="flex items-center justify-between">
                        <div className="text-secondary text-sm font-medium capitalize">Select Customers from List</div>
                        <SecondaryButton title="Add Customers" class_="text-sm! font-normal!" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 my-5">
                                <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                                <div className="text-danger text-lg font-semibold capitalize">5 customers are already in an active campaign.?</div>
                            </div>
                            <Select defaultOption="Exclude Duplicates" selectClass_="bg-white!"></Select>
                        </div>
                        <Select label="Cooldown Period" isRequired={true} defaultOption="7 Days" selectClass_="bg-white! py-3! focus:border-primary/60!"></Select>

                        <div className="border border-primary bg-[#0396FF1a] rounded-[10px] py-1.5 px-3 capitalize w-full text-base text-primary font-medium flex items-center justify-between mt-4">
                            <div>Total Selected Customers</div>
                            <div className="flex items-center gap-2">
                                <div>250 Customers</div>
                                <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />
                            </div>
                        </div>
                    </div>
                </CampaignCard>
            </div>

            <div>
                <CampaignCard title="Template Selection" status="Active">
                    <hr className="border-b border-border-color my-2" />
                    <div className="flex gap-3 my-4">
                        <div className="text-sm text-secondary">Campaign Type<span className="text-danger">*</span></div>
                        <div className="flex">
                            <Radio label="Email" inputClass="mb-0!" labelClass="font-normal!" />
                            <Radio label="SMS" inputClass="mb-0!" labelClass="font-normal!" />
                            <Radio label="Both" inputClass="mb-0!" labelClass="font-normal!" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-secondary">Primary Email Template<span className="text-danger">*</span></div>

                        <SecondaryButton title="Template selection" class_="text-sm! font-normal!" />
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                        <div className="bg-dark rounded-lg p-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-secondary text-sm font-medium">Nature Template</div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium"> <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />Preview</button>

                                    <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium w-[85px]"> <Image src="/images/edit2.svg" alt='eye' height={14} width={14} unoptimized={true} />Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CampaignCard>
            </div>
        </div>
    </AdminLayout>
}
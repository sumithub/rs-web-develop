"use client"
import AdminLayout from "../../../components/AdminLayout"
import ProgressBar from "../../../components/common/Progress"
import CancelButton from "../../../components/common/CancelButton"
import SecondaryButton from "../../../components/common/SecondaryButton"
import CampaignCard from "../../../components/CampaignCard"
import Radio from "../../../components/form/Radio"
import Checkbox from "../../../components/form/Checkbox"
import ScheduleCampaign from "../../../components/Models/manage-campaigns/ScheduleCampaign"
import SelectedFromCustomers from "../../../components/Models/manage-campaigns/SelectedFromCustomers"
import EmailTemplate from "../../../components/Models/manage-campaigns/EmailTemplate"
import Image from "next/image"
import { useState } from "react"
import InputForm from "../../../components/form/InputForm"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { getError } from "../../../../helper"
import SelectForm from "../../../components/form/SelectForm"

export default function Detail({ id }) {
    const { register, handleSubmit, clearErrors, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)
    const [openSchedule, setOpenSchedule] = useState(false)
    const [openCustomer, setOpenCustomer] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    const [expandAll, setExpandall] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null
            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Detail Updated Successfully")
            setSending(false)
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return <AdminLayout>
        <form onSubmit={handleSubmit(onSubmit)}>

            {openSchedule &&
                <ScheduleCampaign
                    onClose={() => {
                        setOpenSchedule(false)
                    }}

                    onSave={() => {
                        setOpenSchedule(true)
                    }}
                />
            }

            {openCustomer &&
                <SelectedFromCustomers
                    onClose={() => {
                        setOpenCustomer(false)
                    }}

                    onSave={() => {
                        setOpenCustomer(true)
                    }} />
            }

            {openEmail &&
                <EmailTemplate
                    onClose={() => {
                        setOpenEmail(false)
                    }}

                    onSave={() => {
                        setOpenEmail(true)
                    }} />
            }
            <ProgressBar
                totalSteps={4}
                stepTitle1="Campaign Details"
                stepTitle2="Customer Selection"
                stepTitle3="Template Selection"
                stepTitle4="Scheduling & Launch"
            />
            <div className="">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-secondary text-xl font-medium">Create New Campaign</div>
                    <div className="flex items-center gap-2">
                        <CancelButton title="Collapse All" class_="text-sm! font-normal!"
                            onClick={() => { setExpandall(false) }} />
                        <SecondaryButton title="Expand All" class_="text-sm! font-normal!"
                            onClick={() => { setExpandall(true) }} />
                    </div>
                </div>

                <div>
                    <CampaignCard expandAll={expandAll} setExpandall={setExpandall} title="Campaign Details" status="Active">
                        <div className="grid grid-cols-2 gap-3">
                            <InputForm label="Campaign Name" placeholder="Enter Name" isRequired={true} inputClass="bg-white!"
                                formProps={{ ...register("campaign-name", { required: true }) }}
                                errors={errors}
                            />
                            <div>
                                <div className="text-sm text-secondary font-medium capitalize mt-3 mb-1">Description</div>
                                <textarea
                                    placeholder="Write a content post"
                                    rows={1} className="bg-white  w-full focus:border-primary focus:outline-0 focus-visible:outline-0 py-3.5 px-2.5 text-sm text-secondary! rounded-lg" />
                            </div>
                        </div>
                    </CampaignCard>
                </div>

                <div>
                    <CampaignCard expandAll={expandAll} setExpandall={setExpandall} title="Targeting" status="Active">
                        <div className="flex items-center justify-between">
                            <div className="text-secondary text-sm font-medium capitalize">Select Customers from List</div>
                            <SecondaryButton title="Add Customers" class_="text-sm! font-normal!" onClick={() => { setOpenCustomer(true) }} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 my-5">
                                    <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                                    <div className="text-danger text-lg font-semibold capitalize">5 customers are already in an active campaign.?</div>
                                </div>
                                <SelectForm defaultOption="Exclude Duplicates" selectClass_="bg-white!"
                                    formProps={{ ...register("exclude-duplicates", { required: false }) }}
                                    errors={errors}
                                ></SelectForm>
                            </div>
                            <SelectForm label="Cooldown Period" isRequired={true} defaultOption="7 Days" selectClass_="bg-white! py-3! focus:border-primary/60!"
                                formProps={{ ...register("cooldown-period", { required: true }) }} errors={errors} clearErrors={clearErrors}>
                                <option>7 Days</option>
                            </SelectForm>

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
                    <CampaignCard expandAll={expandAll} setExpandall={setExpandall} title="Template Selection" status="Active">
                        <div className="flex gap-3 my-4">
                            <div className="text-sm text-secondary">Campaign Type<span className="text-danger">*</span></div>
                            <div className="flex">
                                <Radio label="Email" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!" />
                                <Radio label="SMS" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!" />
                                <Radio label="Both" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-secondary">Primary Email Template<span className="text-danger">*</span></div>

                            <SecondaryButton title="Template selection" class_="text-sm! font-normal!" onClick={() => { setOpenEmail(true) }} />
                        </div>

                        <div className="bg-white p-3 rounded-lg">
                            <div className="bg-dark rounded-lg p-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-secondary text-sm font-medium">Nature Template</div>
                                        <div className="text-text3 text-xs">Lorem Ipsum..</div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium disabled:pointer-events-none cursor-pointer"> <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />Preview</button>

                                        <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium w-[85px] disabled:pointer-events-none cursor-pointer"> <Image src="/images/edit2.svg" alt='eye' height={14} width={14} unoptimized={true} />Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-start gap-2 mt-1">
                                <Checkbox />
                                <div className="text-secondary text-sm capitalize mt-[2px] font-medium">Enable Reminder Email</div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <div className="text-secondary text-sm capitalize">Reminder Email Template</div>
                                <SecondaryButton title="Template selection" class_="text-sm! font-normal!" />
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="bg-dark rounded-lg p-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-secondary text-sm font-medium">Nature Template</div>
                                            <div className="text-text3 text-xs">Lorem Ipsum..</div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium disabled:pointer-events-none cursor-pointer"> <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />Preview</button>

                                            <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium w-[85px] disabled:pointer-events-none cursor-pointer"> <Image src="/images/edit2.svg" alt='eye' height={14} width={14} unoptimized={true} />Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <SelectForm label="Frequency" defaultOption="Select Frequency" selectClass_="bg-white! py-3! focus:border-primary/60!"
                                formProps={{ ...register("phone", { required: false }) }}
                                errors={errors}
                            ></SelectForm>

                            <div className="flex items-center justify-between my-4">
                                <div className="text-secondary text-sm font-medium">Final Reminder</div>
                                <SecondaryButton title="Template selection" class_="text-sm! font-normal!" />
                            </div>

                            <div className="flex items-start gap-2 mt-1 mb-4">
                                <Checkbox />
                                <div className="text-secondary text-sm capitalize mt-[2px] font-medium">Same as Reminder</div>
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="bg-dark rounded-lg p-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-secondary text-sm font-medium">Nature Template</div>
                                            <div className="text-text3 text-xs">Lorem Ipsum..</div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium disabled:pointer-events-none cursor-pointer"> <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />Preview</button>

                                            <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium w-[85px] disabled:pointer-events-none cursor-pointer"> <Image src="/images/edit2.svg" alt='eye' height={14} width={14} unoptimized={true} />Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CampaignCard>
                </div>

                <div>
                    <CampaignCard expandAll={expandAll} setExpandall={setExpandall} title="Scheduling & Launch" status="Active">
                        <div className="grid grid-cols-2 gap-3">
                            <InputForm label="Time Zone" isRequired={true} inputType="time" inputClass="bg-white!"
                                formProps={{ ...register("time-zone", { required: true }) }}
                                errors={errors}
                            />
                            <SelectForm label="Send Time" isRequired={true} defaultOption="select" selectClass_="bg-white! py-3! focus:border-primary/60!"
                                formProps={{ ...register("send-time", { required: true }) }}
                                errors={errors}
                            >
                                <option value="morning">morning (8 AM - 12 PM)</option>
                                <option value="afternoon">afternoon (12 PM - 4 PM)</option>
                                <option value="evening">evening (4 PM - 8 PM)</option>
                                <option value="any-time">any time</option>
                            </SelectForm>
                        </div>

                        <SelectForm label="Weekend Delivery" defaultOption="Restrict" selectClass_="bg-white! py-3! focus:border-primary/60!"
                            formProps={{ ...register("weekend-delivery", { required: false }) }}
                            errors={errors}
                        ></SelectForm>

                    </CampaignCard>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-7">
                    <SecondaryButton title="Save as Draft" type="submit" disabled={sending} />
                    <SecondaryButton title="Schedule for Later" class_="bg-white! hover:bg-primary! text-primary! hover:text-white!" onClick={() => { setOpenSchedule(true) }} />
                    <CancelButton title="Launch Now" />
                </div>
            </div>
        </form>
    </AdminLayout>
}
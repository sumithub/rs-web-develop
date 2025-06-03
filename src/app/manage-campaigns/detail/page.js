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
import { useState, useEffect } from "react"
import InputForm from "../../../components/form/InputForm"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { getError } from "../../../../helper"
import SelectForm from "../../../components/form/SelectForm"
import AddTemplate from "../../../components/Models/templates/AddTemplate"
import Preview from "../../../components/Models/manage-campaigns/Preview"
import { useRouter } from "next/navigation"

export default function Detail({ }) {
    const id = ""
    const { register, handleSubmit, clearErrors, formState: { errors }, watch } = useForm();
    const [sending, setSending] = useState(false)
    const [openSchedule, setOpenSchedule] = useState(false)
    const [openCustomer, setOpenCustomer] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    const [expandAll, setExpandAll] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const router = useRouter()
    const [cardStatuses, setCardStatuses] = useState({
        campaignDetails: 'pending',
        targeting: 'pending',
        templateSelection: 'pending',
        scheduling: 'pending'
    })
    const [activeStep, setActiveStep] = useState(1)
    const [customersSelected, setCustomersSelected] = useState(false)
    const [templateSelected, setTemplateSelected] = useState(false)
    const [campaignType, setCampaignType] = useState('')
    const [reminderEnabled, setReminderEnabled] = useState(false)

    const watchedFields = watch()

    useEffect(() => {
        updateCardStatuses()
    }, [watchedFields, customersSelected, templateSelected, campaignType])

    const updateCardStatuses = () => {
        let newActiveStep = 1

        // Check Campaign Details completion
        const campaignDetailsComplete = watchedFields['campaignName']?.trim()
        const campaignNameTouched = watchedFields['campaignName'] !== undefined // Check if field has been touched

        let campaignDetailsStatus = 'pending'
        if (campaignDetailsComplete) {
            campaignDetailsStatus = 'completed'
            newActiveStep = 2
        } else if (campaignNameTouched) {
            // If the field has been touched (even if empty), set to in_progress
            campaignDetailsStatus = 'in_progress'
        }

        // Check Targeting completion
        const targetingComplete = campaignDetailsComplete &&
            customersSelected &&
            watchedFields['cooldownPeriod']
        let targetingStatus = 'pending'
        if (targetingComplete) {
            targetingStatus = 'completed'
            newActiveStep = 3
        } else if (campaignDetailsComplete) {
            targetingStatus = activeStep === 2 ? 'in_progress' : 'pending'
        }

        // Check Template Selection completion
        const templateComplete = targetingComplete &&
            campaignType &&
            templateSelected
        let templateSelectionStatus = 'pending'
        if (templateComplete) {
            templateSelectionStatus = 'completed'
            newActiveStep = 4
        } else if (targetingComplete) {
            templateSelectionStatus = activeStep === 3 ? 'in_progress' : 'pending'
        }

        // Check Scheduling completion
        const schedulingComplete = templateComplete &&
            watchedFields['timeZone'] &&
            watchedFields['sendTime']
        let schedulingStatus = 'pending'
        if (schedulingComplete) {
            schedulingStatus = 'completed'
        } else if (templateComplete) {
            schedulingStatus = activeStep === 4 ? 'in_progress' : 'pending'
        }

        // Create new status object without referencing current cardStatuses
        const newStatuses = {
            campaignDetails: campaignDetailsStatus,
            targeting: targetingStatus,
            templateSelection: templateSelectionStatus,
            scheduling: schedulingStatus
        }

        // Only update if there are actual changes
        setCardStatuses(prevStatuses => {
            const hasChanged = Object.keys(newStatuses).some(key =>
                prevStatuses[key] !== newStatuses[key]
            )
            return hasChanged ? newStatuses : prevStatuses
        })

        if (schedulingComplete) {
            setActiveStep(5)
        } else {
            setActiveStep(prevStep => prevStep !== newActiveStep ? newActiveStep : prevStep)
        }
    }

    const getCardStatus = (cardKey) => {
        const status = cardStatuses[cardKey]
        return status
    }

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

    const handleCustomerSave = () => {
        setCustomersSelected(true)
        setOpenCustomer(false)
    }

    const handleTemplateSave = () => {
        setTemplateSelected(true)
        setOpenEmail(false)
    }

    const handleCampaignTypeChange = (type) => {
        setCampaignType(type)
    }

    const isAllPending = Object.values(cardStatuses).every(status => status === 'pending');

    return <AdminLayout>

        {openModal &&
            <AddTemplate
                onClose={() => {
                    setOpenModal(false)
                }}
            />
        }

        {openPreview &&
            <Preview
                onClose={() => {
                    setOpenPreview(false)
                }}
            />
        }

        {openSchedule &&
            <ScheduleCampaign
                onClose={() => {
                    setOpenSchedule(false)
                }}

                onSave={() => {
                    setOpenSchedule(false)
                }}
            />
        }

        {openCustomer &&
            <SelectedFromCustomers
                onClose={() => {
                    setOpenCustomer(false)
                }}

                onSave={handleCustomerSave}
            />
        }

        {openEmail &&
            <EmailTemplate
                onClose={() => {
                    setOpenEmail(false)
                }}

                onSave={handleTemplateSave}
            />
        }

        <ProgressBar
            currentStep={activeStep}
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
                        onClick={() => { setExpandAll(false) }} />
                    <SecondaryButton title="Expand All" class_="text-sm! font-normal!"
                        onClick={() => { setExpandAll(true) }} />
                </div>
            </div>

            <div>
                <CampaignCard expandAll={expandAll} setExpandAll={setExpandAll}
                    title="Campaign Details"
                    status={getCardStatus('campaignDetails')}>
                    <div className="grid grid-cols-2 gap-3">
                        <InputForm label="Campaign Name" placeholder="Enter Name" isRequired={true} inputClass="bg-white!"
                            formProps={{ ...register("campaignName", { required: true }) }}
                            errors={errors}
                        />

                        <InputForm label="Description" placeholder="Description" isRequired={false} inputClass="bg-white!"
                            formProps={{ ...register("description", { required: false }) }}
                            errors={errors}
                        />
                    </div>
                </CampaignCard>
            </div>

            <div>
                <CampaignCard expandAll={expandAll} setExpandAll={setExpandAll}
                    title="Targeting"
                    status={getCardStatus('targeting')}>
                    <div className="flex items-center justify-between">
                        <div className="text-secondary text-sm font-medium capitalize">Select Customers from List</div>
                        <SecondaryButton title="Add Customers" class_="text-sm! font-normal!"
                            onClick={() => { setOpenCustomer(true) }} />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 my-5">
                                <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                                <div className="text-danger text-lg font-semibold capitalize">5 customers are already in an active campaign.?</div>
                            </div>
                            <SelectForm defaultOption="Exclude Duplicates" selectClass_="bg-white!"
                                formProps={{ ...register("excludeDuplicates", { required: false }) }}
                                errors={errors}
                            ></SelectForm>
                        </div>
                        <SelectForm label="Cooldown Period" isRequired={true} defaultOption="-" selectClass_="bg-white! py-3! focus:border-primary/60!"
                            formProps={{ ...register("cooldownPeriod", { required: true }) }} errors={errors} clearErrors={clearErrors}>
                            <option>7 Days</option>
                        </SelectForm>

                        <div className="border border-primary bg-[#0396FF1a] rounded-[10px] py-1.5 px-3 capitalize w-full text-base text-primary font-medium flex items-center justify-between mt-4">
                            <div>Total Selected Customers</div>
                            <div className="flex items-center gap-2">
                                <div>{customersSelected ? '250 Customers' : '0 Customers'}</div>
                                <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />
                            </div>
                        </div>
                    </div>
                </CampaignCard>
            </div>

            <div>
                <CampaignCard expandAll={expandAll} setExpandAll={setExpandAll}
                    title="Template Selection"
                    status={getCardStatus('templateSelection')}>
                    <div className="flex gap-3 my-4">
                        <div className="text-sm text-secondary">Campaign Type<span className="text-danger">*</span></div>
                        <div className="flex">
                            <Radio name="type" label="Email" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!"
                                onChange={() => handleCampaignTypeChange('email')} />
                            <Radio name="type" label="SMS" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!"
                                onChange={() => handleCampaignTypeChange('sms')} />
                            <Radio name="type" label="Both" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!"
                                onChange={() => handleCampaignTypeChange('both')} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-secondary">Primary Email Template<span className="text-danger">*</span></div>

                        <SecondaryButton title="Template selection" class_="text-sm! font-normal!"
                            onClick={() => { setOpenEmail(true) }} />
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                        <div className="bg-dark rounded-lg p-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-secondary text-sm font-medium">
                                        {templateSelected ? 'Nature Template' : 'No Template Selected'}
                                    </div>
                                    <div className="text-text3 text-xs">
                                        {templateSelected ? 'Lorem Ipsum..' : 'Please select a template'}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium disabled:pointer-events-none cursor-pointer"
                                        onClick={() => { setOpenPreview(true) }}
                                        disabled={!templateSelected}>
                                        <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />Preview
                                    </button>

                                    <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium w-[85px] disabled:pointer-events-none cursor-pointer"
                                        onClick={() => { setOpenModal(true) }}
                                        disabled={!templateSelected}>
                                        <Image src="/images/edit2.svg" alt='eye' height={14} width={14} unoptimized={true} />Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-start gap-2 mt-1">
                            <Checkbox onChange={(checked) => setReminderEnabled(checked)} />
                            <div className="text-secondary text-sm capitalize mt-[2px] font-medium">Enable Reminder Email</div>
                        </div>

                        {reminderEnabled && (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-secondary text-sm capitalize">Reminder Email Template</div>
                                    <SecondaryButton title="Template selection" class_="text-sm! font-normal!"
                                        onClick={() => { setOpenEmail(true) }} />                                </div>

                                <div className="bg-white p-3 rounded-lg">
                                    <div className="bg-dark rounded-lg p-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-secondary text-sm font-medium">Nature Template</div>
                                                <div className="text-text3 text-xs">Lorem Ipsum..</div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium disabled:pointer-events-none cursor-pointer" onClick={() => { setOpenPreview(true) }}> <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />Preview</button>

                                                <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium w-[85px] disabled:pointer-events-none cursor-pointer" onClick={() => { setOpenModal(true) }}> <Image src="/images/edit2.svg" alt='eye' height={14} width={14} unoptimized={true} />Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <SelectForm label="Frequency" defaultOption="Select Frequency" isRequired={true}
                                    selectClass_="bg-white! py-3! focus:border-primary/60!"
                                    formProps={{ ...register("frequency", { required: true }) }}
                                    errors={errors} >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                </SelectForm>

                                <div className="flex items-center justify-between my-4">
                                    <div className="text-secondary text-sm font-medium">Final Reminder</div>
                                    <SecondaryButton title="Template selection" class_="text-sm! font-normal!"
                                        onClick={() => { setOpenEmail(true) }} />
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
                                                <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium disabled:pointer-events-none cursor-pointer" onClick={() => { setOpenPreview(true) }}> <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />Preview</button>

                                                <button className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium w-[85px] disabled:pointer-events-none cursor-pointer" onClick={() => { setOpenModal(true) }}> <Image src="/images/edit2.svg" alt='eye' height={14} width={14} unoptimized={true} />Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </CampaignCard>
            </div>

            <div>
                <CampaignCard expandAll={expandAll} setExpandAll={setExpandAll}
                    title="Scheduling & Launch"
                    status={getCardStatus('scheduling')}>
                    <div className="grid grid-cols-2 gap-3">
                        <InputForm label="Time Zone" isRequired={true} inputType="time" inputClass="bg-white!"
                            formProps={{ ...register("timeZone", { required: true }) }}
                            errors={errors}
                        />
                        <SelectForm label="Send Time" isRequired={true} defaultOption="select" selectClass_="bg-white! py-3! focus:border-primary/60!"
                            formProps={{ ...register("sendTime", { required: true }) }}
                            errors={errors}>
                            <option value="morning">morning (8 AM - 12 PM)</option>
                            <option value="afternoon">afternoon (12 PM - 4 PM)</option>
                            <option value="evening">evening (4 PM - 8 PM)</option>
                            <option value="any-time">any time</option>
                        </SelectForm>
                    </div>

                    <SelectForm label="Weekend Delivery" defaultOption="Restrict" selectClass_="bg-white! py-3! focus:border-primary/60!"
                        formProps={{ ...register("weekendDelivery", { required: false }) }}
                        errors={errors}
                    />

                </CampaignCard>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-7">
                {isAllPending ? <CancelButton title="Cancel" type="button"
                    onClick={() => { router.push("/manage-campaigns") }}
                    disabled={sending} /> : <SecondaryButton title="Save as Draft" type="button"
                        onClick={handleSubmit(onSubmit)}
                        disabled={sending} />}
                <SecondaryButton disabled={isAllPending} title="Schedule for Later" class_="bg-white! hover:bg-primary! text-primary! hover:text-white!" onClick={() => { setOpenSchedule(true) }} />
                <CancelButton title="Launch Now" disabled={sending || isAllPending}
                    onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    </AdminLayout>
}
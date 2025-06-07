"use client"
import AdminLayout from "../../../components/AdminLayout"
import ProgressBar from "../../../components/common/Progress"
import CancelButton from "../../../components/common/CancelButton"
import SecondaryButton from "../../../components/common/SecondaryButton"
import CampaignCard from "../../../components/CampaignCard"
import Radio from "../../../components/form/Radio"
import Checkbox from "../../../components/form/Checkbox"
import ScheduleCampaign from "../../../components/Models/manage-campaigns/ScheduleCampaign"
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
import SelectedCustomers from "../../../components/Models/manage-campaigns/SelectedCustomers"
import RadioForm from "../../../components/form/RadioForm"

export default function Detail({ }) {
    const id = ""
    const { register, handleSubmit, setValue, clearErrors, formState: { errors }, watch } = useForm({ defaultValues: { customerSource: "existing" } });
    const [sending, setSending] = useState(false)
    const [openSchedule, setOpenSchedule] = useState(false)
    const [openCustomer, setOpenCustomer] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    const [expandAll, setExpandAll] = useState(undefined)
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

    // Enhanced template state management
    const [selectedTemplates, setSelectedTemplates] = useState({
        primary: null,
        reminder: null,
        final: null
    })
    const [templateSelectionMode, setTemplateSelectionMode] = useState('primary') // 'primary', 'reminder', 'final'

    const [campaignType, setCampaignType] = useState('email')
    const [reminderEnabled, setReminderEnabled] = useState(false)
    const [sameAsFinal, setSameAsFinal] = useState(false)

    const watchedFields = watch()

    useEffect(() => {
        updateCardStatuses()
    }, [watchedFields, customersSelected, selectedTemplates, campaignType])

    const updateCardStatuses = () => {
        let newActiveStep = 1

        // Check Campaign Details completion
        const campaignDetailsComplete = watchedFields['campaignName']?.trim()
        const campaignNameTouched = watchedFields['campaignName'] !== undefined

        let campaignDetailsStatus = 'pending'
        if (campaignDetailsComplete) {
            campaignDetailsStatus = 'completed'
            newActiveStep = 2
        } else if (campaignNameTouched) {
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
            selectedTemplates.primary &&
            (!reminderEnabled || (selectedTemplates.reminder && watchedFields['frequency']))
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

        const newStatuses = {
            campaignDetails: campaignDetailsStatus,
            targeting: targetingStatus,
            templateSelection: templateSelectionStatus,
            scheduling: schedulingStatus
        }

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
        return cardStatuses[cardKey]
    }

    const onSubmit = async (data) => {
        try {
            setSending(true)
            // Include template data in submission
            const submissionData = {
                ...data,
                templates: selectedTemplates,
                campaignType,
                reminderEnabled,
                sameAsFinal
            }
            console.log(submissionData, data)
            let res = null
            if (id !== "add") {
                res = await axios.put("/api", submissionData)
            } else {
                res = await axios.post("/api", submissionData)
            }
            toast.success("Campaign Created Successfully")
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

    const handleTemplateSave = (templateData) => {
        console.log(templateData)
        setSelectedTemplates(prev => ({
            ...prev,
            [templateSelectionMode]: templateData
        }))
        setOpenEmail(false)
    }

    const handleCampaignTypeChange = (type) => {
        setCampaignType(type)
        // Reset templates when campaign type changes
        setSelectedTemplates({
            primary: null,
            reminder: null,
            final: null
        })
    }

    const openTemplateSelector = (mode) => {
        setTemplateSelectionMode(mode)
        setOpenEmail(true)
    }

    const handleReminderToggle = (checked) => {
        setReminderEnabled(checked)
        if (!checked) {
            // Clear reminder and final templates when disabled
            setSelectedTemplates(prev => ({
                ...prev,
                reminder: null,
                final: null
            }))
            setSameAsFinal(false)
        }
    }

    const handleSameAsFinalToggle = (checked) => {
        setSameAsFinal(checked)
        if (checked) {
            setSelectedTemplates(prev => ({
                ...prev,
                final: prev.reminder
            }))
        } else {
            setSelectedTemplates(prev => ({
                ...prev,
                final: null
            }))
        }
    }

    const renderTemplateCard = (templateType, template, label, isRequired = false) => {
        const hasTemplate = template !== null

        return (
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-secondary">
                        {label}
                        {isRequired && <span className="text-danger">*</span>}
                    </div>
                    <SecondaryButton
                        title="Select Template"
                        class_="text-sm! font-normal!"
                        onClick={() => openTemplateSelector(templateType)}
                    />
                </div>

                <div className="bg-white p-3 rounded-lg">
                    <div className="bg-dark rounded-lg p-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-secondary text-sm font-medium">
                                    {hasTemplate ? template.name || "Nature Template" : 'No Template Selected'}
                                </div>
                                <div className="text-text3 text-xs">
                                    {hasTemplate ? template.description || 'Template description...' : 'Please select a template'}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    onClick={() => setOpenPreview(true)}
                                    disabled={!hasTemplate}
                                >
                                    <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />
                                    Preview
                                </button>

                                <button
                                    className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium w-[85px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    onClick={() => setOpenModal(true)}
                                    disabled={!hasTemplate}
                                >
                                    <Image src="/images/edit2.svg" alt='edit' height={14} width={14} unoptimized={true} />
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const isAllPending = Object.values(cardStatuses).every(status => status === 'pending');

    return <AdminLayout
        cardClass="w-[70%]! relative h-[85vh] overflow-y-auto pt-0! scrollbar-none">
        {openModal &&
            <AddTemplate
                onClose={() => {
                    setOpenModal(false)
                }}
            />
        }

        {openPreview &&
            <Preview
                template={selectedTemplates[templateSelectionMode]}
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
            <SelectedCustomers
                onClose={() => {
                    setOpenCustomer(false)
                }}
                onSave={handleCustomerSave}
            />
        }

        {openEmail &&
            <EmailTemplate
                mode={templateSelectionMode}
                campaignType={campaignType}
                onClose={() => {
                    setOpenEmail(false)
                }}
                onSave={handleTemplateSave}
            />
        }

        {/* Sticky Progress Bar */}
        <div className="sticky top-0 z-10 bg-white pt-5">
            <ProgressBar
                currentStep={activeStep}
                stepTitle1="Campaign Details"
                stepTitle2="Customer Selection"
                stepTitle3="Template Selection"
                stepTitle4="Scheduling & Launch"
            />
        </div>

        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <CampaignCard
                        openByDefault={true}
                        expandAll={expandAll} setExpandAll={setExpandAll}
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
                        <div className="my-4">
                            <div className="text-secondary text-sm font-medium capitalize">Select Customers from List</div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <RadioForm
                                        checked={watch("customerSource") === "existing"}
                                        name="customerSource"
                                        label="Existing List"
                                        value="existing"
                                        formProps={{ ...register("customerSource", { required: true }) }}
                                        errors={errors}
                                    />
                                    <RadioForm
                                        checked={watch("customerSource") === "CSV"}
                                        name="customerSource"
                                        value="CSV"
                                        label="CSV"
                                        formProps={{ ...register("customerSource", { required: true }) }}
                                        errors={errors}
                                    />
                                </div>
                                <SecondaryButton title="Add Customers" class_="text-sm! font-normal!"
                                    onClick={() => { setOpenCustomer(true) }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <div>
                                    {customersSelected && <div className="flex items-center gap-2 my-5">
                                        <Image unoptimized={true} src="/images/warning.svg" alt="warning" height={22} width={22} />
                                        <div className="text-danger text-lg font-semibold capitalize">5 customers are already in an active campaign.</div>
                                    </div>}
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

                            {customersSelected && <div className="border border-primary bg-[#0396FF1a] rounded-[10px] py-1.5 px-3 capitalize w-full text-base text-primary font-medium flex items-center justify-between mt-4">
                                <div>Total Selected Customers</div>
                                <div className="flex items-center gap-2">
                                    <div>{customersSelected ? '250 Customers' : '0 Customers'}</div>
                                    <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />
                                </div>
                            </div>}
                        </div>
                    </CampaignCard>
                </div>

                <div>
                    <CampaignCard expandAll={expandAll} setExpandAll={setExpandAll}
                        title="Template Selection"
                        status={getCardStatus('templateSelection')}>

                        {/* Campaign Type Selection */}
                        <div className="flex gap-3 my-4">
                            <div className="text-sm text-secondary">Campaign Type<span className="text-danger">*</span></div>
                            <div className="flex">
                                <Radio name="type" label="Email" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!"
                                    checked={campaignType === "email"} onChange={() => handleCampaignTypeChange('email')} />
                                <Radio name="type" label="SMS" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!"
                                    checked={campaignType === "sms"} onChange={() => handleCampaignTypeChange('sms')} />
                                <Radio name="type" label="Both" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!"
                                    checked={campaignType === "both"} onChange={() => handleCampaignTypeChange('both')} />
                            </div>
                        </div>

                        {/* Primary Template */}
                        {renderTemplateCard('primary', selectedTemplates.primary, `Primary ${campaignType === 'email' ? 'Email' : campaignType === 'sms' ? 'SMS' : 'Email'} Template`, true)}

                        {/* Reminder Email Toggle */}
                        {campaignType !== 'sms' && (
                            <div className="mt-4">
                                <div className="flex items-start gap-2 mt-1 mb-4">
                                    <Checkbox onChange={handleReminderToggle} checked={reminderEnabled} />
                                    <div className="text-secondary text-sm capitalize mt-[2px] font-medium">Enable Reminder Email</div>
                                </div>

                                {reminderEnabled && (
                                    <>
                                        {/* Reminder Template */}
                                        {renderTemplateCard('reminder', selectedTemplates.reminder, 'Reminder Email Template', true)}

                                        {/* Frequency Selection */}
                                        <SelectForm label="Frequency" defaultOption="Select Frequency" isRequired={true}
                                            selectClass_="bg-white! py-3! focus:border-primary/60!"
                                            formProps={{ ...register("frequency", { required: reminderEnabled }) }}
                                            errors={errors} >
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </SelectForm>

                                        {/* Final Reminder Section - Only show after frequency and reminder template are selected */}
                                        {selectedTemplates.reminder && watchedFields['frequency'] && (
                                            <div className="mt-6">
                                                <div className="text-secondary text-sm font-medium mb-4">Final Reminder</div>

                                                <div className="flex items-start gap-2 mt-1 mb-4">
                                                    <Checkbox onChange={handleSameAsFinalToggle} checked={sameAsFinal} />
                                                    <div className="text-secondary text-sm capitalize mt-[2px] font-medium">Same as Reminder</div>
                                                </div>

                                                {!sameAsFinal && renderTemplateCard('final', selectedTemplates.final, 'Final Reminder Template')}

                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
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
                        disabled={sending} /> : <SecondaryButton title="Save as Draft" type="submit"
                            disabled={sending} />}
                    <SecondaryButton disabled={isAllPending} title="Schedule for Later" class_="bg-white! hover:bg-primary! text-primary! hover:text-white!" onClick={() => { setOpenSchedule(true) }} />
                    <CancelButton title="Launch Now" disabled={sending || isAllPending} type="submit" />
                </div>
            </form>
        </div>
    </AdminLayout>
}
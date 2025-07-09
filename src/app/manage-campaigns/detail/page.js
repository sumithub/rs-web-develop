"use client"
import AdminLayout from "../../../components/AdminLayout"
import ProgressBar from "../../../components/common/Progress"
import CancelButton from "../../../components/common/CancelButton"
import SecondaryButton from "../../../components/common/SecondaryButton"
import CampaignCard from "../../../components/CampaignCard"
import Radio from "../../../components/form/Radio"
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
import ImportCustomerDetail from "../../../components/Models/manage-campaigns/ImportCustomerDetail"
import RadioForm from "../../../components/form/RadioForm"
import Link from "next/link"

export default function Detail({ }) {
    const id = ""
    const { register, handleSubmit, clearErrors, formState: { errors }, setValue, watch } = useForm({
        defaultValues: { excludeDuplicates: "Exclude Duplicates", customerSource: "existing" }
    });
    const [sending, setSending] = useState(false)
    const [openSchedule, setOpenSchedule] = useState(false)
    const [openCustomer, setOpenCustomer] = useState(false)
    const [openCustomerDetail, setOpenCustomerDetail] = useState(false)
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
    const [templateSelectionMode, setTemplateSelectionMode] = useState('primary') // 'primary', 'reminder', 'final'
    const [campaignType, setCampaignType] = useState('email');
    const [activeTab, setActiveTab] = useState('email');

    const [reminderEnabled, setReminderEnabled] = useState(false);
    const [sameAsFinal, setSameAsFinal] = useState('customFinalReminderEmail');

    const [emailReminderEnabled, setEmailReminderEnabled] = useState(false);
    const [sameAsEmailFinal, setSameAsEmailFinal] = useState(false);

    const [smsReminderEnabled, setSmsReminderEnabled] = useState(false);
    const [sameAsSmsFinal, setSameAsSmsFinal] = useState(false);

    // State for selected templates
    const [selectedTemplates, setSelectedTemplates] = useState({
        primary: null,
        reminder: null,
        final: null,
        emailPrimary: null,
        emailReminder: null,
        emailFinal: null,
        smsPrimary: null,
        smsReminder: null,
        smsFinal: null
    });

    const handleCampaignTypeChange = (type) => {
        setSelectedTemplates({
            primary: null,
            reminder: null,
            final: null,
            emailPrimary: null,
            emailReminder: null,
            emailFinal: null,
            smsPrimary: null,
            smsReminder: null,
            smsFinal: null
        })
        setCampaignType(type);
        if (type === 'both') {
            setActiveTab('email');
        }
        setReminderEnabled(false)
        setSameAsFinal(false)
        setEmailReminderEnabled(false)
        setSameAsEmailFinal(false)
        setSmsReminderEnabled(false)
        setSameAsSmsFinal(false)
    };

    const handleReminderToggle = (value) => {
        if (value === 'customReminderEmail') {
            setReminderEnabled(false);
        } else if (value === 'sameAsPrimary') {
            setReminderEnabled(true);
        }
    };

    const handleEmailReminderToggle = (value) => {
        setEmailReminderEnabled(value === 'sameAsPrimary');
    };



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

        // Check Template Selection completion based on campaign type
        let templateComplete = false;

        if (targetingComplete && campaignType) {
            if (campaignType === "email") {
                // Single Email Campaign
                templateComplete = selectedTemplates.primary && (watchedFields['emailFrequency'] || watchedFields['smsFrequency']);
            } else if (campaignType === "sms") {
                // Single SMS Campaign  
                templateComplete = selectedTemplates.primary && (watchedFields['emailFrequency'] || watchedFields['smsFrequency'])
            } else if (campaignType === "both") {
                // Both Email and SMS Campaign
                const emailTemplateComplete = selectedTemplates.emailPrimary && watchedFields['emailFrequency'] && watchedFields['emailReminderNo']

                const smsTemplateComplete = selectedTemplates.smsPrimary && watchedFields['smsFrequency'] && watchedFields['smsReminderNo']

                templateComplete = emailTemplateComplete && smsTemplateComplete;
            }
        }

        let templateSelectionStatus = 'pending';
        if (templateComplete) {
            templateSelectionStatus = 'completed';
            newActiveStep = 4;
        } else if (targetingComplete) {
            templateSelectionStatus = 'in_progress';
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

    const handleCustomerSave = (count) => {
        setCustomersSelected(count)
        setOpenCustomer(false)
    }


    const openTemplateSelector = (mode) => {
        setTemplateSelectionMode(mode)
        setOpenEmail(true)
    }


    const handleTemplateSave = (templateData) => {
        setSelectedTemplates(prev => ({
            ...prev,
            [templateSelectionMode]: templateData
        }))
        setOpenEmail(false)
    }

    const handleSameAsSmsReminderToggle = (checked) => {
        setSameAsSmsReminder(checked)
        if (checked) {
            setSelectedTemplates(prev => ({
                ...prev,
                smsReminder: prev.smsPrimary
            }))
        } else {
            setSelectedTemplates(prev => ({
                ...prev,
                smsReminder: null
            }))
        }
    }

    const handleSameAsSmsFinalToggle = (checked) => {
        setSameAsSmsFinal(checked)
        if (checked) {
            setSelectedTemplates(prev => ({
                ...prev,
                smsFinal: prev.smsPrimary
            }))
        } else {
            setSelectedTemplates(prev => ({
                ...prev,
                smsFinal: null
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
                        {isRequired ? <span className="text-danger">*</span> : <span className="text-text3"> (Optional)</span>}
                    </div>
                    <SecondaryButton
                        title="Template selection"
                        type="button"
                        class_="text-sm! font-normal!"
                        onClick={() => openTemplateSelector(templateType)}
                    />
                </div>

                {hasTemplate && <div className="bg-white p-3 rounded-lg">
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
                                    type="button"
                                    disabled={!hasTemplate}
                                >
                                    <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />
                                    Preview
                                </button>

                                <Link href="/create-email-template"
                                    className="bg-[#0396FF1a] p-2 rounded-lg flex gap-2 items-center justify-center text-xs text-primary font-medium w-[85px] disabled:opacity-50 disabled:cursor-not-allowed"
                                    // onClick={() => setOpenModal(true)}
                                    type="button"
                                    disabled={!hasTemplate}
                                >
                                    <Image src="/images/edit2.svg" alt='edit' height={14} width={14} unoptimized={true} />
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>}
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
                selected={customersSelected}
                action={openCustomer}
                type={watch("customerSource")}
                onClose={() => {
                    setOpenCustomer(false)
                }}
                onSave={handleCustomerSave}
            />
        }

        {openCustomerDetail &&
            <ImportCustomerDetail
                onClose={(count) => {
                    setCustomersSelected(count)
                    setOpenCustomerDetail(false)
                }}
                onSave={(count) => {
                    setOpenSchedule(false)
                    setCustomersSelected(count || 0)
                }}
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
                stepTitle2="Targeting"
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
                            type="button"
                            onClick={() => { setExpandAll(false) }} />
                        <SecondaryButton title="Expand All" class_="text-sm! font-normal!"
                            type="button"
                            onClick={() => { setExpandAll(true) }} />
                    </div>
                </div>

                <div>
                    <CampaignCard
                        openByDefault={true}
                        expandAll={expandAll} setExpandAll={setExpandAll}
                        title="Campaign Details"
                        status={getCardStatus('campaignDetails')}>
                        <div>
                            <div className="grid grid-cols-2 gap-3">
                                <InputForm
                                    label="Campaign Name"
                                    placeholder="Enter Name"
                                    isRequired={true}
                                    inputClass="bg-white! border-primary/10! focus:border-primary/60!"
                                    formProps={{ ...register("campaignName", { required: true }) }}
                                    errors={errors}
                                />
                            </div>
                            <InputForm label="Description" placeholder="Description" isRequired={false} inputClass="bg-white! border-primary/10! focus:border-primary/60!"
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
                            <div className="text-secondary text-sm font-medium capitalize">Select Customer Source</div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <RadioForm
                                        checked={watch("customerSource") === "existing"}
                                        name="customerSource"
                                        label="Existing List"
                                        value="existing"
                                        formProps={{ ...register("customerSource", { required: true }) }}
                                        errors={errors}
                                    />
                                    {watch("customerSource") === "existing" && <SecondaryButton title="select from list" class_="text-sm! font-normal!"
                                        type="button"
                                        onClick={() => { setOpenCustomer(true) }} />}
                                </div>

                                <div className="flex items-center justify-between">

                                    <RadioForm
                                        checked={watch("customerSource") === "CSV"}
                                        name="customerSource"
                                        value="CSV"
                                        label="CSV"
                                        formProps={{ ...register("customerSource", { required: true }) }}
                                        errors={errors}
                                    />
                                    {watch("customerSource") === "CSV" && <SecondaryButton title="Choose File" class_="text-sm! font-normal!"
                                        type="button"
                                        onClick={() => { setOpenCustomerDetail(true) }} />}
                                </div>
                                {/* <SecondaryButton title={watch("customerSource") === "CSV" ? "Choose File" : "Add Customers"} class_="text-sm! font-normal!"
                                    type="button"
                                    onClick={() => { setOpenCustomer(true) }} /> */}

                                {/* <SecondaryButton
                                    title={watch("customerSource") === "CSV" ? "Choose File" : "Select from list"}
                                    class_="text-sm! font-normal!"
                                    type="button"
                                    onClick={() => {
                                        if (watch("customerSource") === "CSV") {
                                            setOpenCustomerDetail(true);
                                        } else {
                                            setOpenCustomer(true);
                                        }
                                    }}
                                /> */}
                            </div>
                        </div>
                        {customersSelected && <div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-5 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Image unoptimized={true} src="/images/warning.svg" alt="warning" height={22} width={22} />
                                            <div className="text-danger text-lg font-semibold capitalize">{customersSelected || 5} customers are already in an active campaign?</div>
                                        </div>
                                        <SecondaryButton title="View Details" class_="text-sm! font-normal!"
                                            type="button"
                                            onClick={() => { setOpenCustomer("details") }} />
                                    </div>
                                </div> {watch("customerSource") && <SelectForm
                                    class_="mt-0!"
                                    defaultOption="" selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                                    formProps={{ ...register("excludeDuplicates", { required: false }) }}
                                    errors={errors} setValue={setValue}
                                    watch={watch}>
                                    <option value="Exclude Duplicates">Exclude Duplicates</option>
                                    <option value="Proceed Anyway">Proceed Anyway</option>
                                </SelectForm>}
                                {/* <CancelButton type="button" title="proceed anyway" class_="bg-white! border-border-color! font-normal! text-sm!" /> */}
                            </div>
                            <div className="grid grid-cols-[3fr_1fr] items-start gap-3">
                                <SelectForm
                                    label="Cooldown Period"
                                    isRequired={true}
                                    defaultOption="-"
                                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                                    formProps={{ ...register("cooldownPeriod", { required: true }) }} errors={errors} clearErrors={clearErrors}
                                    setValue={setValue}
                                    watch={watch}
                                >
                                    <option value="7">7 Days</option>
                                    <option value="14">14 Days</option>
                                    <option value="21">21 Days</option>
                                </SelectForm>
                                {/* {watch("customerSource") && <SelectForm
                                    class_="mt-10"
                                    defaultOption="" selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                                    formProps={{ ...register("excludeDuplicates", { required: false }) }}
                                    errors={errors} setValue={setValue}
                                    watch={watch}>
                                    <option value="Exclude Duplicates">Exclude Duplicates</option>
                                    <option value="Proceed Anyway">Proceed Anyway</option>
                                </SelectForm>} */}
                            </div>

                            <div className="border border-primary bg-[#0396FF1a] rounded-[10px] py-1.5 px-3 capitalize w-full text-base text-primary font-medium flex items-center justify-between mt-4">
                                <div>Total Selected Customers</div>
                                <div className="flex items-center gap-2">
                                    <div>{customersSelected ? `${customersSelected} Customers` : '0 Customers'}</div>
                                    <Image src="/images/eye1.svg" alt='eye' height={16} width={16} unoptimized={true} />
                                </div>
                            </div>
                        </div>}
                    </CampaignCard>
                </div>

                <div>
                    <CampaignCard expandAll={expandAll} setExpandAll={setExpandAll}
                        title="Template Selection"
                        status={getCardStatus('templateSelection')}>

                        {/* Campaign Type Selection */}
                        <div className="flex gap-3 my-4">
                            <div className="text-sm text-secondary">Campaign Type<span className="text-danger">*</span></div>
                            <div className="flex gap-3">
                                <Radio name="type" label="Email" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!"
                                    checked={campaignType === "email"} onChange={() => handleCampaignTypeChange('email')} />
                                <Radio name="type" label="SMS" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!"
                                    checked={campaignType === "sms"} onChange={() => handleCampaignTypeChange('sms')} />
                                <Radio name="type" label="Both" inputClass="mb-0!" labelClass="font-normal!" class_="mt-0!"
                                    checked={campaignType === "both"} onChange={() => handleCampaignTypeChange('both')} />
                            </div>
                        </div>
                        {campaignType === "both" && (
                            <div className="mb-4">
                                <div className="flex border-b border-gray-200">
                                    <button
                                        className={`px-4 py-2 w-1/2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'email'
                                            ? 'border-primary/70 text-primary'
                                            : 'border-transparent text-text3 hover:text-gray-400 hover:border-gray-300'
                                            }`}
                                        type="button"
                                        onClick={() => setActiveTab('email')}
                                    >
                                        Email
                                    </button>
                                    <button
                                        className={`px-4 py-2 w-1/2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'sms'
                                            ? 'border-primary/70 text-primary'
                                            : 'border-transparent text-text3 hover:text-gray-400 hover:border-gray-300'
                                            }`}
                                        type="button"
                                        onClick={() => setActiveTab('sms')}
                                    >
                                        SMS
                                    </button>
                                </div>
                            </div>
                        )}


                        {(campaignType === "email" || (campaignType === "both" && activeTab === 'email')) && (
                            <div>
                                {/* Primary Email Template */}
                                {renderTemplateCard(
                                    'primary',
                                    selectedTemplates.primary,
                                    'Primary Email Template',
                                    true
                                )}

                                {/* Reminder Email Template Options */}
                                {selectedTemplates.primary && (
                                    <div className="mt-4">
                                        <div className="flex items-center gap-4 mt-1 mb-4">
                                            <div className="text-gray-600 text-sm font-medium">Reminder Email Template</div>
                                            <div className="flex items-start gap-5">
                                                <Radio
                                                    class_="mt-0!"
                                                    name={campaignType === 'both' ? 'emailReminder' : 'reminderEmail'}
                                                    label="Custom reminder email"
                                                    checked={campaignType === 'both' ? !emailReminderEnabled : !reminderEnabled}
                                                    onChange={() => campaignType === 'both' ? handleEmailReminderToggle('customReminderEmail') : handleReminderToggle('customReminderEmail')}
                                                    tooltipContent="Select a unique template for your reminder email."
                                                    tooltipPosition="bottom"
                                                    showTooltip={true}

                                                />
                                                <Radio
                                                    showTooltip={true}
                                                    tooltipContent="This will reuse your primary email template." tooltipPosition="bottom"
                                                    class_="mt-0!"
                                                    name={campaignType === 'both' ? 'emailReminder' : 'reminderEmail'}
                                                    label="Same as primary"
                                                    checked={campaignType === 'both' ? emailReminderEnabled : reminderEnabled}
                                                    onChange={() => campaignType === 'both' ? handleEmailReminderToggle('sameAsPrimary') : handleReminderToggle('sameAsPrimary')}
                                                />
                                            </div>
                                        </div>

                                        {/* Show Reminder Email Template selection only if Custom is selected */}
                                        {(campaignType === 'both' ? !emailReminderEnabled : !reminderEnabled) && (
                                            <div className="mb-4">
                                                {renderTemplateCard(
                                                    'reminder',
                                                    selectedTemplates.reminder,
                                                    'Reminder Email Template',
                                                    false
                                                )}
                                            </div>
                                        )}

                                        {/* Final Reminder Email Template Options */}
                                        {((campaignType === 'both' ? emailReminderEnabled : reminderEnabled) ||
                                            (campaignType === 'both' ? !emailReminderEnabled && selectedTemplates.reminder : !reminderEnabled && selectedTemplates.reminder)) && (
                                                <>
                                                    <div className="flex items-start gap-4 mt-1 mb-4">
                                                        <div className="text-gray-600 text-sm font-medium">Final Reminder Email Template<span className="text-red-500">*</span></div>
                                                        <div className="flex items-start gap-5">
                                                            <Radio
                                                                class_="mt-0!"
                                                                name="final"
                                                                label="Custom final reminder email"
                                                                checked={campaignType === 'both' ? !sameAsEmailFinal : sameAsFinal === "customFinalReminderEmail"}
                                                                onChange={() => {
                                                                    if (campaignType === 'both') {
                                                                        setSameAsEmailFinal(false);
                                                                    } else {
                                                                        setSameAsFinal('customFinalReminderEmail');
                                                                        setSelectedTemplates((prev) => ({ ...prev, final: null }));
                                                                    }
                                                                }}
                                                                tooltipContent="Select a separate template for the final reminder email."
                                                                tooltipPosition="bottom"
                                                                showTooltip={true}
                                                            />
                                                            <Radio
                                                                class_="mt-0!"
                                                                name="final"
                                                                label="Same as reminder"
                                                                checked={campaignType === 'both' ? sameAsEmailFinal : sameAsFinal === "sameAsPrimary"}
                                                                onChange={() => {
                                                                    if (campaignType === 'both') {
                                                                        setSameAsEmailFinal(true);
                                                                    } else {
                                                                        setSameAsFinal('sameAsPrimary');
                                                                        setSelectedTemplates((prev) => ({ ...prev, final: prev.reminder }));
                                                                    }
                                                                }}

                                                                tooltipContent="This will reuse your reminder email template."
                                                                tooltipPosition="bottom"
                                                                showTooltip={true}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Show Final Reminder Template selection only if Custom is selected */}
                                                    {(campaignType === 'both' ? !sameAsEmailFinal : sameAsFinal === "customFinalReminderEmail") && (
                                                        <div className="mb-4">
                                                            {renderTemplateCard(
                                                                'final',
                                                                selectedTemplates.final,
                                                                'Final Reminder Email Template',
                                                                false
                                                            )}
                                                        </div>
                                                    )}


                                                </>
                                            )}
                                    </div>
                                )}

                                {/* Frequency and Number of Reminders */}
                                {(campaignType !== "both" && selectedTemplates.primary) && <div className="grid grid-cols-2 gap-4 mt-6">
                                    <SelectForm label="Frequency" defaultOption="Select Frequency" isRequired={true}
                                        selectClass_="bg-white! py-3! focus:border-primary/60! border-primary/10!"
                                        formProps={{ ...register("emailFrequency", { required: emailReminderEnabled }) }}
                                        errors={errors} setValue={setValue}
                                        watch={watch}>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </SelectForm>
                                    <InputForm label="Number of Reminders"
                                        isRequired={true}
                                        inputClass="bg-white! py-3! focus:border-primary/60! border-primary/10!"
                                        formProps={{
                                            ...register("emailReminderNo", {
                                                required: emailReminderEnabled,
                                                valueAsNumber: true
                                            })
                                        }} inputType="number"
                                        errors={errors} />
                                </div>}
                            </div>
                        )}

                        {/* SMS Campaign or SMS Tab Content */}
                        {(campaignType === "sms" || (campaignType === "both" && activeTab === 'sms')) && (
                            <div>
                                {/* Primary SMS Template */}
                                {renderTemplateCard(
                                    'smsPrimary',
                                    selectedTemplates.smsPrimary,
                                    'Primary SMS Template',
                                    true
                                )}

                                {/* SMS Reminder Section - follows same pattern as email */}
                                {selectedTemplates.smsPrimary && (
                                    <div className="mt-4">
                                        <div className="flex items-start gap-4 mt-1 mb-4">
                                            <div className="text-gray-600 text-sm font-medium">Reminder SMS Template</div>
                                            <div className="flex items-start gap-4">
                                                <Radio
                                                    class_="mt-0!"
                                                    name="smsReminder"
                                                    label="Custom reminder SMS"
                                                    checked={!smsReminderEnabled}
                                                    onChange={() => setSmsReminderEnabled(false)}
                                                    tooltipContent="Select a unique template for your reminder SMS."
                                                    tooltipPosition="bottom"
                                                    showTooltip={true}
                                                />
                                                <Radio
                                                    class_="mt-0!"
                                                    name="smsReminder"
                                                    label="Same as primary"
                                                    checked={smsReminderEnabled}
                                                    onChange={() => setSmsReminderEnabled(true)}
                                                    tooltipContent="This will reuse your primary SMS template."
                                                    tooltipPosition="bottom"
                                                    showTooltip={true}
                                                />
                                            </div>
                                        </div>

                                        {/* Show Reminder SMS Template selection only if Custom is selected */}
                                        {!smsReminderEnabled && (
                                            <div className="mb-4">
                                                {renderTemplateCard(
                                                    'smsReminder',
                                                    selectedTemplates.smsReminder,
                                                    'Reminder SMS Template',
                                                    false
                                                )}
                                            </div>
                                        )}

                                        {/* Final Reminder SMS Template Options */}
                                        {selectedTemplates.smsPrimary && (
                                            <>
                                                <div className="flex items-start gap-4 mt-1 mb-4">
                                                    <div className="text-gray-600 text-sm font-medium">Final Reminder SMS Template<span className="text-red-500">*</span></div>
                                                    <div className="flex items-start gap-4">
                                                        <Radio
                                                            class_="mt-0!"
                                                            name="smsFinal"
                                                            label="Custom final reminder SMS"
                                                            checked={!sameAsSmsFinal}
                                                            onChange={() => setSameAsSmsFinal(false)}
                                                            tooltipContent="Select a separate template for the final reminder SMS."
                                                            tooltipPosition="bottom"
                                                            showTooltip={true}
                                                        />
                                                        <Radio
                                                            class_="mt-0!"
                                                            name="smsFinal"
                                                            label="Same as reminder"
                                                            checked={sameAsSmsFinal}
                                                            onChange={() => setSameAsSmsFinal(true)}
                                                            tooltipContent="This will reuse your reminder SMS template."
                                                            tooltipPosition="bottom"
                                                            showTooltip={true}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Show Final Reminder SMS Template selection only if Custom is selected */}
                                                {!sameAsSmsFinal && (
                                                    <div className="mb-4">
                                                        {renderTemplateCard(
                                                            'smsFinal',
                                                            selectedTemplates.smsFinal,
                                                            'Final Reminder SMS Template',
                                                            false
                                                        )}
                                                    </div>
                                                )}

                                                {/* SMS Frequency and Number of Reminders */}
                                                <div className="grid grid-cols-2 gap-4 mt-6">
                                                    <SelectForm label="Frequency" defaultOption="Select Frequency" isRequired={true}
                                                        selectClass_="bg-white! py-3! focus:border-primary/60! border-primary/10!"
                                                        formProps={{ ...register("smsFrequency", { required: smsReminderEnabled }) }}
                                                        errors={errors} setValue={setValue}
                                                        watch={watch}>
                                                        <option value="daily">Daily</option>
                                                        <option value="weekly">Weekly</option>
                                                        <option value="monthly">Monthly</option>
                                                    </SelectForm>

                                                    {/* SMS Number of Reminders */}
                                                    <InputForm label="Number of Reminders"
                                                        isRequired={true}
                                                        inputClass="bg-white! py-3! border-primary/10! focus:border-primary/60!"
                                                        formProps={{
                                                            ...register("smsReminderNo", {
                                                                required: smsReminderEnabled,
                                                                valueAsNumber: true
                                                            })
                                                        }} inputType="number"
                                                        errors={errors} />
                                                </div>
                                            </>
                                        )}
                                    </div>
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

                            <InputForm label="Time Zone" isRequired={true} inputType="time" inputClass="bg-white! border-primary/10! focus:border-primary/60!"
                                formProps={{ ...register("timeZone", { required: true }) }}
                                errors={errors}
                            />

                            <SelectForm label="Send Time" isRequired={true} defaultOption="select" selectClass_="bg-white! py-[13.6px]! focus:border-primary/60! border-primary/10!"
                                formProps={{ ...register("sendTime", { required: true }) }}
                                errors={errors} setValue={setValue}
                                watch={watch}>
                                <option value="morning">morning (8 AM - 12 PM)</option>
                                <option value="afternoon">afternoon (12 PM - 4 PM)</option>
                                <option value="evening">evening (4 PM - 8 PM)</option>
                                <option value="anyTime">Any Time (System Decides Optimal Time)</option>
                            </SelectForm>
                        </div>

                        <SelectForm label="Weekend Delivery" selectClass_="bg-white! py-3! focus:border-primary/60! border-primary/10!"
                            formProps={{ ...register("weekendDelivery", { required: false }) }}
                            errors={errors} setValue={setValue}
                            watch={watch}
                        >
                            <option value="restrict">Restrict</option>
                            <option value="allow">Allow</option>
                        </SelectForm>
                    </CampaignCard>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-7">
                    {isAllPending ? <CancelButton title="Cancel" class_="text-lg!" type="button"
                        onClick={() => { router.push("/manage-campaigns") }}
                        disabled={sending} /> : <SecondaryButton title="Save as Draft" class_="text-lg!" type="submit"
                            disabled={sending} />}
                    <SecondaryButton disabled={isAllPending} title="Schedule for Later" class_="bg-white! disabled:bg-dark! disabled:text-text3! text-primary! text-lg! hover:text-white! hover:bg-primary!" onClick={() => { setOpenSchedule(true) }} type="button" />
                    <CancelButton title="Launch Now" disabled={sending || isAllPending} type="submit" class_="text-lg!" />
                </div>
            </form>
        </div>
    </AdminLayout>
}
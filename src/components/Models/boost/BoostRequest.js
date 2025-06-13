"use client"
import { useState } from "react";
import SecondaryButton from "../../common/SecondaryButton";
import Checkbox from "../../form/Checkbox";
import Radio from "../../form/Radio";
import Search from "../../form/Search";
import Model from "../Model";
import TemplateList from "./TemplateList";
import SelectedCustomers from "../manage-campaigns/SelectedFromCustomers";
import { toast } from "react-toastify";
import { getError, validEmailRgx } from "../../../../helper";
import { useForm } from "react-hook-form";
import PhoneForm from "../../form/PhoneForm";
import AddCustomer from "../customers/AddCustomer";
import Image from "next/image";
import axios from "axios";
import InputForm from "../../form/InputForm";
import Preview from "../manage-campaigns/Preview"
import AddTemplate from "../templates/AddTemplate"
import SelectForm from "../../form/SelectForm";
import Link from "next/link";

export default function BoostRequest({ onClose, onSave, id }) {
    const [select, setSelect] = useState("")
    const [overrideTemplates, setOverrideTemplates] = useState(false)
    const [selectedCustomers, setSelectedCustomers] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCampaign, setSelectedCampaign] = useState("")
    const [emailTemplate, setEmailTemplate] = useState({ name: "Nature Template", preview: "Lorem Ipsum.." })
    const [smsTemplate, setSmsTemplate] = useState({ name: "Nature Template", preview: "Lorem Ipsum.." })
    const [showDetails, setShowDetails] = useState(false)

    const {
        register,
        setValue,
        watch,
        clearErrors,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [sending, setSending] = useState(false)
    const [openTemplate, setOpenTemplate] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openSelect, setOpenSelect] = useState(false)
    const [open, setOpen] = useState(false)

    // Watch form values for real-time updates
    const formData = watch();

    const onSubmit = async (data) => {
        try {
            setSending(true)
            if (!select) {
                toast.error("Please select how to send (Email, SMS, or Both)")
                setSending(false)
                return
            }
            const submitData = {
                ...data,
                sendVia: select,
                overrideTemplates,
                selectedCustomers,
                campaign: selectedCampaign,
                emailTemplate: overrideTemplates ? emailTemplate : null,
                smsTemplate: overrideTemplates ? smsTemplate : null,
            }

            if (id !== "add") {
                await axios.put(`/api`, submitData)
            } else {
                await axios.post("/api", submitData)
            }
            toast.success("Request Sent Successfully")
            setSending(false)
            if (onSave) { onSave() }
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    const handleTemplateSelection = (template, type) => {
        if (type === 'email') {
            setEmailTemplate(template)
        } else if (type === 'sms') {
            setSmsTemplate(template)
        }
        setOpenTemplate(false)
    }

    const handleCustomerSelection = (customers) => {
        setSelectedCustomers(customers)
        setOpenSelect(false)
    }

    const handleNewCustomer = (customer) => {
        setValue("name", customer.customerName)
        setValue("email", customer.email)
        setValue("phone", customer.phone)
        setOpen(false)
    }

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    // Calculate summary data
    const totalSelected = selectedCustomers.length + (formData.name ? 1 : 0)
    const skippedCustomers = selectedCustomers.filter(customer =>
        (select === 'email' && !customer.email) ||
        (select === 'sms' && !customer.phone) ||
        (select === 'both' && (!customer.email || !customer.phone))
    )
    const validCustomers = totalSelected - skippedCustomers.length

    return (
        <Model onClose={onClose} title="Boost Request" modalClass="w-1/2!" boostIcon={true}>
            {openTemplate &&
                <TemplateList
                    onClose={() => {
                        setOpenTemplate(false)
                    }}
                    onSave={handleTemplateSelection}
                />
            }

            {openPreview &&
                <Preview
                    onClose={() => {
                        setOpenPreview(false)
                    }}
                />
            }
            {openEdit &&
                <AddTemplate
                    onClose={() => {
                        setOpenEdit(false)
                    }}
                />
            }
            {openSelect &&
                <SelectedCustomers
                    onClose={() => {
                        setOpenSelect(false)
                    }}
                    onSave={handleCustomerSelection}
                />
            }

            {open &&
                <AddCustomer
                    onClose={() => {
                        setOpen(false)
                    }}
                    onSave={handleNewCustomer}
                />
            }

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="text-lg font-semibold capitalize">
                        Send review, referral, or feedback requests to one or more customers
                    </div>

                    <div className="flex justify-between mt-4">
                        <Search
                            placeholder="Search by email, name or phone number"
                            mainClass="w-3/5!"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <SecondaryButton
                            title="Add New Customer"
                            class_="text-sm!"
                            onClick={() => { setOpen(true) }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <InputForm
                            label="Name"
                            isRequired={true}
                            formProps={{ ...register("name", { required: true }) }}
                            errors={errors}
                            clearErrors={clearErrors}
                        />
                        <InputForm
                            label="Email"
                            isRequired={true}
                            formProps={{
                                ...register("email", {
                                    required: true,
                                    pattern: {
                                        value: validEmailRgx,
                                        message: "Please enter a valid email address"
                                    }
                                })
                            }}
                            errors={errors}
                            clearErrors={clearErrors}
                        />
                    </div>

                    <div>
                        <PhoneForm
                            label="Phone Number"
                            isRequired={true}
                            placeholder="Enter phone number"
                            formProps={{
                                ...register("phone", {
                                    required: "Phone number is required",
                                })
                            }}
                            errors={errors}
                            setValue={setValue}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-lg font-semibold">
                            Choose From Existing Customer<span className="text-text3 font-normal"> (Optional)</span>
                        </div>
                        <div>
                            <SecondaryButton
                                title="select from customer List"
                                class_="text-sm!"
                                onClick={() => { setOpenSelect(true) }}
                            />
                        </div>
                    </div>

                    <div>
                        <SelectForm
                            defaultOption="Default Campaign"
                            label="Choose Campaign"
                            labelClass="mb-2.5!"
                            selectClass_="py-2.5! px-2.5!"
                            value={selectedCampaign}
                            onChange={(e) => setSelectedCampaign(e.target.value)}
                        >
                            <option value="campaign1">Campaign 1</option>
                            <option value="campaign2">Campaign 2</option>
                        </SelectForm>
                        <div className="mt-2.5 flex gap-2.5 items-center">
                            <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                            <h2 className="text-sm font-medium capitalize">customer will be added to this campaign for automated follow-ups</h2>
                        </div>
                    </div>

                    <div className="mt-5">
                        <h2 className="text-lg font-semibold">Send Via</h2>
                        <div className="flex gap-3.5 items-center mt-2.5">
                            <Radio
                                label="Email"
                                class_="mt-0!"
                                name="sendVia"
                                mainClass="text-sm! font-medium!"
                                checked={select === "email"}
                                onChange={() => { setSelect("email") }}
                            />
                            <Radio
                                label="SMS"
                                class_="mt-0!"
                                name="sendVia"
                                mainClass="text-sm! font-medium!"
                                checked={select === "sms"}
                                onChange={() => { setSelect("sms") }}
                            />
                            <Radio
                                label="Both"
                                class_="mt-0!"
                                name="sendVia"
                                mainClass="text-sm! font-medium!"
                                checked={select === "both"}
                                onChange={() => { setSelect("both") }}
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="flex gap-2.5 items-center">
                            <Checkbox
                                checked={overrideTemplates}
                                onChange={() => setOverrideTemplates(!overrideTemplates)}
                            />
                            <h2 className="text-sm">Override Default Templates?</h2>
                        </div>
                    </div>

                    <div className="mt-2.5 flex items-center gap-2.5">
                        <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                        <h2 className="text-sm font-medium">Check To Use Custom Templates For This Request. (Uncheck To Apply The Campaign's Defaults)</h2>
                    </div>

                    {overrideTemplates && (
                        <>
                            <div className="mt-5">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm">E-Mail Template<span className="text-danger">*</span></div>
                                    <SecondaryButton
                                        title="Template Selection"
                                        class_="text-xs! font-normal!"
                                        onClick={() => { setOpenTemplate(true) }}
                                    />
                                </div>
                                <div className="flex justify-between items-center rounded-lg bg-dark p-2 mt-2.5">
                                    <div>
                                        <h2 className="text-sm font-medium">{emailTemplate.name}</h2>
                                        <h3 className="text-text3 text-xs">{emailTemplate.preview}</h3>
                                    </div>
                                    <div className="flex gap-2.5">
                                        <button
                                            onClick={() => setOpenPreview(true)}
                                            className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5" type="button">
                                            <Image unoptimized={true} src="/images/eye1.svg" alt="eye1" width={12} height={12} />
                                            Preview
                                        </button>
                                        <Link href="/create-email-template"
                                            // onClick={() => setOpenEdit(true)}
                                             className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5" type="button">
                                            <Image unoptimized={true} src="/images/edit2.svg" alt="edit2" width={12} height={12} />
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3.5">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm">SMS Template<span className="text-danger">*</span></div>
                                    <SecondaryButton
                                        title="Template Selection"
                                        class_="text-xs! font-normal!"
                                        onClick={() => { setOpenTemplate(true) }}
                                    />
                                </div>
                                <div className="flex justify-between items-center rounded-lg bg-dark p-2 mt-2.5">
                                    <div>
                                        <h2 className="text-sm font-medium">{smsTemplate.name}</h2>
                                        <h3 className="text-text3 text-xs">{smsTemplate.preview}</h3>
                                    </div>
                                    <div className="flex gap-2.5">
                                        <button
                                            onClick={() => setOpenPreview(true)}
                                            className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5" type="button">
                                            <Image unoptimized={true} src="/images/eye1.svg" alt="eye1" width={12} height={12} />
                                            Preview
                                        </button>
                                        <Link href="/create-email-template"
                                            // onClick={() => setOpenEdit(true)} 
                                            className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5" type="button">
                                            <Image unoptimized={true} src="/images/edit2.svg" alt="edit2" width={12} height={12} />
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {!overrideTemplates && (
                        <div className="mt-3.5 flex items-center gap-2.5">
                            <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                            <h2 className="text-sm font-medium">Campaign's default templates will apply.</h2>
                        </div>
                    )}

                    <div className="mt-3.5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Customer Selection Summary</h2>
                            <button
                                type="button"
                                onClick={() => setShowDetails(!showDetails)}
                            >
                                <Image
                                    unoptimized={true}
                                    src="/images/open-eye.svg"
                                    alt="open-eye"
                                    width={17}
                                    height={17}
                                />
                            </button>
                        </div>
                        <div className="mt-3.5">
                            <div className="flex justify-between items-center">
                                <h2 className="text-text3 capitalize text-base">total selected</h2>
                                <h3 className="text-base font-medium">{totalSelected}</h3>
                            </div>
                            <hr className="border-t border-border2 my-3" />
                            <div className="flex justify-between items-center">
                                <h2 className="text-text3 capitalize text-base">Skipped (no email/SMS)</h2>
                                <h3 className="text-base font-medium">{skippedCustomers.length}</h3>
                            </div>
                        </div>

                        {showDetails && (
                            <div className="mt-3.5 p-3.5 bg-dark rounded-[15px]">
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-semibold">View Details</h2>
                                    <button
                                        type="button"
                                        onClick={() => setShowDetails(false)}
                                    >
                                        <Image unoptimized={true} src="/images/arrow-up1.svg" alt="arrow-up1" width={16} height={16} />
                                    </button>
                                </div>
                                <hr className="border-t border-border2 my-2.5" />
                                <div>
                                    <h2 className="capitalize text-base font-semibold">Selected customer</h2>
                                    <div className="mt-3.5">
                                        {formData.name && (
                                            <>
                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-text3 capitalize text-base">{formData.name}</h2>
                                                    <h3 className="text-base font-medium">
                                                        {formData.email && `E-Mail: ${formData.email}`}
                                                        {formData.email && formData.phone && ' | '}
                                                        {formData.phone && `SMS: ${formData.phone}`}
                                                    </h3>
                                                </div>
                                                {selectedCustomers.length > 0 && <hr className="border-t border-border2 my-3" />}
                                            </>
                                        )}

                                        {selectedCustomers.map((customer, index) => (
                                            <div key={index}>
                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-text3 capitalize text-base">{customer.name}</h2>
                                                    <h3 className="text-base font-medium">
                                                        {customer.email && `E-Mail: ${customer.email}`}
                                                        {customer.email && customer.phone && ' | '}
                                                        {customer.phone && `SMS: ${customer.phone}`}
                                                    </h3>
                                                </div>
                                                {index < selectedCustomers.length - 1 && <hr className="border-t border-border2 my-3" />}
                                            </div>
                                        ))}
                                    </div>

                                    {skippedCustomers.length > 0 && (
                                        <>
                                            <hr className="border-t border-border2 my-3.5" />
                                            <div className="">
                                                <h2 className="capitalize text-base font-semibold">skipped customers</h2>
                                                <div className="mt-3.5">
                                                    {skippedCustomers.map((customer, index) => (
                                                        <div key={index} className="flex justify-between items-center">
                                                            <h2 className="text-text3 capitalize text-base">{customer.name}</h2>
                                                            <h3 className="text-base font-medium">
                                                                {(select === 'email' && !customer.email) && 'No Email'}
                                                                {(select === 'sms' && !customer.phone) && 'No SMS'}
                                                                {(select === 'both' && (!customer.email || !customer.phone)) && 'No Email/SMS'}
                                                            </h3>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        <button
                            className="border border-primary bg-primary py-3 mt-[30px] hover:text-primary hover:bg-white w-full rounded-[10px] text-lg font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={sending || !select || validCustomers === 0}
                        >
                            {sending ? 'Sending...' : 'Send Now'}
                        </button>
                    </div>
                </div>
            </form>
        </Model>
    )
}
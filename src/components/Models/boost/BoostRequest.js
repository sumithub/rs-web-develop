"use client"
import { useState, useEffect } from "react";
import SecondaryButton from "../../common/SecondaryButton";
import Checkbox from "../../form/Checkbox";
import Search from "../../form/Search";
import Model from "../Model";
import TemplateList from "./TemplateList";
import SelectedCustomers from "../manage-campaigns/SelectedFromCustomers";
import { toast } from "react-toastify";
import { getError, validEmailRgx } from "../../../../helper";
import { useForm } from "react-hook-form";
import PhoneForm from "../../form/PhoneForm";
import Image from "next/image";
import axios from "axios";
import InputForm from "../../form/InputForm";
import Preview from "../manage-campaigns/Preview"
import SelectForm from "../../form/SelectForm";
import Link from "next/link";
import { customerList } from "../../../constent/constArray";
import CustomSelectBox from "../../form/CustomSelectBox";

export default function BoostRequest({ onClose, onSave, id, customer, isCustomer = false }) {
    const [overrideTemplates, setOverrideTemplates] = useState(false)
    const [selectedCustomers, setSelectedCustomers] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [emailTemplate, setEmailTemplate] = useState(null)
    const [smsTemplate, setSmsTemplate] = useState(null)
    const { register, setValue, watch, clearErrors, handleSubmit, reset, trigger, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)
    const [openTemplate, setOpenTemplate] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [openSelect, setOpenSelect] = useState(false)
    const [showCustomerFields, setShowCustomerFields] = useState(false);
    const [openList, setOpenList] = useState(false)
    const [previewType, setPreviewType] = useState("email"); // "email" or "sms"
    const [templateType, setTemplateType] = useState([])
    const [campaign, setCampaign] = useState("default")

    useEffect(() => {
        if (Array.isArray(customer)) {
            setSelectedCustomers(customer);
        } else if (customer) {
            setSelectedCustomers((prev) => ([...prev, customer]));
        }
    }, [customer, setValue]);

    const onSubmit = async () => {
        try {
            if (selectedCustomers.length === 0) {
                toast.error("Please select the customers")
                return
            }
            if (overrideTemplates) {
                if (!emailTemplate) {
                    toast.error("Please select email template")
                    return
                }
                if (!smsTemplate) {
                    toast.error("Please select sms template")
                    return
                }
            }
            setSending(true)

            const submitData = {
                overrideTemplates,
                selectedCustomers,
                campaign,
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

    console.log(errors)
    const handleCustomerSelection = (customers) => {
        // If multiple customers were passed as initial selection, merge them with new ones
        setSelectedCustomers(prev => {
            // Merge and avoid duplicates by email (or id if available)
            const all = [...prev, ...customers];
            return all;
        });
        setOpenSelect(false);
    }

    const handleSearch = (query) => {
        setOpenList(true)
        setSearchQuery(query)
    }

    let filteredCustomers = Array.isArray(customerList) ? customerList : [];
    if (searchQuery?.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filteredCustomers = filteredCustomers.filter(c => {
            if (!c) return false;
            return (
                (c.name || "").toLowerCase().includes(query) ||
                (c.email || "").toLowerCase().includes(query) ||
                (c.phone || "").toLowerCase().includes(query)
            );
        });
    }
    const handlePreview = (type) => {
        setPreviewType(type);
        setOpenPreview(true);
    };

    const handleTemplateSave = (templateData) => {
        if (templateType === "email") {
            setEmailTemplate(templateData)
        } else if (templateType === "sms") {
            setSmsTemplate(templateData)
        }
        setOpenTemplate(false)
    }
    return (
        <Model onClose={onClose} title="Boost Request" modalClass="w-1/2!" boostIcon={true}>
            {openPreview &&
                <Preview
                    previewType={previewType}
                    onClose={() => {
                        setOpenPreview(false)
                    }}
                />
            }
            {openTemplate &&
                <TemplateList
                    type={templateType}
                    onClose={() => {
                        setOpenTemplate(false)
                    }}
                    onSave={handleTemplateSave}
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

            <div>
                {isCustomer ? selectedCustomers.length > 0 && <div>
                    <div className="text-lg font-semibold mt-2">Selected Customers</div>
                    {selectedCustomers.map((e, i) => {
                        return <div key={i} className={`grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-y-4 py-2 ${i !== selectedCustomers.length - 1 ? 'border-b border-gray-200' : ''}`}
                        >
                            <div>{e.name}</div>
                            <div className="my-2"> {e.email} </div>
                            <div>{e.phone} </div>
                            <button type="button" onClick={() => {
                                setSelectedCustomers((prev) => prev.filter((_, idx) => idx !== i))
                            }}><Image src="/images/close1.svg" alt="close" height={20} width={20} unoptimized={true} />
                            </button>
                        </div>
                    })}
                </div> : ""}
                {!isCustomer && <div className="text-lg font-semibold capitalize">
                    Send review, referral, or feedback requests to one or more customers
                </div>}

                <div className={`flex w-full ${isCustomer ? "flex-col-reverse" : "flex-col"}`}>
                    {((isCustomer && showCustomerFields) || !isCustomer) && <div className="flex justify-between items-center mt-4 w-full">
                        <div className="w-3/5! relative">
                            <Search
                                mainClass="w-full!"
                                placeholder="Search by email, name or phone number"
                                value={searchQuery}
                                onSearch={handleSearch}
                            />
                            {openList && <div
                                className={`absolute w-full bg-white  border border-border-color z-10 max-h-60 overflow-y-auto top-full  rounded-b-lg rounded-t-none`}>
                                <div className="flex items-center justify-between px-4 py-2">
                                    <div className="text-base font-semibold">Customers</div>
                                    <button className="" type="button"
                                        onClick={() => { setOpenList(false) }}><Image src="/images/close1.svg" alt="close" height={20} width={20} unoptimized={true} /></button>
                                </div>
                                {filteredCustomers.map((e, i) => {
                                    const selected = selectedCustomers.find(s => s.name === e.name)

                                    return <div key={i}
                                        onClick={() => {
                                            if (selected) {
                                                setSelectedCustomers((prev) => prev.filter(p => p.name !== e.name))
                                            } else {
                                                setSelectedCustomers(prev => ([...prev, e]))
                                            }
                                        }}
                                        className={'px-4 py-2 text-sm cursor-pointer capitalize flex items-center hover:bg-dark '}>
                                        <div className="flex items-start gap-2">
                                            <Checkbox checked={selected} />
                                            <div>{e.customerName}</div>
                                        </div>
                                        {e.email} | {e.phone}
                                    </div>
                                })}
                            </div>}
                        </div>
                    </div>}
                    <div className="flex justify-between items-center mt-5">
                        <div className="text-lg font-semibold capitalize mt-1">
                            {((!isCustomer && showCustomerFields) || isCustomer) ? "Add New Customer" : ""}
                        </div>
                        <SecondaryButton
                            type="button"
                            title={`Add ${isCustomer ? "Another" : "New"} Customer`}
                            class_="text-sm!"
                            onClick={() => { setShowCustomerFields(!showCustomerFields) }}
                        />
                    </div>
                </div>
                {showCustomerFields && (<>
                    <form onSubmit={handleSubmit(onSubmit)}>

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
                            <PhoneForm
                                class_="col-span-2"
                                label="Phone Number"
                                isRequired={true}
                                placeholder="Enter phone number"
                                formProps={{ ...register("phone", { required: true, minLength: { value: 10, message: "This field is required" } }) }}
                                errors={errors}
                                setValue={setValue}
                                watch={watch}
                                clearErrors={clearErrors}
                            />
                        </div>
                        <div className="text-end mt-3">
                            <SecondaryButton
                                title="Add"
                                class_="text-sm! w-auto!"
                                type="button"
                                onClick={async () => {
                                    const isValid = await trigger();
                                    if (isValid) {
                                        const newCustomer = {
                                            name: watch("name"),
                                            email: watch("email"),
                                            phone: watch("phone")
                                        };
                                        reset();
                                        setShowCustomerFields(false)
                                        setSelectedCustomers(prev => [...prev, newCustomer]);
                                    }
                                }}
                            />
                        </div>
                    </form>
                </>)}

                {!isCustomer ? selectedCustomers.length > 0 && <div>
                    <div className="text-lg font-semibold mt-2">Selected Customers</div>
                    {selectedCustomers.map((e, i) => {
                        return <div key={i} className={`grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-y-4 py-2 ${i !== selectedCustomers.length - 1 ? 'border-b border-gray-200' : ''}`}
                        >
                            <div>{e.name}</div>
                            <div className="my-2"> {e.email} </div>
                            <div>{e.phone} </div>
                            <button type="button" onClick={() => {
                                setSelectedCustomers((prev) => prev.filter((_, idx) => idx !== i))
                            }}><Image src="/images/close1.svg" alt="close" height={20} width={20} unoptimized={true} />
                            </button>
                        </div>
                    })}
                </div> : ""}

                <div>
                    <div className="text-secondary font-medium flex items-center mt-5">Choose Campaign <span className="text-neutral-400 font-normal mx-1">(Optional)</span> (<span> <Image src="/images/info-blue.svg" alt="info" height={20} width={20} unoptimized={true} className="ml-1" /> </span> <span className="capitalize text-[13px] ml-2 mr-1">customer will be added to this Campaign for automated follow-ups </span> )</div>
                    <SelectForm
                        class_="mt-2!"
                        selectClass_="py-2.5! px-2.5!"
                        onChange={(e) => {
                            setCampaign(e.target.value)
                        }}
                        watch={() => { return campaign }}
                    >
                        <option value="default">Default Campaign</option>
                        <option value="campaign1">Campaign 1</option>
                        <option value="campaign2">Campaign 2</option>
                    </SelectForm>
                </div>

                <div className="mt-5">
                    <div className="flex gap-2.5 items-center">
                        <Checkbox
                            checked={overrideTemplates}
                            onChange={() => setOverrideTemplates(!overrideTemplates)}
                        />
                        <div className="text-sm flex items-center">Override Default Templates? (<span> <Image src="/images/info-blue.svg" alt="info" height={20} width={20} unoptimized={true} className="ml-1" /> </span> <span className="capitalize text-[13px] ml-2 mr-1 font-medium"> unlock to use the Campaign's default templates </span> )</div>
                    </div>
                </div>

                {overrideTemplates && (
                    <>
                        <div className="mt-5">
                            <div className="flex justify-between items-center">
                                <div className="text-sm">E-Mail Template<span className="text-danger">*</span></div>
                                <SecondaryButton
                                    type="button"
                                    title="Template Selection"
                                    class_="text-xs! font-normal!"
                                    onClick={() => {
                                        setOpenTemplate(true);
                                        setTemplateType("email")
                                    }}
                                />
                            </div>
                            {emailTemplate && <div className="flex justify-between items-center rounded-lg bg-dark p-2 mt-2.5">
                                <div>
                                    <h2 className="text-sm font-medium">{emailTemplate?.name}</h2>
                                    <h3 className="text-text3 text-xs">{emailTemplate?.description}</h3>
                                </div>
                                <div className="flex gap-2.5">
                                    <button
                                        onClick={() => handlePreview("email")}
                                        className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5" type="button">
                                        <Image unoptimized={true} src="/images/eye1.svg" alt="eye1" width={12} height={12} />
                                        Preview
                                    </button>
                                    <Link href={`/create-email-template`} target="_blank"
                                        className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5" type="button">
                                        <Image unoptimized={true} src="/images/edit2.svg" alt="edit2" width={12} height={12} />
                                        Edit
                                    </Link>
                                </div>
                            </div>}
                        </div>

                        <div className="mt-5">
                            <div className="flex justify-between items-center">
                                <div className="text-sm">SMS Template<span className="text-danger">*</span></div>
                                <SecondaryButton
                                    title="Template Selection"
                                    class_="text-xs! font-normal!"
                                    onClick={() => {
                                        setOpenTemplate(true);
                                        setTemplateType("sms")
                                    }}
                                />
                            </div>
                            {smsTemplate && <div className="flex justify-between items-center rounded-lg bg-dark p-2 mt-2.5">
                                <div>
                                    <h2 className="text-sm font-medium">{smsTemplate?.name}</h2>
                                    <h3 className="text-text3 text-xs">{smsTemplate?.description}</h3>
                                </div>
                                <div className="flex gap-2.5">
                                    <button
                                        onClick={() => handlePreview("sms")}
                                        className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5" type="button">
                                        <Image unoptimized={true} src="/images/eye1.svg" alt="eye1" width={12} height={12} />
                                        Preview
                                    </button>
                                    <Link href={`/create-sms-template`} target="_blank"
                                        className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5" type="button">
                                        <Image unoptimized={true} src="/images/edit2.svg" alt="edit2" width={12} height={12} />
                                        Edit
                                    </Link>
                                </div>
                            </div>}
                        </div>
                    </>
                )}

                <div className="mt-3.5">
                    <button
                        className="border border-primary bg-primary mt-[30px] hover:text-primary hover:bg-white w-full rounded-[10px] text-lg! py-2 font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={onSubmit}
                        disabled={sending}>
                        {sending ? 'Boosting...' : 'Boost Now'}
                    </button>
                </div>
            </div>
        </Model >
    )
}
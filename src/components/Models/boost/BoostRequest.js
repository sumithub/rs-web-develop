"use client"
import { useState } from "react";
import SecondaryButton from "../../common/SecondaryButton";
import Checkbox from "../../form/Checkbox";
import Input from "../../form/Input";
import Radio from "../../form/Radio";
import Search from "../../form/Search";
import Select from "../../form/Select";
import Model from "../Model";
import TemplateList from "./TemplateList";
import SelectedCustomers from "../manage-campaigns/SelectedFromCustomers";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import { useForm } from "react-hook-form";
import PhoneForm from "../../form/PhoneForm";
import AddCustomer from "../customers/AddCustomer";
import Image from "next/image";

export default function BoostRequest({ onClose, onSave }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false)
    const [openTemplate, setOpenTemplate] = useState(false)
    const [openSelect, setOpenSelect] = useState(false)
    const [open, setOpen] = useState(false)

    const onSubmit = async () => {
        try {
            toast.success("Request Send Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Boost Request" modalClass="w-1/2!" boostIcon={true}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {openTemplate &&
                    <TemplateList
                        onClose={() => {
                            setOpenTemplate(false)
                        }}

                        onSave={() => {
                            setOpenTemplate(true)
                        }}
                    />
                }

                {openSelect &&
                    <SelectedCustomers
                        onClose={() => {
                            setOpenSelect(false)
                        }}

                        onSave={() => {
                            setOpenSelect(true)
                        }} />
                }

                {open &&
                    <AddCustomer
                        onClose={() => {
                            setOpen(false)
                        }}

                        onSave={() => {
                            setOpen(true)
                        }} />
                }
                <div>
                    <div className="text-lg font-semibold">
                        Send review, referral, or feedback requests to one or more customers
                    </div>

                    <div className="flex justify-between mt-4">
                        <Search placeholder="Search by email, name or phone number" mainClass="w-3/5!" />
                        <SecondaryButton title="Add New Customer"
                            class_="text-sm!"
                            onClick={() => { setOpenSelect(true) }} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Name" isRequired={true} />
                        <Input label="Email" isRequired={true} />
                    </div>

                    <div>
                        <PhoneForm label="Phone Number"
                            placeholder="Enter phone number"
                            isRequired={true}
                            formProps={{ ...register("primaryPhone", { required: true }) }}
                            errors={errors}
                            clearErrors={clearErrors}
                            setValue={setValue}
                            watch={watch} />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="">
                            Choose From Existing Customer<span className="text-text3 text-lg"> (Optional)</span>
                        </div>
                        <div className="">
                            <SecondaryButton title="select from customer List"
                                class_="text-sm!"
                                onClick={() => { setOpenSelect(true) }} />
                        </div>
                    </div>

                    <div>
                        <Select defaultOption="Default Campaign" label="Choose Campaign"
                            labelClass="mb-2.5!"
                            selectClass_="py-2.5! px-2.5!"
                        >
                            <option>1</option>
                        </Select>
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
                                mainClass="text-sm! font-mediun!"
                            />
                            <Radio
                                label="SMS"
                                class_="mt-0!"
                                mainClass="text-sm! font-mediun!"
                            />
                            <Radio
                                label="Both"
                                class_="mt-0!"
                                mainClass="text-sm! font-mediun!"
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="flex gap-2.5 items-center">
                            <Checkbox />
                            <h2 className="text-sm">Override Default Templates?</h2>
                        </div>
                    </div>

                    <div className="mt-2.5 flex items-center gap-2.5">
                        <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                        <h2 className="text-sm font-medium">Check To Use Custom Templates For This Request. (Uncheck To Apply The Campaign's Defaults)</h2>
                    </div>

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
                                <h2 className="text-sm font-medium">Nature Template</h2>
                                <h3 className="text-text3 text-xs">Lorem Ipsum..</h3>
                            </div>
                            <div className="flex gap-2.5">
                                <button className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5">
                                    <Image unoptimized={true} src="/images/eye1.svg" alt="eye1" width={12} height={12} />
                                    Preview</button>
                                <button className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5">
                                    <Image unoptimized={true} src="/images/edit2.svg" alt="edit2" width={12} height={12} />
                                    Edit</button>
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
                                <h2 className="text-sm font-medium">Nature Template</h2>
                                <h3 className="text-text3 text-xs">Lorem Ipsum..</h3>
                            </div>
                            <div className="flex gap-2.5">
                                <button className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5">
                                    <Image unoptimized={true} src="/images/eye1.svg" alt="eye1" width={12} height={12} />
                                    Preview</button>
                                <button className="bg-primary/10 rounded-lg text-primary flex gap-1 items-center py-2 px-2.5">
                                    <Image unoptimized={true} src="/images/edit2.svg" alt="edit2" width={12} height={12} />
                                    Edit</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3.5 flex items-center gap-2.5">
                        <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                        <h2 className="text-sm font-medium">Campaign's default templates will apply.</h2>
                    </div>

                    <div className="mt-3.5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Customer Selection Summary</h2>
                            <Image unoptimized={true} src="/images/open-eye.svg" alt="open-eye" width={17} height={17} />
                        </div>
                        <div className="mt-3.5">
                            <div className="flex justify-between items-center">
                                <h2 className="text-text3 capitalize text-base">total selected</h2>
                                <h3 className="text-base font-medium">15</h3>
                            </div>
                            <hr className="border-t border-border2 my-3" />
                            <div className="flex justify-between items-center">
                                <h2 className="text-text3 capitalize text-base">Skipped (no email/SMS)</h2>
                                <h3 className="text-base font-medium">03</h3>
                            </div>
                        </div>
                        <div className="mt-3.5 p-3.5 bg-dark rounded-[15px]">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold">View Details</h2>
                                <Image unoptimized={true} src="/images/arrow-up1.svg" alt="arrow-up1" width={16} height={16} />
                            </div>
                            <hr className="border-t border-border2 my-2.5" />
                            <div>
                                <h2 className="capitalize text-base font-semibold">Selected customer</h2>
                                <div className="mt-3.5">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-text3 capitalize text-base">john deo</h2>
                                        <h3 className="text-base font-medium">E-Mail : johndeo@gamil.com</h3>
                                    </div>
                                    <hr className="border-t border-border2 my-3" />
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-text3 capitalize text-base">E-Mail : janesmith@gamil.com <span>|</span>SMS : (123)456-7890</h2>
                                        <h3 className="text-base font-medium">03</h3>
                                    </div>
                                </div>
                                <hr className="border-t border-border2 my-3.5" />
                                <div className="">
                                    <h2 className="capitalize text-base font-semibold">skipped customers</h2>
                                    <div className="mt-3.5">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-text3 capitalize text-base">mark johnson</h2>
                                            <h3 className="text-base font-medium">No Email/SMS</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="border border-primary bg-primary py-3 mt-[30px] hover:text-primary hover:bg-white w-full rounded-[10px] text-lg font-medium text-white">Send Now</button>
                    </div>
                </div>
            </form>
        </Model>
    )
}
"use client"
import SelectForm from '../../components/form/SelectForm'
import AdminLayout from '../../components/AdminLayout'
import InputForm from '../../components/form/InputForm'
import SecondaryButton from '../../components/common/SecondaryButton'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import RadioForm from '../../components/form/RadioForm'
import { toast } from 'react-toastify'
import axios from 'axios'
import { getError } from '../../../helper'
import SendTestEmail from '../../components/Models/reports/SendTestEmail'

export default function ScheduleDelivery() {
    const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false)
    const [open, setOpen] = useState(false)

    const SHAREEMAIL = [
        { img: "/images/request.png", name: "Amelie Laurent", email: "amili@gmail.com", role: "manager" },
        { img: "/images/request.png", name: "Amelie Laurent", email: "amili@gmail.com", role: "owner" },
    ]

    const onSubmit = async (data) => {
        try {
            setSending(true);
            await axios.post("/api", data);
            toast.success("Saved Successfully");
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    return <AdminLayout noCard={true}>

        {open && <SendTestEmail
            onClose={() => {
                setOpen(false)
            }}

            onSave={() => {
                setOpen(true)
            }}
        />}
        <div className="grid grid-cols-2 gap-5">
            <div className='shadow-[0px_0px_22px_0px_#0000000F] p-5 rounded-[10px] bg-white'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <h2 className='text-lg font-semibold capitalize'>Email & Scheduling options</h2>
                    <div className="flex gap-5 my-4">
                        <div className="text-secondary text-sm">Report Frequency<span className="text-danger">*</span></div>
                        <RadioForm
                            label="Daily"
                            inputClass="mb-0!"
                            labelClass="font-normal!"
                            class_="mt-0!"
                            name="reportFrequency"
                            formProps={{ ...register("reportFrequency", { required: true }) }}
                            errors={errors}
                        />

                        <RadioForm
                            label="Weekly"
                            inputClass="mb-0!" labelClass="font-normal!"
                            class_="mt-0!"
                            name="reportFrequency"
                            formProps={{ ...register("reportFrequency", { required: true }) }}
                            errors={errors}
                        />

                        <RadioForm
                            label="Monthly"
                            inputClass="mb-0!"
                            labelClass="font-normal!"
                            class_="mt-0!"
                            name="reportFrequency"
                            formProps={{ ...register("reportFrequency", { required: true }) }}
                            errors={errors}
                        />
                    </div>

                    <div>
                        <SelectForm
                            defaultOption="Select option"
                            label="send on"
                            labelClass="inline-block mb-0!"
                            isRequired={true}
                            formProps={{ ...register("select", { required: true }) }}
                            errors={errors}
                            class_="mt-0!"
                            selectClass_="border border-primary3/10 py-3.5! px-2.5! bg-white! text-sm!"
                            clearErrors={clearErrors}
                        >
                            <option value="monday">Monday</option>
                        </SelectForm>

                        <SelectForm
                            defaultOption="Select option"
                            label="time of day"
                            labelClass="inline-block mb-0!"
                            isRequired={true}
                            formProps={{ ...register("select Time", { required: true }) }}
                            errors={errors}
                            class_="mt-0!"
                            selectClass_="border border-primary3/10 py-3.5! px-2.5! bg-white! text-sm!"
                            clearErrors={clearErrors}
                        >
                            <option value="10:00">10:00 Am</option>
                        </SelectForm>
                    </div>
                    <h2 className='text-sm font-medium capitalize py-[15px]'>enter e-mail<span className='text-danger'>*</span></h2>
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
                            <SecondaryButton
                                title="Search Users"
                                type='button'
                                class_="py-[15px]! px-5! text-sm! font-normal!"
                                onClick={() => { }}
                            />
                        </div>
                    </div>

                    {SHAREEMAIL.map((e, i) => <div key={i} className={i === 0 ? "mt-6" : ""}>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-[15px]">
                                <Image src={e.img} alt="request" width={44} height={44} />
                                <div>
                                    <div className="text-base font-medium">{e.name}</div>
                                    <div className="text-sm text-text3 pt-1">{e.email}</div>
                                </div>
                            </div>
                            <div className="text-lg capitalize">{e.role}</div>
                        </div>

                        {i !== SHAREEMAIL.length - 1 && (
                            <hr className='border-t border-border2 my-3.5' />
                        )}
                    </div>)}

                    <InputForm
                        label="Email Subject"
                        placeholder="Enter Email Subject"
                        inputClass='border-primary/10! py-3.5!'
                        isRequired={true}
                        formProps={{ ...register("emailSubject", { required: true }) }}
                        errors={errors}
                        setValue={setValue}
                    />

                    <InputForm
                        label="Custom Intro Message"
                        isRequired={true}
                        isTextArea={true}
                        inputClass='border-primary/10! py-3.5!'
                        formProps={{ ...register("message", { required: true }) }}
                        errors={errors}
                        setValue={setValue}
                        rows={1}

                    />
                    <div className='grid grid-cols-2 gap-5 mt-[30px]'>
                        <SecondaryButton onClick={() => { setOpen(true) }} title="send test email" type='button' class_='bg-white! text-primary!' />
                        <SecondaryButton title="Save Settings" disabled={sending} type='submit' />
                    </div>
                </form>
            </div>

            <div className='shadow-[0px_0px_22px_0px_#0000000F] rounded-[10px] p-5'>
                <div className='shadow-[0px_0px_22px_0px_#0000000F] rounded-[10px]'>
                    <div className='bg-primary/10 px-5 py-[18px] flex gap-2.5 rounded-t-[10px]'>
                        <Image unoptimized={true} src="/images/eye1.svg" alt='eye1' width={22} height={22} />
                        <h2 className='text-lg font-semibold'>Email Preview</h2>
                    </div>
                    <div className='p-5'>
                        <div className='text-sm mb-3'>
                            <div className='capitalize text-xs'>Subject: <span className='font-medium'>Your weekly review report - the coffee spot</span></div>
                            <div className='py-4 text-xs'>Hi (John Deo)</div>
                            <div className='capitalize text-xs'>Here&#39;s your weekly performance update:</div>
                        </div>

                        <div className='text-base'>
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

                        <SecondaryButton title="View Full Report" type='button' class_='text-sm! w-auto! px-2.5! py-2.5! font-normal! my-5!' />
                        <div className='text-sm capitalize'>
                            <div className='text-xs'><span className="font-black text-2xl leading-0">.</span> The coffee Spot Team</div>
                            <div className='text-xs'>[Unsubscribe]</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AdminLayout>
}
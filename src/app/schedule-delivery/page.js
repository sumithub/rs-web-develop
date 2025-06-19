"use client"
import SelectForm from '../../components/form/SelectForm'
import AdminLayout from '../../components/AdminLayout'
import InputForm from '../../components/form/InputForm'
import SecondaryButton from '../../components/common/SecondaryButton'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import RadioForm from '../../components/form/RadioForm'
import { toast } from 'react-toastify'
import axios from 'axios'
import { getError } from '../../../helper'
import SendTestEmail from '../../components/Models/reports/SendTestEmail'
import Loading from '../../components/Loading'

export default function ScheduleDelivery() {
    const { register, handleSubmit, setValue, clearErrors, watch, formState: { errors } } = useForm({
        defaultValues: {
            reportFrequency: 'Weekly',
            sendOn: '',
            time: '09:00',
            emailSubject: 'Your weekly review report - the coffee spot',
            message: "Here's your weekly performance update:"
        }
    });

    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)

    // Watch form values for dynamic updates
    const watchedValues = watch()
    const reportFrequency = watch("reportFrequency")
    const emailSubject = watch("emailSubject")
    const customMessage = watch("message")

    const AVAILABLE_USERS = [
        { id: 3, img: "/images/request.png", name: "John Doe", email: "john@gmail.com", role: "manager" },
        { id: 4, img: "/images/request.png", name: "Jane Smith", email: "jane@gmail.com", role: "owner" },
        { id: 5, img: "/images/request.png", name: "Mike Wilson", email: "mike@gmail.com", role: "employee" },
        { id: 6, img: "/images/request.png", name: "Sarah Johnson", email: "sarah@gmail.com", role: "manager" },
    ]

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);

    const onSubmit = async (data) => {
        try {
            setSending(true);

            const submitData = {
                ...data,
                selectedUsers: selectedUsers,
                recipients: selectedUsers.map(user => user.email || `${user.name.toLowerCase()}@company.com`)
            };

            await axios.post("/api", submitData);
            toast.success("Saved Successfully");
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    const handleSearchUsers = async () => {
        setIsSearching(true);
        try {
            // Simulate API call - replace with actual search endpoint
            await new Promise(resolve => setTimeout(resolve, 500));
            setSearchResults(AVAILABLE_USERS.filter(user =>
                !selectedUsers.some(selected => selected.id === user.id)
            ));
        } catch (error) {
            toast.error("Error searching users");
        } finally {
            setIsSearching(false);
        }
    };

    const addUserToSelected = (user) => {
        if (!selectedUsers.some(selected => selected.id === user.id)) {
            setSelectedUsers(prev => [...prev, user]);
            setSearchResults(prev => prev.filter(u => u.id !== user.id));
        }
    };

    const removeUserFromSelected = (userId) => {
        setSelectedUsers(prev => prev.filter(user => user.id !== userId));
    };

    const getSendOnOptions = () => {
        switch (reportFrequency) {
            case 'Daily':
                return [
                    { value: 'weekdays', label: 'Weekdays Only' },
                    { value: 'everyday', label: 'Every Day' }
                ];
            case 'Weekly':
                return [
                    { value: 'monday', label: 'Monday' },
                    { value: 'tuesday', label: 'Tuesday' },
                    { value: 'wednesday', label: 'Wednesday' },
                    { value: 'thursday', label: 'Thursday' },
                    { value: 'friday', label: 'Friday' },
                    { value: 'saturday', label: 'Saturday' },
                    { value: 'sunday', label: 'Sunday' }
                ];
            case 'Monthly':
                return [
                    { value: '1st', label: '1st of the month' },
                    { value: '15th', label: '15th of the month' },
                    { value: 'last', label: 'Last day of the month' }
                ];
            default:
                return [];
        }
    };

    const getTimeOptions = () => [
        { value: '08:00', label: '8:00 AM' },
        { value: '09:00', label: '9:00 AM' },
        { value: '10:00', label: '10:00 AM' },
        { value: '11:00', label: '11:00 AM' },
        { value: '12:00', label: '12:00 PM' },
        { value: '13:00', label: '1:00 PM' },
        { value: '14:00', label: '2:00 PM' },
        { value: '15:00', label: '3:00 PM' },
        { value: '16:00', label: '4:00 PM' },
        { value: '17:00', label: '5:00 PM' }
    ];

    const getFrequencyText = () => {
        return reportFrequency?.toLowerCase() || 'weekly';
    };

    const getPreviewStats = () => {
        const baseStats = {
            Daily: { reviews: 6, rating: 4.3, source: 'Google (4 reviews)' },
            Weekly: { reviews: 42, rating: 4.5, source: 'Google (28 reviews)' },
            Monthly: { reviews: 180, rating: 4.4, source: 'Google (120 reviews)' }
        };

        return baseStats[reportFrequency] || baseStats.Weekly;
    };

    const handleSendTestEmail = async (testEmailData) => {
        try {
            const emailData = {
                ...watchedValues,
                recipients: [testEmailData.email],
                isTest: true,
                previewStats: getPreviewStats()
            };

            await axios.post("/api", emailData);
            toast.success("Test email sent successfully!");
            setOpen(false);
        } catch (error) {
            toast.error(getError(error));
        }
    };

    return <AdminLayout noCard={true}>
        {open && <SendTestEmail
            onClose={() => setOpen(false)}
            onSave={handleSendTestEmail}
            currentData={watchedValues}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
        />}

        {loading ? (
            <Loading />
        ) : (
            <div className="grid grid-cols-2 gap-5">
                <div className='shadow-[0px_0px_22px_0px_#0000000F] p-5 rounded-[10px] bg-white'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className='text-lg font-semibold capitalize'>Email & Scheduling options</h2>
                        <div className="flex gap-5 my-4">
                            <div className="text-secondary text-sm">Report Frequency<span className="text-danger">*</span></div>
                            <RadioForm
                                label="Daily"
                                value="Daily"
                                inputClass="mb-0!"
                                labelClass="font-normal!"
                                class_="mt-0!"
                                name="reportFrequency"
                                formProps={{ ...register("reportFrequency", { required: true }) }}
                                errors={errors}
                            />
                            <RadioForm
                                label="Weekly"
                                value="Weekly"
                                inputClass="mb-0!"
                                labelClass="font-normal!"
                                class_="mt-0!"
                                name="reportFrequency"
                                formProps={{ ...register("reportFrequency", { required: true }) }}
                                errors={errors}
                            />
                            <RadioForm
                                label="Monthly"
                                value="Monthly"
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
                                infoIcon="/images/url.svg"
                                labelClass="inline-block mb-0!"
                                isRequired={true}
                                formProps={{ ...register("sendOn", { required: true }) }}
                                errors={errors}
                                class_="mt-0!"
                                selectClass_="border border-primary3/10 py-3.5! px-2.5! bg-white! text-sm!"
                                clearErrors={clearErrors}
                                setValue={setValue}
                                watch={watch}
                            >
                                {getSendOnOptions().map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </SelectForm>

                            <SelectForm
                                defaultOption="Select option"
                                label="time of day"
                                labelClass="inline-block mb-0!"
                                isRequired={true}
                                formProps={{ ...register("time", { required: true }) }}
                                errors={errors}
                                class_="mt-0!"
                                selectClass_="border border-primary3/10 py-3.5! px-2.5! bg-white! text-sm!"
                                clearErrors={clearErrors}
                                setValue={setValue}
                                watch={watch}
                            >
                                {getTimeOptions().map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </SelectForm>
                        </div>

                        <h2 className='text-sm font-medium capitalize py-[15px]'>enter e-mail<span className='text-danger'>*</span></h2>
                        <div className="flex gap-[15px]">
                            <div className="w-full border border-primary/10 rounded-lg p-2.5 flex justify-between items-center">
                                <div className="flex gap-[15px] flex-wrap">
                                    {selectedUsers.map(user => (
                                        <div key={user.id} className="flex gap-[7px] border border-primary/10 rounded-lg p-[5px] items-center">
                                            <Image src={user.img} alt="user" width={17} height={17} />
                                            <h2 className="text-sm">{user.name}</h2>
                                            <Image
                                                unoptimized={true}
                                                src="/images/close-square.svg"
                                                alt="close-square"
                                                width={14}
                                                height={14}
                                                className="cursor-pointer"
                                                onClick={() => removeUserFromSelected(user.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <Image unoptimized={true} src="/images/copy2.svg" alt="copy2" width={20} height={20} />
                                </div>
                            </div>
                            <div className="w-[30%] shrink-0">
                                <SecondaryButton
                                    title={isSearching ? "Searching..." : "Search Users"}
                                    type='button'
                                    class_="py-3.5! px-5! font-normal!"
                                    onClick={handleSearchUsers}
                                    disabled={isSearching}
                                />
                            </div>
                        </div>
                        {searchResults.map((user, i) => <div key={i} className={i === 0 ? "mt-6" : ""}>
                            <div key={user.id} className="w-full flex items-center justify-between"
                                onClick={() => addUserToSelected(user)}>
                                <div className="flex gap-[15px]">
                                    <Image src={user.img} alt="user" width={44} height={44} className='shrink-0' />
                                    <div>
                                        <div className="text-base font-medium">{user.name}</div>
                                        <div className="text-sm text-text3 pt-1">{user.email}</div>
                                    </div>
                                </div>
                                <div className="text-lg capitalize">{user.role}</div>
                            </div>
                            {i !== searchResults.length - 1 && (
                                <hr className='border-t border-border2 my-3.5' />
                            )}
                        </div>
                        )}

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
                            <SecondaryButton
                                onClick={() => setOpen(true)}
                                title="send test email"
                                type='button'
                                class_='bg-white! text-primary! text-lg!'
                            />
                            <SecondaryButton
                                title={sending ? "Saving..." : "Save Settings"}
                                disabled={sending}
                                type='submit'
                                class_='text-lg!'
                            />
                        </div>
                    </form>
                </div>

                <div className='shadow-[0px_0px_22px_0px_#0000000F] rounded-[10px] p-5'>
                    <div className='shadow-[0px_0px_22px_0px_#0000000F] rounded-[10px] min-h-[100vh]'>
                        <div className='bg-primary/10 px-5 py-[18px] flex gap-2.5 rounded-t-[10px]'>
                            <Image unoptimized={true} src="/images/eye1.svg" alt='eye1' width={22} height={22} />
                            <h2 className='text-lg font-semibold'>Email Preview</h2>
                        </div>
                        <div className='p-5'>
                            <div className='text-sm mb-3'>
                                <div className='capitalize text-xs'>
                                    Subject: <span className='font-medium'>
                                        {emailSubject || `Your ${getFrequencyText()} review report - the coffee spot`}
                                    </span>
                                </div>
                                <div className='py-4 text-xs'>Hi (John Deo)</div>
                                <div className='capitalize text-xs'>
                                    {customMessage || `Here's your ${getFrequencyText()} performance update:`}
                                </div>
                            </div>

                            <div className='text-base'>
                                <div className='flex items-center gap-2'>
                                    <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                    <div className='text-sm'>Review Over Time: {getPreviewStats().reviews} New Reviews</div>
                                </div>

                                <div className='flex items-center gap-2 py-3.5'>
                                    <Image unoptimized={true} src="/images/star.svg" alt='review-time' width={20} height={20} />
                                    <div className='text-sm'>Avg Rating: {getPreviewStats().rating}</div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                    <div className='text-sm'>Top Source: {getPreviewStats().source}</div>
                                </div>
                            </div>

                            <SecondaryButton title="View Full Report" type='button' class_='text-xs! w-auto! font-normal! my-5!' />
                            <div className='text-sm capitalize'>
                                <div className='text-xs'><span className="font-black text-2xl leading-0">.</span> The coffee Spot Team</div>
                                <div className='text-xs'>[Unsubscribe]</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </AdminLayout>
}
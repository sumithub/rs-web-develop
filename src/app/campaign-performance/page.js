"use client"
import AdminLayout from '../../components/AdminLayout'
import React, { useEffect, useState } from 'react'
import Status from '../../components/Status'
import Search from '../../components/form/Search'
import PaginationDemo from '../../components/Pagination'
import CustomSelectBox from '../../components/form/CustomSelectBox';
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatDate, getError } from '../../../helper'
import Loading from '../../components/Loading'
import DateRange from '../../components/form/DateRangePicker'
import SelectForm from '../../components/form/SelectForm'
import SecondaryButton from '../../components/common/SecondaryButton'
import Switch from '../../components/form/Switch'
import DashboardBarChart from '../../components/charts/DashboardBarChart'
import DashboardChart from '../../components/DashboardChart'
import DashboardPieChart from '../../components/charts/DashboardPieChart'
import StackedReviewChart from '../../components/charts/StackedReviewChart'
import DashboardLineChart from '../../components/charts/DashboardLineChart'
import ResendReportEmail from '../../components/Models/reports/ResendReportEmail'
import Download from '../../components/Models/customers/Download'
import DatePickerForm from "../../components/form/DatePickerForm";
import InputForm from '../../components/form/InputForm'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import CheckboxForm from '../../components/form/CheckboxForm'

function ReviewAnalytics() {
    const { register, handleSubmit, setValue, clearErrors, formState: { errors }, watch } = useForm();
    const [sending, setSending] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [search, setSearch] = useState("")
    const [searchBy, setSearchBy] = useState("")
    const [date, setDate] = useState("")
    const [data, setData] = useState("")
    const [view, setView] = useState("report")
    const [loading, setLoading] = useState(true)
    const [openEmail, setOpenEmail] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)
    const [clickSwitch, setClickSwitch] = useState(false)

    useEffect(() => {
        getReportHistory()
    }, [search, filterBy, date, searchBy, clickSwitch])

    const onSubmit = async (data) => {
        try {
            setSending(true);
            await axios.post("/api", data);
            toast.success("Report Generated Successfully");
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    const getReportHistory = async () => {
        try {
            setLoading(true)
            setData()
            const res = await axios.get("/api")
            setData(res.data)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    const ReportHistory = [
        { date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Sent" },
        { date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Failed" },
        { date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Processing" },
        { date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Failed" },
        { date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Sent" },
        { date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Processing" },
        { date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Sent" },
        { date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Processing" },
        { date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Failed" },
    ]

    const SHAREEMAIL=[
    {img:"/images/request.png",name:"Amelie Laurent",email:"amili@gmail.com",role:"manager"},
    {img:"/images/request.png",name:"Amelie Laurent",email:"amili@gmail.com",role:"owner"},
]

    return (
        <AdminLayout
            headerSearch={
                <Search placeholder="search"
                    onSearch={(s) => {
                        setSearchBy(s)
                    }}
                />
            }
        >
            {openEmail &&
                <ResendReportEmail
                    onClose={() => {
                        setOpenEmail(false)
                    }}

                    onSave={() => {
                        setOpenEmail(true)
                    }} />
            }

            {openDownload &&
                <Download
                    onClose={() => {
                        setOpenDownload(false)
                    }}

                    onSave={() => {
                        setOpenDownload(true)
                    }}
                />
            }

            <div>
                <div className="flex justify-between w-full items-center mb-[15px]">
                    <div className='flex items-center gap-10 bg-white shadow-sm rounded-[10px] py-[15px] px-[25px]'>
                        <div onClick={() => {
                            setView("report")
                        }} className={`${view === "report" ? "text-primary font-semibold underline underline-offset-4" : "text-text3 font-normal"} cursor-pointer shrink-0`}>Reports</div>

                        <div onClick={() => {
                            setView("history")
                        }} className={`${view === "history" ? "text-primary font-semibold underline underline-offset-4" : "text-text3 font-normal"} cursor-pointer shrink-0`}>Reports History</div>
                    </div>
                    {view === "history" && <div className='grid grid-cols-[2.4fr_1.4fr_0.5fr_0.7fr_0.5fr] gap-3 items-center'>
                        <Search
                            mainClass='w-full!'
                            placeholder="Search by List Name Or Date"
                            onSearch={(s) => {
                                setSearch(s)
                            }}
                        />
                        <DateRange
                            onChange={(e) => { setDate(e) }}
                        />
                        <CustomSelectBox
                            defaultOption="Status"
                            class_='mt-0! w-24!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}
                        >
                            <option value="sent">Sent</option>
                            <option value="failed">Failed</option>
                            <option value="processing">Processing</option>
                        </CustomSelectBox>

                        <CustomSelectBox
                            defaultOption="Report Type"
                            class_='mt-0! w-32!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}
                        >
                            <option value="monthly-review">Monthly Review</option>
                            <option value="campaign-performance">Campaign Performance</option>
                        </CustomSelectBox>

                        <CustomSelectBox
                            defaultOption="Client"
                            class_='mt-0! w-28!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}
                        >
                            <option value="client 1">Client 1</option>
                            <option value="client 2">Client 2</option>
                        </CustomSelectBox>
                    </div>}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {view === "report" && <div className="grid grid-cols-2 gap-5">
                    <div className='shadow-[0px_0px_22px_0px_#0000000F] p-5 rounded-[10px]'>
                        <h2 className='text-lg font-semibold'>Date Range</h2>
                        <div className='grid grid-cols-2 gap-[15px] mt-[15px]'>
                            <DatePickerForm
                                label='From'
                                isRequired={true}
                                icon='/images/calendar1.svg'
                                class_="border border-primary/10 p-2.5!"
                                mainClass="mt-0!"
                                formProps={{ ...register("from", { required: true }) }}
                                errors={errors}
                                clearErrors={clearErrors}
                                setValue={setValue}
                                watch={watch}
                            />
                            <DatePickerForm
                                label='To'
                                isRequired={true}
                                icon='/images/calendar1.svg'
                                class_="border border-primary/10 p-2.5!"
                                mainClass="mt-0!"
                                formProps={{ ...register("to", { required: true }) }}
                                errors={errors}
                                clearErrors={clearErrors}
                                setValue={setValue}
                                watch={watch}
                            />
                        </div>
                        <div className='mt-5'>
                            <h2 className='text-lg font-semibold'>Select Report Sections</h2>
                            <div className='flex gap-5 pt-[15px]'>
                                <div className='flex gap-2.5 items-center'>
                                    <CheckboxForm
                                        formProps={{ ...register("reviews") }} errors={errors}
                                    />
                                    <h2 className='text-sm'>Reviews</h2>
                                </div>
                                <div className='flex gap-2.5 items-center'>
                                    <CheckboxForm
                                        formProps={{ ...register("campaigns") }} errors={errors}
                                    />
                                    <h2 className='text-sm'>Campaigns</h2>
                                </div>
                                <div className='flex gap-2.5 items-center'>
                                    <CheckboxForm
                                        formProps={{ ...register("sentiments") }} errors={errors}
                                    />
                                    <h2 className='text-sm'>Sentiments</h2>
                                </div>
                            </div>
                        </div>
                        <hr className='border-t border-border2 my-5' />
                        <div>
                            <h2 className='text-lg font-semibold'>Review Report Settings</h2>
                            <div className='pt-[15px]'>
                                <h2 className='text-sm capitalize'>Review Over Time</h2>
                                <h2 className='text-sm capitalize py-[15px]'>Review Rating Distribution</h2>
                                <h2 className='text-sm capitalize'>top review sources</h2>
                            </div>
                            <div className='mt-5'>
                                <div className='flex gap-2.5 items-center'>
                                    <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Review Over Time</h2>
                                    <CheckboxForm
                                        formProps={{ ...register("reviewOverTime") }} errors={errors}
                                    />
                                </div>
                                <div className='flex gap-2.5 items-center my-[15px]'>
                                    <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Review Rating Distribution</h2>
                                    <CheckboxForm
                                        formProps={{ ...register("reviewRatingDistribution") }} errors={errors}
                                    />
                                </div>
                                <div className='flex gap-2.5 items-center'>
                                    <Image unoptimized={true} src="/images/top-sources.svg" alt='top-sources' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>top review sources</h2>
                                    <CheckboxForm
                                        formProps={{ ...register("topReviewSources") }} errors={errors} />
                                </div>
                            </div>
                        </div>
                        <hr className='border-t border-border2 my-5' />

                        <div>
                            <h2 className='text-lg font-semibold'>Campaign Report Settings</h2>
                            <div className='pt-[15px]'>
                                <h2 className='text-sm capitalize'>Campaign Funnel Breakdown</h2>
                                <h2 className='text-sm capitalize py-[15px]'>Campaign Performance</h2>
                                <h2 className='text-sm capitalize'>Campaign Engagement</h2>
                            </div>
                            <div className='mt-5'>
                                <div className='flex gap-2.5 items-center'>
                                    <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Campaign Funnel Breakdown</h2>
                                    <CheckboxForm
                                        formProps={{ ...register("campaignFunnelBreakdown") }} errors={errors} />
                                </div>
                                <div className='flex gap-2.5 items-center my-[15px]'>
                                    <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Campaign Performance</h2>
                                    <CheckboxForm
                                        formProps={{ ...register("campaignPerformance") }} errors={errors} />
                                </div>
                                <div className='flex gap-2.5 items-center'>
                                    <Image unoptimized={true} src="/images/top-sources.svg" alt='top-sources' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Campaign Engagement</h2>
                                    <CheckboxForm
                                        formProps={{ ...register("campaignEngagement") }} errors={errors} />
                                </div>
                            </div>
                        </div>
                        <hr className='border-t border-border2 my-5' />

                        <div>
                            <h2 className='text-lg font-semibold'>Sentiment Report Settings</h2>
                            <div className='pt-[15px]'>
                                <h2 className='text-sm capitalize'>Sentiment trends</h2>
                                <h2 className='text-sm capitalize pt-[15px]'>Sentiments Distribution</h2>
                            </div>
                            <div className='mt-5'>
                                <div className='flex gap-2.5 items-center mb-[15px]'>
                                    <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Sentiment trends</h2>
                                    <CheckboxForm
                                        formProps={{ ...register("sentimentTrends") }} errors={errors} />
                                </div>
                                <div className='flex gap-2.5 items-center'>
                                    <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Sentiments Distribution</h2>
                                    <CheckboxForm
                                        formProps={{ ...register("sentimentsDistribution") }} errors={errors} />
                                </div>
                            </div>
                        </div>
                        <hr className='border-t border-border2 my-5' />

                        <div>
                            <h2 className='text-lg font-semibold capitalize'>Email & Scheduling options</h2>
                            <div className='grid grid-cols-2 items-end gap-[15px]'>
                                <SelectForm
                                    defaultOption="Select Frequency"
                                    label="Frequency"
                                    labelClass="inline-block mb-0!"
                                    isRequired={true}
                                    formProps={{ ...register("select", { required: true }) }}
                                    errors={errors}
                                    class_="mt-0!"
                                    selectClass_="border border-primary3/10 py-3! px-2.5! bg-white! text-sm!"
                                    clearErrors={clearErrors}
                                >
                                    <option value="selectFont">Select Font</option>
                                </SelectForm>
                                <InputForm
                                    label="Time"
                                    isRequired={true}
                                    inputType='time'
                                    placeholder="Select Time"
                                    inputClass='border border-primary/10'
                                    class_='mt-0!'
                                    labelClass="pb-2.5"
                                    formProps={{ ...register("time", { required: true }) }}
                                    errors={errors}
                                    setValue={setValue}
                                />
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

                            {SHAREEMAIL.map((e,i)=><div key={i}className={i === 0 ? "mt-8" : ""}>
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
                                                    <hr className='border-t border-border2 my-5' />
                                                )}
                            </div>)}
                         
                            <SecondaryButton
                                title="Generate Report"
                                type='submit'
                                disabled={sending}
                                class_="py-[15px]! text-lg! font-medium! px-5! text-sm! font-normal! mt-[30px]!"
                            />
                        </div>

                    </div>
                    <div className='shadow-[0px_0px_22px_0px_#0000000F] rounded-[10px] p-5'>
                        <div className='shadow-[0px_0px_22px_0px_#0000000F] rounded-[10px]'>
                            <div className='bg-primary/10 p-5 flex gap-2.5 rounded-t-[10px]'>
                                <Image unoptimized={true} src="/images/eye1.svg" alt='eye1' width={22} height={22} />
                                <h2 className='text-lg font-semibold'>Review Report Preview</h2>
                            </div>
                            <div className='p-5'>
                                <div className="flex justify-between items-center">
                                    <h2 className='text-lg font-semibold capitalize'>Preview visibility</h2>
                                    <Switch
                                        checked={clickSwitch}
                                        onChange={() => setClickSwitch(prev => !prev)} />
                                </div>
                                <div className='mt-5'>
                                    <DashboardChart title="Review Count & Average Over Time" class_="w-full object-contain mt-5 p-[15px] min-h-[426px]">
                                        <DashboardBarChart />
                                    </DashboardChart>
                                </div>
                                <div className='mt-5'>
                                    <DashboardChart title="Review Rating Distribution">
                                        <div className="flex items-start">
                                            <div className="w-[60%]">
                                                <DashboardPieChart
                                                    labels={["5", "4", "3", "2", "1"]}
                                                    colors={["#0396FF", "#16C098", "#FFAE4C", "#07DBFA", "#988AFC"]}
                                                />
                                            </div>
                                            <div className="mt-10 w-[40%]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="bg-primary h-3 w-3 rounded-full"></div>
                                                    <div className="text-base text-secondary">5</div>
                                                    <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                                    <div className="text-sm text-secondary">50%</div>
                                                </div>

                                                <div className="flex  items-center gap-3 mb-2">
                                                    <div className="bg-success-light h-3 w-3 rounded-full"></div>
                                                    <div className="text-base text-secondary">4</div>
                                                    <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                                    <div className="text-sm text-secondary">20%</div>
                                                </div>

                                                <div className="flex  items-center gap-3 mb-2">
                                                    <div className="bg-custom-yellow h-3 w-3 rounded-full"></div>
                                                    <div className="text-base text-secondary">3</div>
                                                    <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                                    <div className="text-sm text-secondary">10%</div>
                                                </div>

                                                <div className="flex  items-center gap-3 mb-2">
                                                    <div className="bg-[#07DBFA] h-3 w-3 rounded-full"></div>
                                                    <div className="text-base text-secondary">2</div>
                                                    <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                                    <div className="text-sm text-secondary">10%</div>
                                                </div>

                                                <div className="flex  items-center gap-3 mb-2">
                                                    <div className="bg-custom-purple h-3 w-3 rounded-full"></div>
                                                    <div className="text-base text-secondary">1</div>
                                                    <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                                    <div className="text-sm text-secondary">10%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </DashboardChart>
                                </div>
                                <div className='mt-5'>
                                    <DashboardChart title="Campaign Performance" height={239} width={509} class_="w-full h-auto object-contain">
                                        <StackedReviewChart />
                                    </DashboardChart>
                                </div>
                                <div className='mt-5'>
                                    <DashboardChart title="Sentiment Trend" height={366} width={656} class_="w-full">
                                        <DashboardLineChart />
                                    </DashboardChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </form>

            {loading ? <Loading /> : <>
                {view === "history" && <div>
                    <div className='grid grid-cols-3 gap-5'>
                        {ReportHistory.map((e, i) =>
                            <div key={i} className='border border-border2 gap-[15px] rounded-[10px] p-[15px]'>
                                <h2 className='text-base font-semibold'>ABC Corp</h2>
                                <div className='flex justify-between items-center pt-[15px]'>
                                    <h2 className='text-text3 text-sm font-medium'>Report Date</h2>
                                    <h2 className='text-sm font-medium'>{formatDate(e.date)}</h2>
                                </div>
                                <div className='flex justify-between items-center pt-[15px]'>
                                    <h2 className='text-text3 text-sm font-medium'>Report Type</h2>
                                    <h2 className='text-sm font-medium'>{e.type}</h2>
                                </div>
                                <div className='flex justify-between items-center pt-[15px]'>
                                    <h2 className='text-text3 text-sm font-medium'>Sent To</h2>
                                    <h2 className='text-sm font-medium flex justify-end items-center gap-2'>{e.sent}
                                        <span><Image unoptimized={true} src="/images/info.svg" alt='info' width={16} height={16} /></span>
                                    </h2>
                                </div>
                                <div className='flex justify-between items-center pt-[15px]'>
                                    <h2 className='text-text3 text-sm font-medium'>Status</h2>
                                    <Status status={e.status} />
                                </div>
                                <div className='grid grid-cols-2 gap-[15px] mt-5'>
                                    <button onClick={() => { setOpenDownload(true) }} className='text-primary text-base py-2.5 font-medium bg-primary/10 rounded-lg flex justify-center items-center gap-2'>
                                        <Image unoptimized={true} src="/images/download2.svg" alt='download2' width={16} height={16} />
                                        Download
                                    </button>
                                    <button onClick={() => { setOpenEmail(true) }} className='text-danger text-base py-2.5 font-medium bg-danger/10 rounded-lg flex justify-center items-center gap-2'>
                                        <Image unoptimized={true} src="/images/refresh2.svg" alt='refresh2' width={16} height={16} />
                                        Resend E-mail
                                    </button>
                                </div>
                            </div>)}
                    </div>
                    <PaginationDemo />
                </div>}
            </>}
        </AdminLayout>
    )
}

export default ReviewAnalytics
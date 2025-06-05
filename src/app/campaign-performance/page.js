"use client"
import AdminLayout from '../../components/AdminLayout'
import React, { useEffect, useState } from 'react'
import TableOrder from '../../components/TableOrder'
import Checkbox from '../../components/form/Checkbox'
import Status from '../../components/Status'
import BoostRequest from "../../components/Models/boost/BoostRequest";
import Image from 'next/image'
import Search from '../../components/form/Search'
import PaginationDemo from '../../components/Pagination'
import DeleteModal from '../../components/Models/DeleteModal';
import AddCustomer from '../../components/Models/customers/AddCustomer';
import ApplyTags from '../../components/Models/customers/ApplyTags';
import CustomSelectBox from '../../components/form/CustomSelectBox';
import GridView from '../../components/customers/GridView';
import ListView from '../../components/customers/ListView';
import DatePicker from '../../components/form/DatePicker';
import { allCustomers } from '../../constent/constArray'
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatDate, getError } from '../../../helper'
import Loading from '../../components/Loading'
import DeleteCustomer from "../../components/Models/customers/DeleteCustomer"
import DeleteMultiCustomer from "../../components/Models/customers/DeleteMultiCustomers"
import DateRange from '../../components/form/DateRangePicker'
import Select from '../../components/form/Select'
import SelectForm from '../../components/form/SelectForm'
import Input from '../../components/form/Input'
import SecondaryButton from '../../components/common/SecondaryButton'
import Switch from '../../components/form/Switch'
import DashboardBarChart from '../../components/charts/DashboardBarChart'
import DashboardChart from '../../components/DashboardChart'
import DashboardPieChart from '../../components/charts/DashboardPieChart'
import StackedReviewChart from '../../components/charts/StackedReviewChart'
import DashboardLineChart from '../../components/charts/DashboardLineChart'
import DateRangePicker from '../../components/form/DateRangePicker'
function ReviewAnalytics() {
    const [openBoost, setOpenBoost] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [search, setSearch] = useState("")
    const [date, setDate] = useState("")
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openMultiCustomer, setOpenMultiCustomer] = useState(false)
    const [openTags, setOpenTags] = useState(false)
    const [openModal, setOpenModal] = useState(null)
    const [view, setView] = useState("report")
    const [tab, setTab] = useState("list")
    const [sortBy, setSortBy] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getCustomer()
    }, [search, sortBy])

    const getCustomer = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || allCustomers)
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

    return (
        <AdminLayout>
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
                        <DateRangePicker />
                        <CustomSelectBox
                            defaultOption="Status"
                            class_='mt-0! w-24!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}
                        >
                            <option value="tags">Tags</option>
                            <option value="source: manual vs. imported">Source: Manual vs. Imported</option>
                        </CustomSelectBox>
                        <CustomSelectBox
                            defaultOption="Report Type"
                            class_='mt-0! w-32!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}
                        >
                            <option value="tags">Tags</option>
                            <option value="source: manual vs. imported">Source: Manual vs. Imported</option>
                        </CustomSelectBox>
                        <CustomSelectBox
                            defaultOption="Client"
                            class_='mt-0! w-20!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}
                        >
                            <option value="tags">Tags</option>
                            <option value="source: manual vs. imported">Source: Manual vs. Imported</option>
                        </CustomSelectBox>
                    </div>}

                </div>
            </div>
            {view === "report" && <div className="grid grid-cols-2 gap-5">
                <div className='shadow-[0px_0px_22px_0px_#0000000F] p-5 rounded-[10px]'>
                    <h2 className='text-lg font-semibold'>Date Range</h2>
                    <div className='grid grid-cols-2 gap-[15px] mt-[15px]'>
                        <DatePicker
                            label='From'
                            isRequired={true}
                            icon='/images/calendar1.svg'
                            class_="border border-primary/10 p-2.5!"
                            mainClass="mt-0!"
                        />
                        <DatePicker
                            label='To'
                            isRequired={true}
                            icon='/images/calendar1.svg'
                            class_="border border-primary/10 p-2.5!"
                            mainClass="mt-0!"
                        />
                    </div>
                    <div className='mt-5'>
                        <h2 className='text-lg font-semibold'>Select Report Sections</h2>
                        <div className='flex gap-5 pt-[15px]'>
                            <div className='flex gap-2.5 items-center'>
                                <Checkbox />
                                <h2 className='text-sm'>Reviews</h2>
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <Checkbox />
                                <h2 className='text-sm'>Campaigns</h2>
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <Checkbox />
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
                                <Checkbox />
                            </div>
                            <div className='flex gap-2.5 items-center my-[15px]'>
                                <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Review Rating Distribution</h2>
                                <Checkbox />
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <Image unoptimized={true} src="/images/top-sources.svg" alt='top-sources' width={20} height={20} />
                                <h2 className='text-sm capitalize'>top review sources</h2>
                                <Checkbox />
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
                                <Checkbox />
                            </div>
                            <div className='flex gap-2.5 items-center my-[15px]'>
                                <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Campaign Performance</h2>
                                <Checkbox />
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <Image unoptimized={true} src="/images/top-sources.svg" alt='top-sources' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Campaign Engagement</h2>
                                <Checkbox />
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
                                <Checkbox />
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Sentiments Distribution</h2>
                                <Checkbox />
                            </div>
                        </div>
                    </div>
                    <hr className='border-t border-border2 my-5' />

                    <div>
                        <h2 className='text-lg font-semibold capitalize'>Email & Scheduling options</h2>
                        <div className='grid grid-cols-2 gap-[15px]'>
                            <SelectForm
                                defaultOption="Select Frequency*"
                                label="Frequency*"
                                labelClass="pb-2.5 inline-block mb-0!"
                                isRequired={true}
                                // formProps={{ ...register("select", { required: true }) }}
                                // errors={errors}
                                class_="mt-0!"
                                selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                            // clearErrors={clearErrors} 
                            >
                                <option value="selectFont">Select Font</option>
                            </SelectForm>
                            <Input
                                label="Time"
                                isRequired={true}
                                placeholder="Select Time"
                                inputClass='border border-primary/10'
                                class_='mt-0!'
                                labelClass="pb-2.5"
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
                            <div className="w-[30%]">
                                <SecondaryButton
                                    title="Search Users"
                                    class_="py-[15px]! px-5! text-sm! font-normal!"
                                // onClick={onSave}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-[25px]">
                            <div className="flex gap-[15px]">
                                <Image src="/images/request.png" alt="request" width={44} height={44} />
                                <div>
                                    <div className="text-base font-medium">Amelie Laurent</div>
                                    <div className="text-sm text-text3 pt-1">amili@gmail.com</div>
                                </div>
                            </div>
                            <div className="text-lg">owner</div>
                        </div>
                        <hr className="mt-[15px] border border-border2" />

                        <div className="flex items-center justify-between pt-[25px]">
                            <div className="flex gap-[15px]">
                                <Image src="/images/request.png" alt="request" width={44} height={44} />
                                <div>
                                    <div className="text-base font-medium">Amelie Laurent</div>
                                    <div className="text-sm text-text3 pt-1">amili@gmail.com</div>
                                </div>
                            </div>
                            <div className="text-lg">Manager</div>
                        </div>
                        <SecondaryButton
                            title="Generate Report"
                            class_="py-[15px]! text-lg! font-medium! px-5! text-sm! font-normal! mt-[30px]!"
                        // onClick={onSave}
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
                                <Switch />
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

            {view === "history" && <div>
                <div className='grid grid-cols-3 gap-5'>
                    {ReportHistory.map((e, i) =>
                        <div key={i} className='border border-border2 gap-[15px] rounded-[10px] p-[15px]'>
                            <h2 className='text-base font-semibold'>ABC Corp</h2>
                            <div className='flex justify-between items-center pt-[15px]'>
                                <h2 className='text-text3 text-sm font-medium'>Report Date</h2>
                                <h2 className='text-sm font-medium'>{e.date}</h2>
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
                                <button className='text-primary text-base py-2.5 font-medium bg-primary/10 rounded-lg flex justify-center items-center gap-2'>
                                    <Image unoptimized={true} src="/images/download2.svg" alt='download2' width={16} height={16} />
                                    Download
                                </button>
                                <button className='text-danger text-base py-2.5 font-medium bg-danger/10 rounded-lg flex justify-center items-center gap-2'>
                                    <Image unoptimized={true} src="/images/refresh2.svg" alt='refresh2' width={16} height={16} />
                                    Resend E-mail
                                </button>
                            </div>
                        </div>)}
                </div>
            </div>}

        </AdminLayout>
    )
}

export default ReviewAnalytics
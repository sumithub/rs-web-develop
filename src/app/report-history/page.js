"use client"
import AdminLayout from '../../components/AdminLayout'
import ResendReportEmail from '../../components/Models/reports/ResendReportEmail'
import Download from '../../components/Models/customers/Download'
import Search from '../../components/form/Search'
import CustomSelectBox from '../../components/form/CustomSelectBox';
import DateRange from '../../components/form/DateRangePicker'
import PaginationDemo from '../../components/Pagination'
import Loading from '../../components/Loading'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { formatDate, getError } from '../../../helper'
import Status from '../../components/Status'
import axios from 'axios'
import { toast } from 'react-toastify'
import { title } from 'process'

export default function ReportHistory() {
    const [openEmail, setOpenEmail] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)
    const [sending, setSending] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState("")
    const [data, setData] = useState("")

    useEffect(() => {
        getReportHistory()
    }, [search, filterBy, date,])

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
        { title: "ABC Corp", date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Sent" },
        { title: "ABC Corp", date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Failed" },
        { title: "LMN Pty Ltd", date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Processing" },
        { title: "ABC Corp", date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Failed" },
        { title: "ABC Corp", date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Sent" },
        { title: "LMN Pty Ltd", date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Processing" },
        { title: "ABC Corp", date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Sent" },
        { title: "LMN Pty Ltd", date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Processing" },
        { title: "ABC Corp", date: "Jun 18,2024", type: "Monthly Review", sent: "John, Lisa", status: "Failed" },
    ]

    return <AdminLayout>

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

            <div className='flex items-center justify-between mb-8'>

                <Search
                    placeholder="Search by List Name Or Date"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />

                <div className='flex items-center gap-3'>

                    <DateRange
                    value={date}
                        onChange={(e) => { setDate(e) }}
                    />
                    <CustomSelectBox
                        defaultOption="Status"
                        class_='mt-0! w-32!'
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
                        class_='mt-0! w-40!'
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
                        class_='mt-0! w-32!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="client 1">Client 1</option>
                        <option value="client 2">Client 2</option>
                    </CustomSelectBox>
                </div>
            </div>

            {loading ? <Loading /> : <>
                <div>
                    <div className='grid grid-cols-3 gap-5'>
                        {ReportHistory.map((e, i) =>
                            <div key={i} className='border border-border2 gap-[15px] rounded-[10px] p-[15px]'>
                                <h2 className='text-base font-semibold'>{e.title}</h2>
                                <div className='flex justify-between items-center pt-2'>
                                    <h2 className='text-text3 text-sm font-medium'>Report Date</h2>
                                    <h2 className='text-sm font-medium'>{formatDate(e.date)}</h2>
                                </div>
                                <div className='flex justify-between items-center pt-2'>
                                    <h2 className='text-text3 text-sm font-medium'>Report Type</h2>
                                    <h2 className='text-sm font-medium'>{e.type}</h2>
                                </div>
                                <div className='flex justify-between items-center pt-2'>
                                    <h2 className='text-text3 text-sm font-medium'>Sent To</h2>
                                    <h2 className='text-sm font-medium flex justify-end items-center gap-2'>{e.sent}
                                        <span><Image unoptimized={true} src="/images/info.svg" alt='info' width={16} height={16} /></span>
                                    </h2>
                                </div>
                                <div className='flex justify-between items-center pt-2'>
                                    <h2 className='text-text3 text-sm font-medium'>Status</h2>
                                    <Status status={e.status} />
                                </div>
                                <div className='grid grid-cols-2 gap-[15px] mt-5'>
                                    <button onClick={() => { setOpenDownload(true) }} className='text-primary text-base py-2 font-medium bg-primary/10 rounded-lg flex justify-center items-center gap-2'>
                                        <Image unoptimized={true} src="/images/download2.svg" alt='download2' width={16} height={16} />
                                        Download
                                    </button>
                                    <button onClick={() => { setOpenEmail(true) }} className='text-danger text-base py-2 font-medium bg-danger/10 rounded-lg flex justify-center items-center gap-2'>
                                        <Image unoptimized={true} src="/images/refresh2.svg" alt='refresh2' width={16} height={16} />
                                        Resend E-mail
                                    </button>
                                </div>
                            </div>)}
                    </div>
                    <PaginationDemo />
                </div>
            </>}
        </div>
    </AdminLayout>
}
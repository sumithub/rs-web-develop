"use client"
import AdminLayout from "../../../../components/AdminLayout";
import PaginationDemo from "../../../../components/Pagination";
import TableOrder from "../../../../components/TableOrder";
import Search from "../../../../components/form/Search";
import CustomSelectBox from "../../../../components/form/CustomSelectBox";
import Status from "../../../../components/Status"
import Checkbox from "../../../../components/form/Checkbox";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../../helper";
import { useEffect, useState } from "react";
import Loading from "../../../../components/Loading";
import { notificationsDashboard } from "../../../../constent/constArray";
import Image from "next/image";
import CancelButton from "../../../../components/common/CancelButton";
import DateRange from "../../../../components/form/DateRangePicker";
import ViewNotification from "../../../../components/Models/admin/ViewNotification"

export default function NotificationsDashboard() {
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const [filterByClient, setFilterByClient] = useState("")
    const [filterBy, setFilterBy] = useState("")
    const [filterByStatus, setFilterByStatus] = useState("")
    const [date, setDate] = useState("")
    const [open, setOpen] = useState(false)
    const [sortBy, setSortBy] = useState("")
    const [filterBySort, setFilterBySort] = useState("")


    useEffect(() => {
        getData()
    }, [search, date, sortBy, filterBy, filterByClient, filterBySort, filterByStatus])

    const getData = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || notificationsDashboard)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    const handleClick = () => {
        toast.success("Exported Successfully")
    }

    return (<>
        <AdminLayout>
            {open &&
                <ViewNotification
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }} />
            }
            <div className="flex justify-between items-center">
                <div className="w-4/5">
                    <Search
                        mainClass=''
                        placeholder='Search by "Client, Location, Event Type...'
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                </div>
                <CustomSelectBox
                    defaultOption="Sort By"
                    class_='mt-0! w-28!'
                    value={filterBySort}
                    onChange={(e) => {
                        setFilterBySort(e.target.value)
                    }}
                >
                    <option value="sort1">Sort 1</option>
                    <option value="sort2">Sort 2</option>
                </CustomSelectBox>
            </div>
            <div className="flex justify-between items-start w-full mb-5 mt-3.5">
                <div className="border border-border-color px-2 py-[3.5px] rounded-lg flex items-center justify-center gap-2 mt-0.5">
                    <Checkbox
                        class_='mt-[2px]'
                        checked={list?.length > 0 && list.every(e => e.selected)}
                        onChange={(checked) => {
                            setList(list => list.map(e => ({ ...e, selected: checked })))
                        }} />
                    <div className="text-text3 text-sm capitalize">Select all</div>
                </div>
                <div className="flex gap-3.5">
                    <CustomSelectBox
                        selectClass_="py-2!"
                        defaultOption="Status"
                        class_='mt-0! w-28!'
                        value={filterByStatus}
                        onChange={(e) => {
                            setFilterByStatus(e.target.value)
                        }}
                    >
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </CustomSelectBox>


                    <CustomSelectBox
                        defaultOption="Notification Type"
                        selectClass_="py-2!"
                        class_='mt-0! w-40!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="reviewAlert">Review Alert</option>
                    </CustomSelectBox>

                    {/* <CancelButton title="Location" class_="text-xs! bg-white! border border-border-color! py-2.5!" mainClass="shrink-0" /> */}
                    <button className="text-xs border border-border2 text-text3 p-2.5 rounded-lg flex items-center gap-2.5">Location<span><Image src="/images/location1.svg" alt="location1" width={16} height={16} /></span></button>

                    <CustomSelectBox
                        class_="mt-0! w-28!"
                        defaultOption="Client"
                        value={filterByClient}
                        onChange={(e) => {
                            setFilterByClient(e.target.value)
                        }}>
                        <option value="abcDental">ABC Dental</option>
                    </CustomSelectBox>

                    <DateRange
                        value={date}
                        onChange={(e) => { setDate(e) }}
                    />
                    <button className="rounded-lg bg-primary/10 text-primary px-2.5 text-xs inline-flex items-center gap-2.5"><span><Image src="/images/export.svg" alt="export" width={16} height={16} /></span>Export</button>
                    <button className="rounded-lg bg-danger/10 text-danger px-2.5  text-xs inline-flex items-center gap-2.5"><span><Image src="/images/delete.svg" lang="delete" width={16} height={16} /></span> Delete</button>
                    {/* <CancelButton title="Export" onClick={handleClick} class_="text-xs! py-[9.4px]! font-normal!" />
                    <CancelButton title="Delete" onClick={() => { toast.success("Deleted Successfully") }} class_="text-xs! py-[9.4px]! font-normal!" /> */}
                    {/* 
                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0"
                        onClick={() => { toast.success("Resented Successfully") }}>Resend</button> */}
                </div>
            </div>
            <div className='table-class mt-[15px]'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Timestamp"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="timestamp" /></th>
                            <th><TableOrder title="Client Name"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="clientName" /></th>
                            <th><TableOrder title="Location"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="location" /></th>
                            <th><TableOrder title="Notification Type"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="type" /></th>
                            <th><TableOrder title="Message Summary"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="summary" /></th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Status"
                                        setSortBy={setSortBy}
                                        sortBy={sortBy}
                                        field="status" />
                                </div>
                            </th>
                            <th className="flex justify-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox
                                        checked={e.selected}
                                        onChange={(checked) => {
                                            setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                        }}
                                    />
                                    <div>{e.timestamp}</div>
                                </div>
                            </td>
                            <td>{e.clientName}</td>
                            <td>{e.location}</td>
                            <td>{e.notificationType}</td>
                            <td>{e.messageSummary}</td>
                            <td>
                                <div className="flex justify-center">
                                    <Status status={e.status} context="notify" />
                                </div>
                            </td>
                            <td>
                                <div className='flex items-center justify-center gap-2'>
                                    <button className='cursor-pointer' onClick={() => setOpen(true)}>
                                        <Image src="/images/open-eye2.svg" alt='open-eye2' height={28} width={28} />
                                    </button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
            </div>
            {list?.length > 0 && <div>
                <PaginationDemo />
            </div>}
        </AdminLayout>
    </>)
}
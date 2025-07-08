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
import { formatDate, getError } from "../../../../../helper";
import { useEffect, useState } from "react";
import Loading from "../../../../components/Loading";
import { notificationManagement } from "../../../../constent/constArray";
import Image from "next/image";
import SecondaryButton from "../../../../components/common/SecondaryButton";
import CancelButton from "../../../../components/common/CancelButton";

export default function NotificationsDashboard() {
    const [type, setType] = useState("")
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const [filterByClient, setFilterByClient] = useState("")
    const [filterBy, setFilterBy] = useState("")
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        getData()
    }, [search, type, sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || notificationManagement)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    const handleClick = () => {
        toast.success("Resended Successfully")
    }

    return (<>
        <AdminLayout>
            <div className="flex justify-between items-start w-full mb-5 mt-3.5">
                <Search
                    mainClass='max-w-[270px]!'
                    placeholder='Search by "Client, Location, Event Type...'
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <div className="flex gap-3">

                    <div className="border border-border-color px-2 py-0.5 rounded-lg w-28">
                        <div className="flex items-center justify-center gap-2 mt-0.5">
                            <Checkbox
                                class_='mt-[2px]'
                                checked={list?.length > 0 && list.every(e => e.selected)}
                                onChange={(checked) => {
                                    setList(list => list.map(e => ({ ...e, selected: checked })))
                                }} />
                            <div className="text-text3 text-sm capitalize">Select all</div>
                        </div>
                    </div>

                    <CustomSelectBox
                        defaultOption="Client"
                        class_='mt-0! w-36!'
                        value={filterByClient}
                        onChange={(e) => {
                            setFilterByClient(e.target.value)
                        }}
                    >
                        <option value="abcCorp">ABC Corp</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Location"
                        class_='mt-0! w-28!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="sydney">Sydney</option>
                    </CustomSelectBox>

                    <CancelButton title="User" class_="text-xs! bg-white! border border-border-color! py-2.5!" mainClass="shrink-0" />

                    <CustomSelectBox
                        class_="mt-0! w-32!"
                        defaultOption="Filter"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}>
                        <option value="pending">Pending</option>
                        <option value="sent">Sent</option>
                        <option value="failed">Failed</option>
                    </CustomSelectBox>
                    <SecondaryButton title="Resend" onClick={handleClick} class_="text-xs! py-[9.4px]! font-normal!" />
                    {/* 
                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0"
                        onClick={() => { toast.success("Resented Successfully") }}>Resend</button> */}
                </div>
            </div>
            <div className='table-class mt-[15px]'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="ID"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="id" /></th>
                            <th><TableOrder title="Client Name"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="clientName" /></th>
                            <th><TableOrder title="Location"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="location" /></th>
                            <th><TableOrder title="Medium"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="medium" /></th>
                            <th><TableOrder title="Recipient"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="recipient" /></th>
                            <th><TableOrder title="Message"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="message" /></th>
                            <th><TableOrder title="Status"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="status" /></th>
                            <th><TableOrder title="Created Date"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="createdDate" /></th>
                            <th>Action</th>
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
                                    <div>{e.id}</div>
                                </div>
                            </td>
                            <td>{e.name}</td>
                            <td>{e.location}</td>
                            <td>{e.medium}</td>
                            <td>{e.recipient}</td>
                            <td>{e.message}</td>
                            <td>
                                <Status status={e.status} context="notify" />
                            </td>
                            <td>{formatDate(e.date)}</td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <button className='cursor-pointer' onClick={() => toast.success("Read Successfully")}>
                                        <Image src="/images/open-eye2.svg" alt='open-eye2' height={28} width={28} />
                                    </button>

                                    <button className='cursor-pointer' onClick={handleClick}>
                                        <Image src="/images/refresh1.svg" alt='refresh1' height={28} width={28} />
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
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

function Customers() {
    const [openBoost, setOpenBoost] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [search, setSearch] = useState("")
    const [date, setDate] = useState("")
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openMultiCustomer, setOpenMultiCustomer] = useState(false)
    const [openTags, setOpenTags] = useState(false)
    const [openModal, setOpenModal] = useState(null)
    const [view, setView] = useState("customer")
    const [tab, setTab] = useState("list")
    const [sortBy, setSortBy] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getCustomer()
    }, [search, sortBy, filterBy])

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

    return (
        <AdminLayout>
            {open &&
                <AddCustomer
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }}
                />
            }

            {openBoost &&
                <BoostRequest
                    onClose={() => {
                        setOpenBoost(false)
                    }}

                    onSave={() => {
                        setOpenBoost(true)
                    }} />
            }

            {openTags &&
                <ApplyTags
                    onClose={() => {
                        setOpenTags(false)
                    }}

                    onSave={() => {
                        setOpenTags(true)
                    }}
                />
            }

            {openModal === "delete" &&
                <DeleteModal
                    onClose={() => {
                        setOpenModal(false)
                    }} />
            }

            {openDelete === "deleteCustomer" &&
                <DeleteCustomer
                    onClose={() => {
                        setOpenDelete(false)
                    }}

                    onSave={() => {
                        setOpenDelete(true)
                    }}
                />
            }

            {openMultiCustomer === "deleteMultiCustomer" &&
                <DeleteMultiCustomer

                    onClose={() => {
                        setOpenMultiCustomer(false)
                    }}

                    onSave={() => {
                        setOpenMultiCustomer(true)
                    }}
                />
            }

            <div>
                <div className="flex justify-between items-center mb-3 w-full">
                    <div className='bg-white shadow-sm rounded-[10px] overflow-hidden'>
                        <div className='flex items-center gap-10 px-[20px]'>
                            <div
                                onClick={() => {
                                    setView("customer")
                                }}
                                className={`${view === "customer" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                            >
                                All Customers
                            </div>

                            <div
                                onClick={() => {
                                    setView("history")
                                }}
                                className={`${view === "history" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                            >
                                Customer List History
                            </div>
                        </div>
                    </div>
                    {view === "customer" && <div className='grid grid-cols-[1.5fr_0.8fr_0.5fr_0.8fr] gap-3 items-center justify-end'>
                        <Search
                            mainClass='w-full!'
                            placeholder="Search by Filter by name, email, phone"
                            onSearch={(s) => {
                                setSearch(s)
                            }}
                        />
                        <CustomSelectBox
                            defaultOption="filters"
                            class_='mt-0!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}
                        >
                            <option value="tags">Tags</option>
                            <option value="source: manual vs. imported">Source: Manual vs. Imported</option>
                        </CustomSelectBox>

                        <button className="flex items-center text-xs justify-center gap-2 bg-primary border border-primary py-[10.5px] px-3 rounded-lg text-white cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0"
                         onClick={() => { setOpenBoost(true) }}>
                            <Image unoptimized={true} src="/images/flash.svg" alt="flash" height={16} width={16} />Boost</button>

                        <button className="bg-primary border border-primary text-xs hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0"
                            onClick={() => { setOpen(true) }}>Add New Customer</button>
                    </div>}
                    {view === "history" && <div className='flex justify-between items-center gap-[15px]'>
                        <div className='w-60!'>
                            <Search
                                mainClass='w-full!'
                                placeholder="Search by list name or date"
                                onSearch={(s) => {
                                    setSearch(s)
                                }}
                            />
                        </div>

                        {tab === "list" && <DateRange
                            onChange={(e) => { setDate(e) }}
                        />}

                        {/* {tab === "list" && <DatePicker
                            mainClass="mt-0! w-28!"
                            value={date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(e) => setDate(e)}
                            icon={true}
                        />} */}

                        <button
                            onClick={() => {
                                setTab("list")
                            }}
                            className={`${tab === "list" ? "bg-primary" : ""}  border border-border-color h-9 w-9 rounded-lg flex items-center justify-center mx-auto`}>

                            {tab === "grid" && <Image unoptimized={true} src="/images/list.svg" alt="list" width={16} height={16} />}
                            {tab === "list" && <Image unoptimized={true} src="/images/list-active.svg" alt="list" width={16} height={16} />}
                        </button>

                        <button
                            onClick={() => {
                                setTab("grid")
                            }}
                            className={`${tab === "grid" ? "bg-primary" : ""}  border border-border-color h-9 w-9 rounded-lg flex items-center justify-center mx-auto`}>

                            {tab === "list" && <Image unoptimized={true} src="/images/grid.svg" alt="grid" width={16} height={16} />}
                            {tab === "grid" && <Image unoptimized={true} src="/images/grid-active.svg" alt="grid" width={16} height={16} />}
                        </button>
                    </div>}
                </div>

                {view === "customer" && <div className='flex items-center justify-between mb-5 w-full'>
                    <div className="border border-border-color px-2 py-1 rounded-lg w-28">
                        <div className="flex items-start justify-center gap-2 mt-1">
                            <Checkbox
                                checked={list?.length > 0 && list.every(e => e.selected)}
                                onChange={(checked) => {
                                    setList(list => list.map(e => ({ ...e, selected: checked })))
                                }}
                            />
                            <div className="text-text3 text-sm capitalize mt-[2px]">Select all</div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                        <button className='border border-border-color rounded-lg p-2 text-text3 text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'
                            onClick={() => { setOpenTags(true) }}>Apply tags to multiple customers</button>

                        <button className='border border-danger-light2 bg-danger-light2 rounded-lg p-2 text-danger text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'
                            onClick={() => { setOpenMultiCustomer("deleteMultiCustomer") }}>Delete multiple customers</button>
                    </div>
                </div>}
            </div>

            {view === "customer" && <div className='table-class'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Customer Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="customerName" /></th>
                            <th><TableOrder title="Email"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="email" /></th>
                            <th><TableOrder title="Phone"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="phone" /></th>
                            <th><TableOrder title="Tags"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="tags" /></th>
                            <th><TableOrder title="Source"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="source" /></th>
                            <th><TableOrder title="Boost"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="boost" /></th>
                            <th><TableOrder title="Date Added"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="dateAdded" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list?.map((e, index) => <tr key={index}>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox
                                        checked={e.selected}
                                        onChange={(checked) => {
                                            setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                        }}
                                    />
                                    <div>{e.customerName}</div>
                                </div>
                            </td>
                            <td>{e.email}</td>
                            <td>{e.phone}</td>
                            <td><Status status={e.status} /></td>
                            <td>{e.source}</td>
                            <td>
                                <button  onClick={() => { setOpenBoost(true) }}>
                                    <Image unoptimized={true} src="/images/boost.svg" alt='boost' height={28} width={28} />
                                </button>
                            </td>
                            <td>{formatDate(e.date)}</td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <button className='cursor-pointer'
                                        onClick={() => { setOpen(true) }}
                                    >
                                        <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                    </button>

                                    <button className='cursor-pointer'
                                        onClick={() => { setOpenDelete("deleteCustomer") }}
                                    >
                                        <Image unoptimized={true} src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                    </button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                {list?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>}

            {view === "history" && <div className=''>
                {tab === "list" && <ListView />}
                {tab === "grid" && <GridView />}
            </div>
            }
        </AdminLayout>
    )
}

export default Customers
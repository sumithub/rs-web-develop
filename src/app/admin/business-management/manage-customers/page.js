"use client"
import AdminLayout from '../../../../components/AdminLayout'
import React, { useEffect, useState } from 'react'
import TableOrder from '../../../../components/TableOrder'
import Checkbox from '../../../../components/form/Checkbox'
import Status from '../../../../components/Status'
import Image from 'next/image'
import Search from '../../../../components/form/Search'
import PaginationDemo from '../../../../components/Pagination'
import DeleteModal from '../../../../components/Models/DeleteModal';
import AddCustomer from '../../../../components/Models/customers/AddCustomer';
import CustomSelectBox from '../../../../components/form/CustomSelectBox';
import GridView from '../../../../components/customers/GridView';
import ListView from '../../../../components/customers/ListView';
import { manageCustomers } from '../../../../constent/constArray'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '../../../../../helper'
import Loading from '../../../../components/Loading'
import DeleteCustomer from "../../../../components/Models/customers/DeleteCustomer"

function ManageCustomers() {
    const [filterByClient, setFilterByClient] = useState("")
    const [filterBySource, setFilterBySource] = useState("")
    const [filterByTags, setFilterByTags] = useState("")
    const [filterByStatus, setFilterByStatus] = useState("")
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openModal, setOpenModal] = useState(null)
    const [view, setView] = useState("customer")
    const [tab, setTab] = useState("list")
    const [sortBy, setSortBy] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [selId, setSelId] = useState("")


    useEffect(() => {
        getCustomer()
    }, [search, sortBy, filterByClient, filterBySource, filterByTags, filterByStatus])

    const getCustomer = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || manageCustomers)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout
            noCard={false}
            headerSearch={
                <Search
                    mainClass='w-72!'
                    placeholder="Search"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />}>
            {open &&
                <AddCustomer
                    id={selId}
                    onClose={() => {
                        setSelId("")
                        setOpen(false)
                    }}

                    onSave={() => {
                        getCustomer()
                        setOpen(true)
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

            <div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className="bg-white shadow-sm inline-block rounded-[10px] overflow-hidden">
                            <div className='inline-flex items-center gap-10 px-[20px]'>
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

                        {/* <div className='flex items-center gap-[15px] my-3.5'>
                            <div className='w-72!'>
                                <Search
                                    mainClass='w-full!'
                                    placeholder="Search by list name or date"
                                    onSearch={(s) => {
                                        setSearch(s)
                                    }}
                                />
                            </div>

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
                        </div> */}

                    </div>
                    {view === "customer" && <div className='flex items-center gap-2.5 my-3.5 justify-between'>
                        <Search
                            mainClass='w-72!'
                            placeholder="Search by name, email Or phone"
                            onSearch={(s) => {
                                setSearch(s)
                            }}
                        />
                        <div className='flex items-center gap-3.5'>
                            <CustomSelectBox
                                defaultOption="Client"
                                class_='mt-0! w-24!'
                                value={filterByClient}
                                onChange={(e) => {
                                    setFilterByClient(e.target.value)
                                }}
                            >
                                <option value="client1">Client 1</option>
                                <option value="client2">Client 2</option>
                            </CustomSelectBox>

                            <CustomSelectBox
                                defaultOption="Source"
                                class_='mt-0! w-24!'
                                value={filterBySource}
                                onChange={(e) => {
                                    setFilterBySource(e.target.value)
                                }}
                            >
                                <option value="csvImport">CSV Import</option>
                                <option value="manual">Manual</option>
                            </CustomSelectBox>

                            <CustomSelectBox
                                defaultOption="Tags"
                                class_='mt-0! w-24!'
                                value={filterByTags}
                                onChange={(e) => {
                                    setFilterByTags(e.target.value)
                                }}
                            >
                                <option value="vip">VIP</option>
                            </CustomSelectBox>

                            <CustomSelectBox
                                defaultOption="Status"
                                class_='mt-0! w-24!'
                                value={filterByStatus}
                                onChange={(e) => {
                                    setFilterByStatus(e.target.value)
                                }}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </CustomSelectBox>

                            <button className="bg-primary border border-primary text-xs hover:bg-white hover:text-primary rounded-lg py-[9.5px] px-3 text-white text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0"
                                onClick={() => { setOpen(true) }}>Add Customer</button>
                        </div>
                    </div>}
                    {view === "history" && <div className='flex justify-between items-center gap-[15px] my-3.5'>
                        <div className='w-72!'>
                            <Search
                                mainClass='w-full!'
                                placeholder="Search by list name or date"
                                onSearch={(s) => {
                                    setSearch(s)
                                }}
                            />
                        </div>
                        <div className='flex items-center gap-3.5'>
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
                        </div>
                    </div>}

                </div>

            </div>

            {view === "customer" && <>
                <div className='table-class'>
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
                                <th><TableOrder title="Client"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="client" /></th>
                                <th><TableOrder title="Tags"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="tags" /></th>
                                <th><TableOrder title="Status"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="status" /></th>
                                <th>Actions</th>
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
                                        <div>{e.customerName}</div>
                                    </div>
                                </td>
                                <td>{e.email}</td>
                                <td>{e.phone}</td>
                                <td>{e.client}</td>
                                <td>{e.tags}</td>
                                <td><Status status={e.status} /></td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'
                                            onClick={() => {
                                                setSelId("e.id")
                                                setOpen(true)
                                            }}
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

                </div>
                {list?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </>}

            {view === "history" && <div className=''>
                {tab === "list" && <ListView />}
                {tab === "grid" && <GridView />}
            </div>
            }
        </AdminLayout>
    )
}

export default ManageCustomers
"use client"
import Image from 'next/image'
import AdminLayout from '../../components/AdminLayout'
import Checkbox from '../../components/form/Checkbox'
import Search from '../../components/form/Search'
import PaginationDemo from '../../components/Pagination'
import Status from '../../components/Status'
import TableOrder from '../../components/TableOrder'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import CustomSelectBox from '../../components/form/CustomSelectBox';
import DeleteCampaign from '../../components/Models/manage-campaigns/DeleteCampaign'
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatDate, getError } from '../../../helper'
import { manageCampaigns } from '../../constent/constArray'
import Loading from '../../components/Loading'
import DateRange from '../../components/form/DateRangePicker'

function ManageCampaigns() {
    const [sortBy1, setSortBy1] = useState("")
    const [type, setType] = useState("")
    const [status, setStatus] = useState("")
    const [changeStatus, setChangeStatus] = useState("")
    const [date, setDate] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        getTemplate()
    }, [search, sortBy1, type, status, changeStatus, date, sortBy])

    const getTemplate = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
            setList(res.data || manageCampaigns)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            {open &&
                <DeleteCampaign
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }}
                />
            }
            <div>
                <div className="flex justify-between items-start w-full mb-5">
                    <Search
                        mainClass='max-w-[270px]!'
                        placeholder="Search by campaign names"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <div className="flex items-start gap-3">
                        <CustomSelectBox
                            class_="mt-0! w-40!"
                            defaultOption="sort by"
                            value={sortBy1}
                            onChange={(e) => {
                                setSortBy1(e.target.value)
                            }}>
                            <option value="campaign ame">Campaign Name</option>
                            <option value="date">date</option>
                            <option value="customers count">Customers Count</option>
                            <option value="status">status</option>
                        </CustomSelectBox>

                        <CustomSelectBox
                            class_="mt-0! w-32!"
                            defaultOption="select type"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                            }}>
                            <option value="industry">Industry</option>
                            <option value="template">Template</option>
                        </CustomSelectBox>

                        <CustomSelectBox
                            class_="mt-0! w-32!"
                            defaultOption="Status"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value)
                            }}>
                            <option value="draft">Draft</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="paused">Paused</option>
                        </CustomSelectBox>

                        <DateRange class_="shrink-0!"
                            onChange={(e) => { setDate(e) }}
                        />

                        {/* <DatePicker
                            icon={true}
                            mainClass="mt-0!"
                            value={date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(e) => setDate(e)}
                        /> */}
                        <Link href="/manage-campaigns/detail" className='shrink-0'>
                            <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[9.3px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0 w-full"
                            >Create campaign</button>
                        </Link>
                    </div>
                </div>

                <div className='flex items-center justify-between mb-5'>
                    <div className="border border-border-color px-2 py-1 rounded-lg w-28">
                        <div className="flex items-start justify-center gap-2 mt-1">
                            <Checkbox
                                checked={list?.length > 0 && list.every(e => e.selected)}
                                onChange={(checked) => {
                                    setList(list => list.map(e => ({ ...e, selected: checked })))
                                }} />
                            <div className="text-text3 text-sm capitalize mt-[2px]">Select all</div>
                        </div>
                    </div>

                    <div className='flex gap-3'>

                        <CustomSelectBox
                            class_="mt-0! w-40!"
                            defaultOption="change Status"
                            value={changeStatus}
                            onChange={(e) => {
                                setChangeStatus(e.target.value)
                            }}>
                            <option value="draft">Draft</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="paused">Paused</option>
                        </CustomSelectBox>

                        <button className='border border-border-color rounded-lg p-2 text-text3 text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'>Bulk Edit</button>

                        <button
                            onClick={() => { setOpen("delete") }}
                            className='border border-danger-light2 bg-danger-light2 rounded-lg p-2 text-danger text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'>Bulk Delete</button>
                    </div>
                </div>
            </div>

            <div className='table-class'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Campaign Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="campaignName"
                            /></th>
                            <th><TableOrder title="Created On"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="createdOn"
                            /></th>
                            <th><TableOrder title="Launch Date"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="launchDate"
                            /></th>
                            <th><TableOrder title="Customers"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="customers"
                            /></th>
                            <th><TableOrder title="Status"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="status"
                            /></th>
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
                                    <div>{e.name}</div>
                                </div>
                            </td>
                            <td>{formatDate(e.createdOn)}</td>
                            <td>{formatDate(e.launchDate)}</td>
                            <td className='text-primary! underline underline-offset-4'>{e.customerCount}</td>
                            <td><Status status={e.status} /></td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <Link href="/manage-campaigns/detail">
                                        <button className='cursor-pointer mt-2'>
                                            <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>
                                    </Link>
                                    <button className='cursor-pointer' onClick={() => {
                                        navigator.clipboard.writeText("message")
                                        toast.success("Copied")
                                    }}>
                                        <Image unoptimized={true} src="/images/copy.svg" alt='copy' height={28} width={28} />
                                    </button>
                                    <button className='cursor-pointer'>
                                        <Image unoptimized={true} src="/images/delete1.svg" alt='delete' height={28} width={28}
                                            onClick={() => { setOpen(true) }} />
                                    </button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>

                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                {list?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>
        </AdminLayout>
    )
}

export default ManageCampaigns
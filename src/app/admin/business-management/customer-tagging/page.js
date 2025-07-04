"use client"
import Image from 'next/image'
import AdminLayout from '../../../../components/AdminLayout'
import Checkbox from '../../../../components/form/Checkbox'
import Search from '../../../../components/form/Search'
import PaginationDemo from '../../../../components/Pagination'
import TableOrder from '../../../../components/TableOrder'
import React, { useEffect, useState } from 'react'
import CustomSelectBox from '../../../../components/form/CustomSelectBox';
import CreateCustomersTag from '../../../../components/Models/business-management/CreateCustomersTag'
import BulkAssign from '../../../../components/Models/business-management/BulkAssign'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '../../../../../helper'
import { manageTags } from '../../../../constent/constArray'
import Loading from '../../../../components/Loading'
import DateRange from '../../../../components/form/DateRangePicker'
import DashboardChart from '../../../../components/DashboardChart'
import DashboardPieChart from '../../../../components/charts/DashboardPieChart'
import DashboardLineChart from '../../../../components/charts/DashboardLineChart'
import DeleteTag from "../../../../components/Models/customers/DeleteTag"

function CustomerTagging() {
    const [type, setType] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState("manage")
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const [openBulk, setOpenBulk] = useState(false)
    const [sortBy, setSortBy] = useState("")
    const [date, setDate] = useState("")
    const [selId, setSelId] = useState("")
    const [openTag, setOpenTag] = useState(false)

    useEffect(() => {
        getData()
    }, [search, date, type, sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || manageTags)
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
                <CreateCustomersTag
                    id={selId}
                    onClose={() => {
                        setOpen(false)
                        setSelId("")
                    }}
                />
            }

            {openTag &&
                <DeleteTag
                    onClose={() => {
                        setOpenTag(false)
                    }}

                    onSave={() => {
                        setOpenTag(true)
                    }}
                />
            }

            {openBulk &&
                <BulkAssign
                    onClose={() => {
                        setOpenBulk(false)
                    }}

                    onSave={() => {
                        setOpenBulk(true)
                    }}
                />
            }
            <div className="inline-block">
                <div className='flex items-center gap-10 px-5 bg-white shadow-sm rounded-[10px]'>
                    <div
                        onClick={() => {
                            setView("manage")
                        }}
                        className={`${view === "manage" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                    >
                        Manage Tags
                    </div>

                    <div
                        onClick={() => {
                            setView("analytics")
                        }}
                        className={`${view === "analytics" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                    >
                        Analytics
                    </div>
                </div>
            </div>
            {view === "manage" && <div>
                <div>
                    <div className="flex justify-between items-start w-full mb-5 mt-3.5">
                        <Search
                            mainClass='max-w-[270px]!'
                            placeholder="Search by Tags"
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

                            <button
                                className='border border-border-color rounded-lg p-2 text-text3 text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'
                                onClick={() => { setOpenBulk(true) }}
                            >Bulk Change Tags</button>

                            <CustomSelectBox
                                class_="mt-0! w-24!"
                                defaultOption="Select"
                                selectClass_='py-[8px]!'
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value)
                                }}>
                                <option value="client">Client</option>
                                <option value="region">Region</option>
                            </CustomSelectBox>

                            <div className='shrink-0'>
                                <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[9.7px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0 w-full"
                                    onClick={() => { setOpen(true) }} >Create Customer Tag</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='table-class'>
                    {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                        <thead>
                            <tr>
                                <th><TableOrder title="Tag Name"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="name"
                                /></th>
                                <th><TableOrder title="Description"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="description"
                                /></th>
                                <th>
                                    <div className='flex justify-center'>
                                        <TableOrder title="Tagged Customers"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="tagged"
                                        /></div>
                                </th>
                                <th>
                                    <div className='flex justify-center'>
                                        <TableOrder title="Created By"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="created"
                                        /></div></th>
                                <th>
                                    <div className='flex justify-center'>
                                        Action
                                    </div>
                                </th>
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
                                        <div>{e.name}</div>
                                    </div>
                                </td>
                                <td>{e.description}</td>
                                <td className='text-primary! underline underline-offset-4'><div className='flex justify-center'>{e.customers}</div></td>
                                <td><div className='flex justify-center'>{e.created}</div></td>
                                <td>
                                    <div className='flex items-center gap-2 justify-center'>
                                        <button className='cursor-pointer' onClick={() => {
                                            setSelId("e.id")
                                            setOpen(true)
                                        }}>
                                            <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer' onClick={() => setOpenTag(true)}>
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
            </div>}
            {view === "analytics" && <div className="mt-3.5">
                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">Tag Distribution</h2>
                    <div className="flex gap-3.5">
                        <DateRange
                            value={date}
                            onChange={(e) => { setDate(e) }}
                        />
                        <CustomSelectBox
                            class_="mt-0! w-32!"
                            defaultOption="Select"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                            }}
                        >
                            <option value="subscription-plan">Client 1</option>
                            <option value="status">Client 2</option>
                        </CustomSelectBox>
                    </div>
                </div>
                {loading ? <Loading /> : <div className="mt-5">
                    <div className="grid grid-cols-2 items-start gap-5">
                        <DashboardChart title="Dummy Chart 1">
                            <div className="flex items-start">
                                <div className="w-[50%]">
                                    <DashboardPieChart
                                        labels={["5", "4", "3", "2", "1"]}
                                        colors={["#0396FF", "#16C098", "#FFAE4C", "#07DBFA", "#988AFC"]}
                                    />
                                </div>
                                <div className="mt-10 w-[50%]">
                                    <div className="flex items-center justify-between gap-3 mb-2">
                                        <div className='flex gap-2.5 items-center'>
                                            <div className="bg-primary h-3 w-3 rounded-full"></div>
                                            <div className="text-base text-secondary">VIP Tag Chart</div>
                                        </div>
                                        {/* <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} /> */}
                                        <div className="text-sm text-secondary">50%</div>
                                    </div>

                                    <div className="flex justify-between items-center gap-3 mb-2">
                                        <div className='flex items-center gap-2.5'>
                                            <div className="bg-success-light h-3 w-3 rounded-full"></div>
                                            <div className="text-base text-secondary">Negative Tag Chart</div>
                                        </div>
                                        {/* <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} /> */}
                                        <div className="text-sm text-secondary">20%</div>
                                    </div>

                                    <div className="flex justify-between items-center gap-3 mb-2">
                                        <div className='flex items-center gap-2.5'>
                                            <div className="bg-custom-yellow h-3 w-3 rounded-full"></div>
                                            <div className="text-base text-secondary">Needs Follow-up Tag Chart</div>
                                        </div>
                                        {/* <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} /> */}
                                        <div className="text-sm text-secondary">10%</div>
                                    </div>

                                    <div className="flex justify-between items-center gap-3 mb-2">
                                        <div className='flex items-center gap-2.5'>
                                            <div className="bg-[#07DBFA] h-3 w-3 rounded-full"></div>
                                            <div className="text-base text-secondary">Dummy-1</div>
                                        </div>
                                        {/* <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} /> */}
                                        <div className="text-sm text-secondary">10%</div>
                                    </div>

                                    <div className="flex justify-between items-center gap-3 mb-2">
                                        <div className='flex items-center gap-2.5'>
                                            <div className="bg-custom-purple h-3 w-3 rounded-full"></div>
                                            <div className="text-base text-secondary">Dummy-2</div>
                                        </div>
                                        {/* <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} /> */}
                                        <div className="text-sm text-secondary">10%</div>
                                    </div>
                                </div>
                            </div>
                        </DashboardChart>

                        <DashboardChart title="Dummy Chart 2" height={366} width={656} class_="w-full">
                            <DashboardLineChart />
                        </DashboardChart>
                    </div>
                </div>}
            </div>}
        </AdminLayout >
    )
}

export default CustomerTagging
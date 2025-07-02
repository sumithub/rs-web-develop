"use client"
import React, { useEffect, useState } from 'react';
import Status from "../../components/Status"
import TableOrder from '../../components/TableOrder';
import PaginationDemo from '../../components/Pagination';
import AdminLayout from '../../components/AdminLayout';
import Checkbox from '../../components/form/Checkbox';
import Search from '../../components/form/Search';
import Image from 'next/image';
import { customerJourney } from '../../constent/constArray';
import DateRange from '../../components/form/DateRangePicker';
import CustomSelectBox from '../../components/form/CustomSelectBox';
import axios from 'axios';
import { formatDate, getError } from '../../../helper';
import { toast } from 'react-toastify';
import Loading from "../../components/Loading"
import SecondaryButton from '../../components/common/SecondaryButton';
import CustomerJourneyView from "../../components/Models/customer-journey/CustomerJourneyView"

export default function CustomerJourney() {
    const [list, setList] = useState([])
    const [role, setRole] = useState("")
    const [search, setSearch] = useState("")
    const [dates, setDates] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState("")
    const [filterBy, setFilterBy] = useState("")
    const [filterBy1, setFilterBy1] = useState("")
    const [filterBy2, setFilterBy2] = useState("")
    const [filterBy3, setFilterBy3] = useState("")


    useEffect(() => {
        getCustomer()
    }, [search, role, dates, sortBy, filterBy, filterBy1, filterBy2, filterBy3])

    const getCustomer = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || customerJourney)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout>

            <div className='flex items-center justify-between gap-3 w-full'>
                <Search
                    mainClass='w-[35%]!'
                    placeholder="Search by Customer Name, Email, Phone, Event Type"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <div className='flex gap-3 items-center w-full'>

                    <DateRange
                        value={dates}
                        onChange={(e) => { setDates(e) }}
                    />

                    <CustomSelectBox
                        class_="mt-0! w-36!"
                        defaultOption="Filters"
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value)
                        }}>
                        <option value="filter1">Filter 1</option>
                        <option value="filter2">Filter 2</option>
                        <option value="filter3">Filter 3</option>
                    </CustomSelectBox>

                    <SecondaryButton title="Invite New User" class_='text-xs! w-32!' />
                </div>

            </div>

            <div className='my-5 flex items-center justify-between'>
                <div className="border border-border-color px-2 py-1 rounded-lg w-28 cursor-pointer">
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
                <div className='grid grid-cols-5 gap-4'>
                    <CustomSelectBox
                        class_="mt-0! w-36!"
                        defaultOption="Client"
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}>
                        <option value="client1">Client 1</option>
                        <option value="client2">Client 2</option>
                        <option value="client3">Client 3</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        class_="mt-0! w-36!"
                        defaultOption="Location"
                        value={filterBy1}
                        onChange={(e) => {
                            setFilterBy1(e.target.value)
                        }}>
                        <option value="location1">Location 1</option>
                        <option value="location2">Location 2</option>
                        <option value="location3">Location 3</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        class_="mt-0! w-36!"
                        defaultOption="Business Type"
                        value={filterBy2}
                        onChange={(e) => {
                            setFilterBy2(e.target.value)
                        }}>
                        <option value="type1">Type 1</option>
                        <option value="type2">Type 2</option>
                        <option value="type3">Type 3</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        class_="mt-0! w-36!"
                        defaultOption="Journey Type"
                        value={filterBy3}
                        onChange={(e) => {
                            setFilterBy3(e.target.value)
                        }}>
                        <option value="post">Post-Purchase Review</option>
                        <option value="negative">Negative Review Handling</option>
                        <option value="service">Service Feedback</option>
                    </CustomSelectBox>

                    <button className='border border-danger-light2 bg-danger-light2 rounded-lg p-2 text-danger text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'
                    ><Image src="images/refresh.svg" alt='refresh' height={16} width={16} unoptimized={true} />Reset Filters</button>
                </div>
            </div>

            <div className='table-class'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th><TableOrder title="Customer Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="customerName"
                            /></th>
                            <th><TableOrder title="Journey Type"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="journeyType"
                            /></th>
                            <th><TableOrder title="Status"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="status"
                            /></th>
                            <th><TableOrder title="Last Interaction"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="lastInteraction"
                            /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                            <td>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={e.selected}
                                        onChange={(checked) => {
                                            setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                        }}
                                    />
                                    <div>{e.num}</div>
                                </div>
                            </td>
                            <td>{e.name}</td>
                            <td>{e.type}</td>
                            <td><Status status={e.status} /></td>
                            <td>{formatDate(e.last)}</td>
                            <td>
                                <button className='cursor-pointer'>
                                    <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
                                </button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto h-20'>No Data</div>)}
            </div>
            {list?.length > 0 && <div>
                <PaginationDemo />
            </div>}
        </AdminLayout>
    )
}

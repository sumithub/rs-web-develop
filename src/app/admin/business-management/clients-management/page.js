"use client"
import { useState } from "react"
import AdminLayout from "../../../../components/AdminLayout"
import Search from "../../../../components/form/Search"
import DateRange from "../../../../components/form/DateRangePicker"
import CustomSelectBox from "../../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../../components/common/SecondaryButton"
import TableOrder from "../../../../components/TableOrder"
import Checkbox from "../../../../components/form/Checkbox"
import Status from "../../../../components/Status"
import Image from "next/image"
import PaginationDemo from "../../../../components/Pagination"
export default function ClientsManagement() {
    const [sortBy, setSortBy] = useState(false)

    const Business = [
        { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
        { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Suspend" },
        { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
        { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
        { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
        { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Suspend" },
        { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
        { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
        { name: "John Doe", industry: "Construction", plan: "Professional Plan", status: "Active" },
    ]
    return (
        <AdminLayout>
            <div className='flex items-center justify-between'>
                <Search
                    placeholder="Search by Client Name, Industry"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <div className='flex items-center gap-3'>
                    <DateRange
                        onChange={(e) => { setDate(e) }}
                    />
                    <CustomSelectBox
                        defaultOption="Status"
                        class_='mt-0! w-32!'
                    >
                        <option value="suspend">Suspend</option>
                        <option value="active">Active</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Filter By"
                        class_='mt-0! w-32!'
                    >
                        <option value="subscription-plan">Subscription Plan</option>
                        <option value="status">Status</option>
                    </CustomSelectBox>
                    <SecondaryButton
                        title="Add New Client"
                        type='submit'
                        class_="text-xs! font-normal!"
                    />
                </div>
            </div>
            <div className="table-class mt-3.5">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Client Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="clientName" /></th>
                            <th><TableOrder title="Industry" /></th>
                            <th><TableOrder title="Subscription Plan" /></th>
                            <th><TableOrder title="Status" /></th>
                            <th className="text-center!">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Business.map((e, i) =>
                            <tr key={i}>
                                <td>
                                    <div className="flex items-center gap-2.5">
                                        <Checkbox />
                                        <h2>{e.name}</h2>
                                    </div>
                                </td>
                                <td>{e.industry}</td>
                                <td>{e.plan}</td>
                                <td><Status status={e.status} /></td>
                                <td>
                                    <div className='flex w-auto items-center gap-2.5 justify-center'>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/play.svg" alt='play' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
            <PaginationDemo />
        </AdminLayout>
    )
}
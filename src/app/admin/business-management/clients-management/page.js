"use client"
import { useEffect, useState } from "react"
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
import SuspendUser from "../../../../components/Models/business-management/SuspendUser"
import AddNewClient from "../../../../components/Models/business-management/AddNewClient"
import Edit from "../../../../components/Models/business-management/Edit"
import axios from "axios"
import { toast } from "react-toastify"
import { getError } from "../../../../../helper"
import Loading from "../../../../components/Loading"
import { clientsManagement } from "../../../../constent/constArray"

export default function ClientsManagement() {
    const [sortBy, setSortBy] = useState(false)
    const [openUser, setOpenUser] = useState(false)
    const [openClient, setOpenClient] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [status, setStatus] = useState("")
    const [date, setDate] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [openEdit, setOpenEdit] = useState(false)

    useEffect(() => {
        getCustomerTag()
    }, [search, filterBy, date, status, sortBy])

    const getCustomerTag = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || clientsManagement)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout
            noCard={false}
            headerChild={
                <Search
                    mainClass='w-76!'
                    placeholder="Search"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />}>
            {openUser &&
                <SuspendUser
                    onClose={() => {
                        setOpenUser(false)
                    }}

                    onSave={() => {
                        setOpenUser(true)
                    }} />
            }

            {openClient &&
                <AddNewClient
                    onClose={() => {
                        setOpenClient(false)
                    }}

                    onSave={() => {
                        setOpenClient(true)
                    }} />
            }

            {openEdit &&
                <Edit
                    onClose={() => {
                        setOpenEdit(false)
                    }}

                    onSave={() => {
                        setOpenEdit(true)
                    }} />
            }
            <div className='flex items-center justify-between'>
                <Search
                    placeholder="Search by Client Name, Industry"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <div className='flex items-center gap-3.5'>
                    <DateRange
                        value={date}
                        onChange={(e) => { setDate(e) }}
                    />
                    <CustomSelectBox
                        defaultOption="Status"
                        class_='mt-0! w-32!'
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value)
                        }}
                    >
                        <option value="suspend">Suspend</option>
                        <option value="active">Active</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Filter By"
                        class_='mt-0! w-32!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="subscription-plan">Subscription Plan</option>
                        <option value="status">Status</option>
                    </CustomSelectBox>
                    <SecondaryButton
                        title="Add New Client"
                        class_="text-xs! font-normal!"
                        onClick={() => { setOpenClient(true) }}
                    />
                </div>
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Client Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="clientName" /></th>
                            <th><TableOrder title="Industry"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="industry" /></th>
                            <th><TableOrder title="Subscription Plan"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="plan" /></th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Status"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="status" />
                                </div>
                            </th>
                            <th className="text-center!">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((e, index) =>
                            <tr key={index}>
                                <td>
                                    <div className="flex items-center gap-2.5">
                                        <Checkbox
                                            checked={e.selected}
                                            onChange={(checked) => {
                                                setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                            }} />
                                        <div>{e.name}</div>
                                    </div>
                                </td>
                                <td>{e.industry}</td>
                                <td>{e.plan}</td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.status} />
                                    </div>
                                </td>
                                <td>
                                    <div className='flex w-auto items-center gap-2.5 justify-center'>
                                        <button className='cursor-pointer' onClick={() => { setOpenUser(true) }}>
                                            <Image unoptimized={true} src="/images/play.svg" alt='play' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer' onClick={() => { setOpenEdit(true) }}>
                                            <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
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
    )
}
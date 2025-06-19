"use client"
import AdminLayout from "../../../components/AdminLayout"
import Search from "../../../components/form/Search"
import DateRange from "../../../components/form/DateRangePicker"
import CustomSelectBox from "../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../components/common/SecondaryButton"
import TableOrder from "../../../components/TableOrder"
import Checkbox from "../../../components/form/Checkbox"
import Status from "../../../components/Status"
import Image from "next/image"
import PaginationDemo from "../../../components/Pagination"
import SuspendUser from "../../../components/Models/business-management/SuspendUser"
import AddNewClient from "../../../components/Models/business-management/AddNewClient"
import Edit from "../../../components/Models/business-management/Edit"
import axios from "axios"
import { toast } from "react-toastify"
import { getError } from "../../../../helper"
import Loading from "../../../components/Loading"
import { useEffect, useState } from "react"
import { userManagement } from "../../../constent/constArray"

export default function UserManagement() {
    const [openUser, setOpenUser] = useState(false)
    const [openClient, setOpenClient] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [filterBy1, setFilterBy1] = useState("")
    const [sortBy, setSortBy] = useState(false)
    const [date, setDate] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [openEdit, setOpenEdit] = useState(false)

    useEffect(() => {
        getCustomerTag()
    }, [search, filterBy, date, filterBy1, sortBy])

    const getCustomerTag = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || userManagement)
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
                    placeholder="Search by Name, Email"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <div className='flex items-center gap-3.5'>
                    <DateRange
                        onChange={(e) => { setDate(e) }}
                    />
                    <CustomSelectBox
                        defaultOption="Assigned Client"
                        class_='mt-0! w-32!'
                        value={filterBy1}
                        onChange={(e) => {
                            setFilterBy1(e.target.value)
                        }}
                    >
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Role"
                        class_='mt-0! w-32!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="admin">Admin</option>
                        <option value="owner">Owner</option>
                        <option value="manager">Manager</option>
                        <option value="guest">Guest</option>
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
                            <th><TableOrder title="Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name" /></th>
                            <th><TableOrder title="Email"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="email" /></th>
                            <th><TableOrder title="Role"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="role" /></th>
                            <th><TableOrder title="Assigned Client"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="client" /></th>
                            <th><TableOrder title="Status"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="status" /></th>
                            <th className="text-center!">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list?.map((e, index) =>
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
                                <td>{e.email}</td>
                                <td>{e.role}</td>
                                <td>{e.client}</td>
                                <td><Status status={e.status} /></td>
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
                {list?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>
        </AdminLayout>
    )
}
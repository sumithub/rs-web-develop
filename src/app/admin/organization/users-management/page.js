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
import axios from "axios"
import { toast } from "react-toastify"
import { getError } from "../../../../../helper"
import Loading from "../../../../components/Loading"
import { usersManagement } from "../../../../constent/constArray"
import UserCreation from "../../../../components/Models/organization/UserCreation"
import DeactivateUser from "../../../../components/Models/organization/DeactivateUser"

export default function UsersManagement() {
    const [sortBy, setSortBy] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [filterBy1, setFilterBy1] = useState("")
    const [date, setDate] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [openDeactivate, setOpenDeactivate] = useState(false)
    const [selId, setSelId] = useState("")

    useEffect(() => {
        getUsers()
    }, [search, filterBy, date, filterBy1, sortBy])

    const getUsers = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || usersManagement)
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
                <UserCreation
                    id={selId}
                    onClose={() => {
                        setSelId("")
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }} />
            }

            {openDeactivate &&
                <DeactivateUser
                    onClose={() => {
                        setOpenDeactivate(false)
                    }}

                    onSave={() => {
                        setOpenDeactivate(true)
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
                        value={date}
                        onChange={(e) => { setDate(e) }}
                    />
                    <CustomSelectBox
                        defaultOption="Assigned Client"
                        class_='mt-0! w-36!'
                        value={filterBy1}
                        onChange={(e) => {
                            setFilterBy1(e.target.value)
                        }}
                    >
                        <option value="client1">Client 1</option>
                        <option value="client2">Client 2</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Role"
                        class_='mt-0! w-28!'
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
                        title="Add New User"
                        class_="text-xs! font-normal!"
                        onClick={() => setOpen(true)}
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
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Role"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="role" />
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Assigned Client"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="client" />
                                </div>
                            </th>
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
                            <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
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
                                <td>
                                    <div className="flex justify-center">
                                        {e.role}
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex justify-center">
                                        <div className="line-clamp-1">
                                            {e.assignedClient}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.status} />
                                    </div>
                                </td>
                                <td>
                                    <div className='flex w-auto items-center gap-2.5 justify-center'>
                                        <button className='cursor-pointer'
                                            onClick={() => setOpenDeactivate(true)}>
                                            <Image unoptimized={true} src="/images/global.svg" alt='edit' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer' onClick={() => {
                                            setSelId("e.id")
                                            setOpen(true)
                                        }}>
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
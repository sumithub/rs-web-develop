"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import Search from "../../../components/form/Search"
import SecondaryButton from "../../../components/common/SecondaryButton"
import TableOrder from "../../../components/TableOrder"
import PaginationDemo from "../../../components/Pagination"
import axios from "axios"
import { toast } from "react-toastify"
import { formatDate, getError } from "../../../../helper"
import Loading from "../../../components/Loading"
import { globalRulesManagement } from "../../../constent/constArray"
import Image from "next/image"
import CreateClientRule from "../../../components/Models/client/CreateClientRule"
import DeleteClient from "../../../components/Models/client/DeleteClient"
import Status from "../../../components/Status"
import CustomSelectBox from "../../../components/form/CustomSelectBox"

export default function GlobalRulesManagement() {
    const [sortBy, setSortBy] = useState(false)
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [selId, setSelId] = useState("")
    const [openDelete, setOpenDelete] = useState(false)
    const [filterByFilter, setFilterByFilter] = useState("")

    useEffect(() => {
        getUsers()
    }, [search, sortBy, filterByFilter])

    const getUsers = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || globalRulesManagement)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout headerSearch={
            <Search
                mainClass='w-96!'
                placeholder="Search"
                onSearch={(s) => {
                    setSearch(s)
                }}
            />}>
            {open &&
                <CreateClientRule
                    id={selId}
                    onClose={() => {
                        setSelId("")
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }} />
            }

            {openDelete &&
                <DeleteClient
                    id={true}
                    onClose={() => {
                        setOpenDelete(false)
                    }}
                />
            }
            <div className='flex items-center justify-between'>

                <Search
                    mainClass="w-80!"
                    placeholder="Search"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />

                <div className='flex items-center gap-3.5'>

                    <CustomSelectBox
                        defaultOption="Filters"
                        class_='mt-0! w-36!'
                        value={filterByFilter}
                        onChange={(e) => {
                            setFilterByFilter(e.target.value)
                        }}
                    >
                        <option value="filter1">Filter 1</option>
                        <option value="filter2">Filter 2</option>
                    </CustomSelectBox>

                    <SecondaryButton
                        title="Add New Rule"
                        onClick={() => setOpen(true)}
                        class_="text-xs! font-normal!"
                    />
                </div>
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="ID"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="id" />
                            </th>
                            <th><TableOrder title="Event Type"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name" />
                            </th>
                            <th>
                                <TableOrder title="Condition"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="condition" />
                            </th>
                            <th className="text-center!">
                                Action
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Status"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="status" />
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Created Date"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="date" />
                                </div>
                            </th>
                            <th className="text-center!">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((e, index) =>
                            <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>
                                    <div>{e.id}</div>
                                </td>
                                <td>
                                    {e.eventType}
                                </td>
                                <td>
                                    {e.condition}
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.action} />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.status} />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        {formatDate(e.createdDate)}
                                    </div>
                                </td>
                                <td>
                                    <div className='flex w-auto items-center gap-2.5 justify-center'>
                                        <button className='cursor-pointer' onClick={() => {
                                            setSelId("e.id")
                                            setOpen(true)
                                        }}>
                                            <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer' onClick={() => {
                                            setOpenDelete(true)
                                        }}>
                                            <Image unoptimized={true} src="/images/delete1.svg" alt='edit' height={28} width={28} />
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
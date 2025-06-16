"use client"
import React, { useEffect, useState } from 'react'
import TableOrder from '../../components/TableOrder'
import PaginationDemo from '../../components/Pagination'
import AdminLayout from '../../components/AdminLayout'
import Search from '../../components/form/Search'
import { clientRules } from '../../constent/constArray'
import CustomSelectBox from '../../components/form/CustomSelectBox';
import { toast } from 'react-toastify'
import axios from 'axios'
import { formatDate, getError } from '../../../helper'
import Loading from '../../components/Loading'
import Status from '../../components/Status'
import Image from 'next/image'
import EditClientRule from "../../components/Models/client/EditClientRule"
import DeleteClient from "../../components/Models/client/DeleteClient"
import CreateClientRule from "../../components/Models/client/CreateClientRule"
import SecondaryButton from '../../components/common/SecondaryButton'

function ClientRulesManagement() {
    const [search, setSearch] = useState("")
    const [type, setType] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("")
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getTemplate()
    }, [search, type, sortBy])

    const getTemplate = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
            setList(res.data || clientRules)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout >
            {(openEdit === "edit") &&
                <EditClientRule
                    onClose={() => {
                        setOpenEdit(false)
                    }}
                />
            }

            {open &&
                <CreateClientRule
                    onClose={() => {
                        setOpen(false)
                    }}
                />
            }

            {(openDelete === "delete") &&
                <DeleteClient
                    onClose={() => {
                        setOpenDelete(false)
                    }}
                />
            }
            <div className="flex justify-between items-center w-full mb-4">
                <Search
                    placeholder="Search by  ID, Location And Client Name"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />

                <div className="flex items-center gap-3">
                    <CustomSelectBox
                        class_="mt-0! w-32!"
                        defaultOption="Filter"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </CustomSelectBox>

                    <SecondaryButton title="Add New Role" class_='text-xs! font-normal!'
                        onClick={() => { setOpen(true) }}/>
                </div>
            </div>

            <div className='table-class mt-[15px]'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="ID"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="id" /></th>
                            <th><TableOrder title="Client Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="clientName" /></th>
                            <th><TableOrder title="Location"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="location" /></th>
                            <th><TableOrder title="Event Type"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="eventType" /></th>
                            <th><TableOrder title="Condition"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="condition" /></th>
                            <th>Action</th>
                            <th><TableOrder title="Status"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="status" /></th>
                            <th><TableOrder title="Created Date"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="createdDate" /></th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.map((e, i) =>
                            <tr key={i}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.location}</td>
                                <td>{e.type}</td>
                                <td>{e.condition}</td>
                                <td>
                                    <Status status={e.action} />
                                </td>
                                <td>
                                    <Status status={e.status} />
                                </td>
                                <td>{formatDate(e.date)}</td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'
                                            onClick={() => { setOpenEdit("edit") }}>
                                            <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer'
                                            onClick={() => { setOpenDelete("delete") }}>
                                            <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>)}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
            </div>
            
              {list?.length > 0 && <div className='mt-8'>
                    <PaginationDemo />
                </div>}
        </AdminLayout>
    )
}

export default ClientRulesManagement
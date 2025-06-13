"use client"
import React, { useEffect, useState } from 'react'
import TableOrder from '../../components/TableOrder'
import PaginationDemo from '../../components/Pagination'
import AdminLayout from '../../components/AdminLayout'
import Search from '../../components/form/Search'
import { templates } from '../../constent/constArray'
import CustomSelectBox from '../../components/form/CustomSelectBox';
import { toast } from 'react-toastify'
import axios from 'axios'
import { getError } from '../../../helper'
import Loading from '../../components/Loading'
import Status from '../../components/Status'
import Image from 'next/image'
import EditClientRule from "../../components/Models/client/EditClientRule"
import DeleteClient from "../../components/Models/client/DeleteClient"
import CreateClientRule from "../../components/Models/client/CreateClientRule"

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
            setList(res.data || templates)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    const Projects = [
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "inactive", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Alert", status: "Active", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "inactive", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Alert", status: "Active", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "inactive", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
    ]

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
                        class_="mt-0!"
                        defaultOption="Filter"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </CustomSelectBox>

                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0"
                        onClick={() => { setOpen(true) }}>Add New Role</button>
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
                        {Projects.map((e, i) =>
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
                                <td>{e.date}</td>
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
                {list?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>
        </AdminLayout>
    )
}

export default ClientRulesManagement
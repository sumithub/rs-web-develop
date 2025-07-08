"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../../components/AdminLayout"
import Search from "../../../../components/form/Search"
import SecondaryButton from "../../../../components/common/SecondaryButton"
import TableOrder from "../../../../components/TableOrder"
import PaginationDemo from "../../../../components/Pagination"
import axios from "axios"
import { toast } from "react-toastify"
import { getError } from "../../../../../helper"
import Loading from "../../../../components/Loading"
import { planManagement } from "../../../../constent/constArray"
import Image from "next/image"
import CreatePlan from "../../../../components/Models/admin/CreatePlan"
import DeletePlan from "../../../../components/Models/admin/DeletePlan"

export default function PlanManagement() {
    const [sortBy, setSortBy] = useState(false)
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [selId, setSelId] = useState("")

    useEffect(() => {
        getUsers()
    }, [search, sortBy])

    const getUsers = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || planManagement)
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
                <CreatePlan
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
                <DeletePlan
                    onClose={() => {
                        setOpenDelete(false)
                    }}

                    onSave={() => {
                        setOpenDelete(true)
                    }} />
            }
            <div className='flex items-center justify-between'>

                <div className="font-medium">Plan Management</div>

                <SecondaryButton
                    title="Create New Plan"
                    onClick={() => setOpen(true)}
                    class_="text-xs! font-normal!"
                />
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Plan Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name" /></th>
                            <th><TableOrder title="Price"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="price" /></th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Discount"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="discount" />
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Email Quota"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="details" />
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="SMS Quota"
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
                                    <div>{e.planName}</div>
                                </td>
                                <td>{e.price}</td>
                                <td>
                                    <div className="flex justify-center">
                                        {e.discount}
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex justify-center">
                                        <div className="line-clamp-1">
                                            {e.email}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className="line-clamp-1">
                                            {e.sms}
                                        </div>
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
                                        <button className='cursor-pointer' onClick={() => setOpenDelete(true)}>
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
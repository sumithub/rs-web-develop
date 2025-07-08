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
import { subscriptionManagement } from "../../../../constent/constArray"
import Image from "next/image"
import SubscriptionUsageDetail from "../../../../components/Models/admin/SubscriptionUsageDetail"
import NewSubscription from "../../../../components/Models/admin/NewSubscription"
import Status from "../../../../components/Status"

export default function SubscriptionManagement() {
    const [sortBy, setSortBy] = useState(false)
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [selId, setSelId] = useState("")

    useEffect(() => {
        getUsers()
    }, [search, sortBy])

    const getUsers = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || subscriptionManagement)
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
                <NewSubscription
                    id={selId}
                    onClose={() => {
                        setSelId("")
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }} />
            }
            {openDetail &&
                <SubscriptionUsageDetail
                    id={true}
                    onClose={() => {
                        setOpenDetail(false)
                    }}

                    onSave={() => {
                        setOpenDetail(true)
                    }} />
            }
            <div className='flex items-center justify-between'>

                <div className="font-medium">Subscription Management</div>

                <SecondaryButton
                    title="Create New Subscription"
                    onClick={() => setOpen(true)}
                    class_="text-xs! font-normal!"
                />
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Subscription ID"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="id" />
                            </th>
                            <th><TableOrder title="Client Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name" />
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Plan"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="plan" />
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
                                    <div>{e.id}</div>
                                </td>
                                <td>
                                    {e.clientName}
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        {e.plan}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.status} />
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
                                        <button className='cursor-pointer' onClick={() => setOpenDetail(true)}>
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
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
import { invoiceManagement } from "../../../../constent/constArray"
import Image from "next/image"
import ViewInvoice from "../../../../components/Models/admin/ViewInvoice"
import Status from "../../../../components/Status"

export default function InvoiceManagement() {
    const [sortBy, setSortBy] = useState(false)
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getUsers()
    }, [search, sortBy])

    const getUsers = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || invoiceManagement)
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
                <ViewInvoice
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }} />
            }

            <div className='flex items-center justify-between'>

                <div className="font-medium">Invoice Management</div>

                <SecondaryButton
                    title="Generate New Invoice"
                    class_="text-xs! font-normal!"
                />
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Invoice ID"
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
                                    <TableOrder title="Amount"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="amount" />
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
                                        {e.amount}
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
                                            setOpen(true)
                                        }}>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
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
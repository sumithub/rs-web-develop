"use client"
import Image from "next/image"
import TableOrder from "../TableOrder"
import Checkbox from "../form/Checkbox"
import PaginationDemo from "../Pagination"
import { useEffect, useState } from "react"
import axios from "axios"
import { customerHistory } from "../../constent/constArray"
import { toast } from "react-toastify"
import Loading from "../Loading"
import { formatDateTime } from "../../../helper"
import DeleteCustomer from "../../components/Models/customers/DeleteCustomer"
import Download from "../Models/customers/Download"
import EditCustomerList from "../Models/customers/EditCustomerList"

export default function ListView() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState("")
    const [openDelete, setOpenDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)

    useEffect(() => {
        getHistory()
    }, [sortBy])

    const getHistory = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || customerHistory)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (<>

        {openDelete === "deleteCustomer" &&
            <DeleteCustomer
                onClose={() => {
                    setOpenDelete(false)
                }}

                onSave={() => {
                    setOpenDelete(true)
                }}
            />
        }

        {open &&
            <EditCustomerList
                onClose={() => {
                    setOpen(false)
                }}

                onSave={() => {
                    setOpen(true)
                }}
            />
        }

        {openDownload &&
            <Download
                onClose={() => {
                    setOpenDownload(false)
                }}

                onSave={() => {
                    setOpenDownload(true)
                }}
            />
        }
        <div className="table-class">
            {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                <thead>
                    <tr>
                        <th><TableOrder title="List Name"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="listName"
                        /></th>
                        <th>
                            <div className="flex justify-center">
                                <TableOrder title="Created On"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="createdOn"
                                /></div>
                        </th>
                        <th>
                            <div className="flex justify-center">
                                <TableOrder title="Source"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="source"
                                /></div>
                        </th>
                        <th>
                            <div className="flex justify-center">
                                <TableOrder title="Tagged Customers"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="taggedCustomers"
                                />
                            </div>
                        </th>
                        <th className="text-center!">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                        <td>
                            <div className="flex items-start gap-2">
                                <Checkbox
                                    checked={e.selected}
                                    onChange={(checked) => {
                                        setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                    }}
                                />
                                <div>{e.listName}</div>
                            </div>
                        </td>
                        <td><div className="flex justify-center">{formatDateTime(e.createdOn)}</div></td>
                        <td><div className="flex justify-center">{e.source}</div></td>
                        <td className="text-primary! underline underline-offset-2">
                            <div className="flex justify-center">
                                {e.taggedCustomers}
                            </div>
                        </td>
                        <td>
                            <div className='flex items-center gap-2 justify-center'>
                                <button className='cursor-pointer' onClick={() => { setOpen(true) }}>
                                    <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                </button>

                                <button className='cursor-pointer' onClick={() => { setOpenDelete("deleteCustomer") }}>
                                    <Image unoptimized={true} src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                </button>
                                <button className='cursor-pointer' onClick={() => { setOpenDownload(true) }}>
                                    <Image unoptimized={true} src="/images/download.svg" alt='download' height={28} width={28} />
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
    </>)
}
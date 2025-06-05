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
import DeleteList from "../Models/customers/DeleteList"
import RenameList from "../Models/customers/RenameList"
import Download from "../Models/customers/Download"
import AddCustomer from "../Models/customers/AddCustomer"

export default function ListView(date, search) {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState("")
    const [openDelete, setOpenDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)

    useEffect(() => {
        getHistory()
    }, [search, date, sortBy])

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
        {openDelete &&
            <DeleteList
                onClose={() => {
                    setOpenDelete(false)
                }}

                onSave={() => {
                    setOpenDelete(true)
                }}
            />
        }

        {open &&
            <AddCustomer
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
                        <th><TableOrder title="Created On"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="createdOn"
                        /></th>
                        <th><TableOrder title="Source"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="source"
                        /></th>
                        <th><TableOrder title="Tagged Customers"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="taggedCustomers"
                        /></th>
                        <th className="text-center!">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((e, index) => <tr key={index}>
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
                        <td>{formatDateTime(e.createdOn)}</td>
                        <td>{e.source}</td>
                        <td className="text-primary! underline underline-offset-2">{e.taggedCustomers}</td>
                        <td>
                            <div className='flex items-center gap-2 justify-center'>
                                <button className='cursor-pointer' onClick={() => { setOpen(true) }}>
                                    <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                </button>

                                <button className='cursor-pointer' onClick={() => { setOpenDelete(true) }}>
                                    <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                </button>
                                <button className='cursor-pointer' onClick={() => { setOpenDownload(true) }}>
                                    <Image src="/images/download.svg" alt='download' height={28} width={28} />
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
    </>)
}
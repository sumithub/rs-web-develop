"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import Search from "../../../components/form/Search"
import CustomSelectBox from "../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../components/common/SecondaryButton"
import TableOrder from "../../../components/TableOrder"
import Checkbox from "../../../components/form/Checkbox"
import Status from "../../../components/Status"
import PaginationDemo from "../../../components/Pagination"
import axios from "axios"
import { toast } from "react-toastify"
import { getError } from "../../../../helper"
import Loading from "../../../components/Loading"
import { widgetManagement } from "../../../constent/constArray"
import Image from "next/image"
import AssignWidget from "../../../components/Models/admin/AssignWidget"
import PublishToUser from "../../../components/Models/admin/PublishToUser"
import UnpublishUser from "../../../components/Models/admin/UnpublishUser"

export default function WidgetsManagement() {
    const [sortBy, setSortBy] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [filterByClients, setFilterByClients] = useState("")
    const [filterByType, setFilterByType] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [openPublish, setOpenPublish] = useState(false)
    const [openUnpublish, setOpenUnpublish] = useState(false)

    useEffect(() => {
        getUsers()
    }, [search, filterBy, filterByClients, filterByType, sortBy])

    const getUsers = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || widgetManagement)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout noCard={false}
            headerSearch={
                <Search
                    mainClass='w-96!'
                    placeholder="Search"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />}>
            {open &&
                <AssignWidget
                    id={open}
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }} />
            }

            {openPublish &&
                <PublishToUser
                    onClose={() => {
                        setOpenPublish(false)
                    }}

                    onSave={() => {
                        setOpenPublish(true)
                    }} />
            }

            {openUnpublish &&
                <UnpublishUser
                    onClose={() => {
                        setOpenUnpublish(false)
                    }}

                    onSave={() => {
                        setOpenUnpublish(true)
                    }} />
            }
            <div className='flex items-center justify-between'>
                <Search
                    placeholder="Search by.."
                    mainClass="w-[25%]!"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <div className='flex items-center gap-3.5'>

                    <CustomSelectBox
                        defaultOption="Type"
                        class_='mt-0! w-28!'
                        value={filterByType}
                        onChange={(e) => {
                            setFilterByType(e.target.value)
                        }}
                    >
                        <option value="dynamic">Dynamic</option>
                        <option value="static">Static</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Status"
                        class_='mt-0! w-28!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Assigned Clients"
                        class_='mt-0! w-40!'
                        value={filterByClients}
                        onChange={(e) => {
                            setFilterByClients(e.target.value)
                        }}
                    >
                        <option value="all">All</option>
                        <option value="selected">Selected</option>
                    </CustomSelectBox>


                    <SecondaryButton
                        title="Add Widget"
                        onClick={() => setOpen("assignWidget")}
                        class_="text-xs! font-normal!"
                    />
                </div>
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Widget Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name" /></th>
                            <th><TableOrder title="Type"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="type" /></th>
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
                                    <TableOrder title="Assigned Clients"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="assignedClients" />
                                </div>
                            </th>
                            <th> <div className='flex justify-center!'>
                                Actions
                            </div></th>
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
                                        <div>{e.widgetName}</div>
                                    </div>
                                </td>
                                <td>{e.type}</td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.status} />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className="line-clamp-1 text-primary underline">
                                            {e.assignedClients}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='flex w-auto items-center gap-2.5 justify-center'>
                                        <button className='cursor-pointer' onClick={() => {
                                            setOpen("editWidget")
                                        }}>
                                            <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer'
                                            onClick={() => {
                                                setOpen("assignWidgets")
                                            }}>
                                            <Image unoptimized={true} src="/images/document-2.svg" alt='play' height={28} width={28} />
                                        </button>
                                        {e.status === "Published" && <button className='cursor-pointer' onClick={() => {
                                            setOpenUnpublish(true)
                                        }}>
                                            <Image unoptimized={true} src="/images/published.svg" alt='eyes3' height={28} width={28} />
                                        </button>}
                                        {e.status === "Draft" && <button className='cursor-pointer' onClick={() => {
                                            setOpenPublish(true)
                                        }}>
                                            <Image unoptimized={true} src="/images/draft.svg" alt='eyes3' height={28} width={28} />
                                        </button>}
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
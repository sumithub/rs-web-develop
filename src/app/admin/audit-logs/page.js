"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import Search from "../../../components/form/Search"
import DateRange from "../../../components/form/DateRangePicker"
import CustomSelectBox from "../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../components/common/SecondaryButton"
import TableOrder from "../../../components/TableOrder"
import Status from "../../../components/Status"
import PaginationDemo from "../../../components/Pagination"
import axios from "axios"
import { toast } from "react-toastify"
import { formatDate, getError } from "../../../../helper"
import Loading from "../../../components/Loading"
import { auditLog } from "../../../constent/constArray"
import Switch from "../../../components/form/Switch"
import AuditLogDetail from "../../../components/Models/admin/AuditLogDetail"
import CancelButton from "../../../components/common/CancelButton"
import Image from "next/image"

export default function AuditLogs() {
    const [sortBy, setSortBy] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [filterByType, setFilterByType] = useState("")
    const [filterByClient, setFilterByClient] = useState("")
    const [date, setDate] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [enabled, setEnabled] = useState(true)

    useEffect(() => {
        getUsers()
    }, [search, filterBy, date, filterByClient, filterByType, sortBy, enabled])

    const getUsers = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || auditLog)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            {open &&
                <AuditLogDetail
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }} />
            }
            <div className='flex items-center justify-between gap-8'>
                <div className="w-[20%]!">
                    <Search
                        placeholder="Global Search"
                        mainClass="w-full!"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                </div>
                <div className='flex items-center gap-3.5 shrink-0'>

                    < div className="flex items-center gap-2 shrink-0">
                        <div className="font-medium text-xs">Auto-Refresh</div>
                        <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            class_={`${enabled ? 'bg-green-500' : 'bg-gray-300'
                                } relative inline-flex h-4 w-9 items-center rounded-full transition mb-0!`} />
                    </div>

                    <CustomSelectBox
                        defaultOption="Client"
                        class_='mt-0! w-28!'
                        value={filterByClient}
                        onChange={(e) => {
                            setFilterByClient(e.target.value)
                        }}
                    >
                        <option value="abcCorp">ABC Corp</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Location"
                        class_='mt-0! w-28!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="sydney">Sydney</option>
                    </CustomSelectBox>

                    <CancelButton title="User" class_="text-xs! bg-white! border border-border-color! py-2.5!" mainClass="shrink-0" />

                    <DateRange
                        class_="shrink-0"
                        value={date}
                        onChange={(e) => { setDate(e) }}
                    />

                    <CustomSelectBox
                        defaultOption="Action Type"
                        class_='mt-0! w-28!'
                        value={filterByType}
                        onChange={(e) => {
                            setFilterByType(e.target.value)
                        }}
                    >
                        <option value="editedCampaign">Edited Campaign</option>
                    </CustomSelectBox>

                    <CancelButton title="Module" class_="text-xs! bg-white! border border-border-color! py-2.5!" mainClass="shrink-0" />

                    <SecondaryButton
                        mainClass="shrink-0"
                        title="Export CSV/PDF"
                        onClick={() => toast.success("Exported Successfully")}
                        class_="text-xs! font-normal!"
                    />
                </div>
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Date"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="date" /></th>
                            <th><TableOrder title="Time"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="time" /></th>
                            <th><TableOrder title="Client"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="client" />
                            </th>
                            <th><TableOrder title="Location"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="location" />
                            </th>
                            <th><TableOrder title="User"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="user" />
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    Action
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Details"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="details" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((e, index) =>
                            <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>
                                    {formatDate(e.date)}
                                </td>
                                <td>{e.time}</td>
                                <td>{e.client}</td>
                                <td>
                                    <div className="line-clamp-1">
                                        {e.location}
                                    </div>
                                </td>
                                <td>
                                    <div className="line-clamp-1">
                                        {e.user}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.action} />
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-center gap-2'>
                                        <button className='cursor-pointer' onClick={() => setOpen(true)}>
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
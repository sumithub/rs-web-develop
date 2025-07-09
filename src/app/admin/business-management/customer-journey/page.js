"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../../components/AdminLayout"
import Search from "../../../../components/form/Search"
import DateRange from "../../../../components/form/DateRangePicker"
import CustomSelectBox from "../../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../../components/common/SecondaryButton"
import TableOrder from "../../../../components/TableOrder"
import Checkbox from "../../../../components/form/Checkbox"
import Status from "../../../../components/Status"
import PaginationDemo from "../../../../components/Pagination"
import axios from "axios"
import { toast } from "react-toastify"
import { formatDateTime, getError } from "../../../../../helper"
import Loading from "../../../../components/Loading"
import { customerJourney } from "../../../../constent/constArray"
import Switch from "../../../../components/form/Switch"
import CustomerJourney from "../../../../components/Models/admin/customer-journey/CustomerJourney"

export default function CustomersJourney() {
    const [sortBy, setSortBy] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [filterBySort, setFilterBySort] = useState("")
    const [date, setDate] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        getUsers()
    }, [search, filterBy, date, filterBySort, sortBy])

    const getUsers = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || customerJourney)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            {open &&
                <CustomerJourney
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }} />
            }
            <div className='flex items-center justify-between'>
                <Search
                    placeholder="Search by Customer Name, Email, Phone, Event Type"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <div className='flex items-center gap-3.5'>

                    < div className="flex items-center gap-4">
                        <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            class_={`${enabled ? 'bg-green-500' : 'bg-gray-300'
                                } relative inline-flex h-4 w-8 items-center rounded-full transition mt-2`} />
                        <div>Table</div>
                    </div>

                    <CustomSelectBox
                        defaultOption="Sort By"
                        class_='mt-0! w-28!'
                        value={filterBySort}
                        onChange={(e) => {
                            setFilterBySort(e.target.value)
                        }}
                    >
                        <option value="sort1">Sort 1</option>
                        <option value="sort2">Sort 2</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Event Type"
                        class_='mt-0! w-36!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="campaignAdded">Campaign Added</option>
                    </CustomSelectBox>

                    <DateRange
                        value={date}
                        onChange={(e) => { setDate(e) }}
                    />

                    <SecondaryButton
                        title="Export"
                        onClick={() => setOpen(true)}
                        class_="text-xs! font-normal!"
                    />
                </div>
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Customer Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name" /></th>
                            <th><TableOrder title="Contact Info Email/Phone number"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="email" /></th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Event Type"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="eventType" />
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
                                    <TableOrder title="Timestamp"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="timestamp" />
                                </div>
                            </th>
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
                                        <div>{e.clientName}</div>
                                    </div>
                                </td>
                                <td>{e.email}</td>
                                <td>
                                    <div className="flex justify-center">
                                        {e.type}
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex justify-center">
                                        <div className="line-clamp-1">
                                            {e.details}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.status} />
                                    </div>
                                </td>
                                <td>
                                    {formatDateTime(e.timestamp)}
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
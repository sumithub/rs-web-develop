"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import Search from "../../../components/form/Search"
import DateRange from "../../../components/form/DateRangePicker"
import CustomSelectBox from "../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../components/common/SecondaryButton"
import TableOrder from "../../../components/TableOrder"
import Status from "../../../components/Status"
import Image from "next/image"
import PaginationDemo from "../../../components/Pagination"
import axios from "axios"
import { toast } from "react-toastify"
import { formatDate, getError } from "../../../../helper"
import Loading from "../../../components/Loading"
import { campaignsManagement } from "../../../constent/constArray"

export default function CampaignsManagement() {
    const [sortBy, setSortBy] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [filterBy1, setFilterBy1] = useState("")
    const [filterBy2, setFilterBy2] = useState("")
    const [date, setDate] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCampaigns()
    }, [search, filterBy, date, filterBy1, filterBy2, sortBy])

    const getCampaigns = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || campaignsManagement)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout
            noCard={false}
            headerSearch={
                <Search
                    mainClass='w-76!'
                    placeholder="Search"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />}>
            <div className='flex items-center justify-between'>
                <Search
                    mainClass='w-76!'
                    placeholder="Search by Campaign Name, Client"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <div className='flex items-center gap-3.5'>

                    <CustomSelectBox
                        defaultOption="Filter By Type"
                        class_='mt-0! w-33!'
                        value={filterBy2}
                        onChange={(e) => {
                            setFilterBy2(e.target.value)
                        }}
                    >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                    </CustomSelectBox>

                    <DateRange
                        onChange={(e) => { setDate(e) }}
                    />

                    <CustomSelectBox
                        defaultOption="Client"
                        class_='mt-0! w-22!'
                        value={filterBy1}
                        onChange={(e) => {
                            setFilterBy1(e.target.value)
                        }}
                    >
                        <option value="client1">Client 1</option>
                        <option value="client2">Client 2</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Filter By Status"
                        class_='mt-0! w-33!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                    </CustomSelectBox>
                    <SecondaryButton
                        title="Create New Campaign"
                        class_="text-xs! font-normal!"
                    />
                </div>
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Campaign Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name" />
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Client"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="client" />
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Target Locations"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="targetLocation" />
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
                            <th><TableOrder title="Created On"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="createdOn" />
                            </th>
                            <th className="text-center!">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((e, index) =>
                            <tr key={index}>
                                <td>
                                    {e.name}
                                </td>
                                <td>{e.client}</td>
                                <td>
                                    <div className="flex justify-center">
                                        {e.targetLocation}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.status} context="notify" />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        {formatDate(e.createdOn)}
                                    </div>
                                </td>
                                <td>
                                    <div className='flex w-auto items-center gap-2.5 justify-center'>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eye' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer' >
                                            <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/global.svg" alt='globlal' height={28} width={28} />
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
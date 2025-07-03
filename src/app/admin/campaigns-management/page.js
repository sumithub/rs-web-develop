"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import Search from "../../../components/form/Search"
import DateRange from "../../../components/form/DateRangePicker"
import CustomSelectBox from "../../../components/form/CustomSelectBox"
import TableOrder from "../../../components/TableOrder"
import Status from "../../../components/Status"
import Image from "next/image"
import PaginationDemo from "../../../components/Pagination"
import axios from "axios"
import { toast } from "react-toastify"
import { formatDate, getError } from "../../../../helper"
import Loading from "../../../components/Loading"
import { campaignsManagement } from "../../../constent/constArray"
import Link from "next/link"
import SecondaryButton from "../../../components/common/SecondaryButton"

export default function CampaignsManagement() {
    const [sortBy, setSortBy] = useState(false)
    const [byStatus, setByStatus] = useState("")
    const [byClient, setByClient] = useState("")
    const [byType, setByType] = useState("")
    const [date, setDate] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCampaigns()
    }, [search, byStatus, date, byClient, byType, sortBy])

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
                        class_='mt-0! w-32!'
                        value={byType}
                        onChange={(e) => {
                            setByType(e.target.value)
                        }}
                    >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                    </CustomSelectBox>

                    <DateRange
                        value={date}
                        onChange={(e) => { setDate(e) }}
                    />

                    <CustomSelectBox
                        defaultOption="Client"
                        class_='mt-0! w-32!'
                        value={byClient}
                        onChange={(e) => {
                            setByClient(e.target.value)
                        }}>
                        <option value="client1">Client 1</option>
                        <option value="client2">Client 2</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Filter By Status"
                        class_='mt-0! w-32!'
                        value={byStatus}
                        onChange={(e) => {
                            setByStatus(e.target.value)
                        }}
                    >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                    </CustomSelectBox>
                    <SecondaryButton title="Create New Campaign" isLink={true} link="/manage-campaigns/detail" class_="text-xs! font-normal! py-[9px]!" />

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
                                <TableOrder title="Client"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="client" />
                            </th>
                            <th>
                                <TableOrder title="Target Locations"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="targetLocation" />
                            </th>
                            <th>
                                <TableOrder title="Status"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="status" />
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
                            <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>{e.name}</td>
                                <td>{e.client}</td>
                                <td>{e.targetLocation}</td>
                                <td><Status status={e.status} context="notify" /></td>
                                <td>{formatDate(e.createdOn)}</td>
                                <td>
                                    <div className='flex items-center gap-2.5 justify-center'>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eye' height={28} width={28} />
                                        </button>
                                        <Link href="/manage-campaigns/detail">
                                            <button className='cursor-pointer mt-2' >
                                                <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                            </button>
                                        </Link>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/global.svg" alt='global' height={28} width={28} />
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
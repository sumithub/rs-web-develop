"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import Search from "../../../components/form/Search"
import CustomSelectBox from "../../../components/form/CustomSelectBox"
import TableOrder from "../../../components/TableOrder"
import Status from "../../../components/Status"
import PaginationDemo from "../../../components/Pagination"
import axios from "axios"
import { toast } from "react-toastify"
import { getError } from "../../../../helper"
import Loading from "../../../components/Loading"
import { reviewsOversight } from "../../../constent/constArray"
import Switch from "../../../components/form/Switch"
import Image from "next/image"
import ReviewDetails from "../../../components/Models/reviews-oversight/ReviewDetails"
import DashboardCard from "../../../components/DashboardCard"

export default function ReviewsOversight() {
    const [sortBy, setSortBy] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [filterByExport, setFilterByExport] = useState("")
    const [filterBySort, setFilterBySort] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getReviews()
    }, [search, filterBy, filterBySort, filterByExport, sortBy])

    const getReviews = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || reviewsOversight)
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
                    mainClass='w-72!'
                    placeholder="Search"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />}>
            <div className="grid grid-cols-3 gap-x-4 gap-y-5 mb-5">
                <DashboardCard title="Total Reviews" count="15,432" img="/images/sms-star.svg" bgClass="bg-primary" textColor="text-primary" bgImage="bg-[url('/images/average2.png')]" />
                <DashboardCard title="Positive Reviews" count="78%" img="/images/chart-2.svg" bgClass="bg-success" textColor="text-success" bgImage="bg-[url('/images/positive.png')]" />
                <DashboardCard title="Neutral Reviews" count="15%" img="/images/activity.png" bgClass="bg-custom-yellow" textColor="text-custom-yellow" bgImage="bg-[url('/images/active3.png')]" />
                <DashboardCard title="Negative Reviews" count="7%" img="/images/chart-2.svg" bgClass="bg-danger" textColor="text-danger" bgImage="bg-[url('/images/negative.png')]" />
                <DashboardCard title="Most Reviewed Business" count="1,245" img="/images/activity.png" bgClass="bg-custom-yellow" textColor="text-custom-yellow" bgImage="bg-[url('/images/active3.png')]" />
                <DashboardCard title=" Most Active Review Source" count="65%" img="/images/chart-2.svg" bgClass="bg-success" textColor="text-success" bgImage="bg-[url('/images/positive.png')]" />
            </div>

            {open &&
                <ReviewDetails
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }} />
            }
            <div className='flex items-center justify-between'>
                <Search
                    placeholder="Search by Customer, Client, Review..."
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <div className='flex items-center gap-3.5'>

                    < div className="flex items-center gap-2">
                        <div>Table View</div>
                        <Switch class_="mt-2" />
                    </div>

                    <CustomSelectBox
                        defaultOption="Sort By"
                        class_='mt-0! w-36!'
                        value={filterBySort}
                        onChange={(e) => {
                            setFilterBySort(e.target.value)
                        }}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="rating">Rating High-Low</option>
                        <option value="lowHigh">Low-High</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Filters"
                        class_='mt-0! w-28!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="date">Date</option>
                        <option value="location">Location</option>
                        <option value="client">Client</option>
                        <option value="rating">Rating</option>
                        <option value="source">Source</option>
                        <option value="sentiment">Sentiment</option>
                        <option value="status">Status</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        defaultOption="Export"
                        class_='mt-0! w-28!'
                        value={filterByExport}
                        onChange={(e) => {
                            setFilterByExport(e.target.value)
                        }}
                    >
                        <option value="csv">CSV</option>
                        <option value="pdf">PDF</option>
                    </CustomSelectBox>

                </div>
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Client Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name" /></th>
                            <th>
                                <TableOrder title="Location"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="location" />
                            </th>
                            <th>
                                <TableOrder title="Customer"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="details" />
                            </th>
                            <th>
                                <TableOrder title="Rating"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="rating" />
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Sentiment"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="sentiment" />
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Review Source"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="sentiment" />
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="TimeStamp"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="timestamp" />
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    Actions
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((e, index) =>
                            <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>
                                    {e.clientName}
                                </td>
                                <td>
                                    {e.location}
                                </td>
                                <td>
                                    {e.customer}
                                </td>
                                <td>
                                    <div className="flex items-center gap-1">
                                        <Image src="/images/star.svg" alt="star" width={16} height={16} />
                                        <Image src="/images/star.svg" alt="star" width={16} height={16} />
                                        <Image src="/images/star.svg" alt="star" width={16} height={16} />
                                        <Image src="/images/star.svg" alt="star" width={16} height={16} />
                                        <Image src="/images/star.svg" alt="star" width={16} height={16} />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.sentiment} />
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex justify-center">
                                        <div className="line-clamp-1">
                                            {e.reviewSource}
                                        </div>
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex justify-center">
                                        <div className="line-clamp-1">
                                            {e.timestamp}
                                        </div>
                                    </div>
                                </td>
                                <td><div className="flex justify-center"><button onClick={() => setOpen(true)}>
                                    <Image src="/images/eyes3.svg" alt="eyes3" width={28} height={28} unoptimized={true} />
                                </button></div></td>
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
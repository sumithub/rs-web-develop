"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../../components/AdminLayout"
import DashboardCard from "../../../../components/DashboardCard"
import { locationCampaign, locationReviews } from "../../../../constent/constArray"
import { toast } from "react-toastify"
import { formatDate, getError } from "../../../../../helper"
import axios from "axios"
import Search from "../../../../components/form/Search"
import Loading from "../../../../components/Loading"
import TableOrder from "../../../../components/TableOrder"
import Checkbox from "../../../../components/form/Checkbox"
import Status from "../../../../components/Status"
import PaginationDemo from "../../../../components/Pagination"
import Image from "next/image"

export default function LocationDetails() {
    const [sortBy, setSortBy] = useState(false)
    const [view, setView] = useState("overview")
    const [search, setSearch] = useState("")
    const [reviews, setReviews] = useState([])
    const [campaign, setCampaign] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getData()
    }, [search, sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            setReviews([])
            setCampaign([])
            const res = await axios.get("/api")
            setReviews(res.data || locationReviews)
            setCampaign(res.data || locationCampaign)
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
                    mainClass='w-96!'
                    placeholder="Search"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />}>
            <div className="inline-block">
                <div className='flex items-center gap-10 px-5 bg-white shadow-sm rounded-[10px]'>
                    <div
                        onClick={() => {
                            setView("overview")
                        }}
                        className={`${view === "overview" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                    >
                        Overview
                    </div>

                    <div
                        onClick={() => {
                            setView("reviews")
                        }}
                        className={`${view === "reviews" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                    >
                        Reviews
                    </div>
                    <div
                        onClick={() => {
                            setView("campaign")
                        }}
                        className={`${view === "campaign" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                    >
                        Campaign
                    </div>
                </div>
            </div>
            <div>
                {view === "overview" && <div>
                    <div className="bg-secondary2 rounded-[15px] p-5 mt-3.5 flex justify-between items-center">
                        <div>
                            <h2 className="text-base">Client Name</h2>
                            <h2 className="text-lg font-medium pt-1.5">Client A</h2>
                        </div>
                        <hr className="border border-border-color w-16 h-full rotate-90" />
                        <div>
                            <h2 className="text-base">Location Name</h2>
                            <h2 className="text-lg font-medium pt-1.5">Melbourne CBD</h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Address</h2>
                            <h2 className="text-lg font-medium pt-1.5">123 Bourke St, Melbourne VIC 3000 </h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Phone</h2>
                            <h2 className="text-lg font-medium pt-1.5">+61 400 987 654</h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Email</h2>
                            <h2 className="text-lg font-medium pt-1.5">melbourne@smithautorepair.com</h2>
                        </div>
                    </div>
                    <hr className="border-t border-border2 my-5" />
                    {loading ? <Loading /> : <div>
                        <h2 className="text-lg font-semibold pb-5">Performance Stats</h2>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-5">
                            <DashboardCard title="Average Rating" count="4.2" img="/images/sms-star.svg" bgClass="bg-primary" textColor="text-primary" bgImage="bg-[url('/images/average2.png')]" />
                            <DashboardCard title="Total Reviews" count="5,200" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" bgImage="bg-[url('/images/total2.png')]" />
                            <DashboardCard title="Active Campaigns" count="02" img="/images/location2.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" bgImage="bg-[url('/images/active2.png')]" />
                            <DashboardCard title="Positive Sentiment" count="75%" img="/images/chart-2.svg" bgClass="bg-success" textColor="text-success" bgImage="bg-[url('/images/positive.png')]" />
                            <DashboardCard title="Negative Sentiment" count="12%" img="/images/chart-2.svg" bgClass="bg-danger" textColor="text-danger" bgImage="bg-[url('/images/negative.png')]" />
                        </div>
                    </div>}
                </div>}
            </div>
            {view === "reviews" && <div>
                <div className="bg-secondary2 rounded-[15px] p-5 mt-3.5 flex items-center">
                    <div>
                        <h2 className="text-base">Location Name</h2>
                        <h2 className="text-lg font-medium pt-1.5">Melbourne CBD</h2>
                    </div>
                    <hr className="border border-border-color w-16 h-full rotate-90" />
                    <div>
                        <h2 className="text-base">Client Name</h2>
                        <h2 className="text-lg font-medium pt-1.5">Client A</h2>
                    </div>
                </div>

                <div className="table-class mt-3.5">
                    {loading ? <Loading /> : (reviews?.length > 0 ? <table className="w-full">
                        <thead>
                            <tr>
                                <th><TableOrder title="Customer"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="customer" /></th>
                                <th><TableOrder title="Rating"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="rating" /></th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Review"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="review" />
                                    </div>
                                </th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Date"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="date" />
                                    </div>
                                </th>
                                <th><div className="flex justify-center">Response Status</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews?.map((e, index) => <tr key={index} className={index === reviews.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>
                                    <div className="flex items-center gap-2.5">
                                        <Checkbox
                                            checked={e.selected}
                                            onChange={(checked) => {
                                                setReviews(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                            }} />
                                        <div>{e.customer}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        {e.ratings?.map((rating, i) => (
                                            <div key={i} >
                                                <Image src={rating} alt="star" height={18} width={18} unoptimized={true} />
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className="line-clamp-1">
                                            {e.review}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        {formatDate(e.date)}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.status} context="left" />
                                    </div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                </div>
                {reviews?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>}
            {
                view === "campaign" && <div>
                    <div className="bg-secondary2 rounded-[15px] p-5 mt-3.5 flex items-center">
                        <div>
                            <h2 className="text-base">Location Name</h2>
                            <h2 className="text-lg font-medium pt-1.5">Melbourne CBD</h2>
                        </div>
                        <hr className="border border-border-color w-16 h-full rotate-90" />
                        <div>
                            <h2 className="text-base">Client Name</h2>
                            <h2 className="text-lg font-medium pt-1.5">Client A</h2>
                        </div>
                    </div>

                    <div className="table-class mt-3.5">
                        {loading ? <Loading /> : (campaign?.length > 0 ? <table className="w-full">
                            <thead>
                                <tr>
                                    <th><TableOrder title="Campaign Name"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="name" /></th>
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
                                            <TableOrder title="Responses"
                                                sortBy={sortBy}
                                                setSortBy={setSortBy}
                                                field="responses" />
                                        </div>
                                    </th>
                                    <th><div className="flex justify-center">Actions</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaign?.map((e, index) =>
                                    <tr key={index} className={index === campaign.length - 1 ? '' : 'border-b border-border-color'}>
                                        <td>
                                            <div className="flex items-center gap-2.5">
                                                <Checkbox
                                                    checked={e.selected}
                                                    onChange={(checked) => {
                                                        setCampaign(campaign => campaign.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                                    }} />
                                                <div>{e.name}</div>
                                            </div>
                                        </td>
                                        <td><div className="flex justify-center"><Status status={e.status} context="notify" /></div></td>
                                        <td><div className="flex justify-center">{e.responses}</div></td>
                                        <td>
                                            <div className="flex justify-center">
                                                <button className='cursor-pointer'>
                                                    <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                    </div>
                    {campaign?.length > 0 && <div>
                        <PaginationDemo />
                    </div>}
                </div>
            }
        </AdminLayout >
    )
}
"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../../components/AdminLayout"
import DashboardCard from "../../../../components/DashboardCard"
import { clientCampaign, clientLocation, clientSubscription } from "../../../../constent/constArray"
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
import SecondaryButton from "../../../../components/common/SecondaryButton"
import AddNewLocation from "../../../../components/Models/location/AddNewLocation"

export default function ClientDetails() {
    const [open, setOpen] = useState(false)
    const [sortBy, setSortBy] = useState(false)
    const [view, setView] = useState("overview")
    const [search, setSearch] = useState("")
    const [location, setLocation] = useState([])
    const [campaign, setCampaign] = useState([])
    const [subscription, setSubscription] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData()
    }, [search, sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            setLocation([])
            setCampaign([])
            setSubscription([])
            const res = await axios.get("/api")
            setLocation(res.data || clientLocation)
            setCampaign(res.data || clientCampaign)
            setSubscription(res.data || clientSubscription)
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
            {open &&
                <AddNewLocation
                    onClose={() => {
                        setOpen(false)
                    }}
                />
            }
            <div className="flex justify-between items-center">
                <div className="inline-block">
                    <div className='flex items-center gap-10 px-5 bg-white shadow-sm rounded-[10px]'>
                        <div
                            onClick={() => {
                                setView("overview")
                            }}
                            className={`${view === "overview" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer  py-[15px]`}
                        >
                            Overview
                        </div>

                        <div
                            onClick={() => {
                                setView("location")
                            }}
                            className={`${view === "location" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer  py-[15px]`}
                        >
                            Location
                        </div>

                        <div
                            onClick={() => {
                                setView("campaign")
                            }}
                            className={`${view === "campaign" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer  py-[15px]`}
                        >
                            Campaign
                        </div>

                        <div
                            onClick={() => {
                                setView("subscription")
                            }}
                            className={`${view === "subscription" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer  py-[15px]`}
                        >
                            Subscription
                        </div>
                    </div>
                </div>

                <div className="flex gap-3.5">
                    <button className="flex gap-2.5 items-center border border-text3/30 rounded-lg p-2.5 text-xs text-text3 hover:bg-text3/10">
                        Export Client Report
                        <span>
                            <Image unoptimized={true} src="/images/export-2.svg" alt="export-2" width={16} height={16} />
                        </span>
                    </button>
                    <button className="flex gap-2.5 items-center border border-text3/30 rounded-lg p-2.5 text-xs text-text3 hover:bg-text3/10">
                        Suspend Client
                        <span>
                            <Image unoptimized={true} src="/images/slash-2.svg" alt="slash-2" width={16} height={16} />
                        </span>
                    </button>
                    <button className="flex gap-2.5 items-center border border-text3/30 rounded-lg p-2.5 text-xs text-text3 hover:bg-text3/10">
                        Edit Client
                        <span>
                            <Image unoptimized={true} src="/images/edit-3.svg" alt="edit-3" width={16} height={16} />
                        </span>
                    </button>
                    <SecondaryButton title="Add Location" onClick={() => { setOpen(true) }} class_="text-sm font-normal!" />
                </div>
            </div>
            <div>
                {view === "overview" && <div>
                    <div className="bg-secondary2 rounded-[15px] p-5 mt-3.5 flex justify-between items-center">
                        <div className="">
                            <h2 className="text-base">Client Name</h2>
                            <h2 className="text-lg font-medium pt-1.5">Smith Auto Repair</h2>
                        </div>
                        <div className="flex items-center ">
                            <hr className="border border-border-color w-16 h-full rotate-90" />
                            <div className="w-full">
                                <h2 className="text-base">Industry</h2>
                                <h2 className="text-lg font-medium pt-1.5">Automotive Services</h2>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <hr className="border border-border-color w-16 rotate-90" />
                            <div>
                                <h2 className="text-base">Phone</h2>
                                <h2 className="text-lg font-medium pt-1.5">+61 400 987 654</h2>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <hr className="border border-border-color w-16 rotate-90" />
                            <div>
                                <h2 className="text-base">Email</h2>
                                <h2 className="text-lg font-medium pt-1.5">smithautorepair@gmail.com</h2>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <hr className="border border-border-color w-16 rotate-90" />
                            <div>
                                <h2 className="text-base">Website</h2>
                                <h2 className="text-lg font-medium pt-1.5">www.smithautorepair.com</h2>
                            </div>
                        </div>
                    </div>
                    <hr className="border-t border-border2 my-5" />
                    {loading ? <Loading /> : <div>
                        <h2 className="text-lg font-semibold pb-5">Performance Stats</h2>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-5">
                            <DashboardCard title="Average Rating" count="4.2" img="/images/sms-star.svg" bgClass="bg-primary" textColor="text-primary" bgImage="bg-[url('/images/average2.png')]" />
                            <DashboardCard title="Total Reviews" count="5,200" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" bgImage="bg-[url('/images/total2.png')]" />
                            <DashboardCard title="Total Location" count="05" img="/images/location2.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" bgImage="bg-[url('/images/active2.png')]" />
                            <DashboardCard title="Active Campaigns" count="04" img="/images/activity.png" bgClass="bg-custom-yellow" textColor="text-custom-yellow" bgImage="bg-[url('/images/active3.png')]" />
                            <DashboardCard title="Positive Sentiment" count="75%" img="/images/chart-2.svg" bgClass="bg-success" textColor="text-success" bgImage="bg-[url('/images/positive.png')]" />
                            <DashboardCard title="Negative Sentiment" count="12%" img="/images/chart-2.svg" bgClass="bg-danger" textColor="text-danger" bgImage="bg-[url('/images/negative.png')]" />
                        </div>
                    </div>}
                </div>}
            </div>
            {view === "location" && <div>
                <div className="table-class mt-3.5">
                    {loading ? <Loading /> : (location?.length > 0 ? <table className="w-full">
                        <thead>
                            <tr>
                                <th><TableOrder title="Location Name"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="name" /></th>
                                <th><TableOrder title="Address"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="address" /></th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Total Reviews"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="reviews" />
                                    </div>
                                </th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Average Rating"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="rating" />
                                    </div>
                                </th>
                                <th><div className="flex justify-center">Actions</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {location?.map((e, index) => <tr key={index} className={index === location.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>
                                    <div className="flex items-center gap-2.5">
                                        <Checkbox
                                            checked={e.selected}
                                            onChange={(checked) => {
                                                setLocation(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                            }} />
                                        <div>{e.name}</div>
                                    </div>
                                </td>
                                <td>{e.address}</td>
                                <td><div className="flex justify-center"> {e.reviews} </div></td>
                                <td>
                                    <div className="flex justify-center gap-1">
                                        <Image unoptimized={true} src="/images/star.svg" alt="star1" width={16} height={16} />
                                        {e.rating}
                                    </div>
                                </td>

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
                {location?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>}

            {view === "campaign" && <div>
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
                                        <TableOrder title="Locations Targeted"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="location" />
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
                                <th className="text-center!">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaign?.map((e, index) => <tr key={index} className={index === campaign.length - 1 ? '' : 'border-b border-border-color'}>
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
                                <td><div className="flex justify-center"><Status status={e.status} /></div></td>
                                <td><div className="flex justify-center">{e.locations}</div></td>
                                <td><div className="flex justify-center">{e.responses}</div></td>
                                <td>
                                    <div className="flex justify-center">
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} className="mx-auto" />
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
            </div>}

            {view === "subscription" && <div>
                <div className="bg-secondary2 rounded-[15px] p-5 flex justify-between items-center mt-3">
                    <div>
                        <h2 className="text-base">Plan</h2>
                        <h2 className="text-lg font-medium pt-1.5">Business Premium</h2>
                    </div>
                    <div className="flex gap-5 items-center">
                        <hr className="border border-border-color w-16 h-full rotate-90" />
                        <div>
                            <h2 className="text-base">Billing Cycle</h2>
                            <h2 className="text-lg font-medium pt-1.5">Monthly</h2>
                        </div>
                    </div>
                    <div className="flex gap-5 items-center">
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Next Renewal</h2>
                            <h2 className="text-lg font-medium pt-1.5">April 25, 2025</h2>
                        </div>
                    </div>
                    <div className="flex gap-5 items-center">
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Payment Method</h2>
                            <h2 className="text-lg font-medium pt-1.5">Credit Card (**** 5678)</h2>
                        </div>
                    </div>
                </div>
                <div className="table-class mt-3.5">
                    {loading ? <Loading /> : (subscription?.length > 0 ? <table className="w-full">
                        <thead>
                            <tr>
                                <th><TableOrder title="Invoice ID"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="id" /></th>
                                <th><TableOrder title="Invoice Date"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="date" /></th>
                                <th><TableOrder title="Amount"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="amount" /></th>
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
                                        <TableOrder title="Action"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="action" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscription?.map((e, index) => <tr key={index} className={index === subscription.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>{e.id}</td>
                                <td>{formatDate(e.date)}</td>
                                <td>{e.amount}</td>
                                <td><div className="flex justify-center"><Status status={e.status} /></div></td>
                                <td>
                                    <div className="flex justify-center">
                                        {e.status === "Paid" && <button className='cursor-pointer bg-primary/10 py-1 px-2.5 rounded-full'>
                                            <div className="flex items-center gap-2.5">
                                                <Image unoptimized={true} src="/images/arrow-down2.svg" alt='arrow-down2' height={16} width={16} />
                                                <h2 className="text-sm text-primary">Download PDF</h2>
                                            </div>
                                        </button>}
                                        {e.status === "Overdue" && <button className='cursor-pointer bg-success/10 py-1 px-2.5 rounded-full'>
                                            <div className="flex items-center gap-2.5">
                                                <Image unoptimized={true} src="/images/moneys.svg" alt='moneys' height={16} width={16} />
                                                <h2 className="text-sm text-success">Pay Now</h2>
                                            </div>
                                        </button>}
                                    </div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                </div>
                {subscription?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>}
        </AdminLayout>
    )
}
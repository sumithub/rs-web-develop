"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../../components/AdminLayout"
import DashboardCard from "../../../../components/DashboardCard"
import { clientCampaign, clientLocation, clientSubscription, locationCampaign, locationReviews } from "../../../../constent/constArray"
import { toast } from "react-toastify"
import { getError } from "../../../../../helper"
import axios from "axios"
import Search from "../../../../components/form/Search"
import Loading from "../../../../components/Loading"
import TableOrder from "../../../../components/TableOrder"
import Checkbox from "../../../../components/form/Checkbox"
import Status from "../../../../components/Status"
import PaginationDemo from "../../../../components/Pagination"
import Image from "next/image"
import CancelButton from "../../../../components/common/CancelButton"
import SecondaryButton from "../../../../components/common/SecondaryButton"
import AddNewLocation from "../../../../components/Models/location/AddNewLocation"

export default function ClientDetails() {
    const [open, setOpen] = useState(false)
    const [sortBy, setSortBy] = useState(false)
    const [view, setView] = useState("overview")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [list1, setList1] = useState([])
    const [list2, setList2] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getData()
    }, [search, sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
            setList(res.data || clientLocation)
            setList1(res.data || clientCampaign)
            setList2(res.data || clientSubscription)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }
    return (
        <AdminLayout
            noCard={false}
            headerChild={
                <Search
                    mainClass='w-76!'
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
                            className={`${view === "overview" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                        >
                            Overview
                        </div>

                        <div
                            onClick={() => {
                                setView("location")
                            }}
                            className={`${view === "location" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                        >
                            Location
                        </div>

                        <div
                            onClick={() => {
                                setView("campaign")
                            }}
                            className={`${view === "campaign" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                        >
                            Campaign
                        </div>

                        <div
                            onClick={() => {
                                setView("subscription")
                            }}
                            className={`${view === "subscription" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                        >
                            Subscription
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    <CancelButton title="Export Client Report" class_="w-[100%]!" />
                    <CancelButton title="Suspend Client" class_="w-[80%]!" />
                    <CancelButton title="Edit Client" class_="w-[60%]!" />
                    <SecondaryButton title="Add Location" onClick={() => { setOpen(true) }} />
                </div>
            </div>
            <div>
                {view === "overview" && <div>
                    <div className="bg-secondary2 rounded-[15px] p-5 mt-3.5 flex justify-between items-center">
                        <div>
                            <h2 className="text-base">Client Name</h2>
                            <h2 className="text-lg font-medium pt-1.5">Smith Auto Repair</h2>
                        </div>
                        <hr className="border border-border-color w-16 h-full rotate-90" />
                        <div>
                            <h2 className="text-base">Industry</h2>
                            <h2 className="text-lg font-medium pt-1.5">Automotive Services</h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Phone</h2>
                            <h2 className="text-lg font-medium pt-1.5">+61 400 987 654</h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Email</h2>
                            <h2 className="text-lg font-medium pt-1.5">smithautorepair@gmail.com</h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Website</h2>
                            <h2 className="text-lg font-medium pt-1.5">www.smithautorepair.com</h2>
                        </div>
                    </div>
                    <hr className="border-t border-border2 my-5" />
                    <div>
                        <h2 className="text-lg font-semibold pb-5">Performance Stats</h2>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-5">
                            <DashboardCard title="Average Rating" count="4.2" img="/images/tick-sms.svg" bgClass="bg-primary" textColor="text-primary" bgImage="bg-[url('/images/average2.png')]" />
                            <DashboardCard title="Total Reviews" count="5,200" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" bgImage="bg-[url('/images/total2.png')]" />
                            <DashboardCard title="Total Location" count="05" img="/images/location2.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" bgImage="bg-[url('/images/active2.png')]" />
                            <DashboardCard title="Active Campaigns" count="04" img="/images/active2.png" bgClass="bg-custom-yellow" textColor="text-custom-purple" bgImage="bg-[url('/images/active2.png')]" />
                            <DashboardCard title="Positive Sentiment" count="75%" img="/images/chart-2.svg" bgClass="bg-success" textColor="text-success" bgImage="bg-[url('/images/positive.png')]" />
                            <DashboardCard title="Negative Sentiment" count="12%" img="/images/chart-2.svg" bgClass="bg-danger" textColor="text-danger" bgImage="bg-[url('/images/negative.png')]" />
                        </div>
                    </div>
                </div>}
            </div>
            {view === "location" && <div>
                <div className="table-class mt-3.5">
                    {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
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
                                <th><TableOrder title="Total Reviews"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="reviews" /></th>
                                <th><TableOrder title="Average Rating"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="rating" /></th>
                                <th >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.map((e, index) =>
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center gap-2.5">
                                            <Checkbox
                                                checked={e.selected}
                                                onChange={(checked) => {
                                                    setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                                }} />
                                            <div>{e.name}</div>
                                        </div>
                                    </td>
                                    <td>{e.address}</td>
                                    <td>{e.reviews}</td>
                                    <td>{e.rating}</td>
                                    <td>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
                                        </button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                    {list?.length > 0 && <div>
                        <PaginationDemo />
                    </div>}
                </div>
            </div>}

            {view === "campaign" && <div>
                <div className="table-class mt-3.5">
                    {loading ? <Loading /> : (list1?.length > 0 ? <table className="w-full">
                        <thead>
                            <tr>
                                <th><TableOrder title="Campaign Name"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="name" /></th>
                                <th><TableOrder title="Status"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="status" /></th>
                                <th><TableOrder title="Locations Targeted"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="location" /></th>
                                <th><TableOrder title="Responses"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="responses" /></th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list1?.map((e, index) =>
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center gap-2.5">
                                            <Checkbox
                                                checked={e.selected}
                                                onChange={(checked) => {
                                                    setList1(list1 => list1.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                                }} />
                                            <div>{e.name}</div>
                                        </div>
                                    </td>
                                    <td><Status status={e.status} /></td>
                                    <td>{e.locations}</td>
                                    <td>{e.responses}</td>
                                    <td>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
                                        </button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                    {list1?.length > 0 && <div>
                        <PaginationDemo />
                    </div>}
                </div>
            </div>}

            {view === "subscription" && <div>
                <div className="table-class mt-3.5">
                    <div className="bg-secondary2 rounded-[15px] p-5 flex justify-between items-center">
                        <div>
                            <h2 className="text-base">Plan</h2>
                            <h2 className="text-lg font-medium pt-1.5">Business Premium</h2>
                        </div>
                        <hr className="border border-border-color w-16 h-full rotate-90" />
                        <div>
                            <h2 className="text-base">Billing Cycle</h2>
                            <h2 className="text-lg font-medium pt-1.5">Monthly</h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Next Renewal</h2>
                            <h2 className="text-lg font-medium pt-1.5">April 25, 2025</h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Payment Method</h2>
                            <h2 className="text-lg font-medium pt-1.5">Credit Card (**** 5678)</h2>
                        </div>

                    </div>
                    {loading ? <Loading /> : (list2?.length > 0 ? <table className="w-full mt-4">
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
                                <th><TableOrder title="Status"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="status" /></th>
                                <th><TableOrder title="Action"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list2?.map((e, index) =>
                                <tr key={index}>
                                    <td>{e.id}</td>
                                    <td>{e.date}</td>
                                    <td>{e.amount}</td>
                                    <td><Status status={e.status} /></td>
                                    <td>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
                                        </button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                    {list2?.length > 0 && <div>
                        <PaginationDemo />
                    </div>}
                </div>
            </div>}
        </AdminLayout>
    )
}
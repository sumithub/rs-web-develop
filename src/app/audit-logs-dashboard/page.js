"use client"
import AdminLayout from "../../components/AdminLayout";
import PaginationDemo from "../../components/Pagination";
import TableOrder from "../../components/TableOrder";
import Image from "next/image";
import Search from "../../components/form/Search";
import CustomSelectBox from "../../components/form/CustomSelectBox";
import Checkbox from "../../components/form/Checkbox";
import { useEffect, useState } from "react";
import axios from "axios";
import { getError } from "../../../helper";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { templates } from "../../constent/constArray";
import DatePicker from "../../components/form/DatePicker";
import AuditLogDetails from '../../components/Models/audit/AuditLogDetails'

export default function AuditLogsDashboard() {
    const [date, setDate] = useState("")
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState("")
    const [type1, setType1] = useState("")
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        getTemplate()
    }, [search, type, type1, sortBy, date])

    const getTemplate = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
            setList(res.data || templates)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }
    const Projects = [
        { id: "AL-001", subscription: "SUB-101", action: "File Uploaded", details: "John uploaded CSV file 'reviews.csv", performed: "john doe", timestamp: "Jun 18,2024 | 10:00AM", },
        { id: "AL-002", subscription: "SUB-102", action: "Customer Created", details: "Jane created new customer 'Acme Inc.", performed: "jane admin", timestamp: "Aug 18,2024 | 10:00AM", },
        { id: "AL-003", subscription: "SUB-103", action: "SMS Updated", details: "John updated SMS notifications from Off to On", performed: "john doe", timestamp: "Aug 18,2024 | 10:00AM", },
        { id: "AL-004", subscription: "SUB-104", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: "Jun 18,2024 | 10:00AM", },
        { id: "AL-005", subscription: "SUB-105", action: "File Uploaded", details: "John uploaded CSV file 'reviews.csv", performed: "john doe", timestamp: "Aug 18,2024 | 10:00AM", },
        { id: "AL-006", subscription: "SUB-106", action: "Customer updated", details: "Jane created new customer 'Acme Inc.", performed: "jane admin", timestamp: "Aug 18,2024 | 10:00AM", },
        { id: "AL-007", subscription: "SUB-107", action: "SMS Updated", details: "John updated SMS notifications from Off to On", performed: "john doe", timestamp: "Aug 18,2024 | 10:00AM", },
        { id: "AL-008", subscription: "SUB-108", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: "Aug 18,2024 | 10:00AM", },
        { id: "AL-008", subscription: "SUB-108", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: "Aug 18,2024 | 10:00AM", },
        { id: "AL-008", subscription: "SUB-108", action: "E-mail Uploaded", details: "Sarah changed the email template for review alerts", performed: "sarah admin", timestamp: "Aug 18,2024 | 10:00AM", },
    ]
    return (<>
        <AdminLayout>
            {open &&
                <AuditLogDetails
                    onClose={() => { setOpen(false) }}
                />}
            <div className="flex justify-between items-center gap-11">
                <div className="w-1/3">
                    <Search
                        mainClass='w-full!'
                        placeholder="Search logs by keywords"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                </div>
                <div className="flex gap-[15px]">

                    <DatePicker
                        icon={true}
                        mainClass="mt-0!"
                        value={date}
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => setDate(e)}
                    />

                    <CustomSelectBox
                        class_="mt-0!"
                        defaultOption="Select"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}>
                        <option value="fileUpload">File Upload</option>
                        <option value="Customerreated">Customer Created</option>
                        <option value="smsUpdated">SMS Updated</option>
                        <option value="email">E-mail Updated</option>
                        <option value="customerUpdated">Customer Updated</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        class_="mt-0!"
                        defaultOption="Filter"
                        value={type1}
                        onChange={(e) => {
                            setType1(e.target.value)
                        }}>
                        <option value="subscription">Subscription</option>
                        <option value="action">Action</option>
                    </CustomSelectBox>

                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50">
                        Reset</button>
                </div>
            </div>
            <div className='table-class mt-[15px]'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="ID"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="id" /></th>
                            <th><TableOrder title="Subscription ID"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="subscriptionId" /></th>
                            <th><TableOrder title="Action"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="action" /></th>
                            <th><TableOrder title="Details"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="details" /></th>
                            <th><TableOrder title="Performed By"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="performedBy" /></th>
                            <th><TableOrder title="Timestamp"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="timestamp" /></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Projects.map((e, i) =>
                            <tr key={i}>
                                <td>
                                    <div className="flex gap-2.5 items-center">
                                        <Checkbox />
                                        {e.id}
                                    </div>
                                </td>
                                <td>{e.subscription}</td>
                                <td className="capitalize">{e.action}</td>
                                <td className="capitalize">{e.details}</td>
                                <td className="capitalize">{e.performed}</td>
                                <td>{e.timestamp}</td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'
                                            onClick={() => { setOpen(true) }}>
                                            <Image src="/images/open-eye2.svg" alt='open-eye2' height={28} width={28} />
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
        </AdminLayout >
    </>)
}
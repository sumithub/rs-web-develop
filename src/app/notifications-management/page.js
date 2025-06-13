"use client"
import AdminLayout from "../../components/AdminLayout";
import PaginationDemo from "../../components/Pagination";
import TableOrder from "../../components/TableOrder";
import Search from "../../components/form/Search";
import CustomSelectBox from "../../components/form/CustomSelectBox";
import Status from "../../components/Status"
import Checkbox from "../../components/form/Checkbox";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../helper";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { templates } from "../../constent/constArray";
import Image from "next/image";

export default function NotificationManagement() {
    const [type, setType] = useState("")
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        getTemplate()
    }, [search, type, sortBy])

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
        { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
        { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
        { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
        { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
        { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
        { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
        { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
        { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
        { id: "NT-001", name: "Acme Corp", location: "NYC", medium: "Email", recipient: "User@example.com", message: "Welcome Email", status: "Sent", date: "Mar 03, 2024", },
    ]
    return (<>
        <AdminLayout>
            <div className="flex justify-between items-center gap-11">
                <div className="w-1/3">
                    <Search
                        mainClass='w-full!'
                        placeholder="Search by ID, Location And Client Name"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <CustomSelectBox
                        class_="mt-0!"
                        defaultOption="Filter"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}>
                        <option value="pending">Pending</option>
                        <option value="sent">Sent</option>
                        <option value="failed">Failed</option>
                    </CustomSelectBox>

                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0"
                        onClick={() => { toast.success("Resended Successfully") }}>Resend</button>
                </div>
            </div>
            <div className='table-class mt-[15px]'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="ID"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="id" /></th>
                            <th><TableOrder title="Client Name"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="clientName" /></th>
                            <th><TableOrder title="Location"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="location" /></th>
                            <th><TableOrder title="Medium"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="medium" /></th>
                            <th><TableOrder title="Recipient"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="recipient" /></th>
                            <th><TableOrder title="Message"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="message" /></th>
                            <th><TableOrder title="Status"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="status" /></th>
                            <th><TableOrder title="Created Date"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="createdDate" /></th>
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
                                <td>{e.name}</td>
                                <td>{e.location}</td>
                                <td>{e.medium}</td>
                                <td>{e.recipient}</td>
                                <td>{e.message}</td>
                                <td>
                                    <Status status={e.status} />
                                </td>
                                <td>{e.date}</td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'>
                                            <Image src="/images/open-eye2.svg" alt='open-eye2' height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer'>
                                            <Image src="/images/refresh1.svg" alt='refresh1' height={28} width={28} />
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
    </>)
}
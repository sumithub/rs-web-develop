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
import { formatDate, getError } from "../../../helper";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { alertsManagement } from "../../constent/constArray";

export default function AlertsManagement() {
    const [type, setType] = useState("")
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        getData()
    }, [search, type, sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || alertsManagement)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

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
                        class_="mt-0! w-32!"
                        defaultOption="Filter"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}>
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="dismissed">Dismissed</option>
                    </CustomSelectBox>

                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0"
                        onClick={() => { toast.success("Marked Successfully") }}>Mark As Read</button>
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
                            <th><TableOrder title="Event Type"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="eventType" /></th>
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
                        {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                            <td>
                                <div className="flex gap-2.5 items-center">
                                    <Checkbox
                                        checked={e.selected}
                                        onChange={(checked) => {
                                            setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                        }}
                                    />
                                    {e.id}
                                </div>
                            </td>
                            <td>{e.name}</td>
                            <td>{e.location}</td>
                            <td>{e.type}</td>
                            <td>{e.message}</td>
                            <td>
                                <Status status={e.status} />
                            </td>
                            <td>{formatDate(e.date)}</td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <div className='cursor-pointer' onClick={() => toast.success("Read Successfully")}><Status status="Read" /></div>
                                    <div className='cursor-pointer' onClick={() => toast.success("Dismissed Successfully")}><Status status="Dismiss" /></div>
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
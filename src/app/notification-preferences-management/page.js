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
import EditNotificationPreferences from "../../components/Models/notification/EditNotificationPreference";
import DeleteNotification from "../../components/Models/notification/DeleteNotification";

export default function NotificationManagement() {
    const [type, setType] = useState("")
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("")
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

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
        { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "yes", date: "Mar 03, 2024", },
        { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "yes", date: "Mar 03, 2024", },
        { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "NO", date: "Mar 03, 2024", },
        { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "Yes", date: "Mar 03, 2024", },
        { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "Yes", date: "Mar 03, 2024", },
        { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "Yes", date: "Mar 03, 2024", },
        { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "No", date: "Mar 03, 2024", },
        { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "Yes", date: "Mar 03, 2024", },
        { id: "NP-001", name: "Acme Corp", location: "Global", type: "Email", enabled: "Yes", date: "Mar 03, 2024", },
    ]
    return (<>
        <AdminLayout>
            {(openEdit === "edit") &&
                <EditNotificationPreferences
                    onClose={() => {
                        setOpenEdit(false)
                    }}
                />
            }

            {(openDelete === "delete") &&
                <DeleteNotification
                    onClose={() => {
                        setOpenDelete(false)
                    }}
                />
            }
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
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="alert">Alert</option>
                    </CustomSelectBox>

                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0"
                        onClick={() => { setOpenEdit("edit") }} >Edit Preferences</button>
                </div>
            </div>
            <div className='table-class mt-[15px]'>
                {loading ? <Loading /> : (list?.length > 0 ? < table className='w-full' >
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
                            <th><TableOrder title="Preference Type"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="preferenceType" /></th>
                            <th><TableOrder title="Enabled"
                                setSortBy={setSortBy}
                                sortBy={sortBy}
                                field="enabled" /></th>
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
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.location}</td>
                                <td>{e.type}</td>
                                <td>
                                    <Status status={e.enabled} />
                                </td>
                                <td>{e.date}</td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'
                                            onClick={() => { setOpenEdit("edit") }}>
                                            <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer'
                                            onClick={() => setOpenDelete("delete")}>
                                            <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>)}
                    </tbody>
                </table > : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
            </div>
            {list?.length > 0 && <div>
                <PaginationDemo />
            </div>}
        </AdminLayout>
    </>)
}
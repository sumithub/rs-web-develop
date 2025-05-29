"use client"
import AdminLayout from "../../components/AdminLayout";
import PaginationDemo from "../../components/Pagination";
import TableOrder from "../../components/TableOrder";
import Image from "next/image";
import Search from "../../components/form/Search";
import CustomSelectBox from "../../components/form/CustomSelectBox";
import Status from "../../components/Status"
import Checkbox from "../../components/form/Checkbox";

export default function NotificationsManagement() {
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
                <div className="flex gap-[15px]">
                    <CustomSelectBox
                        defaultOption="Filters"
                        class_='mt-0! w-28!'
                        selectClass_="py-2.5! px-2.5!"
                        // value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="tags">Tags</option>
                        <option value="source: manual vs. imported">Source: Manual vs. Imported</option>
                    </CustomSelectBox>
                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                    // onClick={() => { setOpen(true) }}
                    >
                        Resend</button>
                </div>
            </div>
            <div className='table-class mt-[15px]'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="ID" /></th>
                            <th><TableOrder title="Client Name" /></th>
                            <th><TableOrder title="Location" /></th>
                            <th><TableOrder title="Medium" /></th>
                            <th><TableOrder title="Recipient" /></th>
                            <th><TableOrder title="Message" /></th>
                            <th><TableOrder title="Status" /></th>
                            <th><TableOrder title="Created Date" /></th>
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
                </table>
            </div>
            <PaginationDemo />
        </AdminLayout>
    </>)
}
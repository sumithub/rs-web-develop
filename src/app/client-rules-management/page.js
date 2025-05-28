"use client"
import AdminLayout from "../../components/AdminLayout";
import PaginationDemo from "../../components/Pagination";
import TableOrder from "../../components/TableOrder";
import Image from "next/image";
import Status from "../../components/Status";
import Search from "../../components/form/Search";
import CustomSelectBox from "../../components/form/CustomSelectBox";

export default function ClientRulesManagement() {
    const Projects = [
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "inactive", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Alert", status: "Active", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "inactive", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Alert", status: "Active", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "inactive", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },
        { id: "CR-001", name: "Acme Corp", location: "NYC", type: "New_review", condition: "Rating <3", action: "Notify", status: "Active", date: "Mar 03, 2024", },

    ]
    return (<>
        <AdminLayout>
            <div className="flex justify-between items-center gap-11">
                <div className="w-1/4">
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
                        defaultOption="filters"
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
                        Add New Rule</button>
                </div>
            </div>
            <div className='table-class mt-[15px]'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="ID" /></th>
                            <th><TableOrder title="Client Name" /></th>
                            <th><TableOrder title="Location" /></th>
                            <th><TableOrder title="Event Type" /></th>
                            <th><TableOrder title="Condition" /></th>
                            <th>Action</th>
                            <th><TableOrder title="Status" /></th>
                            <th><TableOrder title="Created Date" /></th>
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
                                <td>{e.condition}</td>
                                <td>
                                    <Status status={e.action} />
                                </td>
                                <td>
                                    <Status status={e.status} />
                                </td>
                                <td>{e.date}</td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'>
                                            <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer'>
                                            <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
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
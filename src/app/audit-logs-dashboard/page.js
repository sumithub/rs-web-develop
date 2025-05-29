"use client"
import AdminLayout from "../../components/AdminLayout";
import PaginationDemo from "../../components/Pagination";
import TableOrder from "../../components/TableOrder";
import Image from "next/image";
import Search from "../../components/form/Search";
import CustomSelectBox from "../../components/form/CustomSelectBox";
import Checkbox from "../../components/form/Checkbox";
import DatePicker from "../../components/form/DatePicker";

export default function AuditLogsDashboard() {
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
                        mainClass="mt-0! w-28!"
                        icon="/images/calendar1.svg"
                        class_=""
                    />
                    <CustomSelectBox
                        defaultOption="Action"
                        class_='mt-0! w-24!'
                        selectClass_="py-2.5! px-2.5!"
                        // value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    >
                        <option value="tags">Tags</option>
                        <option value="source: manual vs. imported">Source: Manual vs. Imported</option>
                    </CustomSelectBox>
                    <CustomSelectBox
                        defaultOption="Subscription"
                        class_='mt-0! w-32!'
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
                        Reset</button>
                </div>
            </div>
            <div className='table-class mt-[15px]'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="ID" /></th>
                            <th><TableOrder title="Subscription ID" /></th>
                            <th><TableOrder title="Action" /></th>
                            <th><TableOrder title="Details" /></th>
                            <th><TableOrder title="Performed By" /></th>
                            <th><TableOrder title="Timestamp" /></th>
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
                                        <button className='cursor-pointer'>
                                            <Image src="/images/open-eye2.svg" alt='open-eye2' height={28} width={28} />
                                        </button>

                                        {/* <button className='cursor-pointer'>
                                            <Image src="/images/refresh1.svg" alt='refresh1' height={28} width={28} />
                                        </button> */}
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
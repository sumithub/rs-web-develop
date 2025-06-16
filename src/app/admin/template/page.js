"use client"
import { useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import TableOrder from "../../../components/TableOrder"
import PaginationDemo from "../../../components/Pagination"
import Image from "next/image"
import Search from "../../../components/form/Search"
import CustomSelectBox from "../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../components/common/SecondaryButton"
export default function Template() {
    const [sortBy, setSortBy] = useState(false)

    const Business = [
        { name: "Nature Template", type: "Email", subject: "Manager", updated: "Mar 22,2024" },
        { name: "Nature Template", type: "SMS", subject: "Manager", updated: "Mar 22,2024" },
        { name: "Nature Template", type: "Email", subject: "Manager", updated: "Mar 22,2024" },
        { name: "Nature Template", type: "Email", subject: "Manager", updated: "Mar 22,2024" },
        { name: "Nature Template", type: "SMS", subject: "Manager", updated: "Mar 22,2024" },
        { name: "Nature Template", type: "Email", subject: "Manager", updated: "Mar 22,2024" },
        { name: "Nature Template", type: "SMS", subject: "Manager", updated: "Mar 22,2024" },
        { name: "Nature Template", type: "Email", subject: "Manager", updated: "Mar 22,2024" },
        { name: "Nature Template", type: "Email", subject: "Manager", updated: "Mar 22,2024" },
        { name: "Nature Template", type: "SMS", subject: "Manager", updated: "Mar 22,2024" },
    ]
    return (
        <AdminLayout>
            <div>
                <div className='flex items-center justify-between'>
                    <Search
                        placeholder="Search Templates"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <div className='flex items-center gap-3.5'>
                        <CustomSelectBox
                            defaultOption="All Templates"
                            class_='mt-0! w-48!'
                        >
                            <option value="subscription-plan">Email Templates</option>
                            <option value="status">SMS Templates</option>
                            <option value="status">Review Response Templates</option>
                            <option value="status">Archived Templates</option>
                        </CustomSelectBox>
                        <SecondaryButton
                            title="Create New Template"
                            type='submit'
                            class_="text-xs! font-normal!"
                        />
                    </div>
                </div>
                <div className="table-class mt-3.5">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th><TableOrder title="Name"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="TagName" /></th>
                                <th><TableOrder title="Type" /></th>
                                <th><TableOrder title=" Subject" /></th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Last Updated" />
                                    </div>
                                </th>
                                <th className="text-center!">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Business.map((e, i) =>
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>{e.type}</td>
                                    <td className="text-center!">{e.subject}</td>
                                    <td className="text-center!">{e.updated}</td>
                                    <td>
                                        <div className='flex w-auto items-center gap-2.5 justify-center'>
                                            <button className='cursor-pointer'>
                                                <Image unoptimized={true} src="/images/copy.svg" alt='copy' height={28} width={28} />
                                            </button>
                                            <button className='cursor-pointer'>
                                                <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
                                            </button>
                                            <button className='cursor-pointer'>
                                                <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                            </button>
                                            <button className='cursor-pointer'>
                                                <Image unoptimized={true} src="/images/delete1.svg" alt='delete1' height={28} width={28} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                <PaginationDemo />
            </div>
        </AdminLayout>
    )
}
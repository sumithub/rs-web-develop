"use client"

import { useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import Checkbox from "../../../components/form/Checkbox"
import TableOrder from "../../../components/TableOrder"
import PaginationDemo from "../../../components/Pagination"
import Image from "next/image"
import Search from "../../../components/form/Search"
import CustomSelectBox from "../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../components/common/SecondaryButton"
import DateRange from "../../../components/form/DateRangePicker"
import Status from "../../../components/Status"
export default function UsersManagement() {
    const [sortBy, setSortBy] = useState(false)

    const Business = [
        { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
        { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
        { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
        { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
        { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
        { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
        { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
        { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
        { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
        { name: "Jaydon George", email: "JaydonGeorge@gmail.com", role: "Manager", client: "Xyz...", status: "activate" },
    ]
    return (
        <AdminLayout>
            <div>
                <div className='flex flex-wrap items-center justify-between'>
                    <Search
                        placeholder="Search by Name, Email"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <div className='flex items-center gap-3.5'>
                        <DateRange
                            onChange={(e) => { setDate(e) }}
                        />
                        <CustomSelectBox
                            defaultOption="Assigned Client"
                            class_='mt-0! w-36!'
                        >
                            <option value="subscription-plan">Client</option>
                            <option value="status">Region</option>
                        </CustomSelectBox>
                        <CustomSelectBox
                            defaultOption="Role"
                            class_='mt-0! w-24!'
                        >
                            <option value="subscription-plan">Admin</option>
                            <option value="status">Owner</option>
                            <option value="status">Manager</option>
                            <option value="status">Guest</option>
                        </CustomSelectBox>
                        <SecondaryButton
                            title="Add New User"
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
                                <th><TableOrder title="Email" /></th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Role" />
                                    </div>
                                </th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Assigned Client" />
                                    </div>
                                </th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Status" />
                                    </div>
                                </th>
                                <th className="text-center!">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Business.map((e, i) =>
                                <tr key={i}>
                                    <td>
                                        <div className="flex items-center gap-2.5">
                                            <Checkbox />
                                            <h2>{e.name}</h2>
                                        </div>
                                    </td>
                                    <td>{e.email}</td>
                                    <td className="text-center!">{e.role}</td>
                                    <td className="text-center!">{e.client}</td>
                                    <td className="text-center!"><Status status={e.status} /></td>
                                    <td>
                                        <div className='flex w-auto items-center gap-2.5 justify-center'>
                                            <button className='cursor-pointer'>
                                                <Image unoptimized={true} src="/images/slash.svg" alt='slash' height={28} width={28} />
                                            </button>
                                            <button className='cursor-pointer'>
                                                <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
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
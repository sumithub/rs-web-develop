"use client"

import { useState } from "react"
import AdminLayout from "../../../../components/AdminLayout"
import Search from "../../../../components/form/Search"
import CustomSelectBox from "../../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../../components/common/SecondaryButton"
import TableOrder from "../../../../components/TableOrder"
import Checkbox from "../../../../components/form/Checkbox"
import Image from "next/image"
import PaginationDemo from "../../../../components/Pagination"


export default function LocationsManagement() {
    const [sortBy, setSortBy] = useState(false)

    const Business = [
        { name: "Location-1", address: "123 Main St.", client: "Xyz..", count: "50" },
        { name: "Location-2", address: "123 Main St.", client: "Xyz..", count: "100" },
        { name: "Location-3", address: "123 Main St.", client: "Xyz..", count: "30" },
        { name: "Location-4", address: "123 Main St.", client: "Xyz..", count: "35" },
        { name: "Location-5", address: "123 Main St.", client: "Xyz..", count: "50" },
        { name: "Location-6", address: "123 Main St.", client: "Xyz..", count: "20" },
        { name: "Location-7", address: "123 Main St.", client: "Xyz..", count: "80" },
        { name: "Location-8", address: "123 Main St.", client: "Xyz..", count: "100" },
        { name: "Location-9", address: "123 Main St.", client: "Xyz..", count: "50" },
        { name: "Location-10", address: "123 Main St.", client: "Xyz..", count: "30" },
    ]
    return (
        <AdminLayout>
            <div className='flex items-center justify-between'>
                <Search
                    placeholder="Search by Location Name, Address"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <div className='flex items-center gap-3.5'>
                    <CustomSelectBox
                        defaultOption="Filter By"
                        class_='mt-0! w-32!'
                    >
                        <option value="subscription-plan">Client</option>
                        <option value="status">Region</option>
                    </CustomSelectBox>
                    <SecondaryButton
                        title="Add New Location"
                        type='submit'
                        class_="text-xs! font-normal!"
                    />
                </div>
            </div>
            <div className="table-class mt-3.5">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Location Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="LocationName" /></th>
                            <th><TableOrder title="Address" /></th>
                            <th><TableOrder title="Assigned Client" /></th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Reviews Count" />
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
                                <td>{e.address}</td>
                                <td>{e.client}</td>
                                <td className="text-center!">{e.count}</td>
                                <td>
                                    <div className='flex w-auto items-center gap-2.5 justify-center'>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/play.svg" alt='play' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
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
        </AdminLayout>
    )
}
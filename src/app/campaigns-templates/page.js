"use client"
import React, { useState } from 'react'
import Dropdown from '../../components/DropDown'
import TableOrder from '../../components/TableOrder'
import PaginationDemo from '../../components/Pagination'
import AdminLayout from '../../components/AdminLayout'
import Search from '../../components/form/Search'
import DatePicker from '../../components/form/DatePicker'
import Select from '../../components/form/Select'

function CampaignsTemplates() {
    const [search, setSearch] = useState("")
    const [type, setType] = useState("")
    const [date, setDate] = useState("")

    return (
        <AdminLayout >

            <div className="flex justify-between items-center w-full mb-4">
                <Search
                    placeholder="Search by Template Name"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />

                <div className="grid grid-cols-3 items-start 2xl:gap-3 xl:gap-2 lg:gap-2 2xl:mt-0 mt-3">
                    <Select
                        class_="mt-0!"
                        defaultOption="type"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                    </Select>
                    <DatePicker
                        icon={true}
                        mainClass="mt-0!"
                        value={date}
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => setDate(e)}
                    />

                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50">Create New Template</button>
                </div>
            </div>

            <div className='table-class'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Template Name" /></th>
                            <th><TableOrder title="Type" /></th>
                            <th><TableOrder title="Subject" /></th>
                            <th><TableOrder title="Last Updated" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown /></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <PaginationDemo />
                </div>
            </div>
        </AdminLayout>
    )
}

export default CampaignsTemplates
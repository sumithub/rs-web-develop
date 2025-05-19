"use client"
import Image from 'next/image'
import AdminLayout from '../../components/AdminLayout'
import Checkbox from '../../components/form/Checkbox'
import DatePicker from '../../components/form/DatePicker'
import Search from '../../components/form/Search'
import PaginationDemo from '../../components/Pagination'
import Status from '../../components/Status'
import TableOrder from '../../components/TableOrder'
import React, { useState } from 'react'
import Link from 'next/link'
import CustomSelectBox from '../../components/form/CustomSelectBox';
function ManageCampaigns() {

    const [sortBy, setSortBy] = useState("")
    const [type, setType] = useState("")
    const [status, setStatus] = useState("")
    const [changeStatus, setChangeStatus] = useState("")
    const [date, setDate] = useState("")
    // const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    return (
        <AdminLayout>
            <div>
                <div className="2xl:flex lg:flex-wrap justify-between items-center w-full mb-5">
                    <Search
                        placeholder="Search by campaign names"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <div className="grid grid-cols-5 items-start gap-3 mt-4">
                        <CustomSelectBox
                            class_="mt-0!"
                            defaultOption="sort by"
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value)
                            }}>
                            <option value="campaign ame">Campaign Name</option>
                            <option value="date">date</option>
                            <option value="customers count">Customers Count</option>
                            <option value="status">status</option>
                        </CustomSelectBox>

                        <CustomSelectBox
                            class_="mt-0!"
                            defaultOption="select type"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                            }}>
                            <option value="industry">Industry</option>
                            <option value="template">Template</option>
                        </CustomSelectBox>

                        <CustomSelectBox
                            class_="mt-0!"
                            defaultOption="Status"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value)
                            }}>
                            <option value="draft">Draft</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="paused">Paused</option>
                        </CustomSelectBox>

                        <DatePicker
                            icon={true}
                            mainClass="mt-0!"
                            value={date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(e) => setDate(e)}
                        />
                        <Link href="/manage-campaigns/detail">
                            <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[9.3px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                            >Create campaign</button>
                        </Link>
                    </div>
                </div>

                <div className='flex items-center justify-between mb-5'>
                    <div className="border border-border-color px-2 py-1 rounded-lg w-28">
                        <div className="flex items-start justify-center gap-2 mt-1">
                            <Checkbox />
                            <div className="text-text3 text-sm capitalize mt-[2px]">Select all</div>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-3'>
                        <CustomSelectBox
                            class_="mt-0!"
                            defaultOption="change Status"
                            value={changeStatus}
                            onChange={(e) => {
                                setChangeStatus(e.target.value)
                            }}>
                            <option value="draft">Draft</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="paused">Paused</option>
                        </CustomSelectBox>

                        <button className='border border-border-color rounded-lg p-2 text-text3 text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'>Bulk Edit</button>

                        <button className='border border-danger-light2 bg-danger-light2 rounded-lg p-2 text-danger text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'>Bulk Delete</button>
                    </div>
                </div>
            </div>

            <div className='table-class'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Campaign Name" /></th>
                            <th><TableOrder title="Created On" /></th>
                            <th><TableOrder title="Launch Date" /></th>
                            <th><TableOrder title="Customers" /></th>
                            <th><TableOrder title="Status" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Campaign 1</div>
                                </div>
                            </td>
                            <td>Jan 10,2025</td>
                            <td>Jan 15,2025</td>
                            <td className='text-primary!'>150</td>
                            <td><Status status="Draft" /></td>
                            <td><div className='flex items-center gap-2'>
                                <button className='cursor-pointer'>
                                    <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                </button>

                                <button className='cursor-pointer'>
                                    <Image src="/images/copy.svg" alt='copy' height={28} width={28} />
                                </button>
                                <button className='cursor-pointer'>
                                    <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                </button>
                            </div></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Campaign 1</div>
                                </div>
                            </td>
                            <td>Jan 14,2025</td>
                            <td>Jan 20,2025</td>
                            <td className='text-primary!'>150</td>
                            <td><Status status="Draft" /></td>
                            <td><div className='flex items-center gap-2'>
                                <button className='cursor-pointer'>
                                    <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                </button>

                                <button className='cursor-pointer'>
                                    <Image src="/images/copy.svg" alt='copy' height={28} width={28} />
                                </button>
                                <button className='cursor-pointer'>
                                    <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                </button>
                            </div></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Campaign 1</div>
                                </div>
                            </td>
                            <td>Jan 20,2025</td>
                            <td>Jan 28,2025</td>
                            <td className='text-primary!'>150</td>
                            <td><Status status="Draft" /></td>
                            <td><div className='flex items-center gap-2'>
                                <button className='cursor-pointer'>
                                    <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                </button>

                                <button className='cursor-pointer'>
                                    <Image src="/images/copy.svg" alt='copy' height={28} width={28} />
                                </button>
                                <button className='cursor-pointer'>
                                    <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                </button>
                            </div></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Campaign 1</div>
                                </div>
                            </td>
                            <td>Jan 22,2025</td>
                            <td>Jan 30,2025</td>
                            <td className='text-primary!'>150</td>
                            <td><Status status="Draft" /></td>
                            <td><div className='flex items-center gap-2'>
                                <button className='cursor-pointer'>
                                    <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                </button>

                                <button className='cursor-pointer'>
                                    <Image src="/images/copy.svg" alt='copy' height={28} width={28} />
                                </button>
                                <button className='cursor-pointer'>
                                    <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                </button>
                            </div></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Campaign 1</div>
                                </div>
                            </td>
                            <td>Jan 25,2025</td>
                            <td>Aug 10,2025</td>
                            <td className='text-primary!'>150</td>
                            <td><Status status="Draft" /></td>
                            <td><div className='flex items-center gap-2'>
                                <button className='cursor-pointer'>
                                    <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                </button>

                                <button className='cursor-pointer'>
                                    <Image src="/images/copy.svg" alt='copy' height={28} width={28} />
                                </button>
                                <button className='cursor-pointer'>
                                    <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                </button>
                            </div></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Campaign 1</div>
                                </div>
                            </td>
                            <td>Jan 28,2025</td>
                            <td>Aug 12,2025</td>
                            <td className='text-primary!'>150</td>
                            <td><Status status="Draft" /></td>
                            <td><div className='flex items-center gap-2'>
                                <button className='cursor-pointer'>
                                    <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                </button>

                                <button className='cursor-pointer'>
                                    <Image src="/images/copy.svg" alt='copy' height={28} width={28} />
                                </button>
                                <button className='cursor-pointer'>
                                    <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                </button>
                            </div></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Campaign 1</div>
                                </div>
                            </td>
                            <td>Jan 30,2025</td>
                            <td>Aug 15,2025</td>
                            <td className='text-primary!'>150</td>
                            <td><Status status="Draft" /></td>
                            <td><div className='flex items-center gap-2'>
                                <button className='cursor-pointer'>
                                    <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                </button>

                                <button className='cursor-pointer'>
                                    <Image src="/images/copy.svg" alt='copy' height={28} width={28} />
                                </button>
                                <button className='cursor-pointer'>
                                    <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                </button>
                            </div></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Campaign 1</div>
                                </div>
                            </td>
                            <td>Aug 10,2025</td>
                            <td>Aug 20,2025</td>
                            <td className='text-primary!'>150</td>
                            <td><Status status="Draft" /></td>
                            <td><div className='flex items-center gap-2'>
                                <button className='cursor-pointer'>
                                    <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                </button>

                                <button className='cursor-pointer'>
                                    <Image src="/images/copy.svg" alt='copy' height={28} width={28} />
                                </button>
                                <button className='cursor-pointer'>
                                    <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                </button>
                            </div></td>
                        </tr>
                    </tbody>
                </table>
                <PaginationDemo />
            </div>
        </AdminLayout>
    )
}

export default ManageCampaigns
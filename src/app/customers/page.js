"use client"
import AdminLayout from '../../components/AdminLayout'
import React, { useState } from 'react'
import TableOrder from '../../components/TableOrder'
import Checkbox from '../../components/form/Checkbox'
import Status from '../../components/Status'
import Image from 'next/image'
import Search from '../../components/form/Search'
import PaginationDemo from '../../components/Pagination'
import DeleteModal from '../../components/Models/DeleteModal';
import AddCustomer from '../../components/Models/customers/AddCustomer';
import ApplyTags from '../../components/Models/customers/ApplyTags';
import Select from '../../components/form/Select'




function Customers() {
    const [filterBy, setFilterBy] = useState("")
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const [openTags, setOpenTags] = useState(false)
    const [openModal, setOpenModal] = useState(null)

    return (
        <AdminLayout>
            {open &&
                <AddCustomer
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }}
                />
            }

            {openTags &&
                <ApplyTags
                    onClose={() => {
                        setOpenTags(false)
                    }}

                    onSave={() => {
                        setOpenTags(true)
                    }}
                />
            }

            {openModal === "delete" &&
                <DeleteModal

                    onClose={() => {
                        setOpenModal(false)
                    }} />
            }
            <div>
                <div className="flex justify-between items-center mb-3">
                    <Search
                        placeholder="Search by Filter by name, email, phone"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />

                    <div className="flex items-center justify-between">
                        <Select
                            defaultOption="filters"
                            class_='mt-0!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}

                        >
                            <option value="tags">Tags</option>
                            <option value="source: manual vs. imported">Source: Manual vs. Imported</option>
                        </Select>
                    </div>

                    <div className="grid grid-cols-3 items-start gap-3">
                        <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => { setOpen(true) }}>Add New Customer</button>
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
                        <button className='border border-border-color rounded-lg p-2 text-text3 text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'
                            onClick={() => { setOpenTags(true) }}>Apply tags to multiple customers</button>

                        <button className='border border-danger-light2 bg-danger-light2 rounded-lg p-2 text-danger text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'
                            onClick={() => { setOpenModal("delete") }}>Delete multiple customers</button>
                    </div>
                </div>
            </div>

            <div className='table-class'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Customer Name" /></th>
                            <th><TableOrder title="Email" /></th>
                            <th><TableOrder title="Phone" /></th>
                            <th><TableOrder title="Tags" /></th>
                            <th><TableOrder title="Source" /></th>
                            <th><TableOrder title="Boost" /></th>
                            <th><TableOrder title="Date Added" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>John Doe</div>
                                </div>
                            </td>
                            <td>john@example.com</td>
                            <td>+91 98765 43210</td>
                            <td><Status status="At Risk" /></td>
                            <td>Manual</td>
                            <td></td>
                            <td>Jun 18,2024</td>
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
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Corey Lubin</div>
                                </div>
                            </td>
                            <td>Corey@example.com</td>
                            <td>+91 96589 52356</td>
                            <td><Status status="At Risk" /></td>
                            <td> CSV Import</td>
                            <td></td>
                            <td>Jun 18,2024</td>
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
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>James Torff</div>
                                </div>
                            </td>
                            <td>James@example.com</td>
                            <td>+91 95478 25369</td>
                            <td><Status status="At Risk" /></td>
                            <td> CSV Import</td>
                            <td></td>
                            <td>Jun 18,2024</td>
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
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Craig Workman</div>
                                </div>
                            </td>
                            <td>Craig@example.com</td>
                            <td>+91 78596 58965</td>
                            <td><Status status="At Risk" /></td>
                            <td>Manual</td>
                            <td></td>
                            <td>Jun 18,2024</td>
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
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Phillip Vaccaro</div>
                                </div>
                            </td>
                            <td>Phillip@example.com</td>
                            <td>+91 98765 43210</td>
                            <td><Status status="At Risk" /></td>
                            <td> CSV Import</td>
                            <td></td>
                            <td>Jun 18,2024</td>
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
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Cooper Vetrovs</div>
                                </div>
                            </td>
                            <td>Cooper@example.com</td>
                            <td>+91 85789 65896</td>
                            <td><Status status="At Risk" /></td>
                            <td>Manual</td>
                            <td></td>
                            <td>Jun 18,2024</td>
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
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Jaxson Septimus</div>
                                </div>
                            </td>
                            <td>Jaxson@example.com</td>
                            <td>+91 82368 89658</td>
                            <td><Status status="At Risk" /></td>
                            <td> CSV Import</td>
                            <td></td>
                            <td>Jun 18,2024</td>
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
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Martin Culhane</div>
                                </div>
                            </td>
                            <td>Martin@example.com</td>
                            <td>+91 98569 58965</td>
                            <td><Status status="At Risk" /></td>
                            <td> CSV Import</td>
                            <td></td>
                            <td>Jun 18,2024</td>
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
                        </tr>
                    </tbody>
                </table>
                <PaginationDemo />
            </div>
        </AdminLayout>
    )
}

export default Customers
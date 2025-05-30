"use client"
import AdminLayout from '../../components/AdminLayout'
import React, { useState } from 'react'
import TableOrder from '../../components/TableOrder'
import Checkbox from '../../components/form/Checkbox'
import Status from '../../components/Status'
import BoostRequest from "../../components/Models/boost/BoostRequest";
import RenameList from "../../components/Models/customers/RenameList";
import DeleteList from "../../components/Models/customers/DeleteList";
import Download from "../../components/Models/customers/Download";
import Image from 'next/image'
import Search from '../../components/form/Search'
import PaginationDemo from '../../components/Pagination'
import DeleteModal from '../../components/Models/DeleteModal';
import AddCustomer from '../../components/Models/customers/AddCustomer';
import ApplyTags from '../../components/Models/customers/ApplyTags';
import CustomSelectBox from '../../components/form/CustomSelectBox';
import GridView from '../../components/customers/GridView';
import ListView from '../../components/customers/ListView';
import DatePicker from '../../components/form/DatePicker';

function Customers() {
    const [openBoost, setOpenBoost] = useState(false)
    const [openRename, setOpenRename] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)
    const [filterBy, setFilterBy] = useState("")
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const [openTags, setOpenTags] = useState(false)
    const [openModal, setOpenModal] = useState(null)
    const [view, setView] = useState("history")
    const [sortBy, setSortBy] = useState("")


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

            {openRename &&
                <RenameList
                    onClose={() => {
                        setOpenRename(false)
                    }}

                    onSave={() => {
                        setOpenRename(true)
                    }}
                />
            }

            {openDelete &&
                <DeleteList
                    onClose={() => {
                        setOpenDelete(false)
                    }}

                    onSave={() => {
                        setOpenDelete(true)
                    }}
                />
            }

            {openDownload &&
                <Download
                    onClose={() => {
                        setOpenDownload(false)
                    }}

                    onSave={() => {
                        setOpenDownload(true)
                    }}
                />
            }

            {openBoost &&
                <BoostRequest
                    onClose={() => {
                        setOpenBoost(false)
                    }}

                    onSave={() => {
                        setOpenBoost(true)
                    }} />
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
                <div className="flex justify-between w-full items-center mb-3">
                    <div className='flex items-center gap-10 bg-white shadow-sm rounded-[10px] py-[15px] px-[25px]'>
                        <div onClick={() => {
                            setView("customer")
                        }} className={`${view === "customer" ? "text-primary font-semibold underline underline-offset-4" : "text-text3 font-normal"} cursor-pointer shrink-0`}>All Customers</div>

                        <div onClick={() => {
                            setView("history")
                        }} className={`${view === "history" ? "text-primary font-semibold underline underline-offset-4" : "text-text3 font-normal"} cursor-pointer shrink-0`}>Customer List History</div>
                    </div>
                    {/* <div className='grid grid-cols-[2.4fr_0.5fr_0.7fr_1fr] gap-3 items-center'>
                        <Search
                            mainClass='w-full!'
                            placeholder="Search by Filter by name, email, phone"
                            onSearch={(s) => {
                                setSearch(s)
                            }}
                        />
                        <CustomSelectBox
                            defaultOption="filters"
                            class_='mt-0! w-32!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}
                        >
                            <option value="tags">Tags</option>
                            <option value="source: manual vs. imported">Source: Manual vs. Imported</option>
                        </CustomSelectBox>

                        <button className="flex items-center text-xs justify-center gap-2 bg-primary border border-primary py-[10.5px] px-3 rounded-lg text-white cursor-pointer disabled:pointer-events-none disabled:opacity-50" onClick={() => { setOpenBoost(true) }}>
                            <Image src="/images/flash.svg" alt="flash" height={16} width={16} unoptimized={true} />Boost</button>

                        <button className="bg-primary border border-primary text-xs hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => { setOpen(true) }}>Add New Customer</button>
                    </div> */}
                    <div className='flex justify-between items-center gap-[15px]'>
                        <div className='w-60!'>
                            <Search
                                mainClass='w-full!'
                                placeholder="Search by list name or date"
                                onSearch={(s) => {
                                    setSearch(s)
                                }}
                            />
                        </div>
                        <DatePicker
                            mainClass="mt-0! w-28!"
                            icon='/images/calendar1.svg'
                        />
                        <button>
                            <Image src="/images/listview.svg" alt="listview" width={34} height={34} />
                        </button>
                        <button>
                            <Image src="/images/listview1.svg" alt="listview1" width={34} height={34} className='' />
                        </button>
                        <button>
                            <Image src="/images/gridview.svg" alt="gridview" width={34} height={34} />
                        </button>
                        <button>
                            <Image src="/images/gridview1.svg" alt="gridview1" width={34} height={34} />
                        </button>
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

            {view === "customer" && <div className='table-class'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Customer Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="customerName" /></th>
                            <th><TableOrder title="Email"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="email" /></th>
                            <th><TableOrder title="Phone"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="phone" /></th>
                            <th><TableOrder title="Tags"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="tags" /></th>
                            <th><TableOrder title="Source"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="source" /></th>
                            <th><TableOrder title="Boost"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="boost" /></th>
                            <th><TableOrder title="Date Added"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="dateAdded" /></th>
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
                            <td><Image src="/images/boost.svg" alt='edit' height={28} width={28} unoptimized={true} /></td>
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
            </div>}

            {view === "history" && <div className=''>
                {/* <ListView /> */}
                <GridView />
            </div>
            }
        </AdminLayout>
    )
}

export default Customers
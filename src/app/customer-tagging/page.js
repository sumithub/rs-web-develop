"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Search from "../../components/form/Search";
import Select from "../../components/form/Select";
import TableOrder from "../../components/TableOrder";
import Checkbox from "../../components/form/Checkbox";
import Status from "../../components/Status";
import CreateTag from "../../components/Models/customers/CreateTag"
import Edit from "../../components/Models/customers/Edit"
import Image from "next/image";
import DeleteTag from "../../components/Models/DeleteModal";

export default function CustomerTagging() {
    const [filterBy, setFilterBy] = useState("")
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openTag, setOpenTag] = useState(false)

    return (
        <AdminLayout>
            {open &&
                <CreateTag
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }}
                />
            }

            {openEdit &&
                <Edit
                    onClose={() => {
                        setOpenEdit(false)
                    }}

                    onSave={() => {
                        setOpenEdit(true)
                    }}
                />
            }

            {openTag &&
                <DeleteTag
                    onCloseDelete={() => {
                        setOpenTag(false)
                    }}

                    onSave={() => {
                        setOpenTag(true)
                    }}
                />
            }



            <div>
                <div className="flex items-center justify-between mb-4">
                    <Search
                        placeholder="Search by Tag Name"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />

                    <div>
                        <Select
                            defaultOption="filters"
                            class_='mt-0!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}

                        ></Select>
                    </div>

                    <div>
                        <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => { setOpen(true) }}>Create New Tag</button>
                    </div>
                </div>
            </div>

            <div className="table-class">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Tag Name" /></th>
                            <th><TableOrder title="Description" /></th>
                            <th><TableOrder title="Tagged Customers" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-center gap-2">
                                    <Checkbox />
                                    <Status status="At Risk" />
                                </div>
                            </td>
                            <td>Lorem Ipsum Dummy ...</td>
                            <td className="underline text-primary!">150</td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <button className='cursor-pointer'>
                                        <Image src="/images/edit.svg" alt='edit' height={28} width={28}
                                            onClick={() => { setOpenEdit(true) }} />
                                    </button>

                                    <button className='cursor-pointer'>
                                        <Image src="/images/delete1.svg" alt='delete' height={28} width={28}
                                            onClick={() => { setOpenTag(true) }} />
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-center gap-2">
                                    <Checkbox />
                                    <Status status="At Risk" />
                                </div>
                            </td>
                            <td>Lorem Ipsum Dummy ...</td>
                            <td className="underline text-primary!">180</td>
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
                                <div className="flex items-center gap-2">
                                    <Checkbox />
                                    <Status status="At Risk" />
                                </div>
                            </td>
                            <td></td>
                            <td className="underline text-primary!">120</td>
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
                                <div className="flex items-center gap-2">
                                    <Checkbox />
                                    <Status status="At Risk" />
                                </div>
                            </td>
                            <td>Lorem Ipsum Dummy ...</td>
                            <td className="underline text-primary!">100</td>
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
                                <div className="flex items-center gap-2">
                                    <Checkbox />
                                    <Status status="At Risk" />
                                </div>
                            </td>
                            <td></td>
                            <td className="underline text-primary!">110</td>
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
                                <div className="flex items-center gap-2">
                                    <Checkbox />
                                    <Status status="At Risk" />
                                </div>
                            </td>
                            <td>Lorem Ipsum Dummy ...</td>
                            <td className="underline text-primary!">20</td>
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
                                <div className="flex items-center gap-2">
                                    <Checkbox />
                                    <Status status="At Risk" />
                                </div>
                            </td>
                            <td>Lorem Ipsum Dummy ...</td>
                            <td className="underline text-primary!">40</td>
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
                                <div className="flex items-center gap-2">
                                    <Checkbox />
                                    <Status status="At Risk" />
                                </div>
                            </td>
                            <td>Lorem Ipsum Dummy ...</td>
                            <td className="underline text-primary!">80</td>
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
                                <div className="flex items-center gap-2">
                                    <Checkbox />
                                    <Status status="At Risk" />
                                </div>
                            </td>
                            <td>Lorem Ipsum Dummy ...</td>
                            <td className="underline text-primary!">160</td>
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
            </div>
        </AdminLayout >
    )
}
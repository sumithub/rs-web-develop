"use client"
import Image from 'next/image'
import Checkbox from '../../../../components/form/Checkbox'
import Search from '../../../../components/form/Search'
import PaginationDemo from '../../../../components/Pagination'
import TableOrder from '../../../../components/TableOrder'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '../../../../../helper'
import Loading from '../../../../components/Loading'
import { locationScreen, locationsManagement } from '../../../../constent/constArray'
import AddNewLocation from '../../../../components/Models/location/AddNewLocation'
import DeleteLocation from '../../../../components/Models/location/DeleteLocation'
import AdminLayout from '../../../../components/AdminLayout'
import CustomSelectBox from '../../../../components/form/CustomSelectBox'
import Link from 'next/link'

function Location() {
    const [list, setList] = useState([])
    const [filterBy, setFilterBy] = useState("")
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("")
    const [selId, setSelId] = useState("")

    useEffect(() => {
        getTemplate()
    }, [search, sortBy, filterBy])

    const getTemplate = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || locationsManagement)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout
            noCard={false}
            headerSearch={
                <Search
                    mainClass='w-96!'
                    placeholder="Search"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />}>
            {open &&
                <AddNewLocation
                    showOnlyEdit={true}
                    id={selId}
                    type={true}
                    onClose={() => {
                        setOpen(false)
                        setSelId("")
                    }}
                />
            }

            {openDelete &&
                <DeleteLocation
                    onClose={() => {
                        setOpenDelete(false)
                    }}
                />
            }
            <div>
                <div className="flex justify-between items-start w-full mb-5">
                    <Search
                        mainClass='max-w-[270px]!'
                        placeholder="Search by Location Name, Address"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />

                    <div className='flex items-center gap-3.5'>
                        <CustomSelectBox
                            defaultOption="Filter By"
                            class_='mt-0! w-32!'
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}
                        >
                            <option value="client">Client</option>
                            <option value="region">Region</option>
                        </CustomSelectBox>

                        <div className="flex items-start gap-3">
                            <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[9.3px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0 w-full"
                                onClick={() => { setOpen(true) }}>Add New Location</button>
                        </div>
                    </div>
                </div>

            </div>

            <div className='table-class'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Location Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name"
                            /></th>
                            <th><TableOrder title="Address"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="address"
                            /></th>
                            <th>
                                <div className='line-clamp-1'> <TableOrder title="Assigned Client"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="client"
                                />
                                </div>
                            </th>
                            <th className='flex justify-center'><TableOrder title="Reviews Count"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="count"
                            /></th>
                            <th className='text-center!'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.map((e, index) =>
                            <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>
                                    <div className="flex gap-2.5 items-center">
                                        <Checkbox
                                            checked={e.selected}
                                            onChange={(checked) => {
                                                setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                            }}
                                        />
                                        {e.name}
                                    </div>
                                </td>
                                <td>{e.address}</td>
                                <td>
                                    <div className='line-clamp-1'>
                                        {e.client}
                                    </div>
                                </td>
                                <td className='text-center!'>{e.count}</td>
                                <td className="flex justify-center">
                                    <div className='flex items-center gap-2'>
                                        <Link href="/admin/business-management/location-details" className='cursor-pointer'>
                                            <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
                                        </Link>
                                        <button className='cursor-pointer'
                                            onClick={() => {
                                                setOpen(true)
                                                setSelId("e.id")
                                            }}>
                                            <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>
                                        <button className='cursor-pointer'
                                            onClick={() => { setOpenDelete(true) }}>
                                            <Image unoptimized={true} src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>)}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
            </div>
            {list?.length > 0 && <div>
                <PaginationDemo />
            </div>}
        </AdminLayout>
    )
}

export default Location
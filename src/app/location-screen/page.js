"use client"
import Image from 'next/image'
import AdminLayout from '../../components/AdminLayout'
import Checkbox from '../../components/form/Checkbox'
import Search from '../../components/form/Search'
import PaginationDemo from '../../components/Pagination'
import TableOrder from '../../components/TableOrder'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '../../../helper'
import Loading from '../../components/Loading'
import { locationScreen } from '../../constent/constArray'
import AddNewLocation from '../../components/Models/location/AddNewLocation'
import DeleteLocation from '../../components/Models/location/DeleteLocation'

function LocationScreen() {
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        getData()
    }, [search, sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || locationScreen)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            {open &&
                <AddNewLocation
                    isClient={true}
                    type='addNewLocation'
                    onClose={() => {
                        setOpen(false)
                    }}
                />
            }

            {openEdit &&
                <AddNewLocation
                    isClient={true}
                    type='edit'
                    onClose={() => {
                        setOpenEdit(false)
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
                        placeholder="For Filtering By Location Name"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <div className="flex items-start gap-3">
                        <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[9.3px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 shrink-0 w-full"
                            onClick={() => { setOpen(true) }}>Add New Location</button>
                    </div>
                </div>

            </div>

            <div className='table-class'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name"
                            /></th>
                            <th><TableOrder title="Address"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="address"
                            /></th>
                            <th><TableOrder title="City"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="city"
                            /></th>
                            <th><TableOrder title="State"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="state"
                            /></th>
                            <th><TableOrder title="Country"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="country"
                            /></th>
                            <th><TableOrder title="Phone Number"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="phoneNumber"
                            /></th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list?.map((e, index) =>
                            <tr key={index}>
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
                                <td>{e.city}</td>
                                <td>{e.state}</td>
                                <td>{e.country}</td>
                                <td>{e.phoneNumber}</td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'
                                            onClick={() => { setOpenEdit(true) }}>
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

export default LocationScreen
"use client"
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Search from "../../components/form/Search";
import TableOrder from "../../components/TableOrder";
import Checkbox from "../../components/form/Checkbox";
import Status from "../../components/Status";
import CreateTag from "../../components/Models/customers/CreateTag"
import Image from "next/image";
import DeleteTag from "../../components/Models/customers/DeleteTag";
import CustomSelectBox from "../../components/form/CustomSelectBox";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../helper";
import Loading from "../../components/Loading";
import { customerTagging } from "../../constent/constArray";
import PaginationDemo from "../../components/Pagination";

export default function CustomerTagging() {
    const [filterBy, setFilterBy] = useState("")
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openTag, setOpenTag] = useState(false)
    const [sortBy, setSortBy] = useState(false)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [selectedTagId, setSelectedTagId] = useState(null)

    useEffect(() => {
        getCustomerTag()
    }, [search, filterBy, sortBy])

    const getCustomerTag = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
            setList(res.data || customerTagging)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            {open &&
                <CreateTag
                    onClose={() => {
                        setOpen(false)
                        setSelectedTagId(null)
                    }}
                    id={selectedTagId}
                />
            }

            {openTag &&
                <DeleteTag
                    onClose={() => {
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

                    <div className="flex gap-3 items-center">
                        <CustomSelectBox
                            class_="mt-0! w-32!"
                            defaultOption="Filters"
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value)
                            }}>
                            <option value="filter 1">Filter 1</option>
                            <option value="filter 2">Filter 2</option>
                        </CustomSelectBox>

                        <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[9.3px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => { setOpen(true) }}>Create New Tag</button>
                    </div>

                </div>
            </div>

            <div className="table-class">
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Tag Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="tagName" /></th>
                            <th><TableOrder title="Description"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="description" /></th>
                            <th><TableOrder title="Tagged Customers"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="taggedCustomers" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list?.map((e, index) => <tr key={index}>
                            <td>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={e.selected}
                                        onChange={(checked) => {
                                            setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                        }}
                                    />
                                    <Status status={e.status} />
                                </div>
                            </td>
                            <td><div className="line-clamp-1">{e.description}</div></td>
                            <td className="underline text-primary!">{e.taggedCustomer}</td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <button className='cursor-pointer'>
                                        <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28}
                                            onClick={() => { setOpen(true); setSelectedTagId('demo-id'); }} />
                                    </button>

                                    <button className='cursor-pointer'>
                                        <Image unoptimized={true} src="/images/delete1.svg" alt='delete' height={28} width={28}
                                            onClick={() => { setOpenTag(true) }} />
                                    </button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                  {list?.length> 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>
        </AdminLayout>
    )
}
"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import TableOrder from "../../../components/TableOrder"
import PaginationDemo from "../../../components/Pagination"
import Image from "next/image"
import Search from "../../../components/form/Search"
import CustomSelectBox from "../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../components/common/SecondaryButton"
import { toast } from "react-toastify"
import axios from "axios"
import { adminTemplates } from "../../../constent/constArray"
import Loading from "../../../components/Loading"
import TemplatePreview from "../../../components/Models/TemplatePreview"
import Link from "next/link"
import DeleteTemplate from "../../../components/Models/templates/DeleteTemplate"
export default function Template() {
    const [sortBy, setSortBy] = useState(false)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        getData()
    }, [search, filter, sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || adminTemplates)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout headerSearch={<div>
            <Search
                placeholder="Search"
                mainClass="w-96!"
                onSearch={(s) => {
                    setSearch(s)
                }} />
        </div>}>
            {open &&
                <TemplatePreview
                    type={true}
                    onClose={() => {
                        setOpen(false)
                    }}
                />
            }

            {openModal &&
                <DeleteTemplate
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            }
            <div>
                <div className='flex items-center justify-between'>
                    <Search
                        placeholder="Search Templates"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <div className='flex items-center gap-3.5'>
                        <CustomSelectBox
                            defaultOption="All Templates"
                            class_='mt-0! w-48!'
                            value={filter}
                            onChange={(e) => {
                                setFilter(e.target.value)
                            }}
                        >
                            <option value="subscription-plan">Email Templates</option>
                            <option value="status">SMS Templates</option>
                            <option value="review-response">Review Response Templates</option>
                            <option value="archived">Archived Templates</option>
                        </CustomSelectBox>
                        <SecondaryButton
                            title="Create New Template"
                            type='submit'
                            class_="text-xs! font-normal!"
                            isLink={true} link='/create-email-template'
                        />
                    </div>
                </div>
                <div className="table-class mt-3.5">
                    {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                        <thead>
                            <tr>
                                <th><TableOrder title="Template Name"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="name" /></th>

                                <th><TableOrder title="Type"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="type" /></th>

                                <th><TableOrder title=" Subject"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="subject"
                                /></th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Last Updated"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="lastUpdate"
                                        />
                                    </div>
                                </th>
                                <th className="text-center!">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((e, i) =>
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>{e.type}</td>
                                    <td className="text-center!">{e.subject}</td>
                                    <td className="text-center!">{e.updated}</td>
                                    <td>
                                        <div className='flex w-auto items-center gap-2.5 justify-center'>
                                            <button className='cursor-pointer' onClick={() => toast.success("Copied Successfully")}>
                                                <Image unoptimized={true} src="/images/copy.svg" alt='copy' height={28} width={28} />
                                            </button>
                                            <button className='cursor-pointer' onClick={() => setOpen(true)}>
                                                <Image unoptimized={true} src="/images/eyes3.svg" alt='eyes3' height={28} width={28} />
                                            </button>
                                            <Link href="/create-email-template">
                                                <button className='cursor-pointer mt-2'>
                                                    <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                                </button>
                                            </Link>
                                            <button className='cursor-pointer' onClick={() => setOpenModal(true)}>
                                                <Image unoptimized={true} src="/images/delete1.svg" alt='delete1' height={28} width={28} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table> : <div className='text-center text-2xl text-danger mx-auto h-20'>No Data</div>)}
                </div>
                {list?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>
        </AdminLayout >
    )
}
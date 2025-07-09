"use client"
import { toast } from "react-toastify";
import AdminLayout from "../../components/AdminLayout";
import axios from "axios";
import { reviewResponse } from "../../constent/constArray";
import { useEffect, useState } from "react";
import { formatDate, getError } from "../../../helper";
import PaginationDemo from "../../components/Pagination";
import SecondaryButton from "../../components/common/SecondaryButton";
import Image from "next/image";
import TableOrder from "../../components/TableOrder";
import Loading from "../../components/Loading";
import CustomSelectBox from "../../components/form/CustomSelectBox";
import Search from "../../components/form/Search";
import AddTemplate from "../../components/Models/templates/AddTemplate";
import DeleteModal from "../../components/Models/templates/DeleteTemplate";

export default function ReviewResponses() {

    const [openDelete, setOpenDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const [sending, setSending] = useState(false)
    const [sortBy, setSortBy] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState([])

    useEffect(() => {
        getReviewResponse()
    }, [search, sortBy, rating])

    const getReviewResponse = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || reviewResponse)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return <AdminLayout>
        {openDelete &&
            <DeleteModal
                onClose={() => {
                    setOpenDelete(false)
                }}

                onSave={() => {
                    setOpenDelete(true)
                }}
            />
        }

        {open &&
            <AddTemplate
                onClose={() => {
                    setOpen(false)
                }}

                onSave={() => {
                    setOpen(true)
                }}
            />
        }

        <div>
            <div className="flex gap-3 justify-between">
                <Search placeholder="Search by Template Name"
                    mainClass="w-2/5!"
                    onSearch={(s) => {
                        setSearch(s)
                    }}

                />
                <div className="flex gap-[15px]">
                    <CustomSelectBox
                        class_="mt-0! w-40!"
                        defaultOption="filter by rating"
                        value={rating}
                        onChange={(e) => {
                            setRating(e.target.value)
                        }}
                        multiSelect={true}>
                        <option value="1 star">1 Star</option>
                        <option value="2 star">2 Star</option>
                        <option value="3 star">3 Star</option>
                        <option value="4 star">4 Star</option>
                        <option value="5 star">5 Star</option>
                    </CustomSelectBox>
                    <SecondaryButton title="Create New Template" class_="text-xs! px-2.5! py-2.5!" isLink={true} link="/create-email-template" type="button" />
                </div>
            </div>

            <div className="table-class mt-3">
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Template Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="templateName" /></th>

                            <th><TableOrder title="Rating Applied"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="ratingApplied" />
                            </th>

                            <th><TableOrder title="Last Updated"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="lastUpdated" /></th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                            <td>{e.templateName}</td>
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-1">
                                    {e.ratings?.map((rating, i) => (
                                        <div key={i} >
                                            <Image src={rating} alt="star" height={16} width={16} unoptimized={true} />
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td>{formatDate(e.lastUpdate)}</td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <button className='cursor-pointer' onClick={() => { setOpen(true) }} type="button">
                                        <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                    </button>

                                    <button className='cursor-pointer' onClick={() => { setOpenDelete(true) }} type="button">
                                        <Image unoptimized={true} src="/images/delete1.svg" alt='delete' height={28} width={28} />
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
    </AdminLayout>
}
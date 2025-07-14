"use client"
import AdminLayout from "../../../components/AdminLayout";
import CustomSelectBox from "../../../components/form/CustomSelectBox";
import Search from "../../../components/form/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { getError } from "../../../../helper";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import SecondaryButton from "../../../components/common/SecondaryButton";
import CancelButton from "../../../components/common/CancelButton";
import PaginationDemo from "../../../components/Pagination";
import { reviewSourcesList } from "../../../constent/constArray";
import TableOrder from "../../../components/TableOrder";
import Checkbox from "../../../components/form/Checkbox";
import Status from "../../../components/Status";
import Image from "next/image";
import ConnectReviewSource from "../../../components/Models/review/ConnectReviewSource";
import AddReviewSource from "../../../components/Models/admin/AddReviewSource"
import DisconnectReviewSourceConfirmation from "../../../components/Models/review/DisconnectReviewSourceConfirmation";

export default function ReviewSources() {
    const [sortBy, setSortBy] = useState(false)
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [openConnect, setOpenConnect] = useState(false)
    const [openDisconnect, setOpenDisconnect] = useState(false)
    const [open, setOpen] = useState(false)
    const [selId, setSelId] = useState("")

    const [search, setSearch] = useState("")
    const [filterBy, setFilterBy] = useState("")

    useEffect(() => {
        getUsers()
    }, [search, filterBy, sortBy])

    const getUsers = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || reviewSourcesList)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }
    return (
        <AdminLayout>

            {open &&
                <AddReviewSource
                    id={selId}
                    onClose={() => {
                        setSelId("")
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }} />
            }

            {openConnect &&
                <ConnectReviewSource
                    id={true}
                    data={{ name: "Yelp" }}
                    onClose={() => {
                        setOpenConnect(false)
                    }}

                    onSave={() => {
                        setOpenConnect(true)
                    }} />
            }

            {openDisconnect &&
                <DisconnectReviewSourceConfirmation
                    data={{ name: "Yelp" }}
                    id={true}
                    onClose={() => {
                        setOpenDisconnect(false)
                    }}

                    onSave={() => {
                        setOpenDisconnect(true)
                    }} />
            }

            <div className="flex gap-3.5 items-center justify-between">
                <div className="shrink-0">
                    <h2 className="text-lg capitalize font-medium">Manage Review Sources</h2>
                    <h2 className="text-sm text-text3 capitalize">Connect your business to review platforms</h2>
                </div>
                <div className="flex items-center justify-end gap-3.5">
                    <div className="w-72">
                        <Search
                            mainClass='w-full!'
                            placeholder="Search by Review Sources"
                            onSearch={(s) => {
                                setSearch(s)
                            }}
                        />
                    </div>
                    <CancelButton title="Assigned Clients" class_="text-xs! bg-white! border border-border-color! py-2.5!" mainClass="shrink-0" />
                    <CustomSelectBox
                        defaultOption="Filters"
                        class_='mt-0! w-20!'
                        selectClass_="py-2.5! text-xs!"
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                    ><option value="filter 1">Filter 1</option>
                        <option value="filter 2">Filter 2</option>
                    </CustomSelectBox>

                    <SecondaryButton
                        title="Add New Source"
                        onClick={() => setOpen(true)}
                        class_="text-xs! py-2.5! font-normal!"
                        mainClass="shrink-0"
                    />
                </div>
            </div>
            <div className="table-class mt-3.5">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Platform Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name" /></th>
                            <th><TableOrder title="URL"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="url" /></th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Client Name"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="clientName" />
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Status"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="status" />
                                </div>
                            </th>
                            <th>
                                <div className="flex justify-center">
                                    <TableOrder title="Actions"
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        field="actions" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((e, index) =>
                            <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>
                                    <div className="flex items-center gap-2.5">
                                        <Checkbox
                                            checked={e.selected}
                                            onChange={(checked) => {
                                                setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                            }} />
                                        <div>
                                            <Image src={e.img} alt="yelp-logo" width={56} height={24} className="w-[56px] h-auto" />
                                        </div>
                                    </div>
                                </td>
                                <td>{e.url}</td>
                                <td>
                                    <div className="flex justify-center">
                                        {e.clientName}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <Status status={e.status} />
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-center gap-2'>
                                        {e.status === "Connected" && <button className='cursor-pointer' onClick={() => { setOpenDisconnect(true) }}>
                                            <Image src="/images/disconnect.svg" alt='disconnect' height={28} width={28} />
                                        </button>}
                                        {e.status === "Disconnect" && <button className='cursor-pointer' onClick={() => { setOpenConnect(true) }}>
                                            <Image src="/images/connected.svg" alt='connect' height={28} width={28} />
                                        </button>}
                                        <button className='cursor-pointer' onClick={() => {
                                            setSelId("e.id")
                                            setOpen(true)
                                        }}>
                                            <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer'>
                                            <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
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

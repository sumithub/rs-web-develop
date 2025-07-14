"use client"
import AdminLayout from "../../components/AdminLayout";
import PaginationDemo from "../../components/Pagination";
import TableOrder from "../../components/TableOrder";
import Image from "next/image";
import Search from "../../components/form/Search";
import CustomSelectBox from "../../components/form/CustomSelectBox";
import Checkbox from "../../components/form/Checkbox";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDateTime, getError } from "../../../helper";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { auditLogsDashboard } from "../../constent/constArray";
import AuditLogDetails from '../../components/Models/audit/AuditLogDetails'
import DateRange from "../../components/form/DateRangePicker";
import SecondaryButton from "../../components/common/SecondaryButton";
import { useRole } from "../../utils/hooks";
import CreateAuditLogEntry from "../../components/Models/admin/CreateAuditLogEntry"

export default function AuditLogsDashboard() {
    const [date, setDate] = useState("")
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false)
    const [openAudit, setOpenAudit] = useState(false)
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState("")
    const [type1, setType1] = useState("")
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("")
    const { isAdmin } = useRole();
    const [selId, setSelId] = useState("")

    useEffect(() => {
        getData()
    }, [search, type, type1, sortBy, date])

    const getData = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || auditLogsDashboard)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (<>
        <AdminLayout>
            {open &&
                <AuditLogDetails
                    onClose={() => { setOpen(false) }}
                />}

            {openAudit &&
                <CreateAuditLogEntry
                    id={selId}
                    onClose={() => {
                        setSelId("")
                        setOpenAudit(false)
                    }}
                />}
            <div className="flex justify-between items-center gap-11">
                <div className="w-1/3">
                    <Search
                        mainClass='w-full!'
                        placeholder={isAdmin ? "For filtering locations by name." : "Search logs by keywords"}
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                </div>
                <div className="flex gap-[15px]">
                    <DateRange
                        value={date}
                        onChange={(e) => { setDate(e) }} />

                    <CustomSelectBox
                        class_="mt-0! w-40!"
                        defaultOption="Filter"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}>
                        <option value="fileUpload">File Upload</option>
                        <option value="CustomerCreated">Customer Created</option>
                        <option value="smsUpdated">SMS Updated</option>
                        <option value="email">E-mail Updated</option>
                        <option value="customerUpdated">Customer Updated</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        class_="mt-0! w-40!"
                        defaultOption="Filter"
                        value={type1}
                        onChange={(e) => {
                            setType1(e.target.value)
                        }}>
                        <option value="subscription">Subscription</option>
                        <option value="action">Action</option>
                    </CustomSelectBox>
                    {!isAdmin && <SecondaryButton title="Reset" class_="text-xs font-normal!" disabled={loading} onClick={getData} />}
                    {isAdmin && <SecondaryButton title="Create" class_="text-xs font-normal!" onClick={() => setOpenAudit(true)} />}

                    {/* <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                        disabled={loading}
                        onClick={getData}
                    >
                        Reset</button> */}
                </div>
            </div>
            <div className='table-class mt-[15px]'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="ID"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="id" /></th>
                            <th><TableOrder title="Subscription ID"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="subscriptionId" /></th>
                            <th><TableOrder title="Action"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="action" /></th>
                            <th><TableOrder title="Details"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="details" /></th>
                            <th><TableOrder title="Performed By"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="performedBy" /></th>
                            <th><TableOrder title="Timestamp"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="timestamp" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox
                                        checked={e.selected}
                                        onChange={(checked) => {
                                            setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                        }}
                                    />
                                    <div>{e.id}</div>
                                </div>
                            </td>
                            <td>{e.subscription}</td>
                            <td className="capitalize">{e.action}</td>
                            <td className="capitalize">{e.details}</td>
                            <td className="capitalize">{e.performed}</td>
                            <td>{formatDateTime(e.timestamp)}</td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <button className='cursor-pointer'
                                        onClick={() => { setOpen(true) }}>
                                        <Image unoptimized={true} src="/images/open-eye2.svg" alt='open-eye2' height={28} width={28} />
                                    </button>
                                    {isAdmin && <button className='cursor-pointer' onClick={() => {
                                        setSelId("e.id")
                                        setOpenAudit(true)
                                    }}>
                                        <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                    </button>}
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
    </>)
}
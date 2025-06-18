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
<<<<<<< HEAD
import { auditLogs } from "../../constent/constArray";
=======
import { auditLogsDashboard } from "../../constent/constArray";
import DatePicker from "../../components/form/DatePicker";
>>>>>>> 44eb3877abbe9d56f7fdc1050b48f8a049c80dc6
import AuditLogDetails from '../../components/Models/audit/AuditLogDetails'
import DateRange from "../../components/form/DateRangePicker";
import SecondaryButton from "../../components/common/SecondaryButton";

export default function AuditLogsDashboard() {
    const [date, setDate] = useState("")
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState("")
    const [type1, setType1] = useState("")
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        getData()
    }, [search, type, type1, sortBy, date])

    const getData = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
<<<<<<< HEAD
            setList(res.data || auditLogs)
=======
            setList(res.data || auditLogsDashboard)
>>>>>>> 44eb3877abbe9d56f7fdc1050b48f8a049c80dc6
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }
<<<<<<< HEAD
    
=======

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

>>>>>>> 44eb3877abbe9d56f7fdc1050b48f8a049c80dc6
    return (<>
        <AdminLayout>
            {open &&
                <AuditLogDetails
                    onClose={() => { setOpen(false) }}
                />}
            <div className="flex justify-between items-center gap-11">
                <div className="w-1/3">
                    <Search
                        mainClass='w-full!'
                        placeholder="Search logs by keywords"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                </div>
                <div className="flex gap-[15px]">

              <DateRange  onChange={(e) => { setDate(e) }}/>

                    {/* <DatePicker
                        icon={true}
                        mainClass="mt-0!"
                        value={date}
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => setDate(e)}
                    /> */}

                    <CustomSelectBox
                        class_="mt-0! w-40!"
                        defaultOption="Filter"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}>
                        <option value="fileUpload">File Upload</option>
                        <option value="Customerreated">Customer Created</option>
                        <option value="smsUpdated">SMS Updated</option>
                        <option value="email">E-mail Updated</option>
                        <option value="customerUpdated">Customer Updated</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        class_="mt-0!"
                        defaultOption="Filter"
                        value={type1}
                        onChange={(e) => {
                            setType1(e.target.value)
                        }}>
                        <option value="subscription">Subscription</option>
                        <option value="action">Action</option>
                    </CustomSelectBox>

<<<<<<< HEAD
                   <SecondaryButton title="Reset" class_="text-xs font-normal!"/>
=======
                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                        onClick={handleClick}
                        disabled={loading}
                    >
                        Reset</button>
>>>>>>> 44eb3877abbe9d56f7fdc1050b48f8a049c80dc6
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
<<<<<<< HEAD
                        {list.map((e, index) =>
                            <tr key={index}>
                                <td>
                                    <div className="flex gap-2.5 items-center">
                                        <Checkbox 
                                          checked={e.selected}
                                        onChange={(checked) => {
                                            setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                        }}
                                        
                                        />
                                        {e.id}
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
                                            <Image src="/images/open-eye2.svg" alt='open-eye2' height={28} width={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>)}
=======
                        {list?.map((e, index) => <tr key={index}>
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
                            <td>{e.timestamp}</td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <button className='cursor-pointer'
                                        onClick={() => { setOpen(true) }}>
                                        <Image src="/images/open-eye2.svg" alt='open-eye2' height={28} width={28} />
                                    </button>
                                </div>
                            </td>
                        </tr>)}
>>>>>>> 44eb3877abbe9d56f7fdc1050b48f8a049c80dc6
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
            </div>
            {list?.length > 0 && <div>
                <PaginationDemo />
            </div>}
        </AdminLayout >
    </>)
}
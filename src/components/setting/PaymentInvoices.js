import { useEffect, useState } from "react";
import Search from "../form/Search";
import SelectForm from "../form/SelectForm";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import TableOrder from "../TableOrder";
import Status from "../Status";
import Image from "next/image";
import Loading from "../Loading";
import { paymentInvoice } from "../../constent/constArray";
import axios from "axios";
import { toast } from "react-toastify";
import PaginationDemo from "../Pagination";
import CancelUpcomingPayment from './CancelUpcomingPayment'
import UpdatePaymentMethod from './UpdatePaymentMethod'
import { useForm } from "react-hook-form";
import ScheduleEarlyPayment from "./ScheduleEarlyPayment";
import { formatDate } from "../../../helper";
import DateRange from "../form/DateRangePicker";

export default function PaymentInvoices() {
    const [date, setDate] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [pageLoading, setPageLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(false);
    const [sortBy, setSortBy] = useState("")
    const [type, setType] = useState("")
    const [type1, setType1] = useState("")
    const [open, setOpen] = useState(false)
    const [openSchedule, setOpenSchedule] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const { watch, setValue } = useForm();

    useEffect(() => {
        getTemplate()
    }, [search, date, type, type1])

    useEffect(() => {
        if (sortBy) {
            getTemplateForSort()
        }
    }, [sortBy])

    const getTemplate = async () => {
        try {
            setPageLoading(true)
            const res = await axios.get("/api")
            setList(res.data || paymentInvoice)
            setPageLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setPageLoading(false)
        }
    }

    const getTemplateForSort = async () => {
        try {
            setTableLoading(true)
            setList([])

            const res = await axios.get("/api")
            setList(res.data || paymentInvoice)
            setTableLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setTableLoading(false)
        }
    }

    const Project = [
        { title: "plan name", price: "Growth Plan" },
        { title: "Amount", price: "$99.00" },
        { title: "due date", price: "Jan 25, 2025" },
        { title: "payment method", price: "Visa **** 1234" },
    ]

    return (
        <>
            {openSchedule &&
                <ScheduleEarlyPayment
                    onClose={() => {
                        setOpenSchedule(false)
                    }}

                    onSave={() => {
                        setOpenSchedule(true)
                    }} />
            }

            {open &&
                <CancelUpcomingPayment
                    onClose={() => { setOpen(false) }}
                />}

            {openUpdate &&
                <UpdatePaymentMethod id="update"
                    onClose={() => { setOpenUpdate(false) }}
                />}

            <div className="flex justify-between items-center gap-2">
                <div className="w-[30%]">
                    <Search
                        mainClass='w-full!'
                        placeholder="Search By Invoice ID"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr_2.3fr] gap-3">
                    <CancelButton title="Apply" class_="text-sm! font-normal! bg-white! border-text3/30!" />
                    <SelectForm label=""
                        defaultOption="Status"
                        selectClass_="border border-text3/30!"
                        class_="mt-0!"
                        onChange={(e) => {
                            setType(e.target.value)
                        }}
                        setValue={setValue}
                        watch={watch}>
                        <option value="all">All</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </SelectForm>

                    <SelectForm
                        selectClass_="border border-text3/30!"
                        defaultOption="Filter"
                        class_="mt-0!"
                        setValue={setValue} watch={watch}
                        onChange={(e) => {
                            setType1(e.target.value)
                        }} />

                    <DateRange
                        class_="mt-0! w-full!"
                        value={date}
                        onChange={(e) => { setDate(e) }}
                    />
                </div>
            </div>
            {pageLoading ? <Loading /> : <div>
                <div className="font-semibold text-lg my-4">
                    Upcoming Payments
                </div>
                {Project.map((e, i) =>
                    <div key={i}>
                        <div className="flex justify-between mt-3">
                            <div className="text-text3 capitalize text-base">{e.title}</div>
                            <div className="font-semibold">{e.price}</div>
                        </div>
                        {i !== Project.length - 1 && (
                            <hr className="mt-3 border-t border-secondary/5" />
                        )}
                    </div>)}


                <div className="grid grid-cols-2 gap-4 mt-5">
                    <CancelButton title="Cancel upcoming payment" class_="text-lg! bg-danger/10! border-danger/10! hover:border-danger/10!  text-danger!" onClick={() => { setOpen(true) }} />
                    <SecondaryButton title="update payment method" class_="text-lg!" onClick={() => { setOpenUpdate(true) }} />
                </div>

                <div className="font-semibold text-lg capitalize mt-4">
                    past invoice & payments
                </div>

                <div className="table-class mt-[15px]">
                    {tableLoading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                        <thead>
                            <tr>
                                <th><TableOrder title="Invoice Number"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="number" /></th>
                                <th><TableOrder title="Plan Name"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="name" /></th>
                                <th><TableOrder title="Amount"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="amount" /></th>
                                <th><TableOrder title="Date"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="date" /></th>
                                <th><TableOrder title="Status"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="status" /></th>
                                <th><TableOrder title="Action"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>{e.invoiceNumber}</td>
                                <td>{e.planName}</td>
                                <td>{e.amount}</td>
                                <td>{formatDate(e.date)}</td>
                                <td><Status status={e.status} /></td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer' onClick={() => { setOpenSchedule(true) }}>
                                            <Image src="/images/open-eye2.svg" alt="open-eye2" height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer'
                                            onClick={() => { toast.success("Downloaded") }}>
                                            <Image src="/images/download.svg" alt='download' height={28} width={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            )}</tbody>
                    </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                </div>
                {list?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>}
        </>
    )
}
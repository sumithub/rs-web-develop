import { useEffect, useState } from "react";
import Search from "../form/Search";
import SelectForm from "../form/SelectForm";
import DatePicker from "../form/DatePicker";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import TableOrder from "../TableOrder";
import Status from "../Status";
import Image from "next/image";
import Loading from "../Loading";
import { templates } from "../../constent/constArray";
import axios from "axios";
import { toast } from "react-toastify";
import PaginationDemo from "../Pagination";
import CancelUpcomingPayment from './CancelUpcomingPayment'
import UpdatePaymentMethod from './UpdatePaymentMethod'
import { useForm } from "react-hook-form";
import ScheduleEarlyPayment from "./ScheduleEarlyPayment";
import { formatDate } from "../../../helper";


export default function PaymentInvoices() {
    const [date, setDate] = useState("")
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("")
    const [type, setType] = useState("")
    const [open, setOpen] = useState(false)
    const [openSchedule, setOpenSchedule] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const { register, watch, setValue } = useForm();

    useEffect(() => {
        getTemplate()
    }, [search, date, type, sortBy])

    const getTemplate = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || templates)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    const Projects = [
        { invoiceNumber: "CM2233445", planName: "Growth Plan", amount: "$70", date: "Jan 25, 2025", status: "Paid" },
        { invoiceNumber: "CM2233445", planName: "Growth Plan", amount: "$70", date: "Jan 25, 2025", status: "Paid" },
        { invoiceNumber: "CM2233445", planName: "Growth Plan", amount: "$70", date: "Jan 25, 2025", status: "Overdue" },
        { invoiceNumber: "CM2233445", planName: "Growth Plan", amount: "$70", date: "Jan 25, 2025", status: "Overdue" },
        { invoiceNumber: "CM2233445", planName: "Growth Plan", amount: "$70", date: "Jan 25, 2025", status: "Paid" },
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
            <div className="flex justify-between items-center gap-11">
                <div className="w-1/2">
                    <Search
                        mainClass='w-[35%]'
                        placeholder="Search By Invoice ID"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                </div>

                <div className="grid grid-cols-4 gap-3">
                    <SelectForm defaultOption='Apply' class_="mt-0!"
                        setValue={setValue} watch={watch}
                        onChange={(e) => {
                            setType(e.target.value)
                        }} />

                    <SelectForm label=""
                        defaultOption="Status"
                        class_="mt-0!"
                        formProps={{ ...register("status", { required: false }) }}
                        setValue={setValue}
                        watch={watch}>
                        <option value="all">All</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </SelectForm>

                    <SelectForm defaultOption="Filter" class_="mt-0!"
                        setValue={setValue} watch={watch}
                        onChange={(e) => {
                            setType(e.target.value)
                        }} />

                    <DatePicker
                        icon={true}
                        mainClass="mt-0!"
                        value={date}
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => setDate(e)}
                    />
                </div>
            </div>

            <div className="font-semibold text-lg mt-4">
                Upcoming Payments
            </div>

            <div className="flex justify-between mt-3">
                <div className="text-text3 capitalize text-base">plan name</div>
                <div className="font-semibold">Growth Plan</div>
            </div>

            <hr className="border border-border2 my-3" />

            <div className="flex justify-between">
                <div className="text-text3 capitalize text-base">Amount</div>
                <div className="font-semibold">$99.00</div>
            </div>

            <hr className="border border-border2 my-3" />

            <div className="flex justify-between">
                <div className="text-text3 capitalize text-base">due date</div>
                <div className="font-semibold">Jan 25, 2025</div>
            </div>

            <hr className="border border-border2 my-3" />

            <div className="flex justify-between">
                <div className="text-text3 capitalize text-base">payment method</div>
                <div className="font-semibold">Visa **** 1234</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
                <CancelButton title="Cancel upcoming payment" class_="text-lg! bg-danger/10! text-danger!" onClick={() => { setOpen(true) }} />
                <SecondaryButton title="update payment method" class_="text-lg!" onClick={() => { setOpenUpdate(true) }} />
            </div>

            <div className="font-semibold text-lg capitalize mt-4">
                past invoice & payments
            </div>

            <div className="table-class mt-[15px]">
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
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
                    <tbody>{Projects.map((e, i) =>
                        <tr key={i}>
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
                {list?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>
        </>
    )
}
"use client"
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import PaginationDemo from '../../components/Pagination';
import TableOrder from '../../components/TableOrder';
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../helper";
import { recentPayments } from '../../constent/constArray';
import Status from "../../components/Status";
import Image from "next/image";
import AdminDashboardModel from "../../components/Models/admin-dashboard/AdminDashboardModel";


export default function RecentPayments() {
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState("")
    const [open, setOpen] = useState(false)
    const [list, setList] = useState([])

    useEffect(() => {
        getData()
    }, [sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || recentPayments)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return <main>
        {open &&
            <AdminDashboardModel
                id={open}
                onClose={() => {
                    setOpen(false)
                }}
            />
        }
        <div className='table-class'>
            {loading ? <Loading class_="min-h-[400px]!" /> : (list?.length > 0 ? <table className='w-full'>
                <thead>
                    <tr>
                        <th><TableOrder title="Invoice Number"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="invoiceNumber"
                        /></th>
                        <th><TableOrder title="Amount"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="amount"
                        /></th>
                        <th><TableOrder title="Status"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="status"
                        /></th>
                        <th><TableOrder title="Client"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="client"
                        /></th>
                        <th>
                            <div className="flex justify-center">
                                Action
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                        <td>{e.invoiceNumber}</td>
                        <td>{e.amount}</td>
                        <td><Status status={e.status} /></td>
                        <td>{e.client}</td>
                        <td>
                            <div className="flex gap-2.5 justify-center">
                                <button onClick={() => {
                                    setOpen("subscription-revenue")
                                }}>
                                    <Image src="/images/eyes3.svg" alt="eyes3" width={28} height={28} unoptimized={true} />
                                </button>
                                <button>
                                    <Image src="/images/refresh1.svg" alt="refresh1" width={28} height={28} unoptimized={true} />
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
    </main>

}
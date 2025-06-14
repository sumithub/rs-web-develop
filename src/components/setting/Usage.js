"use client"
import { useEffect, useState } from "react"
import SecondaryButton from "../common/SecondaryButton"
import TableOrder from "../TableOrder"
import Loading from "../Loading"
import axios from "axios"
import { templates } from "../../constent/constArray"
import { toast } from "react-toastify"
import { getError } from "../../../helper"

export default function Usage() {
    const [sortBy, setSortBy] = useState("")
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([])

    useEffect(() => {
        getTemplate()
    }, [sortBy])

    const getTemplate = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
            setList(res.data || templates)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <>
            <div className="font-semibold">Subscription Usage Summary</div>
            <div className="bg-secondary2 p-5 rounded-[15px] grid grid-cols-4 gap-5 mt-3">
                <div>
                    <h2>Subscription ID</h2>
                    <h3 className="font-semibold mt-2">SUB1234</h3>
                </div>

                <div>
                    <h2>Plan</h2>
                    <h3 className="font-semibold mt-2">Pro Plan</h3>
                </div>
            </div>

            <div className='table-class mt-[15px]'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Features"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="features" /></th>
                            <th><TableOrder title="Used"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="used" /></th>
                            <th>Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Review Requests</td>
                            <td>3,200</td>
                            <td>5,000</td>
                        </tr>
                        <tr>
                            <td>Email Invitations</td>
                            <td>150</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>SMS Invitations</td>
                            <td>90</td>
                            <td>100</td>
                        </tr>
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                <SecondaryButton title="View Detailed Report" class_="sm:w-1/5 m-4" mainClass="text-end" />
            </div>
        </>
    )
}
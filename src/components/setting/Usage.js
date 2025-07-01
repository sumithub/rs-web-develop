"use client"
import { useEffect, useState } from "react"
import SecondaryButton from "../common/SecondaryButton"
import TableOrder from "../TableOrder"
import Loading from "../Loading"
import axios from "axios"
import { subscriptionSummary } from "../../constent/constArray"
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
            setList([])
            const res = await axios.get("/api")
            setList(res.data || subscriptionSummary)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <>
            <div className="font-semibold text-lg">Subscription Usage Summary</div>
            <div className="bg-secondary2 p-5 rounded-[15px] grid grid-cols-4 gap-5 mt-3">
                <div>
                    <h2 className="text-base">Subscription ID</h2>
                    <h3 className="font-semibold text-lg mt-2">SUB1234</h3>
                </div>

                <div>
                    <h2 className="text-base">Plan</h2>
                    <h3 className="font-semibold text-lg mt-2">Pro Plan</h3>
                </div>
            </div>

            <div className='table-class mt-[15px]'>
                {loading ? <Loading class_="min-h-[300px]!" /> : (list?.length > 0 ? <table className="w-full">
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
                        {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                            <td>{e.feature}</td>
                            <td>{e.used}</td>
                            <td>{e.limit}</td>
                        </tr>)}

                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
            </div>
            <SecondaryButton title="View Detailed Report" class_="w-40! text-xs! py-2.5! mt-5 font-normal!" mainClass="text-end" />
        </>
    )
}
"use client"
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import PaginationDemo from '../../components/Pagination';
import TableOrder from '../../components/TableOrder';
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../helper";
import { latestReviews } from '../../constent/constArray';


export default function LatestReviews() {
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState("")
    const [list, setList] = useState([])

    useEffect(() => {
        getData()
    }, [sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || latestReviews)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return <main>
        <div className='table-class'>
            {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                <thead>
                    <tr>
                        <th><TableOrder title="Rating"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="rating"
                        /></th>
                        <th><TableOrder title="Review Text"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="reviewText"
                        /></th>
                        <th><TableOrder title="Reviewer"
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            field="Reviewer"
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
                        <td><Image src={e.rating} alt="star" height={20} width={20} unoptimized={true} /></td>
                        <td>{e.review}</td>
                        <td>{e.reviewer}</td>
                        <td>{e.client}</td>
                        <td>
                            <div className="flex gap-2.5 justify-center">
                                <Image src="/images/eyes3.svg" alt="eyes3" width={28} height={28} />
                                <Image src="/images/refresh1.svg" alt="refresh1" width={28} height={28} />
                                <Image src="/images/1.svg" alt="1" width={28} height={28} />
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
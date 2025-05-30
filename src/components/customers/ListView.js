"use client"
import Image from "next/image"
import TableOrder from "../TableOrder"
import Checkbox from "../form/Checkbox"
import Status from "../Status"
import PaginationDemo from "../Pagination"

export default function ListView() {
    const Project = [
        { name: "January VIP Customers", created: "Jun 18,2024	", source: "CSV Import	", customers: "150", },
        { name: "January VIP Customers", created: "Jun 18,2024	", source: "CSV Import	", customers: "150", },
        { name: "January VIP Customers", created: "Jun 18,2024	", source: "CSV Import	", customers: "150", },
        { name: "January VIP Customers", created: "Jun 18,2024	", source: "CSV Import	", customers: "150", },
        { name: "January VIP Customers", created: "Jun 18,2024	", source: "CSV Import	", customers: "150", },
        { name: "January VIP Customers", created: "Jun 18,2024	", source: "CSV Import	", customers: "150", },
        { name: "January VIP Customers", created: "Jun 18,2024	", source: "CSV Import	", customers: "150", },
        { name: "January VIP Customers", created: "Jun 18,2024	", source: "CSV Import	", customers: "150", },
        { name: "January VIP Customers", created: "Jun 18,2024	", source: "CSV Import	", customers: "150", },
    ]
    return (<>
        <div className="table-class">
            <table className='w-full'>
                <thead>
                    <tr>
                        <th><TableOrder title="List Name" /></th>
                        <th><TableOrder title="Created On" /></th>
                        <th><TableOrder title="Source" /></th>
                        <th><TableOrder title="Tagged Customers" /></th>
                        <th className="text-center!">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Project.map((e, i) =>
                        <tr key={i}>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>{e.name}</div>
                                </div>
                            </td>
                            <td>{e.created}</td>
                            <td>{e.source}</td>
                            <td className="text-primary! underline underline-offset-2">{e.customers}</td>
                            <td>
                                <div className='flex items-center gap-2 justify-center'>
                                    <button className='cursor-pointer'>
                                        <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                    </button>

                                    <button className='cursor-pointer'>
                                        <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                    </button>
                                    <button className='cursor-pointer'>
                                        <Image src="/images/download.svg" alt='download' height={28} width={28} />
                                    </button>
                                </div>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
        <PaginationDemo />
    </>)
}
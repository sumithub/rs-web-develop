"use client"

import { useState } from "react"
import AdminLayout from "../../../../components/AdminLayout"
import Search from "../../../../components/form/Search"
import CustomSelectBox from "../../../../components/form/CustomSelectBox"
import SecondaryButton from "../../../../components/common/SecondaryButton"
import TableOrder from "../../../../components/TableOrder"
import Checkbox from "../../../../components/form/Checkbox"
import Image from "next/image"
import PaginationDemo from "../../../../components/Pagination"
import DateRange from "../../../../components/form/DateRangePicker"
import DashboardChart from "../../../../components/DashboardChart"
import DashboardPieChart from "../../../../components/charts/DashboardPieChart"
import DashboardLineChart from "../../../../components/charts/DashboardLineChart"


export default function CustomerTagging() {
    const [sortBy, setSortBy] = useState(false)
    const [view, setView] = useState("manage")

    const Business = [
        { name: "VIP", description: "High-value customers", customers: "120", created: "Client A" },
        { name: "Negative", description: "Customers with issues", customers: "45", created: "Client A" },
        { name: "Needs Follow-up", description: "Pending response", customers: "30", created: "Client B" },
        { name: "VIP", description: "High-value customers", customers: "50", created: "Client C" },
        { name: "Negative", description: "Customers with issues", customers: "30", created: "Client D" },
        { name: "Needs Follow-up", description: "Pending response", customers: "100", created: "Client E" },
        { name: "Needs Follow-up", description: "Pending response", customers: "100", created: "Client E" },
        { name: "VIP", description: "High-value customers", customers: "140", created: "Client F" },
        { name: "Negative", description: "Customers with issues", customers: "20", created: "Client F" },

    ]
    return (
        <AdminLayout>
            <div className='flex items-center justify-between gap-10 px-5 bg-white shadow-sm rounded-[10px] w-[23%]'>
                <div
                    onClick={() => {
                        setView("manage")
                    }}
                    className={`${view === "manage" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                >
                    Manage Tags
                </div>

                <div
                    onClick={() => {
                        setView("analytics")
                    }}
                    className={`${view === "analytics" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                >
                    Analytics
                </div>
            </div>
            {view === "manage" && <div>
                <div className='flex items-center justify-between mt-3.5'>
                    <Search
                        placeholder="Search by Tags"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <div className='flex items-center gap-3.5'>
                        <div className="border border-border-color px-2 py-1 rounded-lg w-28 cursor-pointer">
                            <div className="flex items-start justify-center gap-2 mt-1">
                                <Checkbox
                                // checked={list?.length > 0 && list.every(e => e.selected)}
                                // onChange={(checked) => {
                                //     setList(list => list.map(e => ({ ...e, selected: checked })))
                                // }}
                                />
                                <div className="text-text3 text-sm capitalize mt-[2px]">Select all</div>
                            </div>
                        </div>
                        <button className="border border-border2 text-text3 p-2.5 text-xs rounded-lg">Bulk Change Tags</button>
                        <CustomSelectBox
                            defaultOption="Client"
                            class_='mt-0! w-32!'
                        >
                            <option value="subscription-plan">Client</option>
                            <option value="status">Region</option>
                        </CustomSelectBox>
                        <SecondaryButton
                            title="Create Customer Tag"
                            type='submit'
                            class_="text-xs! font-normal!"
                        />
                    </div>
                </div>
                <div className="table-class mt-3.5">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th><TableOrder title="Tag Name"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="TagName" /></th>
                                <th><TableOrder title="Description" /></th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Tagged Customers" />
                                    </div>
                                </th>
                                <th>
                                    <div className="flex justify-center">
                                        <TableOrder title="Created By" />
                                    </div>
                                </th>
                                <th className="text-center!">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Business.map((e, i) =>
                                <tr key={i}>
                                    <td>
                                        <div className="flex items-center gap-2.5">
                                            <Checkbox />
                                            <h2>{e.name}</h2>
                                        </div>
                                    </td>
                                    <td>{e.description}</td>
                                    <td className="text-center! text-primary! underline underline-offset-2">{e.customers}</td>
                                    <td className="text-center!">{e.created}</td>
                                    <td>
                                        <div className='flex w-auto items-center gap-2.5 justify-center'>
                                            <button className='cursor-pointer'>
                                                <Image unoptimized={true} src="/images/edit.svg" alt='edit' height={28} width={28} />
                                            </button>
                                            <button className='cursor-pointer'>
                                                <Image unoptimized={true} src="/images/delete1.svg" alt='delete1' height={28} width={28} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                <PaginationDemo />
            </div>}
            {view === "analytics" && <div className="mt-3.5">
                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">Tag Distribution</h2>
                    <div className="flex gap-3.5">
                        <DateRange
                            onChange={(e) => { setDate(e) }}
                        />
                        <CustomSelectBox
                            defaultOption="Client"
                            class_='mt-0! w-28!'
                        >
                            <option value="subscription-plan">Client 1</option>
                            <option value="status">Client 2</option>
                        </CustomSelectBox>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="grid grid-cols-2 gap-5">
                        <DashboardChart title="Dummy Chart 1">
                            <div className="flex items-start">
                                <div className="w-[60%]">
                                    <DashboardPieChart
                                        labels={["5", "4", "3", "2", "1"]}
                                        colors={["#0396FF", "#16C098", "#FFAE4C", "#07DBFA", "#988AFC"]}
                                    />
                                </div>
                                <div className="mt-10 w-[40%]">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-primary h-3 w-3 rounded-full"></div>
                                        <div className="text-base text-secondary">5</div>
                                        <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                        <div className="text-sm text-secondary">50%</div>
                                    </div>

                                    <div className="flex  items-center gap-3 mb-2">
                                        <div className="bg-success-light h-3 w-3 rounded-full"></div>
                                        <div className="text-base text-secondary">4</div>
                                        <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                        <div className="text-sm text-secondary">20%</div>
                                    </div>

                                    <div className="flex  items-center gap-3 mb-2">
                                        <div className="bg-custom-yellow h-3 w-3 rounded-full"></div>
                                        <div className="text-base text-secondary">3</div>
                                        <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                        <div className="text-sm text-secondary">10%</div>
                                    </div>

                                    <div className="flex  items-center gap-3 mb-2">
                                        <div className="bg-[#07DBFA] h-3 w-3 rounded-full"></div>
                                        <div className="text-base text-secondary">2</div>
                                        <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                        <div className="text-sm text-secondary">10%</div>
                                    </div>

                                    <div className="flex  items-center gap-3 mb-2">
                                        <div className="bg-custom-purple h-3 w-3 rounded-full"></div>
                                        <div className="text-base text-secondary">1</div>
                                        <Image src="/images/star.svg" alt="star" height={16} width={16} unoptimized={true} />
                                        <div className="text-sm text-secondary">10%</div>
                                    </div>
                                </div>
                            </div>
                        </DashboardChart>

                        <DashboardChart title="Dummy Chart 2" height={366} width={656} class_="w-full">
                            <DashboardLineChart />
                        </DashboardChart>
                    </div>
                </div>
            </div>}
        </AdminLayout>
    )
}
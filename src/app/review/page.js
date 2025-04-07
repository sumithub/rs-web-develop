"use client"
import Image from "next/image";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Select from "../components/form/Select";
import Checkbox from "../components/form/Checkbox";
import Status from "../components/Status";
import TableOrder from "../components/TableOrder"
import { useState } from "react";
import Search from "../components/form/Search"
import Dropdown from "../components/DropDown";
import DatePicker from "../components/form/DatePicker";
import Loading from "../components/Loading"
import Pagination from "../components/Pagination"
export default function Review() {
    const [rating, setRating] = useState("")
    const [reviewSource, setReviewSource] = useState("")
    const [status, setStatus] = useState("")
    const [date, setDate] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")

    return <div >
        <Header />
        <Sidebar />
        <div className="bg-[#F9FBFC] min-h-[calc(100dvh_-_85px)] pl-[113px] py-6 px-4 mt-[85px]">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-[0px_0px_22px_0px_#0000000F] py-3 px-4">
                    <div>
                        <div className="text-secondary text-base font-semibold mb-3">Most mentioned keywords</div>
                        {/* <Image src="/images/graph.png" alt="graph" height={127} width={394} className="w-full" /> */}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_0px_22px_0px_#0000000F] py-3 px-4">
                    <div>
                        <div className="text-secondary text-base font-semibold mb-3">Average rating trend</div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="text-secondary">
                                <div className="text-xs font-semibold">Total</div>
                                <div className="text-[22px] font-semibold my-1">4.3</div>
                                <div className="flex items-center gap-1">
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />  <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />  <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />  <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div>
                                        <div className="text-xs mb-1.5">Ratings</div>
                                        <div className="text-base font-semibold">233</div>
                                    </div>
                                    <div>
                                        <div className="text-xs capitalize mb-1.5">Rating With Reviews</div>
                                        <div className="text-base font-semibold">217</div>
                                    </div>
                                </div>

                            </div>
                            {/* <Image src="/images/graph1.png" alt="graph" height={117} width={180} /> */}
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_0px_22px_0px_#0000000F] py-3 px-4">
                    <div>
                        <div className="text-secondary text-base font-semibold mb-3">Sentiment analysis</div>
                    </div>
                </div>
            </div>

            <div className="bg-white min-h-[calc(100vh_-_85px)] rounded-[10px] mt-5 p-5">
                <div className="flex justify-between items-center w-full">
                    {/* <div className="relative w-[32%]">
                        <div className="w-full">
                            <input type="text" className="block md:py-2 pl-2 text-left w-full z-10 text-sm placeholder:text-text3 bg-dark border border-border2 rounded-lg focus-visible:outline-none shadow-[0.84px_0.84px_2.52px_0px_#0000000F]"

                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                                placeholder="Search by customer name, review content, or source." />

                            <span className="absolute text-center top-1 right-0 py-2 px-2">
                                <Image src="/images/search.svg" alt="search" height={14} width={14} unoptimized={true} />
                            </span>
                        </div>
                    </div> */}

                    <Search
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_0.3fr_1fr] items-start gap-4">
                        <Select
                            class_="mt-0!"
                            defaultOption="start rating"
                            value={rating}
                            onChange={(e) => {
                                setRating(e.target.value)
                            }}>
                            <option value="rating 1">Rating 1</option>
                            <option value="rating 2">Rating 2</option>
                        </Select>
                        <DatePicker
                            icon={true}
                            mainClass="mt-0!"
                            value={date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(e) => setDate(e)}
                        />
                        <Select
                            class_="mt-0!"
                            defaultOption="Review Source"
                            value={reviewSource}
                            onChange={(e) => {
                                setReviewSource(e.target.value)
                            }}>
                            <option value="google">Google</option>
                            <option value="google 1">Google 1</option>
                        </Select>

                        <Select
                            class_="mt-0!"
                            defaultOption="Review Status"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value)
                            }}>
                            <option value="new">New</option>
                            <option value="responded">Responded</option>
                        </Select>

                        <button className="cursor-pointer disabled:pointer-events-none ">
                            <Image src="/images/network.svg" alt="network" height={36} width={36} unoptimized={true} />
                        </button>

                        <button className="bg-primary rounded-lg py-2.5 px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 ">Create Manual Review</button>
                    </div>
                </div>
                <div className="border border-border-color px-2 py-1 rounded-lg w-28 mt-5">
                    <div className="flex items-start justify-center gap-2 mt-1">
                        <Checkbox />
                        <div className="text-text3 text-sm capitalize">Select all</div>
                    </div>
                </div>

                <div className="w-full overflow-x-auto mt-5 border border-border-color rounded-[20px]">

                    <table className="w-full">
                        <thead>
                            <tr className="text-secondary text-sm font-semibold bg-dark border-b border-border-color text-left">
                                <th className="py-4 px-4"><TableOrder title="Reviewer" /></th>
                                <th className="py-4 px-4"><TableOrder title="Rating" /></th>
                                <th className="py-4 px-4"><TableOrder title="Review Text" /></th>
                                <th className="py-4 px-4"><TableOrder title="Source" /></th>
                                <th className="py-4 px-4"><TableOrder title="Last Updated" /></th>
                                <th className="py-4 px-4"><TableOrder title="Status" /></th>
                                <th className="py-4 px-4">Actions</th>
                            </tr>
                        </thead>

                        {/* <tbody>
                            {loading ? <tr><td colSpan={6} className='text-center'><Loading /></td></tr> : (
                                (list && list.length > 0) ? list.map((e, index) => {
                                    <tr className={`border-b border-border-color text-secondary text-sm text-left ${index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"} cursor-pointer text-sm`}>
                                        <td className="py-3 px-4">
                                            <div className="flex items-start gap-2">
                                                <Checkbox />
                                                <div>Hiking template</div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        </td>
                                        <td className="py-3 px-4">{e.review}</td>
                                        <td className="py-3 px-4">{e.source}</td>
                                        <td className="py-3 px-4">Jun 18,2024 | 10:00AM</td>
                                        <td className="py-3 px-4"><Status  status={e.status}/></td>
                                        <td className="py-3 px-4"><Dropdown /></td>
                                    </tr>
                                }) : <tr><td colSpan={10} className='text-center! h-20  text-3xl text-secondary'>No data</td></tr>
                            )}
                        </tbody> */}

                        <tbody>
                            <tr className={`border-b border-border-color text-secondary text-sm text-left } text-sm hover:bg-dark`}>
                                <td className="py-3.5 px-4">
                                    <div className="flex items-start gap-2">
                                        <Checkbox />
                                        <div>Hiking template</div>
                                    </div>
                                </td>
                                <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-1">
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                    </div>
                                </td>
                                <td className="py-3.5 px-4">Great!</td>
                                <td className="py-3.5 px-4">Google</td>
                                <td className="py-3.5 px-4">Jun 18,2024 | 10:00AM</td>
                                <td className="py-3.5 px-4"><Status status="Responded" /></td>
                                <td className="py-3.5 px-4"><Dropdown /></td>
                            </tr>

                            <tr className={`border-b border-border-color text-secondary text-sm text-left } text-sm hover:bg-dark`}>
                                <td className="py-3.5 px-4">
                                    <div className="flex items-start gap-2">
                                        <Checkbox />
                                        <div>Hiking template</div>
                                    </div>
                                </td>
                                <td className="py-3.5 px-4">
                                    <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                </td>
                                <td className="py-3.5 px-4">Great!</td>
                                <td className="py-3.5 px-4">Google</td>
                                <td className="py-3.5 px-4">Jun 18,2024 | 10:00AM</td>
                                <td className="py-3.5 px-4"><Status status="Responded" /></td>
                                <td className="py-3.5 px-4"><Dropdown /></td>
                            </tr>

                            <tr className={`border-b border-border-color text-secondary text-sm text-left } text-sm hover:bg-dark`}>
                                <td className="py-3.5 px-4">
                                    <div className="flex items-start gap-2">
                                        <Checkbox />
                                        <div>Hiking template</div>
                                    </div>
                                </td>
                                <td className="py-3.5 px-4">
                                    <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                </td>
                                <td className="py-3.5 px-4">Great!</td>
                                <td className="py-3.5 px-4">Google</td>
                                <td className="py-3.5 px-4">Jun 18,2024 | 10:00AM</td>
                                <td className="py-3.5 px-4"><Status status="Responded" /></td>
                                <td className="py-3.5 px-4"><Dropdown /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Pagination />
            </div>
        </div>

    </div>
}
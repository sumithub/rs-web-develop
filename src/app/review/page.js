"use client"
import Image from "next/image";
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import Select from "../../components/form/Select";
import Checkbox from "../../components/form/Checkbox";
import Status from "../../components/Status";
import TableOrder from "../../components/TableOrder";
import Search from "../../components/form/Search";
import Dropdown from "../../components/DropDown";
import DatePicker from "../../components/form/DatePicker";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination"
import Chart from "../../components/Chart"

export default function Review() {
    const [rating, setRating] = useState("")
    const [reviewSource, setReviewSource] = useState("")
    const [status, setStatus] = useState("")
    const [date, setDate] = useState("")
    // const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    const list = [
        { name: "Hiking template", review: "Great!", source: "Google", lastUpdate: "	Jun 18,2024 | 10:00AM", status: "New" },

        { name: "Hiking template", review: "Great!", source: "Google", lastUpdate: "	Jun 18,2024 | 10:00AM", status: "Responded" },

        { name: "Hiking template", review: "Great!", source: "Google", lastUpdate: "	Jun 18,2024 | 10:00AM", status: "Flagged" },
    ]

    return <div >
        <Header />
        <Sidebar />
        <div className="bg-light min-h-[calc(100dvh_-_85px)] pl-[113px] py-6 px-3 mt-[85px]">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-[0px_0px_22px_0px_#0000000F] py-3 px-4">
                    <div>
                        <div className="text-secondary text-base font-semibold mb-3">Most mentioned keywords</div>
                        <Chart />
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
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />  <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div>
                                        <div className="2xl:text-sm lg:text-[10px] mb-1.5">Ratings</div>
                                        <div className="2xl:text-base text-sm font-semibold">233</div>
                                    </div>
                                    <div>
                                        <div className="2xl:text-sm lg:text-[10px] capitalize mb-1.5">Rating With Reviews</div>
                                        <div className="2xl:text-base text-sm font-semibold">217</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="grid grid-cols-[0.1fr_auto] items-center">
                                    <div className="text-text3 text-sm">5</div>
                                    <ProgressBar completed={100} bgColor="#FFC107" height="12px"
                                        isLabelVisible={false} borderRadius="2px"
                                    />
                                </div>

                                <div className="grid grid-cols-[0.1fr_auto] items-center my-1.5">
                                    <div className="text-text3 text-sm">4</div>
                                    <ProgressBar completed={80} bgColor="#FFC107" height="12px"
                                        isLabelVisible={false} borderRadius="2px"
                                    />
                                </div>
                                <div className="grid grid-cols-[0.1fr_auto] items-center">
                                    <div className="text-text3 text-sm">3</div>
                                    <ProgressBar completed={50} bgColor="#FFC107" height="12px"
                                        isLabelVisible={false} borderRadius="2px"
                                    />
                                </div>

                                <div className="grid grid-cols-[0.1fr_auto] items-center my-1.5">
                                    <div className="text-text3 text-sm">2</div>
                                    <ProgressBar completed={50} bgColor="#FFC107" height="12px"
                                        isLabelVisible={false} borderRadius="2px"
                                    />
                                </div>

                                <div className="grid grid-cols-[0.1fr_auto] items-center">
                                    <div className="text-text3 text-sm">1</div>
                                    <ProgressBar completed={50} bgColor="#FFC107" height="12px"
                                        isLabelVisible={false} borderRadius="2px"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_0px_22px_0px_#0000000F] py-3 px-4">
                    <div>
                        <div className="text-secondary text-base font-semibold mb-3">Sentiment analysis</div>
                        <div>
                            <div>
                                <ProgressBar completed={50} bgColor="#28A745" height="5px"
                                    isLabelVisible={false}
                                />
                                <div className="flex items-center justify-between mt-1">
                                    <div className="text-text3 text-sm font-normal">Positive</div>
                                    <div className="text-sm font-medium flex gap-1">
                                        <div className="text-secondary">3,035</div>
                                        <div className="text-text3">(50%)</div>
                                    </div>
                                </div>
                            </div>

                            <div className="my-3">
                                <ProgressBar completed={15} bgColor="#FFC107" height="5px"
                                    isLabelVisible={false}
                                />
                                <div className="flex items-center justify-between mt-1">
                                    <div className="text-text3 text-sm font-normal">Neutral</div>
                                    <div className="text-sm font-medium flex gap-1">
                                        <div className="text-secondary">386</div>
                                        <div className="text-text3">(15%)</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <ProgressBar completed={5} bgColor="#1F2933" height="5px"
                                    isLabelVisible={false}
                                />
                                <div className="flex items-center justify-between mt-1">
                                    <div className="text-text3 text-sm font-normal">Mixed</div>
                                    <div className="text-sm font-medium flex gap-1">
                                        <div className="text-secondary">374</div>
                                        <div className="text-text3">(5%)</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                <ProgressBar completed={38} bgColor="#DC3545" height="5px"
                                    isLabelVisible={false}
                                />
                                <div className="flex items-center justify-between mt-1">
                                    <div className="text-text3 text-sm font-normal">Negative</div>
                                    <div className="text-sm font-medium flex gap-1">
                                        <div className="text-secondary">2,307</div>
                                        <div className="text-text3">(38%)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white min-h-[calc(100vh_-_85px)] rounded-[10px] mt-5 p-5">
                <div className="2xl:flex lg:flex-wrap justify-between items-center w-full">
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
                    <div className="grid grid-cols-[0.8fr_0.8fr_0.8fr_0.8fr_auto_1fr] items-start 2xl:gap-3 xl:gap-2 lg:gap-2 2xl:mt-0 mt-3">
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
                            <option value="flagged">Flagged</option>
                        </Select>

                        <button className="cursor-pointer disabled:pointer-events-none">
                            <Image src="/images/network.svg" alt="network" height={36} width={36} unoptimized={true} />
                        </button>

                        <button className="bg-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50">Create Manual Review</button>
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

                        <tbody>
                            {loading ? <tr><td colSpan={6} className='text-center'><Loading /></td></tr> : (
                                (list && list.length > 0) ? list.map((e, index) => {
                                    return <tr key={index} className={`${index === 0 ? "" : "border-t"} border-border-color text-secondary text-sm text-left hover:bg-dark text-sm`}>
                                        <td className="py-3 px-4">
                                            <div className="flex items-start gap-2">
                                                <Checkbox />
                                                <div>{e.name}</div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-1">
                                                <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                                <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                                <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                                <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                                <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">{e.review}</td>
                                        <td className="py-3 px-4">{e.source}</td>
                                        <td className="py-3 px-4">{e.lastUpdate}</td>
                                        <td className="py-3 px-4"><Status status={e.status} /></td>
                                        <td className="py-3 px-4"><Dropdown /></td>
                                    </tr>
                                }) : <tr><td colSpan={10} className='text-center! h-20 text-3xl text-secondary'>No data</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        </div>
    </div>
}
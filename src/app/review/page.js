"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Checkbox from "../../components/form/Checkbox";
import Status from "../../components/Status";
import TableOrder from "../../components/TableOrder";
import Search from "../../components/form/Search";
import Dropdown from "../../components/DropDown";
import Loading from "../../components/Loading";
import Chart from "../../components/charts/Chart"
import AdminLayout from "../../components/AdminLayout"
import CustomSelectBox from '../../components/form/CustomSelectBox';
import AddManualReview from '../../components/Models/review/AddManualReview';
import axios from "axios";
import { toast } from "react-toastify";
import { formatDateTime, getError } from "../../../helper";
import { manageReview, REVIEW_ACTIONS } from "../../constent/constArray";
import ReviewDetail from "../../components/Models/review/ReviewDetail";
import RequestUpdate from "../../components/Models/review/RequestUpdate";
import AssignReviewToUser from "../../components/Models/review/AssignReviewToUser";
import ReviewDetails from "../../components/Models/review/ReviewDetails";
import DeleteTemplate from "../../components/Models/review/DeleteTemplate";
import DateRange from "../../components/form/DateRangePicker";
import PaginationDemo from "../../components/Pagination";
import ReviewNoData from "../../components/ReviewNoData"
import SecondaryButton from "../../components/common/SecondaryButton";

export default function Review() {
    const [rating, setRating] = useState("")
    const [reviewSource, setReviewSource] = useState("")
    const [status, setStatus] = useState("")
    const [date, setDate] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const [sortBy, setSortBy] = useState("")
    const [openModal, setOpenModal] = useState(null)

    useEffect(() => {
        getReview()
    }, [search, status, rating, reviewSource, date, sortBy])

    const getReview = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || manageReview)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return <AdminLayout noCard={true}>

        {open &&
            <AddManualReview
                onClose={() => {
                    setOpen(false)
                }}

                onSave={() => {
                    setOpen(true)
                }}
            />
        }

        {openModal === "delete" &&
            <DeleteTemplate
                onClose={() => {
                    setOpenModal(false)
                }} />
        }

        {openModal === "reply-now" &&
            <ReviewDetail
                onClose={() => {
                    setOpenModal(false)
                }} />
        }

        {openModal === "request-update" &&
            <RequestUpdate
                onClose={() => {
                    setOpenModal(false)
                }} />
        }

        {openModal === "assign-to-user" &&
            <AssignReviewToUser
                onClose={() => {
                    setOpenModal(false)
                }} />
        }

        {openModal === "share" &&
            <ReviewDetails
                onClose={() => {
                    setOpenModal(false)
                }} />
        }

        <div className="bg-light min-h-[calc(100dvh_-_85px)] mt-[85px]">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-[0px_0px_22px_0px_#0000000F] py-3 px-4">
                    <div>
                        <div className="text-secondary text-base font-semibold mb-3 capitalize">Most mentioned keywords</div>
                        <Chart />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_0px_22px_0px_#0000000F] py-3 px-4">
                    <div>
                        <div className="text-secondary text-base font-semibold mb-3 capitalize">Average rating trend</div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="text-secondary">
                                <div className="text-xs font-semibold">Total</div>
                                <div className="text-[22px] font-semibold my-1">4.3</div>
                                <div className="flex items-center gap-1">
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div>
                                        <div className="2xl:text-xs lg:text-[10px] mb-1.5">Ratings</div>
                                        <div className="2xl:text-base text-sm font-semibold">233</div>
                                    </div>
                                    <div>
                                        <div className="2xl:text-xs lg:text-[10px] capitalize mb-1.5">Rating With Reviews</div>
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
                        <div className="text-secondary text-base font-semibold mb-3 capitalize">Sentiment analysis</div>
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
                <div className="flex justify-between items-center w-full gap-[15px]">
                    <Search
                        placeholder="Search by customer name, review content, or source."
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <div className="flex gap-3">
                        <CustomSelectBox
                            class_="mt-0! w-32!"
                            defaultOption="start rating"
                            value={rating}
                            onChange={(e) => {
                                setRating(e.target.value)
                            }}>
                            <option value="1 star">1 Star</option>
                            <option value="2 star">2 Star</option>
                            <option value="3 star">3 Star</option>
                            <option value="4 star">4 Star</option>
                            <option value="5 star">5 Star</option>
                        </CustomSelectBox>

                        <DateRange class_="shrink-0!"
                            onChange={(e) => { setDate(e) }} />

                        <CustomSelectBox
                            class_="mt-0! w-40!"
                            defaultOption="Review Source"
                            value={reviewSource}
                            onChange={(e) => {
                                setReviewSource(e.target.value)
                            }}>
                            <option value="google">Google</option>
                            <option value="yelp">Yelp</option>
                            <option value="truspilot">Truspilot</option>
                        </CustomSelectBox>

                        <CustomSelectBox
                            class_="mt-0! w-[135px]!"
                            defaultOption="Review Status"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value)
                            }}>
                            <option value="new">New</option>
                            <option value="responded">Responded</option>
                            <option value="flagged">Flagged</option>
                        </CustomSelectBox>

                        {/* <button className="cursor-pointer disabled:pointer-events-none shrink-0">
                            <Image src="/images/network.svg" alt="network" height={36} width={36} unoptimized={true} />
                        </button> */}

                        <div className="shrink-0!">
                            <SecondaryButton title="Create Manual Review" class_="text-xs! py-2.5!" onClick={() => { setOpen(true) }} />
                        </div>
                    </div>
                </div>
                <div className="border border-border-color px-2 py-1 rounded-lg w-28 mt-5">
                    <div className="flex items-start justify-center gap-2 mt-1">
                        <Checkbox
                            checked={list?.length > 0 && list.every(e => e.selected)}
                            onChange={(checked) => {
                                setList(list => list.map(e => ({ ...e, selected: checked })))
                            }} />
                        <div className="text-text3 text-sm capitalize mt-[2px]">Select all</div>
                    </div>
                </div>

                <div className="w-full overflow-x-auto mt-5 border border-border-color rounded-[20px]">

                    {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>

                        <thead>
                            <tr className="text-secondary text-sm font-semibold bg-dark border-b border-border-color text-left">
                                <th className="py-4 px-4"><TableOrder title="Reviewer"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="reviewer" /></th>
                                <th className="py-4 px-4"><TableOrder title="Rating"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="rating" /></th>
                                <th className="py-4 px-4"><TableOrder title="Review Text"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="reviewText" /></th>
                                <th className="py-4 px-4"><TableOrder title="Source"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="source" /></th>
                                <th className="py-4 px-4"><TableOrder title="Last Updated"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="lastUpdated" /></th>
                                <th className="py-4 px-4"><TableOrder title="Status"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="status" /></th>
                                <th className="py-4 px-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? <tr><td colSpan={6} className='text-center'><Loading /></td></tr> : (
                                (list && list.length > 0) ? list.map((e, index) => {
                                    return <tr key={index} className={`${index === 0 ? "" : "border-t"} border-border-color text-secondary text-sm text-left hover:bg-dark`}>
                                        <td className="py-3 px-4">
                                            <div className="flex items-start gap-2">
                                                <Checkbox
                                                    checked={e.selected}
                                                    onChange={(checked) => {
                                                        setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                                    }}
                                                />
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
                                        <td className="py-3 px-4">{formatDateTime(e.lastUpdate)}</td>
                                        <td className="py-3 px-4"><Status status={e.status} /></td>
                                        <td className="py-3 px-4"><Dropdown
                                            options={REVIEW_ACTIONS}
                                            onClickOption={(e) => {
                                                setOpenModal(e)
                                            }}
                                        /></td>
                                    </tr>
                                }) : <tr><td colSpan={10} className='text-center! h-20 text-3xl text-danger'>No data</td></tr>
                            )}
                        </tbody>
                    </table> : <div className='text-center text-2xl text-danger mx-auto h-20 py-20'>No Data</div>)}
                    {list?.length > 0 && <div>
                        <PaginationDemo />
                    </div>}
                </div>
            </div>
        </div>

        {/* <ReviewNoData /> */}
    </AdminLayout>
}
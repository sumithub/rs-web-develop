"use client"
import DashboardCard from "../../components/DashboardCard";
import DashboardChart from "../../components/DashboardChart"
import AdminLayout from "../../components/AdminLayout";
import CustomSelectBox from '../../components/form/CustomSelectBox';
import DateRange from "../../components/form/DateRangePicker";
import { useEffect, useState } from "react";
import DashboardBarChart from "../../components/charts/DashboardBarChart";
import DashboardPieChart from "../../components/charts/DashboardPieChart";
import DashboardLineChart from "../../components/charts/DashboardLineChart";
import StackedReviewChart from "../../components/charts/StackedReviewChart";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../helper";
import { reviews } from "../../constent/constArray";
import Loading from "../../components/Loading";
import BoostRequest from "../../components/Models/boost/BoostRequest"
import Image from "next/image";

export default function Dashboard() {
    const [rating, setRating] = useState([])
    const [date, setDate] = useState("")
    const [reviewSource, setReviewSource] = useState([])
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getReview()
    }, [date, rating, reviewSource])

    const getReview = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || reviews)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return <AdminLayout
        noCard={true}
        headerChild={<div className="flex gap-4 justify-end items-center">
            <CustomSelectBox
                class_="mt-0! w-52!"
                defaultOption="Review Source"
                value={reviewSource}
                multiSelect={true}
                onChange={(e) => {
                    setReviewSource(e.target.value)
                }}>
                <option value="google">Google</option>
                <option value="yelp">Yelp</option>
                <option value="trustpilot">Trustpilot</option>
                <option value="tripadvisor">Tripadvisor</option>
            </CustomSelectBox>

            <CustomSelectBox
                class_="mt-0!"
                defaultOption="start rating"
                value={rating}
                onChange={(e) => {
                    setRating(e.target.value)
                }}
                multiSelect={true}>
                <option value="1 star">1 Star</option>
                <option value="2 star">2 Star</option>
                <option value="3 star">3 Star</option>
                <option value="4 star">4 Star</option>
                <option value="5 star">5 Star</option>
            </CustomSelectBox>
            <DateRange
                value={date}
                onChange={(e) => { setDate(e) }} />
            <button className="flex items-center justify-center gap-2 bg-primary border border-primary py-1.5 px-4 rounded-lg text-white cursor-pointer disabled:pointer-events-none disabled:opacity-50" onClick={() => { setOpen(true) }}><Image unoptimized={true} src="/images/flash.svg" alt="flash" height={16} width={16} />Boost</button>
        </div>}
    >
        {open &&
            <BoostRequest
                onClose={() => {
                    setOpen(false)
                }}
            />
        }
        <div className="bg-light min-h-[calc(100dvh_-_85px)]">
            {loading ? <Loading /> : <>
                <div className="grid grid-cols-4 gap-5">
                    <DashboardCard title="total reviews" count="1234" img="/images/sms-star.svg" bgClass="bg-primary" textColor="text-primary" icon="/images/course-up.svg" percentage="2.5%" bgImage="bg-[url('/images/total.png')]" />

                    <DashboardCard title="Average Rating" count="68%" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/average.png')]" />

                    <DashboardCard title="New Reviews" count="12%" img="/images/star1.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/review.png')]" />

                    <DashboardCard title="Active Campaigns" count="20%" img="/images/sms-star.svg" bgClass="bg-custom-yellow" textColor="text-custom-yellow!" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/active.png')]" />
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5 items-start">
                    <DashboardChart title="Review Count & Average Over Time" class_="w-full object-contain mt-5 p-12">
                        <DashboardBarChart />
                    </DashboardChart>

                    <DashboardChart title="Review Rating Distribution">
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

                    <DashboardChart title="Sentiment Trend" height={366} width={656} class_="w-full">
                        <DashboardLineChart />
                    </DashboardChart>

                    <DashboardChart title="Top Review Sources" height={239} width={509} class_="w-full h-auto object-contain">
                        <StackedReviewChart />
                    </DashboardChart>
                </div>

                <div className="mt-8 w-full border border-border-color rounded-[20px] overflow-hidden">
                    {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                        <thead>
                            <tr>
                                <th>Source</th>
                                <th>Total Reviews</th>
                                <th>Last 30 Days</th>
                                <th>This Month</th>
                                <th>Last Month</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>
                                    <div className="flex gap-2.5">
                                        <Image src={e.img} alt="google.svg" width={17} height={17} unoptimized={true} />
                                        {e.source}
                                    </div>
                                </td>
                                <td>{e.totalReviews}</td>
                                <td>{e.lastDays}</td>
                                <td>{e.thisMonth}</td>
                                <td>{e.lastMonth}</td>
                            </tr>)}
                        </tbody>
                    </table> : <div className='text-center text-2xl text-danger mx-auto h-20'>No Data</div>)}
                </div>
            </>}
        </div>
    </AdminLayout>
}
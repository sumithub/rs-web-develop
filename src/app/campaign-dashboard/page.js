"use client"
import AdminLayout from "../../components/AdminLayout";
import DashboardCard from "../../components/DashboardCard";
import DashboardChart from "../../components/DashboardChart";
import CustomSelectBox from '../../components/form/CustomSelectBox';
import { useEffect, useState } from "react";
import CampaignPerformanceChart from "../../components/charts/CampaignPerformanceChart";
import DashboardPieChart from "../../components/charts/DashboardPieChart";
import SimpleHorizontalBarChart from "../../components/charts/SimpleHorizontalBarChart";
import { toast } from "react-toastify";
import { formatDateTime, getError } from "../../../helper";
import axios from "axios";
import Loading from "../../components/Loading";
import { responseInsights } from "../../constent/constArray";
import DateRange from "../../components/form/DateRangePicker";

export default function CampaignDashboard() {
    const [date, setDate] = useState("")
    const [rating, setRating] = useState([])
    const [reviewSource, setReviewSource] = useState([])
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([])

    useEffect(() => {
        getInsights()
    }, [date, rating, reviewSource])

    const getInsights = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || responseInsights)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return <AdminLayout noCard={true}
        headerChild={<div className="grid grid-cols-3 gap-3 justify-end items-end">
            <CustomSelectBox
                class_="mt-0!"
                defaultOption="Review Source"
                multiSelect={true}
                value={reviewSource}
                onChange={(e) => {
                    setReviewSource(e.target.value)
                }}>
                <option value="google">Google</option>
                <option value="yelp">Yelp</option>
                <option value="trustpilot">Trustpilot</option>
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
        </div>}>
        {loading ? <Loading /> : <>
            <div className="grid grid-cols-4 gap-5">
                <DashboardCard title="Total Campaigns Sent" count="500" img="/images/sound.svg" bgClass="bg-primary" textColor="text-primary" bgImage="bg-[url('/images/total.png')]" />

                <DashboardCard title="Total Messages Delivered" count="45000" img="/images/tick-sms.svg" bgClass="bg-success-light" textColor="text-success-light" bgImage="bg-[url('/images/average.png')]" />

                <DashboardCard title="Open Rate " count="45.3%" img="/images/thumb.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" bgImage="bg-[url('/images/review.png')]" />

                <DashboardCard title="Click-Through Rate" count="12.7%" img="/images/dollar.svg" bgClass="bg-custom-yellow" textColor="text-custom-yellow!" bgImage="bg-[url('/images/active.png')]" />

                <DashboardCard title="Response Rate" count="8.5%" img="/images/user1.svg" bgClass="bg-custom-yellow-dark" textColor="text-primary!" bgImage="bg-[url('/images/review.png')]" />

                <DashboardCard title="Review Conversation Rate" count="5.2%" img="/images/viewers.svg" bgClass="bg-danger-light" textColor="text-success-light!" bgImage="bg-[url('/images/total.png')]" />

                <DashboardCard title="Bounce Rate" count="3.8%" img="/images/sms-star.svg" bgClass="bg-success-dark" textColor="text-primary!" bgImage="bg-[url('/images/active.png')]" />

                <DashboardCard title="Unsubscribe Rate" count="1.2%" img="/images/viewers1.svg" bgClass="bg-[#3BD699]" textColor="text-custom-yellow!" bgImage="bg-[url('/images/average.png')]" />
            </div>

            <div>
                <div className="grid grid-cols-2 gap-5 mt-5 items-start">
                    <DashboardChart title="Campaign Funnel Breakdown" class_="my-5">
                        <SimpleHorizontalBarChart />
                    </DashboardChart>

                    <DashboardChart title="Campaign Performance Over Time" >
                        <CampaignPerformanceChart />
                    </DashboardChart>

                    <DashboardChart title="Individual Response Insights">
                        <div className="mt-5 w-full border border-border-color rounded-tr-[20px] rounded-tl-[20px] overflow-hidden">
                            {(list?.length > 0 ? <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Timestamp</th>
                                        <th>Action Taken</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {list?.map((e, index) => <tr key={index}>
                                        <td>{e.id}</td>
                                        <td>{formatDateTime(e.date)}</td>
                                        <td className="capitalize">{e.actionToken}</td>
                                        <td className="capitalize">{e.details}</td>
                                    </tr>)}
                                </tbody>
                            </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                        </div>
                    </DashboardChart>

                    <DashboardChart title="Engagement Breakdown">
                        <div className="flex items-start">
                            <div className="w-[60%]">
                                <DashboardPieChart
                                    labels={["Opened", "Bounced", "Delivered", "Reviewed", "Clicked"]}
                                    colors={["#0396FF", "#16C098", "#FFAE4C", "#07DBFA", "#988AFC"]}
                                />
                            </div>
                            <div className="mt-10 w-[40%] capitalize">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="bg-primary h-3 w-3 rounded-full"></div>
                                    <div className="text-base text-secondary">opened</div>
                                </div>

                                <div className="flex  items-center gap-3 mb-5">
                                    <div className="bg-success-light h-3 w-3 rounded-full"></div>
                                    <div className="text-base text-secondary">Bounced</div>

                                </div>

                                <div className="flex  items-center gap-3 mb-5">
                                    <div className="bg-custom-yellow h-3 w-3 rounded-full"></div>
                                    <div className="text-base text-secondary">delivered</div>

                                </div>

                                <div className="flex  items-center gap-3 mb-5">
                                    <div className="bg-[#07DBFA] h-3 w-3 rounded-full"></div>
                                    <div className="text-base text-secondary">reviewed</div>

                                </div>

                                <div className="flex  items-center gap-3 mb-5">
                                    <div className="bg-custom-purple h-3 w-3 rounded-full"></div>
                                    <div className="text-base text-secondary">clicked</div>

                                </div>
                            </div>
                        </div>
                    </DashboardChart>
                </div>
            </div>
        </>}
    </AdminLayout>
}
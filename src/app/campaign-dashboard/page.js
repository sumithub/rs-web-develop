"use client"
import Image from "next/image";
import AdminLayout from "../../components/AdminLayout";
import DashboardCard from "../../components/DashboardCard";
import DashboardChart from "../../components/DashboardChart";
import DatePicker from "../../components/form/DatePicker";
import CustomSelectBox from '../../components/form/CustomSelectBox';
import { useState } from "react";
import DashboardLineChart from "../../components/charts/DashboardLineChart";
import DashboardPieChart from "../../components/charts/DashboardPieChart";
import SimpleHorizontalBarChart from "../../components/charts/SimpleHorizontalBarChart";

export default function CampaignDashboard() {
    const [date, setDate] = useState("")
    const [rating, setRating] = useState("")
    const [reviewSource, setReviewSource] = useState("")

    return <AdminLayout noCard={true}
        headerChild={<div className="grid grid-cols-3 gap-3 justify-end items-end">
            <CustomSelectBox
                class_="mt-0!"
                defaultOption="Review Source"
                value={reviewSource}
                onChange={(e) => {
                    setReviewSource(e.target.value)
                }}>
                <option value="google">Google</option>
                <option value="yelp">Yelp</option>
                <option value="trustpilot and tripadvisor">Trustpilot and Tripadvisor</option>
            </CustomSelectBox>

            <CustomSelectBox
                class_="mt-0!"
                defaultOption="start rating"
                value={rating}
                onChange={(e) => {
                    setRating(e.target.value)
                }}>
                <option value="1 star">1 Star & Up</option>
                <option value="4 star">4 Star & Up</option>
                <option value="3 star">3 Star & Up</option>
                <option value="2 star">2 Star & Up</option>
                <option value="1 star">1 Star & Up</option>
            </CustomSelectBox>
            <DatePicker
                icon={true} mainClass="mt-0!"
                value={date}
                dateFormat="dd/MM/yyyy"
                onChange={(e) => setDate(e)} />
        </div>}>
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
                <DashboardChart title="Campaign Funnel Breakdown" height={218} width={509} class_="my-5">
                    <SimpleHorizontalBarChart />
                    <div className="text-xs text-text3 text-center capitalize">Number Of Users</div>
                </DashboardChart>

                <DashboardChart title="Campaign Performance Over Time" height={200} width={466}>
                    <DashboardLineChart />
                </DashboardChart>

                <DashboardChart title="Individual Response Insights">
                    <div className="mt-5 w-full border border-border-color rounded-tr-[20px] rounded-tl-[20px] overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Timestamp</th>
                                    <th>Action Taken</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>USR10000</td>
                                    <td>Jun 18,2024 10:00AM</td>
                                    <td>opened</td>
                                    <td>review submit</td>
                                </tr>

                                <tr>
                                    <td>USR10000</td>
                                    <td>Jun 18,2024 10:00AM</td>
                                    <td>opened</td>
                                    <td>review submit</td>
                                </tr>

                                <tr>
                                    <td>USR10000</td>
                                    <td>Jun 18,2024 10:00AM</td>
                                    <td>opened</td>
                                    <td>review submit</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </DashboardChart>

                <DashboardChart title="Engagement Breakdown">
                    <div className="flex items-start">
                        <div className="w-[60%]">
                            <DashboardPieChart />
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

    </AdminLayout>
}
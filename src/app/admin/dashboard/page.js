"use client"
import { useEffect, useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import DashboardPieChart from "../../../components/charts/DashboardPieChart"
import DashboardCard from "../../../components/DashboardCard"
import DashboardChart from "../../../components/DashboardChart"
import DashboardBar2 from "../../../components/charts/DashboardBar2"
import DashboardTrend from "../../../components/charts/DashboardTrend"
import Search from "../../../components/form/Search"
import LatestReviews from "../../adminDashboad/LatestReviews"
import RecentPayments from "../../adminDashboad/RecentPayments"
import LatestCampaigns from "../../adminDashboad/LatestCampaigns"
import Loading from "../../../components/Loading"

export default function Dashboard() {
    const [view, setView] = useState("reviews")
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [reviewSearch, setReviewSearch] = useState("")
    const [paymentSearch, setPaymentSearch] = useState("")
    const [campaignSearch, setCampaignSearch] = useState("")

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [search]);

    useEffect(() => {
        setTableLoading(true);
        setTimeout(() => {
            setTableLoading(false);
        }, 1000);
    }, [reviewSearch, paymentSearch, campaignSearch]);

    return <AdminLayout
        headerSearch={
            <Search
                mainClass='w-96!'
                placeholder="Search"
                onSearch={(s) => {
                    setSearch(s)
                }}
            />}>

        {loading ? <Loading /> : <div>
            <div className="grid grid-cols-4 gap-5">
                <DashboardCard title="total reviews" count="12,345" img="/images/sms-star.svg" bgClass="bg-primary" textColor="text-primary" bgImage="bg-[url('/images/total.png')]" />

                <DashboardCard title="Average Rating" count="4.5" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" bgImage="bg-[url('/images/average.png')]" />

                <DashboardCard title="Active Campaigns" count="25" img="/images/star1.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" bgImage="bg-[url('/images/review.png')]" />

                <DashboardCard title="Revenue (30Days)" count="$12K" img="/images/sms-star.svg" bgClass="bg-custom-yellow" textColor="text-custom-yellow!" bgImage="bg-[url('/images/active.png')]" />
            </div>

            <div className="grid grid-cols-3 gap-5 mt-5">
                <DashboardChart title="Review Trends" drillDown={true} flexClass="flex items-center justify-between" >
                    <DashboardTrend />
                </DashboardChart>
                <DashboardChart title="Campaign Performance" drillDown={true} flexClass="flex items-center justify-between" >
                    <DashboardBar2 />
                </DashboardChart>

                <DashboardChart title="Subscription Revenue" drillDown={true} flexClass="flex items-center justify-between" >

                    <div>
                        <div className="mt-8">
                            <DashboardPieChart
                                labels={["Opened", "Bounced", "Delivered", "Reviewed", "Clicked"]}
                                colors={["#0396FF", "#16C098", "#FFAE4C", "#07DBFA", "#988AFC"]}
                                maxWidth={240}
                                showPercentage={true}
                            />
                        </div>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 capitalize">
                            <div className="flex items-center gap-x-3 mb-2">
                                <div className="bg-primary h-3 w-3 rounded-full"></div>
                                <div className="text-base text-secondary">opened</div>
                            </div>

                            <div className="flex  items-center gap-x-3 mb-2">
                                <div className="bg-success-light h-3 w-3 rounded-full"></div>
                                <div className="text-base text-secondary">Bounced</div>

                            </div>

                            <div className="flex  items-center gap-x-3 mb-2">
                                <div className="bg-custom-yellow h-3 w-3 rounded-full"></div>
                                <div className="text-base text-secondary">delivered</div>
                            </div>

                            <div className="flex  items-center gap-x-3 mb-2">
                                <div className="bg-[#07DBFA] h-3 w-3 rounded-full"></div>
                                <div className="text-base text-secondary">reviewed</div>

                            </div>

                            <div className="flex  items-center gap-3 mb-2">
                                <div className="bg-custom-purple h-3 w-3 rounded-full"></div>
                                <div className="text-base text-secondary">clicked</div>
                            </div>
                        </div>
                    </div>
                </DashboardChart>
            </div>

            <div className="flex items-center justify-between my-10">
                <div className='bg-white shadow-sm rounded-[10px] overflow-hidden'>
                    <div className='flex items-center gap-10 px-[20px]'>
                        <div
                            onClick={() => {
                                setView("reviews")
                            }}
                            className={`${view === "reviews" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                        >
                            Latest Reviews
                        </div>

                        <div
                            onClick={() => {
                                setView("payments")
                            }}
                            className={`${view === "payments" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                        > Recent Payments
                        </div>

                        <div
                            onClick={() => {
                                setView("campaigns")
                            }}
                            className={`${view === "campaigns" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                        > Latest Campaigns
                        </div>
                    </div>
                </div>

                {view === "reviews" && <Search placeholder="Search by Reviewer" onSearch={(s) => {
                    setReviewSearch(s)
                }} />}
                {view === "payments" && <Search placeholder="Search by Invoice Number" onSearch={(s) => {
                    setPaymentSearch(s)
                }} />}
                {view === "campaigns" && <Search placeholder="Search by Reviewer" onSearch={(s) => {
                    setCampaignSearch(s)
                }} />}
            </div>

            {tableLoading ? (
                <div className="flex justify-center items-center border border-border-color rounded-[20px]">
                    <Loading class_=" min-h-[400px]!" />
                </div>
            ) : (
                <>
                    {view === "reviews" && <LatestReviews />}
                    {view === "payments" && <RecentPayments />}
                    {view === "campaigns" && <LatestCampaigns />}
                </>
            )}
        </div>}
    </AdminLayout>
}
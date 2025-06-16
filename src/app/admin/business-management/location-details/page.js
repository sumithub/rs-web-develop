"use client"
import { useState } from "react"
import AdminLayout from "../../../../components/AdminLayout"
import DashboardCard from "../../../../components/DashboardCard"

export default function LocationDetails() {
    const [sortBy, setSortBy] = useState(false)
    const [view, setView] = useState("overview")
    return (
        <AdminLayout>
            <div className="inline-block">
                <div className='flex items-center gap-10 px-5 bg-white shadow-sm rounded-[10px]'>
                    <div
                        onClick={() => {
                            setView("overview")
                        }}
                        className={`${view === "overview" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                    >
                        overview
                    </div>

                    <div
                        onClick={() => {
                            setView("reviews")
                        }}
                        className={`${view === "reviews" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                    >
                        Reviews
                    </div>
                    <div
                        onClick={() => {
                            setView("campaign")
                        }}
                        className={`${view === "campaign" ? "text-primary font-semibold border-b-2 border-primary" : "text-text3 font-normal"} cursor-pointer shrink-0 py-[15px]`}
                    >
                        Campaign
                    </div>
                </div>
            </div>
            <div>
                {view === "overview" && <div>
                    <div className="bg-secondary2 rounded-[15px] p-5 mt-3.5 flex justify-between items-center">
                        <div>
                            <h2 className="text-base">Client Name</h2>
                            <h2 className="text-lg font-medium pt-1.5">Client A</h2>
                        </div>
                        <hr className="border border-border-color w-16 h-full rotate-90" />
                        <div>
                            <h2 className="text-base">Location Name</h2>
                            <h2 className="text-lg font-medium pt-1.5">Melbourne CBD</h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Address</h2>
                            <h2 className="text-lg font-medium pt-1.5">123 Bourke St, Melbourne VIC 3000 </h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Phone</h2>
                            <h2 className="text-lg font-medium pt-1.5">+61 400 987 654</h2>
                        </div>
                        <hr className="border border-border-color w-16 rotate-90" />
                        <div>
                            <h2 className="text-base">Email</h2>
                            <h2 className="text-lg font-medium pt-1.5">melbourne@smithautorepair.com</h2>
                        </div>
                    </div>
                    <hr className="border-t border-border2 my-5" />
                    <div>
                        <h2 className="text-lg font-semibold pb-5">Performance Stats</h2>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-5">
                            <DashboardCard title="Average Rating" count="4.2" img="/images/tick-sms.svg" bgClass="bg-primary" textColor="text-primary" bgImage="bg-[url('/images/average2.png')]" />
                            <DashboardCard title="Total Reviews" count="5,200" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" bgImage="bg-[url('/images/total2.png')]" />
                            <DashboardCard title="Active Campaigns" count="02" img="/images/location2.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" bgImage="bg-[url('/images/active2.png')]" />
                            <DashboardCard title="Positive Sentiment" count="75%" img="/images/chart-2.svg" bgClass="bg-success" textColor="text-success" bgImage="bg-[url('/images/positive.png')]" />
                            <DashboardCard title="Negative Sentiment" count="12%" img="/images/chart-2.svg" bgClass="bg-danger" textColor="text-danger" bgImage="bg-[url('/images/negative.png')]" />
                        </div>
                    </div>
                </div>}
            </div>
        </AdminLayout>
    )
}
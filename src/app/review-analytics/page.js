"use client"
import AdminLayout from "../../components/AdminLayout";
import Checkbox from "../../components/form/Checkbox";
import DatePicker from "../../components/form/DatePicker";
import Input from "../../components/form/Input"
import Select from "../../components/form/Select";
import SecondaryButton from "../../components/common/SecondaryButton"
import DashboardChart from "../../components/DashboardChart";
import Image from "next/image";

export default function ReviewAnalytics() {
    return (
        <div>
            <AdminLayout>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <div className="font-bold text-xl">
                            Date Range
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <DatePicker label="From" isRequired={true} icon={true} />
                            <DatePicker label="To" isRequired={true} icon={true} />
                        </div>

                        <div className="mt-4" >
                            <div className="font-bold text-xl">
                                Select Report Sections
                            </div>

                            <div className="flex justfy-between align-center gap-2 mt-4 mb-4">
                                <Checkbox />
                                <div>Reviews</div>

                                <Checkbox />
                                <div>Campaigns</div>

                                <Checkbox />
                                <div>Sentiments</div>
                            </div>
                        </div>

                        <div>
                            <hr />
                            <div className="font-bold text-xl mt-4">
                                Review Report Settings
                            </div>

                            <div>
                                <div className="flex justfy-between align-center gap-2 mt-3">
                                    <div>Review Over Time</div>
                                    <Checkbox />
                                </div>
                                <div className="flex justfy-between align-center gap-2 mt-3">
                                    <div>Review Rating Distribution</div>
                                    <Checkbox />
                                </div>
                                <div className="flex justfy-between align-center gap-2 mt-3">
                                    <div>Top Review Sources</div>
                                    <Checkbox />
                                </div>
                            </div>
                        </div>

                        <div>
                            <hr className="mt-4" />
                            <div className="font-bold text-xl mt-4">
                                Campaigns Report Settings
                            </div>

                            <div>
                                <div className="flex justfy-between align-center gap-2 mt-3">
                                    <div>Campaign Funnel Breakdown</div>
                                    <Checkbox />
                                </div>
                                <div className="flex justfy-between align-center gap-2 mt-3">
                                    <div>Campaign Performance</div>
                                    <Checkbox />
                                </div>
                                <div className="flex justfy-between align-center gap-2 mt-3">
                                    <div>Campaign Engagement</div>
                                    <Checkbox />
                                </div>
                            </div>
                        </div>

                        <div>
                            <hr className="mt-4" />
                            <div className="font-bold text-xl mt-4">
                                Email & Scheduling Options
                            </div>

                            <div className="flex justfy-between align-center gap-3">
                                <Select defaultOption="Select Frequency" label="Frequency" isRequired={true} />
                                <Input label="Time" isRequired={true} placeholder="Select Time" />
                            </div>

                            <div>
                                <div>
                                    Enter E-Mail
                                </div>

                                <div className="flex justfy-between align-center gap-3 ">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>Richard</div>
                                        <div>Sophia</div>
                                    </div>
                                    <SecondaryButton title="Search Users" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="font-bold text-xl">
                            Review Report Preview
                        </div>

                        <div className="mt-4">
                            <div className="font-bold text-xl">
                                Preview Visibility
                            </div>

                            <div>
                                <div className="mt-5">
                                    <DashboardChart title="Review Count & Average Over Time" imgName="/images/graph.png" alt="Review" height={235} width={509} class_="w-full object-contain mt-5">
                                    </DashboardChart>
                                </div>

                                <div>
                                    <DashboardChart title="Review Rating Distribution">
                                        <div className="flex items-start">
                                            <div className="w-[60%]">
                                                <Image src="/images/layer.png" alt="chart" height={235} width={283} className="object-contain w-full" />
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
                                </div>

                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout >
        </div >
    )
}
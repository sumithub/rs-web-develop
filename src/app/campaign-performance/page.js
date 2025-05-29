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
                        </div>

                        <div className="mt-4">
                            <DashboardChart title="Top Review Sources" imgName="/images/graph2.png" alt="Top Review" height={239} width={509} class_="w-full h-auto object-contain">
                            </DashboardChart>
                        </div>
                    </div>
                </div>
            </AdminLayout >
        </div >
    )
}
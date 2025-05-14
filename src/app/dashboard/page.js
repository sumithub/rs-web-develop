import DashboardCard from "../../components/DashboardCard";
import Table from "../../components/Table";
import DashboardChart from "../../components/DashboardChart"
import Image from "next/image";
import AdminLayout from "../../components/AdminLayout";
import Select from "../../components/form/Select";
import DatePicker from "../../components/form/DatePicker";

export default function Dashboard() {
    return <AdminLayout
        noCard={true}
        headerChild={<div className="grid grid-cols-4 gap-3 justify-end items-end">
            <Select defaultOption="Review Source">
            </Select>
            <Select
                defaultOption="Star Ratings">
            </Select>

            <DatePicker
                icon={true}
            />
            <button className="flex items-center justify-center gap-2 bg-primary border border-primary py-1.5 px-4 rounded-lg text-white cursor-pointer disabled:pointer-events-none disabled:opacity-50"><Image src="/images/flash.svg" alt="flash" height={16} width={16} unoptimized={true} />Boost</button>
        </div>}
    >
        <div className="bg-light min-h-[calc(100dvh_-_85px)]">
            <div className="grid grid-cols-4 gap-5">
                <DashboardCard title="total reviews" count="1.234" img="/images/sms-star.svg" bgClass="bg-primary" textColor="text-primary" icon="/images/course-up.svg" percentage="2.5%" bgImage="bg-[url('/images/total.png')]" />

                <DashboardCard title="Average Rating" count="68%" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/average.png')]" />

                <DashboardCard title="New Reviews" count="12%" img="/images/star1.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/review.png')]" />

                <DashboardCard title="Active Campaigns" count="20%" img="/images/sms-star.svg" bgClass="bg-custom-yellow" textColor="text-custom-yellow!" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/active.png')]" />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5 items-start">
                <DashboardChart title="Review Count & Average Over Time" imgName="/images/graph.png" alt="Review" height={235} width={509} class_="w-full object-contain mt-5">
                </DashboardChart>

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

                <DashboardChart title="Sentiment Trend" imgName="/images/graph1.png" alt="Sentiment" height={366} width={656} class_="w-full">
                </DashboardChart>

                <DashboardChart title="Top Review Sources" imgName="/images/graph2.png" alt="Top Review" height={239} width={509} class_="w-full h-auto object-contain">
                </DashboardChart>
            </div>
            <div>
                <Table />
            </div>
        </div>
    </AdminLayout>
}
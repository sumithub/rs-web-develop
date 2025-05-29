import Image from "next/image";
import AdminLayout from "../../components/AdminLayout";
import DashboardCard from "../../components/DashboardCard";
import DatePicker from "../../components/form/DatePicker";
import Select from "../../components/form/Select";
import Wordcloud from "../../components/charts/WordCloudChart";
import SentimentBySourceChart from "../../components/charts/SentimentBySourceChart";
import DashboardChart from "../../components/DashboardChart";
import DashboardLineChart from "../../components/charts/DashboardLineChart";
import SentimentTrendChart from "../../components/charts/SentimentTrendChart";

export default function SentimentAnalysis() {
    return (
        <div>
            <AdminLayout
                noCard={true}
                headerChild={<div className="grid grid-cols-3 gap-3 justify-end items-end">
                    <Select defaultOption="Select Sentiment">
                    </Select>
                    <DatePicker

                        icon={true}

                    />
                    <button className="cursor-pointer disabled:pointer-events-none">
                        <Image src="/images/network.svg" alt="network" height={36} width={36} unoptimized={true} />
                    </button>
                </div>}>
                <div className="bg-light min-h-[calc(100dvh_-_85px)]">
                    <div className="grid grid-cols-4 gap-5">
                        <DashboardCard title="total reviews" count="1.234" img="/images/sms-star.svg" bgClass="bg-primary" textColor="text-primary" icon="/images/course-up.svg" percentage="2.5%" bgImage="bg-[url('/images/total.png')]" />
                        <DashboardCard title="Positive Sentiment" count="68%" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/average.png')]" />
                        <DashboardCard title="Negative Sentiment" count="12%" img="/images/star1.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/review.png')]" />
                        <DashboardCard title="Neutral Sentiment" count="20%" img="/images/sms-star.svg" bgClass="bg-custom-yellow" textColor="text-custom-yellow!" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/active.png')]" />
                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-5 mt-5 items-start">
                            <DashboardChart title="Sentiment By Source" class_="my-5">
                                <SentimentBySourceChart />
                            </DashboardChart>
                            <DashboardChart title="Sentiment over time" >
                                <DashboardLineChart />
                            </DashboardChart>
                            <DashboardChart title="Sentiment Trend" >
                                <SentimentTrendChart />
                            </DashboardChart>
                            <DashboardChart title="Conversational Trends And Sentiment" >
                                <Wordcloud />
                            </DashboardChart>
                        </div>
                    </div>
                </div>

            </AdminLayout>
        </div>
    )
}
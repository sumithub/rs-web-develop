"use client"
import Image from "next/image";
import AdminLayout from "../../components/AdminLayout";
import DashboardCard from "../../components/DashboardCard";
import Select from "../../components/form/Select";
import Wordcloud from "../../components/charts/WordCloudChart";
import SentimentBySourceChart from "../../components/charts/SentimentBySourceChart";
import DashboardChart from "../../components/DashboardChart";
import DashboardLineChart from "../../components/charts/DashboardLineChart";
import SentimentTrendChart from "../../components/charts/SentimentTrendChart";
import { useState } from "react";
import DateRange from "../../components/form/DateRangePicker";
import CustomSelectBox from "../../components/form/CustomSelectBox";

export default function SentimentAnalysis() {
    const [filterBy, setFilterBy] = useState("")
    return (
        <div>
            <AdminLayout
                noCard={true}
                headerChild={<div className="grid grid-cols-[1fr_1fr_auto] gap-3 justify-end items-end mt-3">
                    <CustomSelectBox defaultOption="Select Sentiment"
                        class_='mt-0!'
                        value={filterBy}
                        onChange={(e) => {
                            setFilterBy(e.target.value)
                        }}
                        multiSelect={true}>
                        <option value="positive">Positive</option>
                        <option value="neutral">Neutral</option>
                        <option value="negative">Negative</option>
                    </CustomSelectBox>
                    <DateRange
                        icon={true} />
                    <button className="cursor-pointer disabled:pointer-events-none">
                        <Image src="/images/network.svg" alt="network" height={36} width={36} unoptimized={true} />
                    </button>
                </div>}>
                <div className="bg-light min-h-[calc(100dvh_-_85px)]">
                    <div className="grid grid-cols-4 gap-5">
                        <DashboardCard title="total reviews" count="1234" img="/images/sms-star.svg" bgClass="bg-primary" textColor="text-primary" icon="/images/course-up.svg" percentage="2.5%" bgImage="bg-[url('/images/total.png')]" />
                        <DashboardCard title="Positive Sentiment" count="68%" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/average.png')]" />
                        <DashboardCard title="Negative Sentiment" count="12%" img="/images/star1.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/review.png')]" />
                        <DashboardCard title="Neutral Sentiment" count="20%" img="/images/sms-star.svg" bgClass="bg-custom-yellow" textColor="text-custom-yellow!" icon="/images/course-up1.svg" percentage="8.2%" bgImage="bg-[url('/images/active.png')]" />
                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-5 mt-5 items-start">
                            <DashboardChart title="Sentiment By Source" class_="my-5">
                                <div>
                                    <h2 className="text-sm pt-2.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
                                    <div className="grid grid-cols-2 gap-5 py-5">
                                        <div className="rounded-[10px] p-[15px] grid grid-cols-[1fr_5fr] items-center gap-[10px] bg-primary/10">
                                            <Image src="/images/rounded1.png" alt="rounded1" width={49} height={49} />
                                            <div>
                                                <div className="flex justify-between">
                                                    <h2 className="text-sm font-semibold">Trustpilot</h2>
                                                    <p className="text-xs font-semibold text-primary">3,219</p>
                                                </div>
                                                <div className="flex justify-between pt-1.5">
                                                    <h2 className="text-xs">Most Positive Mentions</h2>
                                                    <p className="text-xs">😊</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-[10px] p-[15px] grid grid-cols-[1fr_5fr] items-center gap-[10px] bg-custom-purple-light/10">
                                            <Image src="/images/rounded2.png" alt="rounded2" width={49} height={49} />
                                            <div>
                                                <div className="flex justify-between">
                                                    <h2 className="text-sm font-semibold">Trustpilot</h2>
                                                    <p className="text-xs font-semibold text-custom-purple-light">3,219</p>
                                                </div>
                                                <div className="flex justify-between pt-1.5">
                                                    <h2 className="text-xs">Most Negative Mentions</h2>
                                                    <p className="text-xs">🙁</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <SentimentBySourceChart />
                            </DashboardChart>
                            <DashboardChart title="Sentiment over time" >
                                <DashboardLineChart />
                            </DashboardChart>
                            <DashboardChart title="Sentiment Trend" >
                                <div>
                                    <h2 className="text-sm pt-2.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
                                    <div className="grid grid-cols-2 gap-5 py-5">
                                        <div className="rounded-[10px] p-[15px] grid grid-cols-[1fr_5fr] items-center gap-[10px] bg-primary/10">
                                            <Image src="/images/rounded1.png" alt="rounded1" width={49} height={49} />
                                            <div>
                                                <div className="flex justify-between">
                                                    <h2 className="text-sm font-semibold">Mar 17,2024</h2>
                                                    <p className="text-xs font-semibold text-primary">378</p>
                                                </div>
                                                <div className="flex justify-between pt-1.5">
                                                    <h2 className="text-xs">Most Positive Mentions</h2>
                                                    <p className="text-xs">😊</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-[10px] p-[15px] grid grid-cols-[1fr_5fr] items-center gap-[10px] bg-custom-purple-light/10">
                                            <Image src="/images/rounded2.png" alt="rounded2" width={49} height={49} />
                                            <div>
                                                <div className="flex justify-between">
                                                    <h2 className="text-sm font-semibold">Mar 21,2024</h2>
                                                    <p className="text-xs font-semibold text-custom-purple-light">108</p>
                                                </div>
                                                <div className="flex justify-between pt-1.5">
                                                    <h2 className="text-xs">Most Negative Mentions</h2>
                                                    <p className="text-xs">🙁</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <SentimentTrendChart />
                            </DashboardChart>
                            <DashboardChart title="Conversational Trends And Sentiment" >
                                <div>
                                    <h2 className="text-sm pt-2.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
                                    <Image src="/images/lorem-ipsum.png" alt="lorem-ipsum" width={602} height={121} className="pt-[15px]" />
                                    <div className="grid grid-cols-2 gap-5 pt-5">
                                        <div>
                                            <h2>😊 Positive Sentiment</h2>
                                            <ol className="list-none flex flex-col gap-[15px] pl-2.5 pt-[15px]">
                                                <li className="p-2.5">1 Lorem Ipsum</li>
                                                <li className="p-2.5 bg-secondary2 rounded-[10px]">2 Lorem Ipsum</li>
                                                <li className="p-2.5">3 Lorem Ipsum</li>
                                                <li className="p-2.5 bg-secondary2 rounded-[10px]">4 Lorem Ipsum</li>
                                            </ol>
                                        </div>
                                        <div>
                                            <h2>🙁 Negative Sentiment</h2>
                                            <ol className="list-none flex flex-col gap-[15px] pl-2.5 pt-[15px]">
                                                <li className="p-2.5">1 Lorem Ipsum</li>
                                                <li className="p-2.5 bg-secondary2 rounded-[10px]">2 Lorem Ipsum</li>
                                                <li className="p-2.5">3 Lorem Ipsum</li>
                                                <li className="p-2.5 bg-secondary2 rounded-[10px]">4 Lorem Ipsum</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                {/* <Wordcloud /> */}
                            </DashboardChart>
                        </div>
                    </div>
                </div>

            </AdminLayout>
        </div>
    )
}
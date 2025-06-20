"use client"
import AdminLayout from '../../components/AdminLayout'
import SecondaryButton from '../../components/common/SecondaryButton'
import DashboardBarChart from '../../components/charts/DashboardBarChart'
import DashboardChart from '../../components/DashboardChart'
import DashboardPieChart from '../../components/charts/DashboardPieChart'
import StackedReviewChart from '../../components/charts/StackedReviewChart'
import DashboardLineChart from '../../components/charts/DashboardLineChart'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "../../../helper";
import CheckboxForm from '../../components/form/Checkbox'
import DateRangeForm from "../../components/form/DateRangeForm"
import Loading from '../../components/Loading'
import SimpleHorizontalBarChart from '../../components/charts/SimpleHorizontalBarChart'

export default function ReportTemplates() {
    const [showReport, setShowReport] = useState(false)
    const [showCampaign, setShowCampaign] = useState(false)
    const [showSentiment, setShowSentiment] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const { register, handleSubmit, setValue, clearErrors, formState: { errors }, watch } = useForm();
    const [reviewOverTime, setReviewOverTime] = useState(false);
    const [reviewRatingDistribution, setReviewRatingDistribution] = useState(false);
    const [topReviewSources, setTopReviewSources] = useState(false);
    const [campaignPerformance, setCampaignPerformance] = useState(false);
    const [campaignFunnelBreakdown, setCampaignFunnelBreakdown] = useState(false);
    const [campaignEngagement, setCampaignEngagement] = useState(false);
    const [sentimentTrends, setSentimentTrends] = useState(false);
    const [sentimentDistribution, setSentimentDistribution] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            await axios.post("/api", data);
            toast.success("Report Generated Successfully");
            setData({
                reviewOverTime,
                reviewRatingDistribution,
                topReviewSources,
                campaignPerformance,
                campaignFunnelBreakdown,
                campaignEngagement,
                sentimentTrends,
                sentimentDistribution
            });
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setLoading(false)
        }
    };

    const handleCheckboxChange = (e) => {
        if (!e) {
            setReviewOverTime(false);
            setReviewRatingDistribution(false);
            setTopReviewSources(false);
            setValue("reviewOverTime", false);
            setValue("reviewRatingDistribution", false);
            setValue("topReviewSources", false);
        }
        setShowReport(e);
    };

    const handleCheckboxChange1 = (e) => {
        if (!e) {
            setCampaignPerformance(false);
            setCampaignFunnelBreakdown(false);
            setCampaignEngagement(false);
        }
        setShowCampaign(e);
    };

    const handleCheckboxChange2 = (e) => {
        if (!e) {
            setSentimentTrends(false);
            setSentimentDistribution(false);
        }
        setShowSentiment(e);
    };

    // Calculate if at least one section is selected
    const isAnySectionChecked = reviewOverTime || reviewRatingDistribution || topReviewSources || campaignPerformance || campaignFunnelBreakdown || campaignEngagement || sentimentTrends || sentimentDistribution;

    console.log(reviewOverTime)
    return <AdminLayout noCard={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5 items-start">
                <div className='shadow-[0px_0px_22px_0px_#0000000F] p-5 rounded-[10px] bg-white'>
                    <h2 className='text-lg font-semibold'>Date Range</h2>
                    {/* <DateRange class_='mt-5!' /> */}
                    <DateRangeForm
                        class_="mt-3.5!"
                        label="Select Date"
                        isRequired={true}
                        watch={watch}
                        setValue={setValue}
                        clearError={clearErrors}
                        formProps={{ ...register("date", { required: true }) }}
                        errors={errors}
                        inputClass='py-3! border-primary/10!'
                        labelClass="block mb-1"
                    />
                    <div className='mt-5'>
                        <h2 className='text-lg font-semibold'>Select Report Sections</h2>
                        <div className='flex gap-5 pt-[15px]'>
                            <div className='flex gap-2.5 items-center'>
                                <CheckboxForm
                                    checked={showReport}
                                    onChange={handleCheckboxChange}
                                    formProps={{ ...register("reviews") }} errors={errors}
                                />
                                <h2 className='text-sm'>Reviews</h2>
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <CheckboxForm
                                    checked={showCampaign}
                                    onChange={handleCheckboxChange1}
                                    formProps={{ ...register("campaigns") }} errors={errors}
                                />
                                <h2 className='text-sm'>Campaigns</h2>
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <CheckboxForm
                                    checked={showSentiment}
                                    onChange={handleCheckboxChange2}
                                    formProps={{ ...register("sentiments") }} errors={errors}
                                />
                                <h2 className='text-sm'>Sentiments</h2>
                            </div>
                        </div>
                    </div>
                    <hr className='border-t border-border2 my-5' />
                    {showReport && <div>
                        <h2 className='text-lg font-semibold'>Review Report Settings</h2>
                        <div className='mt-5'>
                            <div className='flex gap-2.5 items-center'>
                                <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Review Over Time</h2>
                                <CheckboxForm
                                    checked={reviewOverTime}
                                    onChange={e => setReviewOverTime(e)}
                                    formProps={{ ...register("reviewOverTime") }} errors={errors}
                                />
                            </div>
                            <div className='flex gap-2.5 items-center my-[15px]'>
                                <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Review Rating Distribution</h2>
                                <CheckboxForm
                                    checked={reviewRatingDistribution}
                                    onChange={e => setReviewRatingDistribution(e)}
                                    formProps={{ ...register("reviewRatingDistribution") }} errors={errors}
                                />
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <Image unoptimized={true} src="/images/top-sources.svg" alt='top-sources' width={20} height={20} />
                                <h2 className='text-sm capitalize'>top review sources</h2>
                                <CheckboxForm
                                    checked={topReviewSources}
                                    onChange={(e) => setTopReviewSources(e)}
                                    formProps={{ ...register("topReviewSources") }} errors={errors} />
                            </div>
                        </div>
                    </div>}

                    {showCampaign && <div>
                        <hr className='border-t border-border2 my-5' />
                        <div>
                            <h2 className='text-lg font-semibold'>Campaign Report Settings</h2>
                            <div className='mt-5'>
                                <div className='flex gap-2.5 items-center'>
                                    <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Campaign Funnel Breakdown</h2>
                                    <CheckboxForm
                                        checked={campaignFunnelBreakdown}
                                        onChange={(e) => setCampaignFunnelBreakdown(e)}
                                        formProps={{ ...register("campaignFunnelBreakdown") }} errors={errors} />
                                </div>
                                <div className='flex gap-2.5 items-center my-[15px]'>
                                    <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Campaign Performance</h2>
                                    <CheckboxForm
                                        checked={campaignPerformance}
                                        onChange={e => setCampaignPerformance(e)}
                                        formProps={{ ...register("campaignPerformance") }} errors={errors} />
                                </div>
                                <div className='flex gap-2.5 items-center'>
                                    <Image unoptimized={true} src="/images/top-sources.svg" alt='top-sources' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Campaign Engagement</h2>
                                    <CheckboxForm
                                        checked={campaignEngagement}
                                        onChange={(e) => setCampaignEngagement(e)}
                                        formProps={{ ...register("campaignEngagement") }} errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>}

                    {showSentiment && <div>
                        <hr className='border-t border-border2 my-5' />
                        <div>
                            <h2 className='text-lg font-semibold'>Sentiment Report Settings</h2>
                            <div className='mt-5'>
                                <div className='flex gap-2.5 items-center mb-[15px]'>
                                    <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Sentiment trends</h2>
                                    <CheckboxForm
                                        checked={sentimentTrends}
                                        onChange={e => setSentimentTrends(e)}
                                        formProps={{ ...register("sentimentTrends") }} errors={errors} />
                                </div>
                                <div className='flex gap-2.5 items-center'>
                                    <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                    <h2 className='text-sm capitalize'>Sentiments Distribution</h2>
                                    <CheckboxForm
                                        checked={sentimentDistribution}
                                        onChange={e => setSentimentDistribution(e)}
                                        formProps={{ ...register("sentimentsDistribution") }} errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>}
                    <SecondaryButton
                        title="Generate Report"
                        type='submit'
                        disabled={loading || !isAnySectionChecked}
                        class_={`text-lg! font-medium! mt-[30px]! `}
                    />
                </div>
                {loading ? <Loading /> : <div className='shadow-[0px_0px_22px_0px_#0000000F] rounded-[10px] p-5 bg-white'>
                    {data ? <div className='shadow-[0px_0px_22px_0px_#0000000F] rounded-[10px]'>
                        <div className='bg-primary/10 p-5 flex gap-2.5 rounded-t-[10px]'>
                            <Image unoptimized={true} src="/images/eye1.svg" alt='eye1' width={22} height={22} />
                            <h2 className='text-lg font-semibold'>Review Report Preview</h2>
                        </div>
                        <div className='p-5'>
                            {data.reviewOverTime && (
                                <div className='mt-5'>
                                    <DashboardChart title="Review Count & Average Over Time" class_="w-full object-contain mt-5 p-[15px] min-h-[426px]">
                                        <DashboardBarChart />
                                    </DashboardChart>
                                </div>
                            )}
                            {data.reviewRatingDistribution && (
                                <div className='mt-5'>
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
                                </div>
                            )}
                            {data.topReviewSources && (<div className='mt-5'>
                                <DashboardChart title="Top Review Sources" height={239} width={509} class_="w-full h-auto object-contain">
                                    <StackedReviewChart />
                                </DashboardChart>
                            </div>)}
                            {data.campaignFunnelBreakdown && (<div className='mt-5'>
                                <DashboardChart title="Campaign Funnel Breakdown" class_="my-5">
                                    <SimpleHorizontalBarChart />
                                </DashboardChart>
                            </div>)}
                            {data.campaignPerformance && (
                                <div className='mt-5'>
                                    <DashboardChart title="Campaign Performance" height={239} width={509} class_="w-full h-auto object-contain">
                                        <StackedReviewChart />
                                    </DashboardChart>
                                </div>
                            )}
                            {data.campaignEngagement && (<div className='mt-5'>
                                <DashboardChart title="Campaign Engagement">
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
                            </div>)}
                            {data.sentimentTrends && (
                                <div className='mt-5'>
                                    <DashboardChart title="Sentiment Trend" height={366} width={656} class_="w-full">
                                        <DashboardLineChart />
                                    </DashboardChart>
                                </div>
                            )}
                            {data.sentimentDistribution && (
                                <div className='mt-5'>
                                    <DashboardChart title="Sentiment Distribution" height={366} width={656} class_="w-full">
                                        <DashboardBarChart />
                                    </DashboardChart>
                                </div>
                            )}
                        </div>
                    </div> : <div></div>

                    }
                </div>}
            </div>
        </form>
    </AdminLayout>
}
"use client"
import AdminLayout from '../../components/AdminLayout'
import SecondaryButton from '../../components/common/SecondaryButton'
import Switch from '../../components/form/Switch'
import DashboardBarChart from '../../components/charts/DashboardBarChart'
import DashboardChart from '../../components/DashboardChart'
import DashboardPieChart from '../../components/charts/DashboardPieChart'
import StackedReviewChart from '../../components/charts/StackedReviewChart'
import DashboardLineChart from '../../components/charts/DashboardLineChart'
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "../../../helper";
import CheckboxForm from '../../components/form/CheckboxForm'
import DateRangeForm from "../../components/form/DateRangeForm"
export default function ReportTemplates() {
    const [clickSwitch, setClickSwitch] = useState(false)
    const [sending, setSending] = useState(false)

    const { register, handleSubmit, setValue, clearErrors, formState: { errors }, watch } = useForm();

    const onSubmit = async (data) => {
        try {
            setSending(true);
            await axios.post("/api", data);
            toast.success("Report Generated Successfully");
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    return <AdminLayout noCard={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
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
                                    formProps={{ ...register("reviews") }} errors={errors}
                                />
                                <h2 className='text-sm'>Reviews</h2>
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <CheckboxForm
                                    formProps={{ ...register("campaigns") }} errors={errors}
                                />
                                <h2 className='text-sm'>Campaigns</h2>
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <CheckboxForm
                                    formProps={{ ...register("sentiments") }} errors={errors}
                                />
                                <h2 className='text-sm'>Sentiments</h2>
                            </div>
                        </div>
                    </div>
                    <hr className='border-t border-border2 my-5' />
                    <div>
                        <h2 className='text-lg font-semibold'>Review Report Settings</h2>
                        <div className='mt-5'>
                            <div className='flex gap-2.5 items-center'>
                                <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Review Over Time</h2>
                                <CheckboxForm
                                    formProps={{ ...register("reviewOverTime") }} errors={errors}
                                />
                            </div>
                            <div className='flex gap-2.5 items-center my-[15px]'>
                                <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Review Rating Distribution</h2>
                                <CheckboxForm
                                    formProps={{ ...register("reviewRatingDistribution") }} errors={errors}
                                />
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <Image unoptimized={true} src="/images/top-sources.svg" alt='top-sources' width={20} height={20} />
                                <h2 className='text-sm capitalize'>top review sources</h2>
                                <CheckboxForm
                                    formProps={{ ...register("topReviewSources") }} errors={errors} />
                            </div>
                        </div>
                    </div>
                    <hr className='border-t border-border2 my-5' />
                    <div>
                        <h2 className='text-lg font-semibold'>Campaign Report Settings</h2>
                        <div className='mt-5'>
                            <div className='flex gap-2.5 items-center'>
                                <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Campaign Funnel Breakdown</h2>
                                <CheckboxForm
                                    formProps={{ ...register("campaignFunnelBreakdown") }} errors={errors} />
                            </div>
                            <div className='flex gap-2.5 items-center my-[15px]'>
                                <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Campaign Performance</h2>
                                <CheckboxForm
                                    formProps={{ ...register("campaignPerformance") }} errors={errors} />
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <Image unoptimized={true} src="/images/top-sources.svg" alt='top-sources' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Campaign Engagement</h2>
                                <CheckboxForm
                                    formProps={{ ...register("campaignEngagement") }} errors={errors} />
                            </div>
                        </div>
                    </div>
                    <hr className='border-t border-border2 my-5' />
                    <div>
                        <h2 className='text-lg font-semibold'>Sentiment Report Settings</h2>
                        <div className='mt-5'>
                            <div className='flex gap-2.5 items-center mb-[15px]'>
                                <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Sentiment trends</h2>
                                <CheckboxForm
                                    formProps={{ ...register("sentimentTrends") }} errors={errors} />
                            </div>
                            <div className='flex gap-2.5 items-center'>
                                <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                                <h2 className='text-sm capitalize'>Sentiments Distribution</h2>
                                <CheckboxForm
                                    formProps={{ ...register("sentimentsDistribution") }} errors={errors} />
                            </div>
                        </div>
                    </div>
                    <SecondaryButton
                        title="Generate Report"
                        type='submit'
                        disabled={sending}
                        class_="py-[15px]! text-lg! font-medium! mt-[30px]!"
                    />
                </div>
                <div className='shadow-[0px_0px_22px_0px_#0000000F] rounded-[10px] p-5 bg-white'>
                    <div className='shadow-[0px_0px_22px_0px_#0000000F] rounded-[10px]'>
                        <div className='bg-primary/10 p-5 flex gap-2.5 rounded-t-[10px]'>
                            <Image unoptimized={true} src="/images/eye1.svg" alt='eye1' width={22} height={22} />
                            <h2 className='text-lg font-semibold'>Review Report Preview</h2>
                        </div>
                        <div className='p-5'>
                            <div className="flex justify-between items-center">
                                <h2 className='text-lg font-semibold capitalize'>Preview visibility</h2>
                                <Switch
                                    checked={clickSwitch}
                                    onChange={() => setClickSwitch(prev => !prev)} />
                            </div>
                            <div className='mt-5'>
                                <DashboardChart title="Review Count & Average Over Time" class_="w-full object-contain mt-5 p-[15px] min-h-[426px]">
                                    <DashboardBarChart />
                                </DashboardChart>
                            </div>
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
                            <div className='mt-5'>
                                <DashboardChart title="Campaign Performance" height={239} width={509} class_="w-full h-auto object-contain">
                                    <StackedReviewChart />
                                </DashboardChart>
                            </div>
                            <div className='mt-5'>
                                <DashboardChart title="Sentiment Trend" height={366} width={656} class_="w-full">
                                    <DashboardLineChart />
                                </DashboardChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </AdminLayout>
}
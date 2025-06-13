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

    const SHAREEMAIL = [
        { img: "/images/request.png", name: "Amelie Laurent", email: "amili@gmail.com", role: "manager" },
        { img: "/images/request.png", name: "Amelie Laurent", email: "amili@gmail.com", role: "owner" },
    ]
    return (
        <div>
            <AdminLayout>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <div className="font-bold text-xl">
                            Date Range
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <DatePicker label="From" isRequired={true} icon={true} class_="border-primary/10!" />
                            <DatePicker label="To" isRequired={true} icon={true} class_="border-primary/10!" />
                        </div>

                        <div className="mt-4" >
                            <div className="font-bold text-xl">
                                Select Report Sections
                            </div>

                            <div className="flex items-center gap-2 mt-4 mb-4">
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
                                <div className="flex items-center gap-2 mt-3">
                                    <div>Review Over Time</div>
                                    <Checkbox />
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                    <div>Review Rating Distribution</div>
                                    <Checkbox />
                                </div>
                                <div className="flex items-center gap-2 mt-3">
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
                                <div className="flex items-center gap-2 mt-3">
                                    <div>Campaign Funnel Breakdown</div>
                                    <Checkbox />
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                    <div>Campaign Performance</div>
                                    <Checkbox />
                                </div>
                                <div className="flex items-center gap-2 mt-3">
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

                            <div className="flex items-center gap-3 mt-3.5">
                                <Select defaultOption="Select Frequency" label="Frequency" isRequired={true} class_="mt-0!" selectClass_="py-3! px-2.5!" />
                                <Input label="Time" isRequired={true} placeholder="Select Time" class_="mt-0!" />
                            </div>

                            <div>
                                <h2 className='text-sm font-medium capitalize py-[15px]'>enter e-mail<span className='text-danger'>*</span></h2>
                                <div className="flex gap-[15px]">
                                    <div className="w-full border border-primary/10 rounded-lg p-2.5 flex justify-between items-center">
                                        <div className="flex gap-[15px]">
                                            <div className="flex gap-[7px] border border-primary/10 rounded-lg p-[5px] items-center">
                                                <Image src="/images/request.png" alt="request" width={17} height={17} />
                                                <h2 className="text-sm">Richard</h2>
                                                <Image unoptimized={true} src="/images/close-square.svg" alt="close-square" width={14} height={14} />
                                            </div>
                                            <div className="flex gap-[7px] border border-primary/10 rounded-lg p-[5px] items-center">
                                                <Image src="/images/request.png" alt="request" width={17} height={17} />
                                                <h2 className="text-sm">Sophia</h2>
                                                <Image unoptimized={true} src="/images/close-square.svg" alt="close-square" width={14} height={14} />
                                            </div>
                                        </div>
                                        <div>
                                            <Image unoptimized={true} src="/images/copy2.svg" alt="copy2" width={20} height={20} />
                                        </div>
                                    </div>
                                    <div className="w-[30%] shrink-0">
                                        <SecondaryButton
                                            title="Search Users"
                                            type='button'
                                            class_="py-[15px]! px-5! text-sm! font-normal!"
                                            onClick={() => { }}
                                        />
                                    </div>
                                </div>

                                {SHAREEMAIL.map((e, i) => <div key={i} className={i === 0 ? "mt-6" : ""}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-[15px]">
                                            <Image src={e.img} alt="request" width={44} height={44} />
                                            <div>
                                                <div className="text-base font-medium">{e.name}</div>
                                                <div className="text-sm text-text3 pt-1">{e.email}</div>
                                            </div>
                                        </div>
                                        <div className="text-lg capitalize">{e.role}</div>
                                    </div>

                                    {i !== SHAREEMAIL.length - 1 && (
                                        <hr className='border-t border-border2 my-3.5' />
                                    )}
                                </div>)}
                            </div>
                            <SecondaryButton
                                mainClass="mt-[152px]"
                                title="Generate Report"
                                type='button'
                                class_="py-3! px-5! text-lg! font-medium!"
                            // onClick={() => { }}
                            />
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
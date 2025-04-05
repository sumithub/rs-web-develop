import Image from "next/image";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Select from "../components/form/Select";
import Checkbox from "../components/form/Checkbox";
import Status from "../components/Status";

export default function Review() {
    return <div >
        <Header />
        <Sidebar />
        <div className="bg-[#F9FBFC] min-h-[calc(100dvh_-_85px)] pl-[118px] py-6 px-6">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-[0px_0px_22px_0px_#0000000F] py-3 px-4">
                    <div>
                        <div className="text-secondary text-base font-semibold mb-3">Most mentioned keywords</div>
                        {/* <Image src="/images/graph.png" alt="graph" height={127} width={394} className="w-full" /> */}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_0px_22px_0px_#0000000F] py-3 px-4">
                    <div>
                        <div className="text-secondary text-base font-semibold mb-3">Average rating trend</div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="text-secondary">
                                <div className="text-xs font-semibold">Total</div>
                                <div className="text-[22px] font-semibold my-1">4.3</div>
                                <div className="flex items-center gap-1">
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />  <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />  <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />  <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div>
                                        <div className="text-xs mb-1.5">Ratings</div>
                                        <div className="text-base font-semibold">233</div>
                                    </div>
                                    <div>
                                        <div className="text-xs capitalize mb-1.5">Rating With Reviews</div>
                                        <div className="text-base font-semibold">217</div>
                                    </div>
                                </div>

                            </div>
                            {/* <Image src="/images/graph1.png" alt="graph" height={117} width={180} /> */}
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_0px_22px_0px_#0000000F] py-3 px-4">
                    <div>
                        <div className="text-secondary text-base font-semibold mb-3">Sentiment analysis</div>
                    </div>
                </div>
            </div>

            <div className="bg-white h-[1304px] rounded-[10px] mt-5 p-5">
                <div className="flex justify-between items-center">
                    <div className="relative w-[32%]">
                        <div className="w-full">
                            <input type="text" className="block md:py-2 pl-2 text-left w-full z-10 text-sm placeholder:text-text3 bg-[#F6F8FB] border border-[#E6E6E6] rounded-lg focus-visible:outline-none shadow-[0.84px_0.84px_2.52px_0px_#0000000F]"
                                placeholder="Search by customer name, review content, or source." />

                            <span className="absolute text-center top-1 right-0 py-2 px-2">
                                <Image src="/images/search.svg" alt="search" height={14} width={14} unoptimized={true} />
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Select
                            class_="mt-0!"
                            defaultOption="start rating" />
                        {/* <DatePicker /> */}
                        <Select
                            class_="mt-0!"
                            defaultOption="Review Source" />

                        <Select
                            class_="mt-0!"
                            defaultOption="Review Status" />

                        <button className="cursor-pointer disabled:pointer-events-none ">
                            <Image src="/images/network.svg" alt="network" height={36} width={36} unoptimized={true} />
                        </button>

                        <button className="bg-primary rounded-lg py-2.5 px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50">Create Manual Review</button>
                    </div>
                </div>
                <div className="border border-border-color px-2 py-1 rounded-lg w-32 mt-5">
                    <div className="flex items-start justify-center gap-2 mt-1">
                        <Checkbox />
                        <div className="text-text3 text-sm capitalize">Select all</div>
                    </div>
                </div>

                <div className="w-full overflow-x-auto mt-5">

                    <table className="w-full border border-border-color">
                        <thead>
                            <tr className="text-secondary text-sm font-semibold bg-[#F6F8FB] border-b border-border-color text-left">
                                <th className="py-5 px-4">Reviewer</th>
                                <th className="py-5 px-4">Rating</th>
                                <th className="py-5 px-4">Review Text</th>
                                <th className="py-5 px-4">Source</th>
                                <th className="py-5 px-4">Last Updated</th>
                                <th className="py-5 px-4">Status</th>
                                <th className="py-5 px-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b border-border-color text-secondary text-sm text-left">
                                <td className="py-5 px-4">
                                    <div className="flex items-start gap-2">
                                        <Checkbox />
                                        <div>Hiking template</div>
                                    </div>
                                </td>
                                <td className="py-5 px-4">
                                    <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                </td>
                                <td className="py-5 px-4">Great!</td>
                                <td className="py-5 px-4">Google</td>
                                <td className="py-5 px-4">Jun 18,2024 | 10:00AM</td>
                                <td className="py-5 px-4"><Status /></td>
                                <td className="py-5 px-4"><Image src="/images/action.svg" alt="action" height={28} width={28} unoptimized={true} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
}
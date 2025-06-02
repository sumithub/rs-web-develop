"use client"
import Image from "next/image";
import AdminLayout from "../../components/AdminLayout";
import CustomSelectBox from "../../components/form/CustomSelectBox";
import Search from "../../components/form/Search";
import Status from "../../components/Status";
import Input from "../../components/form/Input";

export default function ReviewSources() {
    return (<AdminLayout>
        <div className="flex justify-between">
            <div className="flex gap-5 w-full">
                <div className="flex gap-2.5 items-center">
                    <h2 className="text-lg font-medium shrink-0">Manage Review Sources</h2>
                    <div className="text-primary/10">|</div>
                    <h2 className="text-lg font-medium shrink-0">Connect your business to review platforms</h2>
                </div>
                <div className="w-1/4">
                    <Search
                        mainClass='w-full! '
                        placeholder="Search by Review Sources"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                </div>
            </div>
            <div>
                <CustomSelectBox
                    defaultOption="Filters"
                    class_='mt-0! w-26!'
                    // value={filterBy}
                    onChange={(e) => {
                        setFilterBy(e.target.value)
                    }}
                ></CustomSelectBox>
            </div>
        </div>
        <div>
            <div className="pt-[15px]">
                <h2 className="text-lg font-semibold">Popular Review Sources</h2>
                <div className="pt-[15px] grid grid-cols-3 gap-5">
                    <ReviewCard />
                </div>
            </div>
        </div >
    </AdminLayout >
    )
}
function ReviewCard() {
    return (
        <div className="p-[15px] shadow-sm rounded-[15px]">
            <div className="flex items-start justify-between">
                <Image unoptimized={true} src="/images/google2.svg" alt="google2" width={87} height={36} />
                <Status status="Connected" />
            </div>
            <div>
                <h2 className="text-base font-medium pt-2.5">Google Reviews</h2>
                <hr className="border border-secondary/5 my-[15px]" />
                <Input
                    label="URL"
                    placeholder=""
                    hideOptional={true}
                    isRequired={true}
                    icon="/images/add-link.svg"
                />
            </div>
            <div className="flex gap-4 mt-[25px]">
                <button className="text-lg leading-none w-full font-medium bg-danger border border-danger py-3 rounded-[10px] text-white">
                    Disconnect
                </button>
                <button>
                    <Image unoptimized={true} src="/images/edit.svg" alt="edit" width={46} height={46} />
                </button>
            </div>
            {/* <button className="text-lg leading-none w-full font-medium bg-primary border border-primary hover:text-primary hover:bg-white py-3 rounded-[10px] mt-[25px] text-white">
                            Connect
                        </button> */}
        </div>
    )
}
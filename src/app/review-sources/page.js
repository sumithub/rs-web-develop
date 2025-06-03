"use client"
import Image from "next/image";
import AdminLayout from "../../components/AdminLayout";
import CustomSelectBox from "../../components/form/CustomSelectBox";
import Search from "../../components/form/Search";
import Status from "../../components/Status";
import Input from "../../components/form/Input";
import { useState } from "react";
import DisconnectReviewSourceConfirmation from "../../components/Models/review/DisconnectReviewSourceConfirmation";
import ConnectReviewSource from "../../components/Models/review/ConnectReviewSource";

export default function ReviewSources() {
    return (<AdminLayout>

        <div className="flex justify-between">
            <div className="flex gap-5 w-full">
                <div className="flex gap-2.5 items-center">
                    <h2 className="text-lg capitalize font-medium shrink-0">Manage Review Sources</h2>
                    <div className="text-primary/10">|</div>
                    <h2 className="text-lg capitalize font-medium shrink-0">Connect your business to review platforms</h2>
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
                <div className="pt-[15px] grid grid-cols-3 gap-y-[15px] gap-x-5">
                    <ReviewCard />
                    <ReviewCard />
                </div>
            </div>
            <div className="pt-5">
                <h2 className="text-lg font-semibold">All Review Sources</h2>
                <div className="pt-[15px] grid grid-cols-3 gap-y-[15px] gap-x-5">
                    <ReviewCard status="connect" />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </div>
            </div>
        </div >
    </AdminLayout >
    )
}
function ReviewCard({ status }) {
    const [openDisconnect, setOpenDisconnect] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const isConnected = status === "connect";

    return (
        <div className="p-[15px] shadow-sm rounded-[15px]">
            {openDisconnect &&
                <DisconnectReviewSourceConfirmation
                    onClose={() => {
                        setOpenDisconnect(false)
                    }}

                    onSave={() => {
                        setOpenDisconnect(true)
                    }} />
            }

            {openModal &&
                <ConnectReviewSource
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            }
            <div className="flex items-start justify-between">
                <Image unoptimized={true} src="/images/google2.svg" alt="google2" width={87} height={36} />
                <Status status="connected" />
            </div>
            <div>
                <h2 className="text-base font-medium pt-2.5">Google Reviews</h2>
                <hr className="border border-secondary/5 my-[15px]" />
                <Input
                    label="URL"
                    placeholder="https//www.google.com"
                    hideOptional={true}
                    isRequired={true}
                    icon="/images/add-link.svg"
                    infoIcon="/images/url.svg"
                    inputClass="p-2.5!"
                />
            </div>
            <div >
                {isConnected ? (
                    <div className="flex gap-4 mt-[25px]">
                        <button
                            className="text-lg leading-none w-full font-medium bg-danger border border-danger py-3 rounded-[10px] text-white"
                            onClick={() => setOpenDisconnect(true)}
                        >
                            Disconnect
                        </button>
                        <button onClick={() => setOpenModal(true)}>
                            <Image
                                unoptimized
                                src="/images/edit.svg"
                                alt="Edit connection"
                                width={46}
                                height={46}
                            />
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-4 mt-[25px]">
                        <button
                            className="text-lg leading-none w-full font-medium bg-primary border border-primary hover:text-primary hover:bg-white py-3 rounded-[10px] text-white"
                            onClick={() => setOpenModal(true)}
                        >
                            Connect
                        </button>
                        <button onClick={() => setOpenModal(true)}>
                            <Image
                                unoptimized
                                src="/images/edit.svg"
                                alt="Edit connection"
                                width={46}
                                height={46}
                            />
                        </button>
                    </div>
                )}
            </div>
        </div >
    )
}
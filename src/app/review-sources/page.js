"use client"
import Image from "next/image";
import AdminLayout from "../../components/AdminLayout";
import CustomSelectBox from "../../components/form/CustomSelectBox";
import Search from "../../components/form/Search";
import Status from "../../components/Status";
import { useEffect, useState } from "react";
import DisconnectReviewSourceConfirmation from "../../components/Models/review/DisconnectReviewSourceConfirmation";
import ConnectReviewSource from "../../components/Models/review/ConnectReviewSource";
import axios from "axios";
import { getError } from "../../../helper";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import Input from "../../components/form/Input";

export default function ReviewSources() {
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filterBy, setFilterBy] = useState("")

    useEffect(() => {
        getCustomerTag()
    }, [filterBy, search])

    const getCustomerTag = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }
    return (<AdminLayout>

        <div className="flex justify-between">
            <div className="">
                <h2 className="text-lg capitalize font-medium shrink-0">Manage Review Sources</h2>
                <h2 className="text-sm text-text3 pt-1 capitalize">Connect your business to review platforms</h2>
            </div>
            <div className=" flex gap-3.5">
                <div className="w-96">
                    <Search
                        mainClass='w-full!'
                        placeholder="Search Review Platforms"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                </div>
                <CustomSelectBox
                    defaultOption="Filters"
                    class_='mt-0! w-26!'
                    value={filterBy}
                    onChange={(e) => {
                        setFilterBy(e.target.value)
                    }}
                ><option value="filter 1">Filter 1</option>
                    <option value="filter 2">Filter 2</option>
                </CustomSelectBox>
            </div>
        </div>
        {loading ? <Loading /> : (<div>
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
                    <ReviewCard status="connected" />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </div>
            </div>
        </div >)}
    </AdminLayout>
    )
}
function ReviewCard({ status }) {
    const [openDisconnect, setOpenDisconnect] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const isConnected = status !== "connected";

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
                <Status status={isConnected ? "connected" : "not connected"} />
            </div>
            <div>
                <h2 className="text-base font-medium pt-2.5">Google Reviews</h2>
                <hr className="border border-secondary/5 my-[15px]" />
                {isConnected && (<Input
                    label="URL"
                    placeholder="Add URL"
                    hideOptional={true}
                    isRequired={true}
                    infoIcon="/images/url.svg"
                    inputClass="p-2.5!"
                    icon="/images/add-link.svg"
                />)}
                {!isConnected && (<div className="flex items-center gap-2.5 bg-danger/10 p-2.5 rounded-[7px] mt-[15px]">
                    <Image unoptimized={true} src="/images/warning.svg" alt="warning" width={22} height={22} className="" />
                    <h2 className="text-sm">You Are not Connected to Google.</h2>
                </div>)}
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
                                unoptimized={true}
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
                                unoptimized={true}
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
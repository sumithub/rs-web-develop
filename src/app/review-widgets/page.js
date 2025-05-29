"use client"
import Image from "next/image";
import AdminLayout from "../../components/AdminLayout";
import ReviewCard from "../../components/ReviewCard"
import GridWidget from "../../components/Models/review/GridWidget";
import CancelButton from "../../components/common/CancelButton";
import { useState } from "react";

export default function ReviewWidgets() {
    const [openGrid, setOpenGrid] = useState(false)
    return (<AdminLayout>
        {openGrid &&
            <GridWidget
                onClose={() => {
                    setOpenGrid(false)
                }}

                onSave={() => {
                    setOpenGrid(true)
                }} />
        }
        <main className="grid grid-cols-3 gap-3">
            <div className="border border-border-color rounded-md">
                <div className="mt-2 p-2">
                    <ReviewCard />
                </div>

                <div className="p-4">
                    <div className="border border-border-color rounded-md mt-3 p-4">
                        <div className="flex gap-2.5 ">
                            <Image src="/images/google.svg" alt="google.svg" width={20} height={20.47} unoptimized={true} />
                            Verified On Google
                        </div>
                    </div>
                </div>

                <div className="mt-3 p-4 mb-3">
                    <CancelButton title="Grid Review Widget" onClick={() => { setOpenGrid(true) }} />
                </div>
            </div>

            <div className="border border-border-color rounded-md">
                <div className="mt-2 p-2">
                    <ReviewCard />
                </div>

                <div className="p-4">
                    <div className="border border-border-color rounded-md mt-3 p-4">
                        <div className="flex gap-2.5 ">
                            <Image src="/images/google.svg" alt="google.svg" width={20} height={20.47} unoptimized={true} />
                            Verified On Google
                        </div>
                    </div>
                </div>

                <div className="mt-3 p-4 mb-3">
                    <CancelButton title="Grid Review Widget" onClick={() => { setOpenGrid(true) }} />
                </div>
            </div>

            <div className="border border-border-color rounded-md">
                <div className="mt-2 p-2">
                    <ReviewCard />
                </div>

                <div className="p-4">
                    <div className="border border-border-color rounded-md mt-3 p-4">
                        <div className="flex gap-2.5 ">
                            <Image src="/images/google.svg" alt="google.svg" width={20} height={20.47} unoptimized={true} />
                            Verified On Google
                        </div>
                    </div>
                </div>

                <div className="mt-3 p-4 mb-3">
                    <CancelButton title="Grid Review Widget" onClick={() => { setOpenGrid(true) }} />
                </div>
            </div>

        </main>
    </AdminLayout>

    )
}
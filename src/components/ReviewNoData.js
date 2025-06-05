import { useEffect, useState } from "react";
import SecondaryButton from "./common/SecondaryButton";
import Search from "./form/Search";
import Image from "next/image";

export default function ReviewNoData() {
    const [search, setSearch] = useState("")

    // useEffect(() => {
    //     getReview()
    // }, [search])


    return <main>
        <div>
            <div className="flex items-center justify-between">
                <Search
                    placeholder="Search Branch Name..."
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />
                <SecondaryButton title="Add Review Manually" class_="text-xs!" />
            </div>

            <div className="flex flex-col gap-y-2 items-center justify-center w-full mt-20">
                <Image src="/images/nodata.png" alt="nodata" height={90} width={512} className="object-contain" />

                <div className="text-secondary text-xl font-semibold text-center capitalize">Oops! It looks like you haven't connected any <br />review sources yet. </div>

                <div className="text-text3 text-sm font-normal text-center capitalize">To start monitoring reviews from platforms like Google, Yelp, and Facebook,<br /> please add at least one review source. </div>


            </div>
            <div className="mb-20">

                <SecondaryButton title="add review source" class_="w-[44%]! mx-auto! flex! items-center! justify-center! my-5" />
                <div className="text=secondary text-sm text-center font-medium capitalize">Need help? Visit our Help Center or contact support for assistance.</div>
            </div>
        </div>
    </main>
}
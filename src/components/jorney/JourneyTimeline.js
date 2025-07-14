"use client"
import Image from "next/image"
import { CustomerTimeline } from "../../constent/constArray"
import Status from "../Status"
function JourneyTimeline() {
    return <>
        <div className="">
            <h2 className="text-lg font-semibold mt-5 mb-3.5">Journey Timeline</h2>
            <div className="flex justify-between mt-3">
                <div className="text-base text-text3">Jun 15,2024</div>
                <div className="text-base font-medium flex items-center gap-2.5">
                    <h3>Review Submitted</h3>
                    <div className="flex items-center">
                        &#40;5
                        <span><Image unoptimized={true} src="/images/star.svg" alt="star" width={16} height={16} /></span>
                        &#41;
                    </div>
                </div>
            </div>
            <hr className="border-t border-secondary/5 w-full mt-3" />
            {CustomerTimeline.map((e, i) =>
                <div key={i}>
                    <div className="flex justify-between mt-3">
                        <div className="text-base text-text3">{e.title}</div>
                        <div className="text-base font-medium">{e.name}</div>
                    </div>
                    <hr className="border-t border-secondary/5 w-full mt-3" />
                </div>)}
            <div className="flex justify-between items-center my-3">
                <h2 className="text-base text-text3">Review Status</h2>
                <Status status="Completed" />
            </div>
            <hr className="border-t border-secondary/5 w-full mt-3" />
            <div className="flex justify-between mt-3">
                <div className="text-base text-text3">Business Response</div>
                <div className="text-base font-medium">Thanks For Your Feedback!</div>
            </div>
        </div>
    </>
}
export default JourneyTimeline
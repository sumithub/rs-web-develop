"use client"
import { CustomerDetails } from "../../constent/constArray"
function JourneyDetails({ class_ = "" }) {
    return <>
        <div className="">
            <h2 className={`text-lg font-semibold mt-5 mb-3.5 ${class_}`}>Customer Details</h2>
            {CustomerDetails.map((e, i) =>
                <div key={i}>
                    <div className="flex justify-between mt-3">
                        <div className="text-base text-text3">{e.title}</div>
                        <div className="text-base font-medium">{e.name}</div>
                    </div>
                    {i !== CustomerDetails.length - 1 && (
                        <hr className="mt-3 border-t border-secondary/5" />
                    )
                    }
                </div>)}
        </div>
    </>
}
export default JourneyDetails
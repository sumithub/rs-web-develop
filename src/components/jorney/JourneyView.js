"use client"
import { JourneyCustomer } from "../../constent/constArray"
function JourneyView() {
    return <>
        {JourneyCustomer.map((e, i) =>
            <div key={i}>
                <div className="flex justify-between mt-3">
                    <div className="text-base text-text3">{e.title}</div>
                    <div className="text-base font-medium">{e.name}</div>
                </div>
                {i !== JourneyCustomer.length - 1 && (
                    <hr className="mt-3 border-t border-secondary/5" />
                )
                }
            </div>)}
    </>
}
export default JourneyView
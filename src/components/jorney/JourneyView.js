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
                <hr className="border-t border-secondary/5 w-full mt-3" />
            </div>)}
    </>
}
export default JourneyView
"use client"
function JourneyDetails({ class_ = "" }) {
    return <>
        <div className="">
            <h2 className={`text-lg font-semibold mt-5 mb-3.5 ${class_}`}>Customer Details</h2>
            <hr className="mt-3 border-t border-secondary/5" />

            <div >
                <div className="flex justify-between mt-3">
                    <div className="text-base text-text3">Customer</div>
                    <div className="text-base font-medium">John Smith</div>

                </div>
                <hr className="mt-3 border-t border-secondary/5" />

                <div className="flex justify-between mt-3">
                    <div className="text-base text-text3">Email</div>
                    <div className="text-base font-medium">johnsmith@gmail.com</div>
                </div>
                <hr className="mt-3 border-t border-secondary/5" />
                <div className="flex justify-between mt-3">
                    <div className="text-base text-text3">Phone</div>
                    <div className="text-base font-medium">+61-123456789</div>
                </div>
                <hr className="mt-3 border-t border-secondary/5" />

            </div>
        </div>
    </>
}
export default JourneyDetails
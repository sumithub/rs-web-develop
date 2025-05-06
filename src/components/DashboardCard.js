import Image from "next/image";

export default function DashboardCard({ title, count, img, bgClass, textColor, icon, percentage }) {
    return <div >
        <div className="bg-white rounded-md p-5 border border-border-color">
            {/* <div className="bg-[url(/images/vector.png)] "> */}
            {/* <div className="bg-[url(/images/total.png)] left-0 relative bg-no-repeat w-full"> */}
            <div>
                <div className="flex items-start gap-2">
                    <div className="flex">
                        <div className={`h-10 w-10 rounded-[12px] flex items-center justify-center ${bgClass}`}><span><Image src={img} alt="sent" height={18} width={18} unoptimized={true} /></span></div>
                    </div>
                    <div className="capitalize text-lg font-bold text-secondary">{title}</div>
                </div>

                <div className="ml-11">
                    <div className={`text-[22px] font-bold ${textColor}`}>{count}</div>
                    {icon && <div className="flex gap-2">
                        <Image src={icon} alt="arrow" height={24} width={24} unoptimized={true} />
                        <div className="text-secondary text-sm"><span className="font-semibold">{percentage}</span> last 7 days</div>
                    </div>}
                </div>
            </div>
            {/* </div> */}
            {/* </div> */}
        </div>
    </div>
}
import Image from "next/image";

export default function DashboardCard({ title, count, img, bgClass }) {
    return <div>
        <div className="bg-white rounded-md p-5">
            <div>
                <div className="flex items-start gap-2">
                    <div className="flex">
                        <div className={`h-10 w-10 rounded-[12px] flex items-center justify-center ${bgClass}`}><span><Image src={img} alt="sent" height={18} width={18} unoptimized={true} /></span></div>
                    </div>
                    <div className="capitalize text-lg font-bold text-secondary">{title}</div>
                </div>
                <div className="text-[22px] font-bold text-primary ml-11">{count}</div>
            </div>
        </div>
    </div>
}
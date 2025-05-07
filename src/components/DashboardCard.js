import Image from "next/image";

export default function DashboardCard({ title, count, img, bgClass, textColor, icon, percentage, bgImage }) {
    return <div>

        <div className="relative bg-white rounded-[15px] border border-border-color overflow-hidden w-full">
            {/* Background grid vector */}
            {/* <Image
                src="/images/box.png"
                alt="grid"
                fill
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
                unoptimized
            /> */}
            <div className={`absolute inset-0 z-0 top-14  bottom-0 flex items-end bg-[url('/images/vector.jpg')]`}>
                {/* <Image src='/images/box.png' alt="box" height={90} width={263} className="w-full" /> */}
            </div>
            {/* Overlay decorative icon */}
            <div className={`absolute top-0 right-0 w-full h-full bg-no-repeat bg-right bg-contain z-0 opacity-80 ${bgImage}`} />

            {/* Main content */}
            <div className="relative z-10 p-5">
                <div className="flex items-start gap-2">
                    <div className={`h-10 w-10 rounded-[12px] flex items-center justify-center ${bgClass}`}>
                        <Image src={img} alt="sent" height={18} width={18} unoptimized />
                    </div>
                    <div className="capitalize text-lg font-bold text-secondary">{title}</div>
                </div>

                <div className="ml-12">
                    <div className={`text-[22px] font-bold ${textColor}`}>{count}</div>
                    {icon && (
                        <div className="flex items-center gap-2">
                            <Image src={icon} alt="arrow" height={24} width={24} unoptimized />
                            <div className="text-secondary text-sm">
                                <span className="font-semibold">{percentage}</span> last 7 days
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* <div className="bg-white rounded-[15px] border border-border-color">
            <div className="bg-[url(/images/total.png)] relative inset-0 bg-right rounded-[15px]! overflow-hidden bg-no-repeat w-full">
                <div className="p-5">
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
            </div>
        </div> */}
    </div>
}
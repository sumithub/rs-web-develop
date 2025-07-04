import Image from "next/image";

export default function DashboardChart({ title, children, imgName, alt, height, width, class_ = "", flexClass = "", drillDown = false }) {
    return <div className="bg-white rounded-[10px] p-4 border border-[#0396FF1a] min-h-[426px]">
        <div className={`${flexClass}`}>
            <div className="text-secondary text-lg font-semibold">{title}</div>
            {drillDown && <div className="text-primary text-sm underline underline-offset-2">Drill-Down</div>}
        </div>
        {imgName && <Image src={imgName} alt={alt} height={height} width={width} className={`w-full ${class_}`} />}
        {children}
    </div>
}
import Image from "next/image";

export default function DashboardChart({ title, children, imgName, alt, height, width, class_ }) {
    return <div>
        <div className="bg-white rounded-[10px] p-4 min-h-[426px] border border-[#0396FF1a]">
            <div className="text-secondary text-lg font-semibold">{title}</div>
            {imgName && <Image src={imgName} alt={alt} height={height} width={width} className={`w-full ${class_}`} />}
            {children}
        </div>
    </div>
}
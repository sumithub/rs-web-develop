import Image from "next/image";

export default function DashboardChart({ title, children, imgName, alt, height, width, class_ }) {
    return <div className="bg-white rounded-[10px] p-4 border border-[#0396FF1a] min-h-[426px]">
        <div className="text-secondary text-lg font-semibold">{title}</div>

        {imgName && <Image src={imgName} alt={alt} height={height} width={width} className={`w-full ${class_}`} />}
        {children}
    </div>
}
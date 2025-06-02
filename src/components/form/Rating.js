import Image from "next/image"

export default function Rating(props) {
    const {
        setValue,
        watch,
        label,
        disabled,
        containerClass = "",
        count = 3
    } = props

    return (<div className={`laptop:mb-2 mb-3 relative ${containerClass}`}>
        {label && <label className={`inline left-1.5 -top-2 px-1 capitalize pb-1 font-medium text-xs z-1 leading-none ${!disabled && "bg-white"}`} >{label}</label>}
        <div className="capitalize font-normal w-full laptop:px-2 laptop:pt-[10px] laptop:pb-2 tablet:px-[6px] px-2 tablet:py-[10px] py-3 border rounded-md text-xs h-9 flex gap-1 items-center">
            {Array(count).fill('*').map((star, i) => {
                return <span key={i} className="cursor-pointer" onClick={() => { setValue("rating", i + 1) }}>
                    <Image src="/images.star.svg" alt="star" height={16} width={16} className={`${watch("rating") > i ? "custom-yellow" : "text-text3"} laptop:text-xl tablet:text-base`} />
                </span>
            })}
        </div>
    </div>
    )
}
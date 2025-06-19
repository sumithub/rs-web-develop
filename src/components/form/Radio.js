import Image from "next/image"
import Tooltip from "../../components/ToolTip"
export default function Radio({
    disabled = false,
    label,
    checked,
    labelClass = "",
    inputClass = "",
    class_ = "",
    name,
    onChange,
    value,
    mainClass = "",
    showTooltip = false,
    tooltipContent = "",
    tooltipPosition = "top",
}) {
    return (
        <div className={`text-sm mt-4 ${class_}`}>
            <label className={`flex items-center gap-2 cursor-pointer ${mainClass}`}>
                <input
                    disabled={disabled}
                    onChange={(e) => {
                        if (onChange) {
                            onChange(e)
                        }
                    }}
                    type="radio"
                    name={name}
                    checked={checked}
                    value={value}
                    className={`${inputClass} border-4 border-border-color h-5 w-5 rounded-full text-text`}
                />
                <div className="flex items-center gap-2">
                    <div className={`${labelClass} font-medium text-sm capitalize ml-[2px] whitespace-pre`}>
                        {label}
                    </div>

                    {showTooltip && tooltipContent && (
                        <Tooltip content={tooltipContent} position={tooltipPosition}>
                            <Image src="/images/url.svg" alt="info" height={16} width={16} unoptimized={true} />
                        </Tooltip>
                    )}
                </div>
            </label>
        </div>
    )
}
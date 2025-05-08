export default function Status({ status }) {
    if (!status) {
        return <></>
    }
    let s = status.toLowerCase()
    let bgClass = ""

    if (s === "new") {
        bgClass = "bg-[#28A7451A] text-success"
    } else if (s === "responded") {
        bgClass = "bg-[#0396FF1A] text-primary"
    } else if (s === "flagged") {
        bgClass = "bg-[#FFC1071A] text-[#FFC107]"
    }else if (s === "active") {
        bgClass = "bg-[#FFC1071A] text-success"
    }else if (s === "pending invite") {
        bgClass = "bg-[#FFC1071A] text-[#FFC107]"
    }else if (s === "suspended") {
        bgClass = "bg-[#FFC1071A] text-[#ff0000]"
    }else if (s === "draft") {
        bgClass = "bg-[#FFC1071A] text-primary"
    }

    return <div>
        <button className={`${bgClass} rounded-4xl py-1.5 px-3 text-sm text-center disabled:pointer-events-none w-24`}>{status}</button>
    </div>
}
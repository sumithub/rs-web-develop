export default function Status({ status }) {
    if (!status) {
        return <></>
    }
    let s = status.toLowerCase()
    let bgClass = ""

    if (s === "new") {
        bgClass = "bg-[#28A7451A] text-success"
    }
    else if (s === "responded") {
        bgClass = "bg-[#0396FF1A] text-primary"
    }
    else if (s === "flagged") {
        bgClass = "bg-[#FFC1071A] text-[#FFC107]"
    }
    else if (s === "active") {
        bgClass = "bg-[#28A7451A] text-success"
    }
    else if (s === "pending invite") {
        bgClass = "bg-[#FFC1071A] text-[#FFC107]"
    }
    else if (s === "suspended") {
        bgClass = "bg-[#ff00001A] text-[#ff0000]"
    }
    else if (s === "draft") {
        bgClass = "bg-[#0396FF1A] text-primary"
    }
    else if (s === "at risk") {
        bgClass = "bg-[#ff00001A] text-[#ff0000]"
    }
    else if (s === "yes") {
        bgClass = "bg-[#0396FF1A] text-primary"
    }
    else if (s === "notify") {
        bgClass = "bg-[#0396FF1A] text-primary"
    }
    else if (s === "sent") {
        bgClass = "bg-[#0396FF1A] text-primary"
    }
    else if (s === "inactive") {
        bgClass = "bg-[#FFC1071A] text-custom-yellow-light"
    }
    else if (s === "read") {
        bgClass = "bg-[#FFC1071A] text-custom-yellow-light"
    }
    else if (s === "alert") {
        bgClass = "bg-[#DC35451A] text-danger"
    }
    else if (s === "no") {
        bgClass = "bg-[#DC35451A] text-danger"
    }
    else if (s === "dismiss") {
        bgClass = "bg-[#DC35451A] text-danger"
    }
    return <div>
        <button className={`${bgClass} rounded-4xl py-1.5 px-3 text-sm text-center disabled:pointer-events-none`}>{status}</button>
    </div>
}
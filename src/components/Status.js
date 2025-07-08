export default function Status({ status = "", context = "" }) {
    if (!status) {
        return <></>
    }
    let s = status.toLowerCase()
    let c = context.toLowerCase()
    let bgClass = ""

    if (
        s === "new" ||
        s === "completed" ||
        s === "vip" ||
        s === "success" ||
        s === "connected" ||
        s === "positive" ||
        s === "published" ||
        s === "paid") {
        bgClass = "bg-[#28A7451A] text-success";
    } else if (
        s === "responded" ||
        s === "draft" ||
        s === "priority" ||
        s === "activate" ||
        s === "yes" ||
        s === "replied" ||
        s === "notify") {
        bgClass = "bg-[#0396FF1A] text-primary";
    } else if (
        s === "pending invite" ||
        s === "in_progress" ||
        s === "flagged" ||
        s === "dp"
    ) {
        bgClass = "bg-[#FFC1071A] text-[#FFC107]";
    } else if (s === "suspended" || s === "at risk") {
        bgClass = "bg-[#ff00001A] text-[#ff0000]";
    } else if (s === "not_connected") {
        bgClass = "bg-[#A9A9A91A] text-[#A9A9A9]";
    } else if (s === "failed") {
        bgClass = "bg-[#DC35451A] text-[#DC3545]";
    } else if (s === "processing") {
        bgClass = "bg-[#FFC1071A] text-[#FFC107]";
    }
    else if (s === "inactive" || s === "neutral" || s === "pending") {
        bgClass = "bg-[#FFC1071A] text-custom-yellow-light"
    }
    else if (s === "read") {
        bgClass = "bg-[#FFC1071A] text-custom-yellow-light"
    }
    else if (s === "alert" || s === "canceled") {
        bgClass = "bg-[#DC35451A] text-danger"
    }
    else if (s === "no") {
        bgClass = "bg-[#DC35451A] text-danger"
    }
    else if (s === "dismiss" || s === "suspend") {
        bgClass = "bg-[#DC35451A] text-danger"
    }
    else if (s === "sent" || s === "active") {
        if (c === "notify") {
            bgClass = "bg-[#0396FF1A] text-primary";
        } else {
            bgClass = "bg-[#28A7451A] text-success"
        }
    } else if (s === "pending") {
        if (c === "left") {
            bgClass = "bg-[#FFC1071A] text-[#FFC107]";
        } else {
            bgClass = "bg-[#A9A9A91A] text-[#A9A9A9]";
        }
    } else {
        bgClass = "bg-gray-100 text-gray-500";
    }
    return <div>
        <button disabled className={`${bgClass} capitalize rounded-4xl py-1.5 px-3 text-sm text-center disabled:pointer-events-none`}>{status.replace("_", " ")}</button>
    </div>
}
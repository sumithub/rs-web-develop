export default function Status({ status }) {
    if ((!status)) {
        return <></>
    }
    let name = status.replaceAll("_", " ")
    let s = status.toLowerCase()
    let bgClass = ""

    if (s === "new") {
        bgClass = "bg-[#28A7451A] text-success"
    } else if (s === "responded") {
        bgClass = "bg-[#0396FF1A] text-primary"
    } else if (s === "flagged") {
        bgClass = "bg-[#FFC1071A] text-[#FFC107]"
    }

    <div>
        <button className={`${bgClass} rounded-4xl py-2 px-3 text-primary! text-sm text-center cursor-pointer disabled:pointer-events-none w-28`}>{status}</button>
    </div>
}
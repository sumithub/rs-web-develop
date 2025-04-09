export default function TableOrder({ title, order }) {
    return <div>
        <div className={`flex items-center gap-[6px] ${order ? "text-blue-700" : "text-secondary text-sm font-semibold"}`}>
            <div>{title}</div>
            <button className={`rounded-full bg-secondary w-4 h-4 flex items-center justify-center cursor-pointer`}
            // onClick={() => {
            //     if (!order) {
            //         if (setOrderBy)
            //             setOrderBy(field + ":desc")
            //         if (onClick)
            //             onClick(field + ":desc")
            //     } else if (order === "desc") {
            //         if (setOrderBy)
            //             setOrderBy(field + ":asc")
            //         if (onClick)
            //             onClick(field + ":asc")
            //     } else if (order === "asc") {
            //         if (setOrderBy)
            //             setOrderBy("")
            //         if (onClick)
            //             onClick("")
            //     }
            // }}
            >
                <div >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="white" d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z" /></svg>
                </div>
                {/* <Icon icon="lucide:sort-asc" className="text-lg transition-all duration-300" style={{ rotate: order === "desc" ? "180deg" : "" }} /> */}
            </button>
        </div>
    </div>
}
export default function TableOrder({ title, sortBy, setSortBy, onClick, field }) {
    return <div>
        <div className={`flex items-center gap-[6px] ${sortBy ? "text-primary" : "text-secondary text-sm font-semibold"}`}>
            <div>{title}</div>
            <button className={`rounded-full bg-secondary w-4 h-4 flex items-center justify-center cursor-pointer`}
                onClick={() => {
                    if (!sortBy) {
                        if (setSortBy)
                            setSortBy(field + ":desc")
                        if (onClick)
                            onClick(field + ":desc")
                    } else if (sortBy === "desc") {
                        if (setSortBy)
                            setSortBy(field + ":asc")
                        if (onClick)
                            onClick(field + ":asc")
                    } else if (sortBy === "asc") {
                        if (setSortBy)
                            setSortBy("")
                        if (onClick)
                            onClick("")
                    }
                }}
            >
                <div >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="white" d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z" /></svg>
                </div>
                {/* <Icon icon="lucide:sort-asc" className="text-lg transition-all duration-300" style={{ rotate: sortBy === "desc" ? "180deg" : "" }} /> */}
            </button>
        </div>
    </div>
}
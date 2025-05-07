
export default function DashboardChart({ title, children, }) {
    return <div>
        <div className="bg-white rounded-[10px] p-4 min-h-[426px] border border-[#0396FF1a]">
            <div className="text-secondary text-lg font-semibold">{title}</div>
            {children}
        </div>
    </div>
}
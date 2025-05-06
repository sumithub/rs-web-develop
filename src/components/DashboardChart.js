
export default function DashboardChart({ title, children, }) {
    return <div>
        <div className="bg-white rounded-[10px] p-4">
            <div className="text-secondary text-lg font-semibold">{title}</div>
            {children}
        </div>
    </div>
}
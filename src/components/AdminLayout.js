import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children, headerChild, cardClass = "", noCard = false }) {
    return <div className="bg-light">
        <Header headerChild={headerChild} />
        <Sidebar />
        <div className={`pb-2 min-h-[calc(100dvh-114px)] px-0`}>
            <div className={`py-4 md:mt-4 min-h-[calc(100dvh_-_76px)]`}>
                <div className={`pl-[305px] pr-3 mt-[85px] `}>
                    <div className={`${noCard ? "" : "bg-white p-5 rounded-[10px] shadow-sm"} ${cardClass}`}>{children}</div>
                </div>
            </div>
        </div>
    </div>
}
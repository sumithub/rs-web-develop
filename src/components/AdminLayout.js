import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
    return <div className="bg-light">
        <Header />
        <Sidebar />
        <div className={`pb-6 min-h-[calc(100dvh-114px)] px-0`}>
            <div className={`py-4 md:mt-4 min-h-[calc(100dvh_-_76px)] `}>
                <div className={`pl-[113px] pr-4`}>
                    <div> {children}</div>
                </div>
            </div>
        </div>
    </div>
}
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import DashboardCard from "../../components/DashboardCard";
import Table from "../../components/Table";

export default function Dashboard() {
    return <div>
        <Header />
        <Sidebar />
        <div className="bg-light min-h-[calc(100dvh_-_85px)] pl-[113px] py-6 px-3 mt-[85px]">
            <div className="grid grid-cols-4 gap-5">
                <DashboardCard title="total reviews" count="1.234" img="/images/sent.svg" bgClass="bg-primary" textColor="text-primary" icon="/images/course-up.svg" />

                <DashboardCard title="Average Rating" count="68%" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" />

                <DashboardCard title="New Reviews" count="12%" img="/images/star1.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" />

                <DashboardCard title="Active Campaigns" count="20%" img="/images/sms-star.svg" bgClass="bg-custom-yellow" textColor="text-custom-yellow!" />
            </div>
            <div>
                <Table />
            </div>
        </div>
    </div>
}
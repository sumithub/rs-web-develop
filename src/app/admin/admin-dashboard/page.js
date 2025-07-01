import AdminLayout from "../../../components/AdminLayout"
import DashboardCard from "../../../components/DashboardCard"
import DashboardChart from "../../../components/DashboardChart"

export default function AdminDashboard() {
    return <AdminLayout>
        <div>
            <div className="grid grid-cols-4 gap-5">
                <DashboardCard title="total reviews" count="12,345" img="/images/sms-star.svg" bgClass="bg-primary" textColor="text-primary" bgImage="bg-[url('/images/total.png')]" />

                <DashboardCard title="Average Rating" count="4.5" img="/images/star1.svg" bgClass="bg-success-light" textColor="text-success-light" bgImage="bg-[url('/images/average.png')]" />

                <DashboardCard title="Active Campaigns" count="25" img="/images/star1.svg" bgClass="bg-custom-purple" textColor="text-custom-purple" bgImage="bg-[url('/images/review.png')]" />

                <DashboardCard title="Revenue (30Days)" count="$12K" img="/images/sms-star.svg" bgClass="bg-custom-yellow" textColor="text-custom-yellow!" bgImage="bg-[url('/images/active.png')]" />
            </div>

            <div className="grid grid-cols-2 gap-5 mt-5 items-start">
                <DashboardChart title="Review Trends" drillDown={true} flexClass="flex items-center justify-between" />
            </div>
        </div>
    </AdminLayout>
}
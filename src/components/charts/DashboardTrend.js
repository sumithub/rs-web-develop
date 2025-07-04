import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function DashboardTrend() {
    const labels = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset A',
                data: [55, 20, 80, 60, 70, 80],
                fill: true,
                backgroundColor: (ctx) => {
                    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(92, 200, 190, 0.2)');
                    gradient.addColorStop(1, 'rgba(92, 200, 190, 0)');
                    return gradient;
                },
                borderColor: '#5CC8BE',
                tension: 0.5,
                pointRadius: 0,
                stack: 'stack1',
            },
            {
                label: 'Dataset B',
                data: [10, 20, 50, 60, 40, 70],
                fill: true,
                backgroundColor: (ctx) => {
                    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(53, 122, 246, 0.2)');
                    gradient.addColorStop(1, 'rgba(53, 122, 246, 0)');
                    return gradient;
                },
                borderColor: '#357AF6',
                tension: 0.5,
                pointRadius: 0,
                stack: 'stack1',
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                stacked: true,
                grid: {
                    borderDash: [4, 4],
                    color: '#F2F2F7',
                },
                ticks: {
                    beginAtZero: true,
                }
            }
        },
    };

    return (
        <div className="w-full h-[300px] mt-8">
            <Line data={data} options={options} />
        </div>
    );
}

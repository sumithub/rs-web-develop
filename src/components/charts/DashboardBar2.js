import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardBar2() {
    const data = {
        labels: ['10:00', '11:00', '12:00', '13:00'],
        datasets: [
            {
                label: 'Dataset A',
                data: [2.4, 3.1, 4.0, 2.1],
                backgroundColor: '#4A3AFF',
                borderRadius: 12,
                barPercentage: 0.7,         // wider bars
                categoryPercentage: 0.8,
            },
            {
                label: 'Dataset B',
                data: [2.0, 2.3, 3.6, 1.0],
                backgroundColor: '#C893FD',
                borderRadius: 12,
                barPercentage: 0.7,         // wider bars
                categoryPercentage: 0.8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {

            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.data[context.dataIndex].toFixed(1)}M`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    callback: (value) => `${value}M`,
                },
                grid: {
                    borderDash: [1, 5],
                    color: "#F2F2F7"
                },
                // suggestedMax: 4.5,
            },
        },
    };

    return (
        <div className="w-full h-[300px] mt-8">
            <Bar data={data} options={options} />
        </div>
    );
}

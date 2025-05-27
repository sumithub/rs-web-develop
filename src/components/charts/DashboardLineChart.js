'use client';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

const data = {
    labels,
    datasets: [
        {
            label: 'Negative',
            data: [30, 40, 35, 50, 45],
            borderColor: 'red',
            backgroundColor: 'red',
            tension: 0.4,
        },
        {
            label: 'Nuetral',
            data: [20, 25, 30, 35, 40],
            borderColor: 'yellow',
            backgroundColor: 'yellow',
            tension: 0.4,
        },
        {
            label: 'Positive',
            data: [10, 15, 20, 15, 10],
            borderColor: 'blue',
            backgroundColor: 'blue',
            borderDash: [5, 5], // makes it dotted
            tension: 0.4,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

export default function DashboardLineChart() {
    return (
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
            <Line data={data} options={options} />
        </div>
    );
}

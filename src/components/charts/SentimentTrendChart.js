'use client';

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler,
    Tooltip,
    Legend
);

const labels = [
    '1 Mar', '5 Mar', '10 Mar', '15 Mar', '18 Mar', '28 Mar',
    '1 Apr', '10 Apr', '18 Apr', '22 Apr',
];

const data = {
    labels,
    datasets: [
        {
            label: 'Positive',
            data: [100, 180, 130, 250, 300, 100, 420, 300, 280, 520],
            borderColor: '#28A745',
            backgroundColor: 'rgba(0, 153, 255, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
        },
        {
            label: 'Negative',
            data: [400, 350, 200, 220, 150, 400, 500, 300, 200, 280],
            borderColor: '#DC3545',
            backgroundColor: 'rgba(255, 91, 91, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
        },
        {
            label: 'Neutral',
            data: [300, 250, 300, 180, 260, 320, 280, 310, 220, 340],
            borderColor: '#0396FF',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Sentiment Trend',
        },
        datalabels: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
        },
        y: {
            grid: {
                display: false
            },
            beginAtZero: true,
        },
    },
};

export default function SentimentTrendChart() {
    return (
        <div style={{ width: '100%', maxWidth: 900, margin: 'auto' }}>
            <Line data={data} options={options} />
        </div>
    );
}

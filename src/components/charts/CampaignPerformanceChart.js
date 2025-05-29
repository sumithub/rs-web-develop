'use client';

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
import { Line } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const labels = [
    '02 Jan, 2024',
    '03 Jan, 2024',
    '10 Jan, 2024',
    '15 Jan, 2024',
    '17 Jan, 2024',
    '18 Jan, 2024',
    '22 Jan, 2024',
];

const data = {
    labels,
    datasets: [
        {
            label: 'Open Rate',
            data: [12, 8, 15, 20, 30, 35, 40],
            borderColor: '#FFAE4C', // orange
            backgroundColor: '#FFAE4C',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
        },
        {
            label: 'Click Rate',
            data: [15, 20, 18, 22, 35, 25, 32],
            borderColor: '#07DBFA', // cyan
            backgroundColor: '#07DBFA',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
        },
        {
            label: 'Response Rate',
            data: [10, 15, 8, 30, 25, 5, 20],
            borderColor: '#6FD195', // green
            backgroundColor: '#6FD195',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
        },
        {
            label: 'Review Conversion',
            data: [25, 5, 12, 10, 20, 5, 22],
            borderColor: '#7086FD', // purple
            backgroundColor: '#7086FD',
            tension: 0.4,
            fill: false,
            pointRadius: 5,
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
            display: false,
            text: 'Campaign Performance Over Time',
        },
    },
    scales: {
        y: {
            grid: {
                borderDash: [4, 4],
            },
            beginAtZero: true,
        },
        x: {
            grid: {
                borderDash: [4, 4],
            },
        },
    },
};

export default function CampaignPerformanceChart() {
    return (
        <div style={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
            <Line data={data} options={options} />
        </div>
    );
}

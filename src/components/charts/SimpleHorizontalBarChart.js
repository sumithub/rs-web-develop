'use client';

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { title } from 'process';
import { te } from 'date-fns/locale';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Y-axis labels from the image
const labels = [
    'Sent',
    'Delivered',
    'Opened',
    'Clicked',
    'Reviewed',
];

// Corresponding x-axis values
const values = [50000, 40000, 30000, 20000, 10000];

const data = {
    labels,
    datasets: [
        {
            label: 'Count',
            data: values,
            backgroundColor: ['#0396FFff', '#0396FFcc', '#0396FF99', '#0396FF66', '#0396FF33'],
            borderRadius: 6,
            barThickness: 36,
        },
    ],
};

const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        title: { text: "Campaign Funnel Breakdown", display: true, },
        legend: {
            display: false, // No legend in image
        },
    },
    scales: {
        x: {
            grid: { display: false, },
            title: { text: 'Number of Users', display: true, font: { size: 16, }, },
            beginAtZero: true,
            ticks: {
                // callback: function (value) {
                //     return value >= 1000 ? `${value / 1000}K` : value;
                // },
            },
        },
        y: {
            title: {
                display: true,
                text: 'Campaign Stage',
                font: {
                    size: 16,
                },
            },
            grid: { display: false, },
            ticks: {
                font: {
                    size: 14,
                },
            },
        },
    },
};

export default function SimpleHorizontalBarChart() {
    return (
        <div style={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

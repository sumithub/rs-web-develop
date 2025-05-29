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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Trustpilot', 'Google', 'Yelp', 'Tripadvisor'];

// Data format: [Negative, Neutral, Positive]
const sentimentData = [
    [300, 800, 1880],   // Trustpilot
    [250, 900, 1700],   // Google
    [200, 600, 1180],   // Yelp
    [150, 270, 300],    // Tripadvisor
];

const backgroundColors = ['#9787FF', '#FFA5DA', '#0096FF']; // Purple, Pink, Blue

const data = {
    labels,
    datasets: [0, 1, 2].map(i => ({
        label: ['Negative', 'Neutral', 'Positive'][i],
        data: sentimentData.map(row => row[i]),
        backgroundColor: backgroundColors[i],
        barThickness: 24,
        borderRadius: 4,
    })),
};

const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            display: true,
        },
        tooltip: {
            callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`,
            },
        },
    },
    scales: {
        x: {
            stacked: true,
            grid: { display: false },
            ticks: {
                callback: (val) => `${val}`,
            },
        },
        y: {
            grid: { display: false },
            stacked: true,
            ticks: {
                font: {
                    size: 14,
                },
            },
        },
    },
};

export default function SentimentBySourceChart() {
    return (
        <div style={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

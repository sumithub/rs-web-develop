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

const labels = ['Yelp', 'Trustpilot', 'TripAdvisor', 'Google'];

// Example dataset structure for 5 ratings
const data = {
    labels,
    datasets: [
        {
            label: 'Rating 1',
            data: [0, 1, 1, 2],
            backgroundColor: '#D0EAFF',
        },
        {
            label: 'Rating 2',
            data: [0, 1, 1, 2],
            backgroundColor: '#A3D4FF',
        },
        {
            label: 'Rating 3',
            data: [0, 1, 1, 2],
            backgroundColor: '#75BDFF',
        },
        {
            label: 'Rating 4',
            data: [0, 1, 1, 2],
            backgroundColor: '#479EFF',
        },
        {
            label: 'Rating 5',
            data: [1, 1, 1, 2],
            backgroundColor: '#0085FF',
        },
    ],
};

const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Top Review Sources',
        },
    },
    scales: {
        x: {
            stacked: true,
            beginAtZero: true,
        },
        y: {
            stacked: true,
        },
    },
};

export default function StackedReviewChart() {
    return (
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

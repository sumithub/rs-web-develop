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
            borderRadius: 5
        },
        {
            label: 'Rating 2',
            data: [0, 1, 1, 2],
            backgroundColor: '#A3D4FF',
            borderRadius: 5
        },
        {
            label: 'Rating 3',
            data: [0, 1, 1, 2],
            backgroundColor: '#75BDFF',
            borderRadius: 5
        },
        {
            label: 'Rating 4',
            data: [0, 1, 2, 2],
            backgroundColor: '#479EFF',
            borderRadius: 5
        },
        {
            label: 'Rating 5',
            data: [1, 1, 1, 2],
            backgroundColor: '#0085FF',
            borderRadius: 5
        },
    ],
};

const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
            display: false
        },
        title: {
            display: false,
            text: 'Top Review Sources',
        },
    },
    scales: {
        x: {
            grid: { display: false, },
            stacked: true,
            beginAtZero: true,
        },
        y: {
            grid: { display: false, },
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

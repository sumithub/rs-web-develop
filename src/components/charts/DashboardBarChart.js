"use client";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = [
    'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025',
    'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025',
    'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025'
];

const values = [2, 2.5, 3, 2, 3.5, 3.2, 2.8, 3.1, 2.9, 3.4, 3.6, 3.3];

const max = Math.max(...values);
const backgroundColors = values.map((value) => value === max ? '#3354F4' : '#E6EEF5');
const data = {
    labels, datasets: [{
        label: '', data: values,
        backgroundColor: backgroundColors,
        borderRadius: 5, barThickness: 40,
    },],
};

const options = {
    responsive: true,
    aspectRatio: 2.4,
    plugins: {
        legend: {
            display: false,
        },
        title: { display: false, text: '', },
    },
    scales: {
        x: { grid: { display: false, }, },
        y: {
            grid: { drawBorder: false, color: '#f0f0f0', },
            ticks: { stepSize: 1, beginAtZero: true, },
        },
    },
};

export default function DashboardBarChart() {
    return (<div style={{ width: '100%', maxWidth: 700, margin: 'auto', }}>
        <Bar data={data} options={options} />
    </div>);
}
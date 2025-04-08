"use client";
import { Bar } from 'react-chartjs-2'; import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May']; const values = [800, 1400, 1450, 1300, 1100];

const max = Math.max(...values);

const backgroundColors = values.map((value) => value === max ? '#3354F4' : '#E6EEF5');

const data = { labels, datasets: [{ label: '28.7 Reviews', data: values, backgroundColor: backgroundColors, borderRadius: 5, barThickness: 40, },], };

// Chart options 
const options = {
    responsive: true,
    plugins: {
        legend: { position: 'top', },
        title: { display: false, text: 'Numbers by Month', },
    },
    scales: {
        x: { grid: { display: false, }, },
        y: {
            grid: { drawBorder: false, color: '#f0f0f0', },
            ticks: { stepSize: 500, beginAtZero: true, },
        },
    },
};

export default function ChartPage() { return (<div style={{ width: '100%', maxWidth: 700, margin: 'auto', }}> <Bar data={data} options={options} /> </div>); }
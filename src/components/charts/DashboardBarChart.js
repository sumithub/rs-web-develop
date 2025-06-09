"use client";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const labels = [
    'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025',
    'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025',
    'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025'
];

const barValues = [2, 3, 2.5, 2.5, 2, 3.5, 3.2, 2.8, 3.1, 2.9, 3.4, 3.6, 3.3];
const lineValues = [1.5, 2, 2.2, 1.8, 2.9, 2.5, 2.7, 2.6, 2.8, 3.0, 3.1, 2.9];
const max = Math.max(...barValues);
// const backgroundColors = barValues.map(value => '#3354F4' : '#E6EEF5');
const svgIcon = new Image();
svgIcon.src = 'data:image/svg+xml;base64,' + btoa(`
   <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 16 16" fill="none">
<path d="M3.82665 10.6663C3.89999 10.3397 3.76665 9.87301 3.53332 9.63968L1.91332 8.01967C1.40665 7.51301 1.20665 6.97301 1.35332 6.50634C1.50665 6.03967 1.97999 5.71967 2.68665 5.59967L4.76665 5.25301C5.06665 5.19967 5.43332 4.93301 5.57332 4.65967L6.71999 2.35967C7.05332 1.69967 7.50665 1.33301 7.99999 1.33301C8.49332 1.33301 8.94665 1.69967 9.27999 2.35967L10.4267 4.65967C10.5133 4.83301 10.6933 4.99967 10.8867 5.11301L3.70665 12.293C3.61332 12.3863 3.45332 12.2997 3.47999 12.1663L3.82665 10.6663Z" fill="#FFC107"/>
<path d="M12.4667 9.64026C12.2267 9.88026 12.0934 10.3403 12.1734 10.6669L12.6334 12.6736C12.8267 13.5069 12.7067 14.1336 12.2934 14.4336C12.1267 14.5536 11.9267 14.6136 11.6934 14.6136C11.3534 14.6136 10.9534 14.4869 10.5134 14.2269L8.56003 13.0669C8.25337 12.8869 7.7467 12.8869 7.44003 13.0669L5.4867 14.2269C4.7467 14.6603 4.11337 14.7336 3.7067 14.4336C3.55337 14.3203 3.44003 14.1669 3.3667 13.9669L11.4734 5.86026C11.78 5.55359 12.2134 5.41359 12.6334 5.48692L13.3067 5.60026C14.0134 5.72026 14.4867 6.04026 14.64 6.50692C14.7867 6.97359 14.5867 7.51359 14.08 8.02026L12.4667 9.64026Z" fill="#FFC107"/>
</svg>
`);
const data = {
    labels,
    datasets: [
        {
            type: 'line',
            label: 'Line Data',
            data: lineValues,
            borderColor: '#FFC107',
            backgroundColor: '#FFC107',
            tension: 0.3,
            fill: false,
            pointRadius: 8,
            pointStyle: (context) => {
                return svgIcon
                // const index = context.dataIndex;
                // // Only use icon on first and last points
                // if (index === 0 || index === lineValues.length - 1) return svgIcon;
                // return 'circle';  // default point for others
            }
        }, {
            type: 'bar',
            label: 'Bar Data',
            data: barValues,
            backgroundColor: '#3354F4',
            borderRadius: 5,
            barThickness: 20,
        },

    ],
};

const options = {
    responsive: true,
    aspectRatio: 2.4,
    plugins: {
        legend: { display: false },
        title: { display: false },
    },
    scales: {
        x: { grid: { display: false } },
        y: {
            grid: { drawBorder: false, color: '#f0f0f0' },
            ticks: { stepSize: 1, beginAtZero: true },
        },
    },
};

export default function DashboardBarChart() {
    return (
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

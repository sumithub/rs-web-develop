'use client';

import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Pie chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ['A', 'B', 'C', 'D'];
const values = [40, 30, 20, 10];

const max = Math.max(...values);
const backgroundColors = values.map((value) =>
    value === max ? '#3354F4' : '#E6EEF5'
);

const data = {
    labels,
    datasets: [
        {
            label: '',
            data: values,
            backgroundColor: backgroundColors,
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        // You can add title if needed
        // title: {
        //   display: true,
        //   text: 'Pie Chart Example',
        // },
    },
};

export default function DashboardPieChart() {
    return (
        <div style={{ width: '100%', maxWidth: 300, margin: 'auto' }}>
            <Pie data={data} options={options} />
        </div>
    );
}

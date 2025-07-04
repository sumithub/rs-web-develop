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

const labels_ = ['A', 'B', 'C', 'D'];
const values = [50, 20, 10, 10, 10];

const max = Math.max(...values);
const backgroundColors_ = values.map((value) =>
    value === max ? '#3354F4' : '#E6EEF5'
);



const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        // You can add title if needed
        // title: {
        //   display: true,
        //   text: 'Pie Chart Example',
        // },
    },
};

export default function DashboardPieChart({ labels, colors, maxWidth = 300 }) {
    const data = {
        labels: labels || labels_,
        datasets: [
            {
                label: '',
                data: values,
                backgroundColor: colors || backgroundColors_,
                borderWidth: 1,
            },
        ],
    }; return (
        <div style={{ width: '100%', maxWidth, margin: 'auto' }}>
            <Pie data={data} options={options} />
        </div>
    );
}

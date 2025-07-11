'use client';

import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const labels_ = ['A', 'B', 'C', 'D'];
const values = [50, 20, 10, 10, 10];

const max = Math.max(...values);
const backgroundColors_ = values.map((value) =>
    value === max ? '#3354F4' : '#E6EEF5'
);

export default function DashboardPieChart({ labels, colors, maxWidth = 300, showPercentage = false }) {
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
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed;
                        const data = context.chart.data.datasets[0].data;
                        const total = data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`;
                    },
                },
            },
            datalabels: showPercentage
                ? {
                    formatter: (value, context) => {
                        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`;
                    },
                    color: '#000',
                    font: {
                        weight: 'bold',
                    },
                }
                : false,
        },
    };


    return (
        <div style={{ width: '100%', maxWidth, margin: 'auto' }}>
            <Pie data={data} options={options} />
        </div>
    );
}

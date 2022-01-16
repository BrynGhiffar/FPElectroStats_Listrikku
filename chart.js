import {range, randint, randarray_, getDays} from './utils.js';
let myChart = document.getElementById('dailyChart').getContext('2d');

// Global options
// These settings look a little different from the one in the video
// But they do the same thing, check out: https://www.chartjs.org/docs/latest/general/fonts.html
Chart.defaults.font.family = 'Arial, Helvetica, sans-serif';
Chart.defaults.font.size = 18;
Chart.defaults.font.color = '#777';

// Month currently being showed on the line graph.
let currentMonth = 'January';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const monthsAbr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

let ChartDataColor = (opacity) => {
    return `rgba(251, 212, 0, ${opacity})`
};

let getDailyChartTitle = (month) => {
    return `DAILY | ${month}`;
}

// This is the chartJs code for the dailyChart, which is the first chart
// in the graph.
let dailyChart = new Chart(myChart, {
    type: 'line',
    data: {
        // The dates in each month is the label
        labels: [...range(1, 32)], // days in the particular month
        datasets: [{
            label: 'Electricity Usage (Kw)',
            fill: true,
            tension: 0.3,
            // The data, in this chart is how many electricity is used each month
            data: [...randarray_(50, 20, 31)], // electricity usage each day for the given month
            backgroundColor: ChartDataColor(0.7),
            borderWidth: 1,
            borderColor: ChartDataColor(0.7),
            hoverBorderWidth: 5,
            hoverBorderColor: ChartDataColor(0.7),
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                // For chart title changes
                text: getDailyChartTitle(currentMonth),
                font: {
                    size: 30,
                },
                color: ChartDataColor(1),
                align: 'center',
                position: 'top',
                padding: 30,
            },
            legend: {
                display: false,
                position: 'right',
                labels: {
                    color: "#000",
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    // The tooltip you see when you hover over your mouse.
                    label: (context) => {
                        let data = Math.round(context.parsed.y, 2);
                        return `Usage: ${data} Kw`;
                    },
                    title: (contexts) => {
                        let day = contexts[0].label;
                        let month = currentMonth;
                        return `${day} ${month}`;
                    }
                }
            },
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
            }
        },
        scales: {
            y : {
                beginAtZero: true,
                grid: {
                    color: ChartDataColor(0.7),
                    lineWidth: 0.5,
                },
                ticks: {
                    color: ChartDataColor(1),
                }
            },
            x : {
                grid: {
                    color: ChartDataColor(0.7),
                    lineWidth: 0.5,
                },
                ticks: {
                    color: ChartDataColor(1),
                }
            }
        }
    },
});

//  Electricity usage each month, randomly generated
let monthlyData = [...randarray_(1000, 400, 12)];

let monthlyChart = new Chart(document.getElementById('monthlyChart').getContext('2d'), {
    type: 'bar',
    data: {
        labels: months,
        datasets: [{
            label: 'Electricity Usage (Kw)',
            fill: true,
            tension: 1,
            data: monthlyData,
            backgroundColor: ChartDataColor(0.7),
            borderWidth: 0,
            borderColor: ChartDataColor(0.7),
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        // Whenever a month is clicked the daily chart
        // changes.
        onClick: (evt) => {
            let theChart = monthlyChart;
            const points = theChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
                if (points.length) {
                    const firstPoint = points[0];

                    currentMonth = theChart.data.labels[firstPoint.index];
                    const value = theChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
                    // console.log(label, value);
                    dailyChart.options.plugins.title.text = getDailyChartTitle(currentMonth);
                    let days = getDays(currentMonth, 2021);
                    dailyChart.data.labels = [...range(1, days + 1)]
                    dailyChart.data.datasets[0].data = [...randarray_(50, 20, days)];
                    dailyChart.update();
                }
        },
        plugins: {
            title: {
                display: true,
                text: "MONTHLY",
                color: ChartDataColor(1),
                font: {
                    size: 30,
                },
                padding: 30,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let data = Math.round(context.parsed.y, 2);
                        return `Usage: ${data} Kw`;
                    },
                }
            },
            legend: {
                display: false,
            }
        },
        scales: {
            y : {
                beginAtZero: true,
                grid: {
                    color: ChartDataColor(0.7),
                    lineWidth: 0.5,
                },
                ticks: {
                    color: ChartDataColor(1),
                }
            },
            x : {
                grid: {
                    display: false,
                    color: ChartDataColor(0.7),
                    lineWidth: 0.5,
                },
                ticks: {
                    color: ChartDataColor(1),
                }
            }
        }
    }
});

const wares = ['Microwave', 'Computer', 'Lights', 'Air Conditioner']

let usageChart = new Chart(document.getElementById('usageChart').getContext('2d'), {
    type: 'doughnut',
    data: {
        labels: wares,
        datasets: [{
            label: 'Electricity Usage (Kw)',
            fill: true,
            data: [...randarray_(20, 10, 4)],
            backgroundColor: [ChartDataColor(0.7), ChartDataColor(0.8), ChartDataColor(0.9), ChartDataColor(1)],
            borderWidth: 0,
            hoverOffset: 8,
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "DAILY BREAKDOWN",
                color: ChartDataColor(1),
                font: {
                    size: 30,
                },
                padding: 30,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let data = Math.round(context.parsed, 2);
                        return `${context.label}: ${data} Kw`;
                    },
                }
            },
            legend: {
                display: true,
            }
        },
    }
});
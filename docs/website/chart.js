import {range, randint, randarray_, getDays} from './utils.js';
let myChart = document.getElementById('dailyChart').getContext('2d');

// Global options
// These settings look a little different from the one in the video
// But they do the same thing, check out: https://www.chartjs.org/docs/latest/general/fonts.html
Chart.defaults.font.family = 'Lato';
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
    return `Daily Usage | ${month}`;
}

let dailyChart = new Chart(myChart, {
    type: 'line', // bar, horizontalBar, pie, line, donut, radar, polarArea
    data: {
        labels: [...range(1, 32)], // days in the particular month
        // labels: Utils.months({count: 7}),
        datasets: [{
            label: 'Electricity Usage (Kw)',
            fill: true,
            tension: 0.3,
            data: [...randarray_(50, 31)], // electricity usage each day for the given month
            // data: [...range(1, 32)].map((val) => {return randint(10, 100)}),
            // data: [
            //     100, 200, 150, 100, 300, 70, 250
            // ],
            backgroundColor: ChartDataColor(0.7),
            // backgroundColor: [
            //     'rgba(100, 20, 20, 0.3) ',
            //     'rgba(100, 20, 20, 0.4) ',
            //     'rgba(100, 20, 20, 0.5) ',
            //     'rgba(100, 20, 20, 0.6) ',
            //     'rgba(100, 20, 20, 0.7) ',
            //     'rgba(100, 20, 20, 0.8) ',
            //     ],
            // backgroundColor: barColors,
            borderWidth: 1,
            borderColor: ChartDataColor(0.7),
            hoverBorderWidth: 5,
            hoverBorderColor: ChartDataColor(0.7),
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        // onClick: (evt) => {
        //     const points = dailyChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

        //         if (points.length) {
        //             const firstPoint = points[0];
        //             const label = dailyChart.data.labels[firstPoint.index];
        //             const value = dailyChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        //             console.log(label, value);
        //             dailyChart.options.plugins.title.text = label;
        //             dailyChart.update();
        //         }
        // },
        // This is again different from the code in the video.
        // indexAxis: 'y',
        plugins: {
            title: {
                display: true,
                // text: `Daily Electricity Usage in ${currentMonth}`,
                text: getDailyChartTitle(currentMonth),
                // different from the video but it does the same thing.
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
                // disables the thing you see on hover
                enabled: true,
                callbacks: {
                    label: (context) => {
                        // let label = context.dataset.label || '';
                        let data = Math.round(context.parsed.y, 2);
                        return `Usage: ${data} Kw`;
                    },
                    title: (contexts) => {
                        let day = contexts[0].label;
                        let month = currentMonth;
                        console.log(contexts);
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
                // display: false,
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

let monthlyData = [...randarray_(50, 12)];

let monthlyChart = new Chart(document.getElementById('monthlyChart').getContext('2d'), {
    type: 'bar',
    data: {
        labels: months,
        // labels: Utils.months({count: 7}),
        datasets: [{
            label: 'Electricity Usage (Kw)',
            fill: true,
            tension: 1,
            data: monthlyData,
            // data: [...range(1, 32)].map((val) => {return randint(10, 100)}),
            // data: [
            //     100, 200, 150, 100, 300, 70, 250
            // ],
            // backgroundColor: 'rgba(200, 20, 20, 0.6)',
            // backgroundColor: monthlyData.map((val) => {return `rgba(251, 212, 0, ${val / 100})`}),
            backgroundColor: ChartDataColor(0.7),
            // backgroundColor: [
            //     'rgba(100, 20, 20, 0.3) ',
            //     'rgba(100, 20, 20, 0.4) ',
            //     'rgba(100, 20, 20, 0.5) ',
            //     'rgba(100, 20, 20, 0.6) ',
            //     'rgba(100, 20, 20, 0.7) ',
            //     'rgba(100, 20, 20, 0.8) ',
            //     ],
            // backgroundColor: barColors,
            borderWidth: 0,
            borderColor: ChartDataColor(0.7),
            // hoverBorderWidth: 4,
            // hoverBorderColor: ChartDataColor,
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
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
                    dailyChart.data.datasets[0].data = [...randarray_(50, days)];
                    dailyChart.update();
                }
        },
        plugins: {
            title: {
                display: true,
                text: "Monthly Usage",
                color: ChartDataColor(1),
                font: {
                    size: 30,
                },
                padding: 30,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        // let label = context.dataset.label || '';
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
                // display: false,
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
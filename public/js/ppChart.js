const ctx = document.getElementById("myChart2").getContext("2d");

const myChart2 = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [],
        datasets: [
            {
                label: "Press Part",
                data: [],
                backgroundColor: [],
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 1,
                categoryPercentage: 0.7,
                barPercentage: 0.9,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: { display: true, text: "Part Number", color: "white", font: { size: 16 } },
                ticks: { color: "white", font: { size: 14, weight: "bold" }, maxRotation: 45, minRotation: 45, autoSkip: false },
                grid: { color: "rgba(186, 223, 238, 0.5)" }
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: "Quantity", color: "white", font: { size: 16 } },
                ticks: { color: "white", font: { size: 14 } },
                grid: { color: "rgba(186, 223, 238, 0.5)" }
            }
        },
        plugins: {
            legend: { labels: { color: "lightblue", font: { size: 14 } } },
            datalabels: {
                color: "white",
                anchor: "center",
                align: "center",
                font: { weight: "bold", size: 14 }, 
                formatter: (value) => {
                    console.log(value); 
                    return value; 
                },
                padding: 5,
                clip: false,
                display: true,
            },
            annotation: {
                annotations: {}
            }
        }
    }, plugins: [ChartDataLabels],
});

setInterval(() => {
    Promise.all([
        fetch('http://192.168.1.106:3000/api/getPresspart').then(res => res.json()),
        fetch('http://192.168.1.106:3000/api/getJudgementLine1').then(res => res.json())
    ])
        .then(([pressPartData, judgementData]) => {
            let labels = [];
            let quantities = [];
            let backgroundColors = [];
            let annotations = {};

            pressPartData.forEach(row => {
                let label = row.part_no;
                let index = labels.indexOf(label);
                if (index !== -1) {
                    quantities[index] += parseInt(row.total_quantity);
                } else {
                    labels.push(label);
                    quantities.push(parseInt(row.total_quantity));
                }
            });

            let judgementMap = {};
            judgementData.forEach(item => {
                judgementMap[item.part_no] = item.qty;
            });

            quantities.forEach((qty, index) => {
                let partNo = labels[index];
                let judgementQty = judgementMap[partNo] || 0;

                if (qty < judgementQty) {
                    backgroundColors.push("#ffcc00");
                } else {
                    backgroundColors.push("#339900");
                }

                annotations[`line_${index}`] = {
                    type: 'line',
                    yMin: judgementQty,
                    yMax: judgementQty,
                    xMin: index - 0.4,
                    xMax: index + 0.4,
                    borderColor: 'red',
                    borderWidth: 4,
                    label: { display: false }
                };
            });

            myChart2.data.labels = labels;
            myChart2.data.datasets[0].data = quantities;
            myChart2.data.datasets[0].backgroundColor = backgroundColors;
            myChart2.options.plugins.annotation.annotations = annotations;

            myChart2.update();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, 1000);

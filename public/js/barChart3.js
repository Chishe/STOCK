const socket = new WebSocket("ws://127.0.0.1:1880/ws/test3");

const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Stock Quantities",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.9)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Part Number",
          color: "white",
          font: {
            size: 22,
          },
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(186, 223, 238, 0.5)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantity",
          color: "white",
          font: {
            size: 22,
          },
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(186, 223, 238, 0.5)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "lightblue",
          font: {
            size: 32,
          },
        },
      },
      datalabels: {
        color: "white",
        anchor: "center",
        align: "center",
        font: {
          weight: "bold",
          size: 16,
        },
        formatter: function (value) {
          return value;
        },
      },
    },
  },
  plugins: [ChartDataLabels],
});

socket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  const labels = [];
  const quantities = [];

  data.forEach((item) => {
    labels.push(item.part_no + ' ' + item.model);
    quantities.push(parseInt(item.quantity, 10));
  });


  myChart.data.labels = labels;
  myChart.data.datasets[0].data = quantities;
  myChart.update();
};

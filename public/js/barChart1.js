const ctx = document.getElementById("myChart").getContext("2d");

const gradient = ctx.createLinearGradient(0, 0, 0, 800);
gradient.addColorStop(0, "rgb(63, 0, 113)");
gradient.addColorStop(0.33, "rgb(251, 37, 118)");
gradient.addColorStop(0.66, "rgb(51, 47, 208)");
gradient.addColorStop(1, "rgb(0, 2, 161)");

const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Stock Quantities",
        data: [],
        backgroundColor: gradient,
        borderColor: "rgba(0, 0, 0, 0)",
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
          font: { size: 22 },
        },
        ticks: { color: "white", font: { size: 18 } },
        grid: { color: "rgba(186, 223, 238, 0.5)" },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantity",
          color: "white",
          font: { size: 22 },
        },
        ticks: { color: "white" },
        grid: { color: "rgba(186, 223, 238, 0.5)" },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "lightblue",
          font: { size: 32 },
        },
      },
      datalabels: {
        color: "white",
        anchor: "center",
        align: "center",
        font: { weight: "bold", size: 16 },
        formatter: function (value) {
          return value;
        },
      },
    },
  },
  plugins: [ChartDataLabels],
});

// Function ดึงข้อมูลจาก API
async function fetchData() {
  try {
    const response = await fetch("http://127.0.0.1:3000/api/stock"); // เรียก API ทุก 1 วิ
    const data = await response.json();

    const labels = [];
    const quantities = [];

    data.forEach((item) => {
      labels.push(item.part_no + " " + item.model);
      quantities.push(parseInt(item.quantity, 10));
    });

    // อัปเดตกราฟ
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = quantities;
    myChart.update();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// ดึงข้อมูลทุก ๆ 1 วินาที
setInterval(fetchData, 1000);

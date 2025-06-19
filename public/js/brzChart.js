const ctx2 = document.getElementById("myChart2").getContext("2d");

const gradient2 = ctx2.createLinearGradient(0, 0, 0, 800);
gradient2.addColorStop(0, "rgb(0, 128, 255)");
gradient2.addColorStop(0.5, "rgb(0, 255, 128)");
gradient2.addColorStop(1, "rgb(255, 128, 0)");

const myChart2 = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: [],
    datasets: [{
      label: "Brazing",
      data: [],
      backgroundColor: gradient2,
      borderColor: "rgba(0, 0, 0, 0)",
      borderWidth: 1,
      categoryPercentage: 0.7,
      barPercentage: 0.9,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Part Number",
          color: "white",
          font: { size: 16 }
        },
        ticks: {
          color: "white",
          font: { size: 10, weight: "bold" },
          align: "center",
          maxRotation: 45,
          minRotation: 45,
          autoSkip: false
        },
        grid: { color: "rgba(186, 223, 238, 0.5)" }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantity",
          color: "white",
          font: { size: 16 }
        },
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
        formatter: (value) => value
      }
    }
  },
  plugins: [ChartDataLabels]
});

setInterval(() => {
  fetch('http://192.168.100.100:3000/api/getBrazing')
    .then(response => response.json())
    .then(data => {
      myChart2.data.labels = data.ppLb;
      myChart2.data.datasets[0].data = data.ppQty;
      myChart2.update();
      console.log(data.ppLb)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, 1000);


function submitForm(type) {
  const partNo = document.getElementById("part_no").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!partNo || !quantity) {
    document.getElementById("message").innerText = "Please enter both part number and quantity.";
    return;
  }

  const data = {
    part_no: partNo,
    quantity: quantity,
    type: type,
  };

  fetch('http://192.168.100.100:3000/api/updateStock5', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      document.getElementById("message").innerText = result.message;
    })
    .catch(error => {
      document.getElementById("message").innerText = "Error: " + error.message;
    });
}
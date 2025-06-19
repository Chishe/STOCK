const ctx1 = document.getElementById("myChart").getContext("2d");
const ctx2 = document.getElementById("myChart2").getContext("2d");


const gradient1 = ctx1.createLinearGradient(0, 0, 0, 800);
gradient1.addColorStop(0, "rgb(63, 0, 113)");
gradient1.addColorStop(0.33, "rgb(251, 37, 118)");
gradient1.addColorStop(0.66, "rgb(51, 47, 208)");
gradient1.addColorStop(1, "rgb(0, 2, 161)");

const gradient2 = ctx2.createLinearGradient(0, 0, 0, 800);
gradient2.addColorStop(0, "rgb(0, 128, 255)");
gradient2.addColorStop(0.5, "rgb(0, 255, 128)");
gradient2.addColorStop(1, "rgb(255, 128, 0)");

const myChart = new Chart(ctx1, {
    type: "bar",
    data: {
        labels: [],
        datasets: [
            {
                label: "Press Part",
                data: [],
                backgroundColor: gradient1,
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: { display: true, text: "Part Number", color: "white", font: { size: 12 } },
                ticks: { color: "white", font: { size: 18 } },
                grid: { color: "rgba(186, 223, 238, 0.5)" },
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: "Quantity", color: "white", font: { size: 12 } },
                ticks: { color: "white" },
                grid: { color: "rgba(186, 223, 238, 0.5)" },
            },
        },
        plugins: {
            legend: { labels: { color: "lightblue", font: { size: 14 } } },
            datalabels: {
                color: "white",
                anchor: "center",
                align: "center",
                font: { weight: "bold", size: 16 },
                formatter: (value) => value,
            },
        },
    },
    plugins: [ChartDataLabels],
});

const myChart2 = new Chart(ctx2, {
    type: "bar",
    data: {
        labels: [],
        datasets: [
            {
                label: "Center Repack",
                data: [],
                backgroundColor: gradient2,
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: { display: true, text: "Part Number", color: "white", font: { size: 12 } },
                ticks: { color: "white", font: { size: 18 } },
                grid: { color: "rgba(186, 223, 238, 0.5)" },
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: "Change", color: "white", font: { size: 12 } },
                ticks: { color: "white" },
                grid: { color: "rgba(186, 223, 238, 0.5)" },
            },
        },
        plugins: {
            legend: { labels: { color: "lightblue", font: { size: 14 } } },
            datalabels: {
                color: "white",
                anchor: "center",
                align: "center",
                font: { weight: "bold", size: 16 },
                formatter: (value) => value,
            },
        },
    },
    plugins: [ChartDataLabels],
});
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://192.168.100.100:3000/api/getMain1')
        .then(response => response.json())
        .then(data => {
            myChart.data.labels = data.part_no;
            myChart.data.datasets[0].data = data.total_quantity;
            myChart.update();
        })
        .catch(error => console.error('Error fetching data from /api/getMain1:', error));

    fetch('http://192.168.100.100:3000/api/getMain2')
        .then(response => response.json())
        .then(data => {
            myChart2.data.labels = data.part_no;
            myChart2.data.datasets[0].data = data.total_quantity;
            myChart2.update();
        })
        .catch(error => console.error('Error fetching data from /api/getMain2:', error));
});



document.getElementById("updateForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const coreNumber = document.getElementById("corenumber").value;
    const volume = parseInt(document.getElementById("volumn").value, 10);
    if (!coreNumber || isNaN(volume)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    try {
        const response = await fetch("http://192.168.100.100:3000/api/getStockData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coreNumber, volume })
        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message || "ไม่พบข้อมูลที่ต้องการ");
            return;
        }
        

        const tableBody = document.querySelector('#stockTable tbody');
        tableBody.innerHTML = '';
        data.tableData.forEach(row => {
            const tableRow = document.createElement('tr');
            const partNumberCell = document.createElement('td');
            const statusCell = document.createElement('td');

            partNumberCell.textContent = row.partNumber;
            statusCell.textContent = row.status;

            if (row.status === "NG") {
                statusCell.style.backgroundColor = 'red';
                statusCell.style.color = 'white';
            } else if (row.status === "OK") {
                statusCell.style.backgroundColor = 'green';
                statusCell.style.color = 'white';
            }

            tableRow.appendChild(partNumberCell);
            tableRow.appendChild(statusCell);
            tableBody.appendChild(tableRow);
        });

        const labels = data.labels;
        const quantities = data.values;
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = quantities;
        myChart.update();

        const channels = data.channels;
        const changes = data.changes;
        myChart2.data.labels = channels;
        myChart2.data.datasets[0].data = changes;
        myChart2.update();

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
});

async function fetchStockData() {
    try {
        const response = await fetch('http://192.168.1.106:3000/api/latest-stock-data-1');
        const data = await response.json();

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.id_part_no_1}</td>
            <td>${row.quantity}</td>
            <td>${row.timestamp}</td>
            <td>${row.out}</td>
        `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error fetching stock data:", error);
    }
}
setInterval(fetchStockData, 1000);

fetchStockData();
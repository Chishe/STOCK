async function fetchStockData() {
    try {
      const response = await fetch('http://192.168.1.106:3000/api/latest-stock-data-5');
      const data = await response.json();

      const tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";

      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.part_no}</td>
            <td>${row.quantity}</td>
            <td>${row.timestamp ? new Date(row.timestamp).toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' }) : '-'}</td>
            <td>${row.out ? new Date(row.out).toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' }) : '-'}</td>
            <td>null</td>
            <td>null</td>
            <td>null</td>
            <td>null</td>
            <td>null</td>
        `;
        tableBody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }
  setInterval(fetchStockData, 1000);

  fetchStockData();
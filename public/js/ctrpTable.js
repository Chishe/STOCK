let lastData = [];

async function fetchStockData() {
  try {
    const response = await fetch('http://192.168.1.100:3000/api/latest-stock-data-2');
    const data = await response.json();
    
    if (JSON.stringify(data) === JSON.stringify(lastData)) {
      return; 
    }

    lastData = data; 
    
    const tableBody = document.getElementById("tableBody");
    const fragment = document.createDocumentFragment(); 

    data.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.id_part_no_2}</td>
            <td>${row.quantity}</td>
            <td>${row.timestamp}</td>
            <td>${row.out}</td>
        `;
      fragment.appendChild(tr);
    });

    tableBody.innerHTML = ""; 
    tableBody.appendChild(fragment); 
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
}

function updateStockData() {
  fetchStockData();
  setTimeout(updateStockData, 1000);
}

updateStockData(); // เริ่มโหลดข้อมูลครั้งแรก

async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/api/stock");
      const data = await response.json();
  
      const labels = [];
      const quantities = [];
      const changes = [];
  
      data.forEach((item) => {
        labels.push(item.model);
        quantities.push(parseInt(item.quantity, 10));
        changes.push(parseInt(item.change, 10));
      });
  
      myChart.data.labels = labels;
      myChart.data.datasets[0].data = quantities;
      myChart.update();
  
      myChart2.data.labels = labels;
      myChart2.data.datasets[0].data = quantities;
      myChart2.update();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

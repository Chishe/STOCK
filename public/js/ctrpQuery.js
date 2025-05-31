
document.addEventListener('DOMContentLoaded', function(){
  function submitForm(type) {
  const id_part_no = document.getElementById("id_part_no ").value;
  const partNo = document.getElementById("part_no").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  if (type == "IN") {
    if (!partNo || !quantity) {
      document.getElementById("message").innerText = "Please enter both part number and quantity.";
      return;
    }
    const data = {
      id_part_no: id_part_no,
      part_no: partNo,
      quantity: quantity,
      type: type,
    };
    console.log(data);
    fetch('http://192.168.1.106:3000/api/updateStock2', {
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
}
});
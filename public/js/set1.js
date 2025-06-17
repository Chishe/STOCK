document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('editModal').style.display = 'none';
  });

  function openEditModal(id, partNo, qty) {
    document.getElementById('editId').value = id;
    document.getElementById('editPartNo').value = partNo;
    document.getElementById('editQty').value = qty;
    document.getElementById('editModal').style.display = 'flex';
  }

  function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
  }

  document.getElementById('addForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const part_no = document.getElementById('part_no').value;
    const qty = document.getElementById('qty').value;

    const response = await fetch('http://192.168.1.100:3000/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ part_no, qty })
    });

    if (!response.ok) {
      alert("Error adding part.");
    } else {
      alert("Part added successfully!");
      location.reload();
    }
  });



  document.getElementById('editForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const id = document.getElementById('editId').value;
    const partNo = document.getElementById('editPartNo').value;
    const qty = document.getElementById('editQty').value;

    const response = await fetch(`/api/edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ part_no: partNo, qty })
    });

    if (!response.ok) {
      alert("Error updating part. Please try again.");
    } else {
      const result = await response.json();
      alert(result.message);
      closeEditModal();
      location.reload();
    }
  });

  async function deletePart(id) {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`http://192.168.1.100:3000/delete/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message);
        } else {
          const result = await response.json();
          alert(result.message);
          location.reload();
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    }
  }
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('editModal').style.display = 'none';
});

function openEditModal(id, part_no, quantity) {
    console.log("Opening modal for ID:", id);
    document.getElementById('editId').value = id;
    document.getElementById('editPartNo').value = part_no;
    document.getElementById('editQty').value = quantity;
    document.getElementById('editModal').style.display = 'flex';
}


function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

document.getElementById('editForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const id = document.getElementById('editId').value;
    const partNo = document.getElementById('editPartNo').value;
    const qty = document.getElementById('editQty').value;

    const response = await fetch(`/api/edit6/${id}`, {
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

async function searchData() {
    const searchDate = document.getElementById('searchDate').value;
    const searchStartTime = document.getElementById('searchStartTime').value;
    const searchEndTime = document.getElementById('searchEndTime').value;

    if (!searchDate || !searchStartTime || !searchEndTime) {
        alert("Please select date and both start and end times");
        return;
    }

    const queryParams = [];
    if (searchDate) queryParams.push(`date=${encodeURIComponent(searchDate)}`);
    if (searchStartTime) queryParams.push(`start_time=${encodeURIComponent(searchStartTime)}`);
    if (searchEndTime) queryParams.push(`end_time=${encodeURIComponent(searchEndTime)}`);
    
    const queryString = queryParams.join('&');
    console.log(searchDate, searchStartTime, searchEndTime);

    try {
        const response = await fetch(`http://192.168.100.100:3000/search6?${queryString}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (response.ok) {
            updateTable(data);
        } else {
            alert('No data found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again.');
    }
}



function updateTable(data) {
    const tableBody = document.querySelector('#dataRows');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.part_no}</td>
            <td>${item.quantity}</td>
            <td>${item.timestamp}</td>
            <td>${item.out}</td>
            <td>
                <button class="edit" data-id="${item.id}" data-part-no="${item.part_no}" data-quantity="${item.quantity}">
                    <i class="fa fa-edit" style="font-size:36px"></i>Edit
                </button>
                <button class="del" data-id="${item.id}">
                    <i class="fa fa-trash-o" style="font-size:36px"></i>Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });


    tableBody.addEventListener('click', function(event) {
        if (event.target.closest('.edit')) {
            const btn = event.target.closest('.edit');
            const id = btn.getAttribute('data-id');
            const partNo = btn.getAttribute('data-part-no');
            const quantity = btn.getAttribute('data-quantity');
            openEditModal(id, partNo, quantity);
        }
        if (event.target.closest('.del')) {
            const btn = event.target.closest('.del'); 
            const id = btn.getAttribute('data-id');
            deletePart(id);
        }
    });
}



async function deleteAll() {
    if (confirm("Are you sure you want to delete all parts?")) {
        try {
            const response = await fetch('http://192.168.100.100:3000/delete-all6', { 
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
            console.error(error);
        }
    }
}



async function deletePart(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        try {
            const response = await fetch(`http://192.168.100.100:3000/delete6/${id}`, {
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

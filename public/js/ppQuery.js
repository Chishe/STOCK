function toggleFormType() {
    const formType = document.querySelector('input[name="formType"]:checked').value;

    if (formType === 'normal') {
        document.getElementById("normalForm").style.display = "block";
        document.getElementById("partialinline").style.display = "none";
        document.getElementById("partialForm").style.display = "none";
        nrFetchInterval = setInterval(fetchNormalform, 1000);
        clearInterval(qrFetchInterval);
    } else if (formType === 'partialin') {
        document.getElementById("normalForm").style.display = "none";
        document.getElementById("partialForm").style.display = "none";
        document.getElementById("partialinline").style.display = "block";
        document.getElementById("OUT").disabled = true;
        qrFetchInterval = setInterval(fetchQRinCode, 1000);
        clearInterval(nrFetchInterval);
    } else if (formType === 'partial') {
        document.getElementById("normalForm").style.display = "none";
        document.getElementById("partialForm").style.display = "block";
        document.getElementById("partialinline").style.display = "none";
        qrFetchInterval = setInterval(fetchQRCode, 1000);
        clearInterval(nrFetchInterval);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('input[value="normal"]').checked = true;
    toggleFormType();
});

async function fetchNormalform() {
    try {
        const response = await fetch('http://192.168.1.106:1880/api/Normal');
        const data = await response.json();
        document.getElementById("qr_code").value = '';
        document.getElementById("part_no").value = '';
        document.getElementById("quantity").value = '';
        document.getElementById("qr_code").value = data.qr_code;
        document.getElementById("part_no").value = data.part_no;
        document.getElementById("quantity").value = "240";
    } catch (error) {
        document.getElementById("message").innerText = "Error fetching normal form: " + error.message;
    }
}

async function fetchQRCode() {
    try {
        const response = await fetch('http://192.168.1.106:1880/api/scanQRCode');
        const data = await response.json();
        document.getElementById("qr_code").value = '';
        document.getElementById("partial_part_no").value = '';
        if (data.part_no && data.id_part_no) {
            document.getElementById("qr_code").value = data.qr_code;
            document.getElementById("partial_part_no").value = data.part_no;
            document.getElementById("partial_quantity").disabled = false;
        }
    } catch (error) {
        document.getElementById("message").innerText = "Error fetching QR code: " + error.message;
    }
}

async function fetchQRinCode() {
    try {
        const response = await fetch('http://192.168.1.106:1880/api/inQRCode');
        const data = await response.json();
        document.getElementById("in_qr_code").value = '';
        document.getElementById("in_part_no").value = '';
        if (data.part_no && data.id_part_no) {
            document.getElementById("in_qr_code").value = data.qr_code;
            document.getElementById("in_part_no").value = data.part_no;
            document.getElementById("in_quantity").disabled = false;
        }
    } catch (error) {
        document.getElementById("message").innerText = "Error fetching QR code: " + error.message;
    }
}

async function startFetching() {
    await fetchNormalform();
    await new Promise(resolve => setTimeout(resolve, 500));
    await fetchQRCode();
    setTimeout(startFetching, 1000);
}

let lastFormType = '';

function submitForm(type) {
    const formTypeElement = document.querySelector('input[name="formType"]:checked');
    if (!formTypeElement) {
        alert("กรุณาเลือกประเภทฟอร์มก่อน!");
        return;
    }

    const formType = formTypeElement.value;
    lastFormType = formType;
    let part_no, id_part_no, quantity, qr_code;

    if (formType === 'normal') {
        part_no = document.getElementById('part_no').value.trim();
        id_part_no = document.getElementById('id_part_no').value.trim();
        quantity = 240;
    } else if (formType === 'partialin') {
        qr_code = document.getElementById('in_qr_code').value.trim();
        part_no = document.getElementById('in_part_no').value.trim();
        quantity = parseInt(document.getElementById('in_quantity').value.trim(), 10);
        id_part_no = qr_code;
    } else if (formType === 'partial') {
        qr_code = document.getElementById('qr_code').value.trim();
        part_no = document.getElementById('partial_part_no').value.trim();
        quantity = parseInt(document.getElementById('partial_quantity').value.trim(), 10);
        id_part_no = qr_code;
    }

    if (!quantity || !part_no) {
        alert("กรุณากรอกจำนวน (Quantity) และ Part Number ก่อนกด IN");
        return;
    }

    console.log("Form Type: ", formType);
    console.log("Part Number: ", part_no);
    console.log("ID Part No: ", id_part_no);
    console.log("Quantity: ", quantity);

    let query = "";
    if (type === "IN" && formType === 'partialin') {
        query = `
        INSERT INTO log_data_stock_1 (part_no, id_part_no_1, quantity, timestamp)
        VALUES ('${part_no}', '${id_part_no}', '${quantity}', CURRENT_TIMESTAMP)
        ON CONFLICT (id_part_no_1)
        DO UPDATE SET 
            quantity = (CAST(log_data_stock_1.quantity AS INTEGER) + ${quantity})::TEXT,
            timestamp = CURRENT_TIMESTAMP;
        `;
    } else if (type === "IN") {
        query = `
        INSERT INTO log_data_stock_1 (part_no, id_part_no_1, quantity, timestamp)
        VALUES ('${part_no}', '${id_part_no}', '${quantity}', CURRENT_TIMESTAMP)
        ON CONFLICT (id_part_no_1)
        DO UPDATE SET 
            quantity = (CAST(log_data_stock_1.quantity AS INTEGER) + ${quantity})::TEXT,
            timestamp = CURRENT_TIMESTAMP;
        `;
        const dataUpdate = {
            qr_code: qr_code,
            part_no: part_no,
            quantity: quantity,
            id_part_no: id_part_no
        };
        updateStock('update_stock', dataUpdate);
    } else if (type === "OUT") {
        query = `
        UPDATE log_data_stock_1 
        SET quantity = (CAST(quantity AS INTEGER) - ${quantity})::TEXT
        WHERE part_no = '${part_no}' AND id_part_no_1 = '${id_part_no}';
        `;
        query += `
        INSERT INTO log_data_stock_2 (part_no, id_part_no_2, quantity, timestamp)
        VALUES ('${part_no}', '${id_part_no}', '${quantity}', CURRENT_TIMESTAMP)
        ON CONFLICT (id_part_no_2)
        DO UPDATE SET 
            quantity = (CAST(log_data_stock_2.quantity AS INTEGER) + ${quantity})::TEXT,
            timestamp = CURRENT_TIMESTAMP;
        `;
        const dataUpdate = {
            qr_code: qr_code,
            part_no: part_no,
            quantity: quantity,
            id_part_no: id_part_no
        };
        updateStock('update_stock2', dataUpdate);
    }

    console.log("Generated SQL Query: ", query);

    fetch('http://192.168.1.106:3000/api/insertData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Data inserted successfully:", data);
            alert("Data inserted successfully!");
            clearForm();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error inserting data.");
        });
}

function updateStock(endpoint, data) {
    fetch(`http://192.168.1.106:1880/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                console.log('Stock updated successfully');
            } else {
                console.log('Error updating stock');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function clearForm() {
    document.getElementById('part_no').value = '';
    document.getElementById('id_part_no').value = '';
    document.getElementById('qr_code').value = '';
    document.getElementById('partial_part_no').value = '';
    document.getElementById('partial_quantity').value = '';
    if (lastFormType) {
        document.querySelector(`input[name="formType"][value="${lastFormType}"]`).checked = true;
    }
}

document.getElementById('insertform').addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log("Form submitted");
    const tank_btm = document.getElementById('tank_btm').value.trim();
    const tank_top = document.getElementById('tank_top').value.trim();
    const header_btm = document.getElementById('header_btm').value.trim();
    const core_id = document.getElementById('core_id').value.trim();
    const model = document.getElementById('model').value.trim();
    const header_top = document.getElementById('header_top').value.trim();
    const corenumber = document.getElementById('corenumber').value.trim();
    const volumn = parseInt(document.getElementById('volumn').value);

    if (!volumn || volumn <= 0) {
        alert("Please enter a valid number for Input Core Volume.");
        return;
    }

    const data = {
        tank_btm, tank_top, header_btm, header_top, core_id, model, corenumber, volumn
    };

    try {
        const updateResponse = await fetch('http://192.168.1.100:1880/update-tank-matching', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const updateResult = await updateResponse.json();
        if (!updateResult.success) {
            console.log('Error updating stock');
        } else {
            console.log('Stock updated successfully');
        }

        let successCount = 0;

        for (let i = 0; i < volumn; i++) {
            const success = await insertRowData(tank_btm, tank_top, header_btm, header_top, core_id, model, corenumber);
            if (success) successCount++;
        }

        if (successCount === volumn) {
            alert('All rows inserted successfully!');
            clearForm();
        } else {
            alert(`Inserted ${successCount}/${volumn} rows only.`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Unexpected error occurred!');
    }
});

async function insertRowData(tank_btm, tank_top, header_btm, header_top, core_id, model, corenumber) {
    try {
        const rowData = { tank_btm, tank_top, header_btm, header_top, core_id, model, corenumber };

        const response = await fetch('http://192.168.1.100:1880/api/insert-data-matching', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rowData)
        });

        const result = await response.json();
        if (result.success) {
            console.log(`Row inserted successfully`);
            alert("Data inserted successfully!");  
            return true;
        } else {
            console.error(`Error inserting row: ${result.message}`);
            alert(`Error: ${result.message}`); 
            return false;
        }
    } catch (error) {
        console.error("Error during insertion:", error);
        alert("An error occurred during the insertion process.");
        return false;
    }
}


function clearForm() {
    const fields = ['tank_btm', 'tank_top', 'header_btm', 'header_top', 'core_id', 'model', 'corenumber', 'volumn'];
    fields.forEach(id => document.getElementById(id).value = '');
}

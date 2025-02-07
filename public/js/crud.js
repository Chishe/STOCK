const partNumbers = [
    "Part_No",
    "TG447687_0171", "TG447687_0160", "TG447687_0070", "TG447687_0030", "TG447688_0030",
    "TG447685_0033", "TG447684_1150", "TG447684_1140", "TG447684_1130", "TG447684_1120",
    "TG447684_1110", "TG447684_1100", "TG447684_1090", "TG447682_5910", "TG447682_5750",
    "TG447682_5740", "TG447682_5620", "TG447682_5480", "TG447682_5440", "TG447682_5410",
    "TG447682_5370", "TG447682_5360", "TG447682_5330", "TG447682_5320", "TG447682_5300",
    "TG447682_5290", "TG447682_5280", "TG447682_5000", "TG447682_4980", "TG447682_4970",
    "TG447682_4960", "TG447682_4950", "TG447682_4920", "TG447682_4850", "TG447682_4830",
    "TG447682_4820", "TG447682_4800", "TG447682_4780", "TG447682_4750", "TG447682_4580",
    "TG447682_5240", "TG447682_5200", "TG447682_5170", "TG447682_5160", "TG447682_5130",
    "TG447682_5120", "TG447682_5090", "TG447682_5080", "TG447682_5060", "TG447682_5050",
    "TG447682_5040", "TG447682_4730", "TG447682_4720", "TG447682_4700", "TG447682_4670",
    "TG447682_4680", "TG447682_4650", "TG447682_4630", "TG447682_4620", "TG447683_7010",
    "TG447683_7000", "TG447683_6990", "TG447683_6980", "TG447683_6970", "TG447683_6960",
    "TG447683_6940", "TG447683_6930", "TG447683_6920", "TG447683_6900", "TG447683_6440",
    "TG447683_6430", "TG447683_6420", "TG447683_6410", "TG447683_6400", "TG447683_6390",
    "TG447683_6370", "TG447683_6360", "TG447683_6350", "TG447683_6320", "TG447683_6310",
    "TG447683_5870", "TG447683_6790", "TG447683_6730", "TG447683_6740", "TG447683_6690",
    "TG447683_6650", "TG447683_6630", "TG447683_6590", "TG447683_6570", "TG447683_6560",
    "TG447683_6550", "TG447683_6540", "TG447683_6510", "TG447683_6240", "TG447683_6220",
    "TG447683_6130", "TG447683_6120", "TG447683_6100", "TG447683_6090", "TG447683_6070",
    "TG447683_6060", "TG447683_6050", "TG447683_6010", "TG447683_5990", "TG447683_5960",
    "TG447683_5940", "TG447686_1940", "TG447686_1830", "TG447686_1770", "TG447686_1630",
    "TG447686_1180", "TG447686_0901", "TG447686_0702", "TG447686_0681", "TG447686_0621",
    "TG447686_0601", "TG447686_0281", "TG447686_0261", "TG447686_1930", "TG447686_1820",
    "TG447686_1760", "TG447686_1620", "TG447686_1170", "TG447686_0892", "TG447686_0692",
    "TG447686_0671", "TG447686_0611", "TG447686_0591", "TG447686_0271", "TG447686_0251",
    "TG447681_1400", "TG447681_1390", "TG447681_1380", "TG447681_1370", "TG447681_1360",
    "TG447681_1350", "TG447681_1340", "TG447681_1330", "TG447681_1310", "TG447681_1300",
    "TG447681_1290", "TG447681_2930", "TG447681_2700", "TG447681_2110", "TG447681_2040",
    "TG447681_2010", "TG447681_1980", "TG447681_1870", "TG447681_1740", "TG447681_1720",
    "TG447681_1710", "TG447681_1700", "TG447681_1660", "TG447681_1650", "TG447681_1640",
    "TG447681_1620", "TG447681_1600", "TG447681_1590", "TG447681_1580", "TG447681_1540",
    "TG447681_1530", "TG447681_1520", "TG447681_1490", "TG447681_1480", "TG447681_1470",
    "TG447681_1450", "TG447681_1420", "TG447681_1410", "TG447670_0230", "TG447670_0111",
    "TG447670_0101", "TG447670_0090", "TG447670_0080", "TG447670_0070", "TG447670_0060",
    "TG447670_0050", "TG447670_0040", "TG447670_0021", "TG447670_0010", "TG447673_3500",
    "TG447673_2330", "TG447673_2310", "TG447673_2290", "TG447673_2280", "TG447673_2270",
    "TG447673_2260", "TG447673_2250", "TG447673_2240", "TG447673_2210", "TG447673_2200",
    "TG447673_2160", "TG447673_1680", "TG447673_1610", "TG447673_1490", "TG447673_1480",
    "TG447673_1410", "TG447673_1400", "TG447673_1390", "TG447673_1380", "TG447673_1370",
    "TG447673_1150"
];


const models =  [
    { model: "Block Joint", sup_part: "TG447687-0171" },
    { model: "Block Joint", sup_part: "TG447687-0160" },
    { model: "Block Joint", sup_part: "TG447687-0070" },
    { model: "Block Joint", sup_part: "TG447687-0030" },
    { model: "Block Joint", sup_part: "TG447688-0030" },
    { model: "Cap", sup_part: "TG447685-0033" },
    { model: "Separator", sup_part: "TG447684-1150" },
    { model: "Separator", sup_part: "TG447684-1140" },
    { model: "Separator", sup_part: "TG447684-1130" },
    { model: "Separator", sup_part: "TG447684-1120" },
    { model: "Separator", sup_part: "TG447684-1110" },
    { model: "Separator", sup_part: "TG447684-1100" },
    { model: "Separator", sup_part: "TG447684-1090" },
    { model: "Tank (Btm)", sup_part: "TG447682-5910" },
    { model: "Tank (Btm)", sup_part: "TG447682-5750" },
    { model: "Tank (Btm)", sup_part: "TG447682-5740" },
    { model: "Tank (Btm)", sup_part: "TG447682-5620" },
    { model: "Tank (Btm)", sup_part: "TG447682-5480" },
    { model: "Tank (Btm)", sup_part: "TG447682-5440" },
    { model: "Tank (Btm)", sup_part: "TG447682-5410" },
    { model: "Tank (Btm)", sup_part: "TG447682-5370" },
    { model: "Tank (Btm)", sup_part: "TG447682-5360" },
    { model: "Tank (Btm)", sup_part: "TG447682-5330" },
    { model: "Tank (Btm)", sup_part: "TG447682-5320" },
    { model: "Tank (Btm)", sup_part: "TG447682-5300" },
    { model: "Tank (Btm)", sup_part: "TG447682-5290" },
    { model: "Tank (Btm)", sup_part: "TG447682-5280" },
    { model: "Tank (Btm)", sup_part: "TG447682-5000" },
    { model: "Tank (Btm)", sup_part: "TG447682-4980" },
    { model: "Tank (Btm)", sup_part: "TG447682-4970" },
    { model: "Tank (Btm)", sup_part: "TG447682-4960" },
    { model: "Tank (Btm)", sup_part: "TG447682-4950" },
    { model: "Tank (Btm)", sup_part: "TG447682-4920" },
    { model: "Tank (Btm)", sup_part: "TG447682-4850" },
    { model: "Tank (Btm)", sup_part: "TG447682-4830" },
    { model: "Tank (Btm)", sup_part: "TG447682-4820" },
    { model: "Tank (Btm)", sup_part: "TG447682-4800" },
    { model: "Tank (Btm)", sup_part: "TG447682-4780" },
    { model: "Tank (Btm)", sup_part: "TG447682-4750" },
    { model: "Tank (Btm)", sup_part: "TG447682-4580" },
    { model: "Tank (Top)", sup_part: "TG447682-5240" },
    { model: "Tank (Top)", sup_part: "TG447682-5200" },
    { model: "Tank (Top)", sup_part: "TG447682-5170" },
    { model: "Tank (Top)", sup_part: "TG447682-5160" },
    { model: "Tank (Top)", sup_part: "TG447682-5130" },
    { model: "Tank (Top)", sup_part: "TG447682-5120" },
    { model: "Tank (Top)", sup_part: "TG447682-5090" },
    { model: "Tank (Top)", sup_part: "TG447682-5080" },
    { model: "Tank (Top)", sup_part: "TG447682-5060" },
    { model: "Tank (Top)", sup_part: "TG447682-5050" },
    { model: "Tank (Top)", sup_part: "TG447682-5040" },
    { model: "Tank (Top)", sup_part: "TG447682-4730" },
    { model: "Tank (Top)", sup_part: "TG447682-4720" },
    { model: "Tank (Top)", sup_part: "TG447682-4700" },
    { model: "Tank (Top)", sup_part: "TG447682-4670" },
    { model: "Tank (Top)", sup_part: "TG447682-4680" },
    { model: "Tank (Top)", sup_part: "TG447682-4650" },
    { model: "Tank (Top)", sup_part: "TG447682-4630" },
    { model: "Tank (Top)", sup_part: "TG447682-4620" },
    { model: "Header (Btm)", sup_part: "TG447683-7010" },
    { model: "Header (Btm)", sup_part: "TG447683-7000" },
    { model: "Header (Btm)", sup_part: "TG447683-6990" },
    { model: "Header (Btm)", sup_part: "TG447683-6980" },
    { model: "Header (Btm)", sup_part: "TG447683-6970" },
    { model: "Header (Btm)", sup_part: "TG447683-6960" },
    { model: "Header (Btm)", sup_part: "TG447683-6940" },
    { model: "Header (Btm)", sup_part: "TG447683-6930" },
    { model: "Header (Btm)", sup_part: "TG447683-6920" },
    { model: "Header (Btm)", sup_part: "TG447683-6900" },
    { model: "Header (Btm)", sup_part: "TG447683-6440" },
    { model: "Header (Btm)", sup_part: "TG447683-6430" },
    { model: "Header (Btm)", sup_part: "TG447683-6420" },
    { model: "Header (Btm)", sup_part: "TG447683-6410" },
    { model: "Header (Btm)", sup_part: "TG447683-6400" },
    { model: "Header (Btm)", sup_part: "TG447683-6390" },
    { model: "Header (Btm)", sup_part: "TG447683-6370" },
    { model: "Header (Btm)", sup_part: "TG447683-6360" },
    { model: "Header (Btm)", sup_part: "TG447683-6350" },
    { model: "Header (Btm)", sup_part: "TG447683-6320" },
    { model: "Header (Btm)", sup_part: "TG447683-6310" },
    { model: "Header (Top)", sup_part: "TG447683-5870" },
    { model: "Header (Top)", sup_part: "TG447683-6790" },
    { model: "Header (Top)", sup_part: "TG447683-6730" },
    { model: "Header (Top)", sup_part: "TG447683-6740" },
    { model: "Header (Top)", sup_part: "TG447683-6690" },
    { model: "Header (Top)", sup_part: "TG447683-6650" },
    { model: "Header (Top)", sup_part: "TG447683-6630" },
    { model: "Header (Top)", sup_part: "TG447683-6590" },
    { model: "Header (Top)", sup_part: "TG447683-6570" },
    { model: "Header (Top)", sup_part: "TG447683-6560" },
    { model: "Header (Top)", sup_part: "TG447683-6550" },
    { model: "Header (Top)", sup_part: "TG447683-6540" },
    { model: "Header (Top)", sup_part: "TG447683-6510" },
    { model: "Header (Top)", sup_part: "TG447683-6240" },
    { model: "Header (Top)", sup_part: "TG447683-6220" },
    { model: "Header (Top)", sup_part: "TG447683-6130" },
    { model: "Header (Top)", sup_part: "TG447683-6120" },
    { model: "Header (Top)", sup_part: "TG447683-6100" },
    { model: "Header (Top)", sup_part: "TG447683-6090" },
    { model: "Header (Top)", sup_part: "TG447683-6070" },
    { model: "Header (Top)", sup_part: "TG447683-6060" },
    { model: "Header (Top)", sup_part: "TG447683-6050" },
    { model: "Header (Top)", sup_part: "TG447683-6010" },
    { model: "Header (Top)", sup_part: "TG447683-5990" },
    { model: "Header (Top)", sup_part: "TG447683-5960" },
    { model: "Header (Top)", sup_part: "TG447683-5940" },
    { model: "Cup (Upper)", sup_part: "TG447686-1940" },
    { model: "Cup (Upper)", sup_part: "TG447686-1830" },
    { model: "Cup (Upper)", sup_part: "TG447686-1770" },
    { model: "Cup (Upper)", sup_part: "TG447686-1630" },
    { model: "Cup (Upper)", sup_part: "TG447686-1180" },
    { model: "Cup (Upper)", sup_part: "TG447686-0901" },
    { model: "Cup (Upper)", sup_part: "TG447686-0702" },
    { model: "Cup (Upper)", sup_part: "TG447686-0681" },
    { model: "Cup (Upper)", sup_part: "TG447686-0621" },
    { model: "Cup (Upper)", sup_part: "TG447686-0601" },
    { model: "Cup (Upper)", sup_part: "TG447686-0281" },
    { model: "Cup (Upper)", sup_part: "TG447686-0261" },
    { model: "Cup (Lower)", sup_part: "TG447686-1930" },
    { model: "Cup (Lower)", sup_part: "TG447686-1820" },
    { model: "Cup (Lower)", sup_part: "TG447686-1760" },
    { model: "Cup (Lower)", sup_part: "TG447686-1620" },
    { model: "Cup (Lower)", sup_part: "TG447686-1170" },
    { model: "Cup (Lower)", sup_part: "TG447686-0892" },
    { model: "Cup (Lower)", sup_part: "TG447686-0692" },
    { model: "Cup (Lower)", sup_part: "TG447686-0671" },
    { model: "Cup (Lower)", sup_part: "TG447686-0611" },
    { model: "Cup (Lower)", sup_part: "TG447686-0591" },
    { model: "Cup (Lower)", sup_part: "TG447686-0271" },
    { model: "Cup (Lower)", sup_part: "TG447686-0251" },
    { model: "Side P (Btm)", sup_part: "TG447681-1400" },
    { model: "Side P (Btm)", sup_part: "TG447681-1390" },
    { model: "Side P (Btm)", sup_part: "TG447681-1380" },
    { model: "Side P (Btm)", sup_part: "TG447681-1370" },
    { model: "Side P (Btm)", sup_part: "TG447681-1360" },
    { model: "Side P (Btm)", sup_part: "TG447681-1350" },
    { model: "Side P (Btm)", sup_part: "TG447681-1340" },
    { model: "Side P (Btm)", sup_part: "TG447681-1330" },
    { model: "Side P (Btm)", sup_part: "TG447681-1310" },
    { model: "Side P (Btm)", sup_part: "TG447681-1300" },
    { model: "Side P (Btm)", sup_part: "TG447681-1290" },
    { model: "Side P (Top)", sup_part: "TG447681-2930" },
    { model: "Side P (Top)", sup_part: "TG447681-2700" },
    { model: "Side P (Top)", sup_part: "TG447681-2110" },
    { model: "Side P (Top)", sup_part: "TG447681-2040" },
    { model: "Side P (Top)", sup_part: "TG447681-2010" },
    { model: "Side P (Top)", sup_part: "TG447681-1980" },
    { model: "Side P (Top)", sup_part: "TG447681-1870" },
    { model: "Side P (Top)", sup_part: "TG447681-1740" },
    { model: "Side P (Top)", sup_part: "TG447681-1720" },
    { model: "Side P (Top)", sup_part: "TG447681-1710" },
    { model: "Side P (Top)", sup_part: "TG447681-1700" },
    { model: "Side P (Top)", sup_part: "TG447681-1660" },
    { model: "Side P (Top)", sup_part: "TG447681-1650" },
    { model: "Side P (Top)", sup_part: "TG447681-1640" },
    { model: "Side P (Top)", sup_part: "TG447681-1620" },
    { model: "Side P (Top)", sup_part: "TG447681-1600" },
    { model: "Side P (Top)", sup_part: "TG447681-1590" },
    { model: "Side P (Top)", sup_part: "TG447681-1580" },
    { model: "Side P (Top)", sup_part: "TG447681-1540" },
    { model: "Side P (Top)", sup_part: "TG447681-1530" },
    { model: "Side P (Top)", sup_part: "TG447681-1520" },
    { model: "Side P (Top)", sup_part: "TG447681-1490" },
    { model: "Side P (Top)", sup_part: "TG447681-1480" },
    { model: "Side P (Top)", sup_part: "TG447681-1470" },
    { model: "Side P (Top)", sup_part: "TG447681-1450" },
    { model: "Side P (Top)", sup_part: "TG447681-1420" },
    { model: "Side P (Top)", sup_part: "TG447681-1410" },
    { model: "Tube", sup_part: "TG447670-0230" },
    { model: "Tube", sup_part: "TG447670-0111" },
    { model: "Tube", sup_part: "TG447670-0101" },
    { model: "Tube", sup_part: "TG447670-0090" },
    { model: "Tube", sup_part: "TG447670-0080" },
    { model: "Tube", sup_part: "TG447670-0070" },
    { model: "Tube", sup_part: "TG447670-0060" },
    { model: "Tube", sup_part: "TG447670-0050" },
    { model: "Tube", sup_part: "TG447670-0040" },
    { model: "Tube", sup_part: "TG447670-0021" },
    { model: "Tube", sup_part: "TG447670-0010" },
    { model: "Fin", sup_part: "TG447673-3500" },
    { model: "Fin", sup_part: "TG447673-2330" },
    { model: "Fin", sup_part: "TG447673-2310" },
    { model: "Fin", sup_part: "TG447673-2290" },
    { model: "Fin", sup_part: "TG447673-2280" },
    { model: "Fin", sup_part: "TG447673-2270" },
    { model: "Fin", sup_part: "TG447673-2260" },
    { model: "Fin", sup_part: "TG447673-2250" },
    { model: "Fin", sup_part: "TG447673-2240" },
    { model: "Fin", sup_part: "TG447673-2210" },
    { model: "Fin", sup_part: "TG447673-2200" },
    { model: "Fin", sup_part: "TG447673-2160" },
    { model: "Fin", sup_part: "TG447673-1680" },
    { model: "Fin", sup_part: "TG447673-1610" },
    { model: "Fin", sup_part: "TG447673-1490" },
    { model: "Fin", sup_part: "TG447673-1480" },
    { model: "Fin", sup_part: "TG447673-1410" },
    { model: "Fin", sup_part: "TG447673-1400" },
    { model: "Fin", sup_part: "TG447673-1390" },
    { model: "Fin", sup_part: "TG447673-1380" },
    { model: "Fin", sup_part: "TG447673-1370" },
    { model: "Fin", sup_part: "TG447673-1150" }
];
// Add Record T ^T
let htmlContent = '';

function openAddModal() {
    for (let i = 0; i <= partNumbers.length-1; i++) {
        const matchedModel = models.find(item => item.sup_part === partNumbers[i]);
 
        let placeholderText = partNumbers[i];
        console.log(matchedModel);
        if (matchedModel) { 
            placeholderText += ` - ${matchedModel.model}`;
        }
        htmlContent += `
            <input id="part_${i}" class="swal2-input item" placeholder="${placeholderText}">
        `;
    }

    Swal.fire({
        title: 'Add New Record',
        html: `
            <hr>
            <div class="container">
                ${htmlContent}
            </div>
        `,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        focusConfirm: false,
        customClass: {
            popup: 'custom-modal-bg'
        },
        preConfirm: () => {
            const parts = {};
            for (let i = 0; i < partNumbers.length; i++) {
                const partValue = Swal.getPopup().querySelector(`#part_${i}`)?.value;
                parts[`part_${i}`] = partValue || null;
            }
            
            if (Object.values(parts).every(value => value === null)) {
                Swal.showValidationMessage('Please fill in at least one part field');
                return false; 
            }
        
            console.log(parts);
            return { parts };
        }
        
    }).then(result => {
        if (result.isConfirmed) {
            const { parts } = result.value;
            console.log('Sending parts:', JSON.stringify({ ...parts }));
            fetch('/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parts })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add record');
                }
                return response.json();
            })
            .then(() => {
                Swal.fire('Success!', 'Record added successfully!', 'success');
                location.reload();
            })
            .catch(error => {
                Swal.showValidationMessage(`Error: ${error.message}`);
            });
        }
    });
}



function openEditModal(id, item) {
    let inputsHtml = '';
    console.log(item)
    Object.keys(item).forEach(key => {
        const value = item[key] !== null ? item[key] : '';
        inputsHtml += `
            <div class="input-group">
                <label for="${key}" class="swal2-label">${key}</label>
                <input id="${key}" class="swal2-input item" value="${value}" />      
            </div>
        `;
    });

    Swal.fire({
        title: 'Edit Record',
        html: `
            <hr>
            ${inputsHtml}
        `,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        focusConfirm: false,
        customClass: {
            popup: 'custom-modal-bg'
        },
        preConfirm: () => {
            const updatedData = {};
            Object.keys(item).forEach(key => {
                updatedData[key] = Swal.getPopup().querySelector(`#${key}`).value;
            });

            // if (Object.values(updatedData).some(val => !val)) {
            //     Swal.showValidationMessage('Please enter all fields');
            //     return false;
            // }

            return fetch(`/edit/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update record');
                }
                return response.json();
            })
            .then(() => {
                Swal.fire('Success!', 'Record updated successfully!', 'success');
                location.reload();
            })
            .catch(error => {
                Swal.showValidationMessage(`Error: ${error.message}`);
            });
        }
    });
}




// Delete Record T ^T
function deleteRecord(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/delete/${id}`, {
                method: 'POST'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete record');
                }
                return response.json();
            })
            .then(() => {
                Swal.fire('Deleted!', 'Record has been deleted.', 'success');
            })
            .then(() => {
                location.reload();
            })
            .catch(error => {
                Swal.fire('Error!', `Error: ${error.message}`, 'error');
            });
        }
    });
}

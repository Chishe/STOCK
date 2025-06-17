async function fetchDataAndUpdateTable() {
    try {
        const response = await fetch('http://192.168.1.100:3000/get-data-matching-3');
        const data = await response.json();

        if (data.success && Array.isArray(data.records)) {
            const tableBody = document.querySelector('#data-table tbody');
            tableBody.innerHTML = '';

            data.records.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id || ''}</td>
                    <td>${item.core_id || ''}</td>
                    <td>${item.line || ''}</td>
                    <td>${item.model_replaced || ''}</td>
                    <td>${item.part_no_core || ''}</td>
                    <td>${item.tank_btm || ''}</td>
                    <td>${item.tank_top || ''}</td>
                    <td>${item.header_btm || ''}</td>
                    <td>${item.header_top || ''}</td>
                    <td>${item.block_joint || ''}</td>
                    <td>${item.cup_upper || ''}</td>
                    <td>${item.cup_lower || ''}</td>
                    <td>${item.cap || ''}</td>
                    <td>${item.separator_1 || ''}</td>
                    <td>${item.separator_2 || ''}</td>
                    <td>${item.separator_3 || ''}</td>
                    <td>${item.separator_4 || ''}</td>
                    <td>${item.separator_5 || ''}</td>
                    <td>${item.separator_6 || ''}</td>
                    <td>${item.separator_7 || ''}</td>
                    
                    <td>${item.side_p_btm || ''}</td>
                    <td>${item.side_p_top || ''}</td>
                    <td>${item.tube || ''}</td>
                    <td>${item.stock || ''}</td>
                    <td>${item.press_qty_part_lot || ''}</td>
                    <td>${item.center_repack_lot || ''}</td>
                    <td>${item.kanban_before_brazing_lot || ''}</td>
                    <td>${item.kanban_bz_he_cam_sft_final_lot || ''}</td>
                    <td>${item.box_fg_kanban || ''}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            alert('No data or error fetching data');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

setInterval(fetchDataAndUpdateTable, 1000);

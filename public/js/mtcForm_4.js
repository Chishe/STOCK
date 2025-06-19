document.addEventListener('DOMContentLoaded', () => {
    async function fetchAndUpdateData() {
        try {

            document.getElementById('tank_btm').disabled = true;
            document.getElementById('tank_top').disabled = true;
            document.getElementById('header_btm').disabled = true;
            document.getElementById('header_top').disabled = true;

            const response = await fetch('http://192.168.100.100:1880/api/get-data-auto-4');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            document.getElementById('tank_btm').value = data.tank_btm;
            document.getElementById('tank_top').value = data.tank_top;
            document.getElementById('header_btm').value = data.header_btm;
            document.getElementById('header_top').value = data.header_top;

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    async function submitData(event) {
        event.preventDefault();

        const formData = new FormData(document.getElementById('dataForm'));
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('http://192.168.100.100:1880/api/submit-data-4', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error submitting data');
            }
            console.log("Data submitted successfully");

        } catch (error) {
            console.error("Error submitting data:", error);
        }
    }

    document.getElementById('insertform').addEventListener('submit', submitData);


    setInterval(fetchAndUpdateData, 1000);
});
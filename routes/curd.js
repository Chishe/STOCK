const express = require('express');
const router = express.Router();

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

module.exports = (pool) => {
    router.post("/add", async (req, res) => {
        const parts = req.body.parts;
        console.log("Received parts:", parts);
      
        if (!parts || Object.keys(parts).length === 0) {
          return res.status(400).json({ message: "Parts data is missing" });
        }
      
        try {
            const columns = [];
            const values = [];
          
            for (let i = 0; i < partNumbers.length; i++) {
              const partValue = parts[`part_${i}`];
              
              if (partValue !== null) {
                const columnName = partNumbers[i];
                columns.push(columnName);              
                values.push(partValue);           
              }
            }
          
            if (columns.length === 0) {
              return res.status(400).json({ message: "No valid parts to insert" });
            }
          
            const columnList = columns.join(", ");
            const valuePlaceholders = columns.map((_, index) => `$${index + 1}`).join(", ");
          
            const query = `
              INSERT INTO master_data (${columnList}) 
              VALUES (${valuePlaceholders})
            `;
          
            console.log("Executing query:", query, values);
            await pool.query(query, values);
          
            res.status(201).json({ message: "Record added successfully" });
          } catch (error) {
            console.error("Database insert error:", error);
            res.status(500).json({ message: "Internal Server Error" });
          }
      }); 
    

      router.post('/edit/:id', async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        
        try {
            const columns = Object.keys(updatedData);
            const setQuery = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');
    
            const query = `
                UPDATE master_data
                SET ${setQuery}
                WHERE id = $${columns.length + 1}
                RETURNING *;
            `;
    
            const values = [...Object.values(updatedData), id]; 
            const result = await pool.query(query, values);
    
            if (result.rowCount > 0) {
                res.json({ success: true, message: 'Record updated successfully', data: result.rows[0] });
            } else {
                res.status(404).json({ success: false, message: 'Record not found' });
            }
        } catch (error) {
            console.error('Error updating record:', error);
            res.status(500).json({ success: false, message: 'Error updating record' });
        }
    });
    
    
    

    router.post('/delete/:id', async (req, res) => {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM master_data WHERE id = $1', [id]);
            res.status(200).json({ message: 'Record deleted successfully' });
        } catch (error) {
            console.error('Database delete error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    return router;
};

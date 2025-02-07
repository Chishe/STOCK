const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "data_auto_core",
  password: "254327",
  port: 5432,
});

const indexRoutes = require("./routes/index");
const settingRoutes = require("./routes/setting");
const curdRoutes = require("./routes/curd")(pool);
const stockRoutes = require("./routes/stock");
const { log } = require("console");

app.use("/", indexRoutes);
app.use("/setting", settingRoutes);
app.use("/", curdRoutes);
app.use("/", stockRoutes);

app.get("/", (req, res) => {
  res.redirect("/setting");
});

app.get("/api/stock", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.stock_data_1 ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/getStockData", async (req, res) => {
  const { coreNumber, volume } = req.body;

  try {
    const dbMasterQuery = `SELECT * FROM db_master WHERE part_no = $1`;
    const dbMasterResult = await pool.query(dbMasterQuery, [coreNumber]);

    if (dbMasterResult.rows.length === 0) {
      return res.json({
        success: false,
        message: "ไม่พบ core part number ใน db_master",
      });
    }

    const row = dbMasterResult.rows[0];

    const colvalue = Object.keys(row)
      .filter(
        (col) =>
          row[col] !== null &&
          col !== "part_no" &&
          col !== "id" &&
          col !== "model"
      )
      .map((col) => ({
        name: col.replace(/_/g, "-").toUpperCase(),
        value: row[col] * volume,
      }));
    // console.log("T ^T:", colvalue);
    const columns = Object.keys(row).filter(
      (col) => row[col] !== null && col !== "part_no"
    );

    const filteredColumns = columns
      .filter((col) => col !== "id" && col !== "model")
      .map((col) => col.replace(/_/g, "-").toUpperCase());

    // console.log("Filtered Columns:", filteredColumns);

    if (filteredColumns.length === 0) {
      return res.json({
        success: false,
        message: "ไม่มีคอลัมน์ที่เกี่ยวข้องใน db_master",
      });
    }

    const stockQuery = `
      SELECT part_no, quantity
      FROM public.stock_data_1
      WHERE part_no = ANY($1::text[])
    `;
    const stockResult = await pool.query(stockQuery, [filteredColumns]);

    if (stockResult.rows.length === 0) {
      return res.json({
        success: false,
        message: "ไม่พบข้อมูลใน stock_data_1",
      });
    }

    const stockQuery2 = `
      SELECT part_no, quantity
      FROM public.stock_data_2
      WHERE part_no = ANY($1::text[])
    `;
    const stockResult2 = await pool.query(stockQuery2, [filteredColumns]);

    if (stockResult2.rows.length === 0) {
      return res.json({
        success: false,
        message: "ไม่พบข้อมูลใน stock_data_2",
      });
    }

    const labels = stockResult.rows.map((row) => row.part_no);
    const values = stockResult.rows.map((row) => row.quantity);

    const channels = stockResult2.rows.map((row) => row.part_no);
    const changes = stockResult2.rows.map((row) => row.quantity);

    const tableData = colvalue.map((item) => {
      const { name: partNo, value: quantity } = item;
    
      const partMatch = labels.includes(partNo) || channels.includes(partNo);
      console.log(`partMatch: ${partMatch}`);
    
      const status = !partMatch
        ? "NG"
        : values.some((value) => {
            console.log(`Comparing value: ${value} with quantity: ${quantity}`);
            return value < quantity;
          }) ||
          changes.some((change) => {
            console.log(`Comparing change: ${change} with quantity: ${quantity}`);
            return change < quantity;
          })
        ? "NG"
        : "OK";
    
      return {
        partNumber: partNo,
        status: status,
      };
    });
    
    console.log(tableData);

    res.json({
      success: true,
      labels: stockResult.rows.map((row) => row.part_no),
      values: stockResult.rows.map((row) => row.quantity),
      channels: stockResult2.rows.map((row) => row.part_no),
      changes: stockResult2.rows.map((row) => row.quantity),
      tableData: tableData,
    });

  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูล",
      error: error.message,
    });
  }
});

app.get('/api/getMain1', async (req, res) => {
  try {
    const result = await pool.query('SELECT part_no, quantity FROM stock_data_1');
    
    const data = {
      part_no: result.rows.map(row => row.part_no),
      quantity: result.rows.map(row => row.quantity),
    };

    res.json(data);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/getMain2', async (req, res) => {
  try {
    const result = await pool.query('SELECT part_no, quantity FROM stock_data_1');
    
    const data = {
      part_no: result.rows.map(row => row.part_no),
      quantity: result.rows.map(row => row.quantity),
    };

    res.json(data);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/getPresspart', async (req, res) => {
  try {
    const result = await pool.query('SELECT part_no, quantity FROM stock_data_1');
    
    const data = {
      ppLb: result.rows.map(row => row.part_no),
      ppQty: result.rows.map(row => row.quantity),
    };

    res.json(data);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/getCenterrepack', async (req, res) => {
  try {
    const result = await pool.query('SELECT part_no, quantity FROM stock_data_2');
    
    const data = {
      ppLb: result.rows.map(row => row.part_no),
      ppQty: result.rows.map(row => row.quantity),
    };

    res.json(data);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/getCoreBRS1', async (req, res) => {
  try {
    const result = await pool.query('SELECT part_no, quantity FROM stock_data_3');
    
    const data = {
      ppLb: result.rows.map(row => row.part_no),
      ppQty: result.rows.map(row => row.quantity),
    };

    res.json(data);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/getCoreBRS4', async (req, res) => {
  try {
    const result = await pool.query('SELECT part_no, quantity FROM stock_data_4');
    
    const data = {
      ppLb: result.rows.map(row => row.part_no),
      ppQty: result.rows.map(row => row.quantity),
    };

    res.json(data);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Error fetching data');
  }
});


app.post('/api/updateStock1', async (req, res) => {
  const { part_no, quantity, type } = req.body;

  try {
    const result = await pool.query('SELECT * FROM stock_data_1 WHERE part_no = $1', [part_no]);
    
    if (result.rows.length > 0) {
      const existingQuantity = result.rows[0].quantity;

      if (type === 'IN') {
        var ext  = parseInt(existingQuantity)
        var qty  = parseInt(quantity)
        const newQuantity = ext + qty;
        await pool.query(
          'UPDATE stock_data_1 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
          [newQuantity, part_no]
        );
        res.json({ message: `Part ${part_no} updated with ${quantity} added.` });
      } else if (type === 'OUT') {
        if (existingQuantity >= quantity) {
          const newQuantity = existingQuantity - quantity;
          await pool.query(
            'UPDATE stock_data_1 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
            [newQuantity, part_no]
          );
          res.json({ message: `Part ${part_no} updated with ${quantity} subtracted.` });
        } else {
          res.status(400).json({ message: `Not enough stock to subtract for part ${part_no}.` });
        }
      }
    } else {
      if (type === 'IN') {
        await pool.query(
          'INSERT INTO stock_data_1 (part_no, quantity, type, model, timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
          [part_no, quantity, 'IN', 'ModelX'] 
        );
        res.json({ message: `Part ${part_no} added with ${quantity} quantity.` });
      } else {
        res.status(400).json({ message: `Part ${part_no} does not exist for OUT operation.` });
      }
    }
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Error updating stock' });
  }
});

app.post('/api/updateStock2', async (req, res) => {
  const { part_no, quantity, type } = req.body;

  try {
    const result = await pool.query('SELECT * FROM stock_data_2 WHERE part_no = $1', [part_no]);
    
    if (result.rows.length > 0) {
      const existingQuantity = result.rows[0].quantity;

      if (type === 'IN') {
        var ext  = parseInt(existingQuantity)
        var qty  = parseInt(quantity)
        const newQuantity = ext + qty;
        await pool.query(
          'UPDATE stock_data_2 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
          [newQuantity, part_no]
        );
        res.json({ message: `Part ${part_no} updated with ${quantity} added.` });
      } else if (type === 'OUT') {
        if (existingQuantity >= quantity) {
          const newQuantity = existingQuantity - quantity;
          await pool.query(
            'UPDATE stock_data_2 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
            [newQuantity, part_no]
          );
          res.json({ message: `Part ${part_no} updated with ${quantity} subtracted.` });
        } else {
          res.status(400).json({ message: `Not enough stock to subtract for part ${part_no}.` });
        }
      }
    } else {
      if (type === 'IN') {
        await pool.query(
          'INSERT INTO stock_data_2 (part_no, quantity, type, model, timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
          [part_no, quantity, 'IN', 'ModelX'] 
        );
        res.json({ message: `Part ${part_no} added with ${quantity} quantity.` });
      } else {
        res.status(400).json({ message: `Part ${part_no} does not exist for OUT operation.` });
      }
    }
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Error updating stock' });
  }
});


app.post('/api/updateStock3', async (req, res) => {
  const { part_no, quantity, type } = req.body;

  try {
    const result = await pool.query('SELECT * FROM stock_data_3 WHERE part_no = $1', [part_no]);
    
    if (result.rows.length > 0) {
      const existingQuantity = result.rows[0].quantity;

      if (type === 'IN') {
        var ext  = parseInt(existingQuantity)
        var qty  = parseInt(quantity)
        const newQuantity = ext + qty;
        await pool.query(
          'UPDATE stock_data_3 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
          [newQuantity, part_no]
        );
        res.json({ message: `Part ${part_no} updated with ${quantity} added.` });
      } else if (type === 'OUT') {
        if (existingQuantity >= quantity) {
          const newQuantity = existingQuantity - quantity;
          await pool.query(
            'UPDATE stock_data_3 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
            [newQuantity, part_no]
          );
          res.json({ message: `Part ${part_no} updated with ${quantity} subtracted.` });
        } else {
          res.status(400).json({ message: `Not enough stock to subtract for part ${part_no}.` });
        }
      }
    } else {
      if (type === 'IN') {
        await pool.query(
          'INSERT INTO stock_data_3 (part_no, quantity, type, model, timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
          [part_no, quantity, 'IN', 'ModelX'] 
        );
        res.json({ message: `Part ${part_no} added with ${quantity} quantity.` });
      } else {
        res.status(400).json({ message: `Part ${part_no} does not exist for OUT operation.` });
      }
    }
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Error updating stock' });
  }
});


app.post('/api/updateStock4', async (req, res) => {
  const { part_no, quantity, type } = req.body;

  try {
    const result = await pool.query('SELECT * FROM stock_data_4 WHERE part_no = $1', [part_no]);
    
    if (result.rows.length > 0) {
      const existingQuantity = result.rows[0].quantity;

      if (type === 'IN') {
        var ext  = parseInt(existingQuantity)
        var qty  = parseInt(quantity)
        const newQuantity = ext + qty;
        await pool.query(
          'UPDATE stock_data_4 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
          [newQuantity, part_no]
        );
        res.json({ message: `Part ${part_no} updated with ${quantity} added.` });
      } else if (type === 'OUT') {
        if (existingQuantity >= quantity) {
          const newQuantity = existingQuantity - quantity;
          await pool.query(
            'UPDATE stock_data_4 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
            [newQuantity, part_no]
          );
          res.json({ message: `Part ${part_no} updated with ${quantity} subtracted.` });
        } else {
          res.status(400).json({ message: `Not enough stock to subtract for part ${part_no}.` });
        }
      }
    } else {
      if (type === 'IN') {
        await pool.query(
          'INSERT INTO stock_data_3 (part_no, quantity, type, model, timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
          [part_no, quantity, 'IN', 'ModelX'] 
        );
        res.json({ message: `Part ${part_no} added with ${quantity} quantity.` });
      } else {
        res.status(400).json({ message: `Part ${part_no} does not exist for OUT operation.` });
      }
    }
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Error updating stock' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.1.103:${PORT}`);
});

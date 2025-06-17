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
  database: "postgres",
  password: "aniwat2561",
  port: 5432,
});

const indexRoutes = require("./routes/index");
const stockRoutes = require("./routes/stock");
const { log } = require("console");
app.use("/", indexRoutes);
app.use("/", stockRoutes);
global.db = pool;

app.post('/api/insert-row-matching', async (req, res) => {
  console.log("Received Data:", req.body);

  const { tank_btm, tank_top, header_btm, header_top, core_id, model, corenumber } = req.body;

  const insertQuery = `
      INSERT INTO matching (
          core_id, 
          model, 
          part_no_core, 
          block_joint, 
          cup_upper, 
          cup_lower, 
          cap, 
          separator_1, 
          separator_2, 
          separator_3, 
          separator_4, 
          separator_5, 
          separator_6, 
          separator_7, 
          tank_btm, 
          tank_top, 
          header_btm, 
          header_top, 
          side_p_btm, 
          side_p_top, 
          tube, 
          stock, 
          press_qty_part_lot, 
          center_repack_lot, 
          kanban_before_brazing_lot, 
          kanban_bz_he_cam_sft_final_lot, 
          box_fg_kanban,
          datetime
      ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
          $11, $12, $13, $14, $15, $16, $17, $18, $19, 
          $20, $21, $22, $23, $24, $25, $26, $27,CURRENT_TIMESTAMP
      )
  `;

  try {
    await pool.query(insertQuery, [
      core_id, // core_id
      model, // model
      corenumber, // part_no_core
      null, // block_joint
      null, // cup_upper
      null, // cup_lower
      null, // cap
      null, // separator_1
      null, // separator_2
      null, // separator_3
      null, // separator_4
      null, // separator_5
      null, // separator_6
      null, // separator_7
      tank_btm,
      tank_top,
      header_btm,
      header_top,
      null, // side_p_btm
      null, // side_p_top
      null, // tube
      null, // stock
      null, // press_qty_part_lot
      null, // center_repack_lot
      null, // kanban_before_brazing_lot
      null, // kanban_bz_he_cam_sft_final_lot
      null  // box_fg_kanban
    ]);

    res.json({ success: true });

  } catch (error) {
    console.error("Error during insertion:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/search1', async (req, res) => {
  const { date, start_time, end_time } = req.query;
  console.log(date, start_time, end_time);

  try {
    let query = 'SELECT * FROM log_data_stock_1 WHERE timestamp::date = $1';
    let values = [date];

    if (start_time && end_time) {
      query += ' AND timestamp::time BETWEEN $2 AND $3';
      values.push(start_time, end_time);
    }

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ message: 'An error occurred while searching data.' });
  }
});

app.put('/api/edit1/:id', async (req, res) => {
  const { id } = req.params;
  const { part_no, qty } = req.body;

  try {
    const result = await db.query('UPDATE log_data_stock_1 SET id_part_no_1 = $1, quantity = $2 WHERE id = $3', [part_no, qty, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json({ message: 'Part updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating part' });
  }
});

app.delete('/delete1/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM log_data_stock_1 WHERE id = $1', [id]);
    res.json({ message: 'Part deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting part' });
  }
});

app.delete('/delete-all1', async (req, res) => {
  try {
    await db.query('DELETE FROM log_data_stock_1;');
    res.json({ message: 'All parts deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting all parts.' });
  }
});

app.delete('/delete-all2', async (req, res) => {
  try {
    await db.query('DELETE FROM log_data_stock_2;');
    res.json({ message: 'All parts deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting all parts.' });
  }
});

app.get('/search2', async (req, res) => {
  const { date, start_time, end_time } = req.query;
  console.log(date, start_time, end_time);

  try {
    let query = 'SELECT * FROM log_data_stock_2 WHERE timestamp::date = $1';
    let values = [date];

    if (start_time && end_time) {
      query += ' AND timestamp::time BETWEEN $2 AND $3';
      values.push(start_time, end_time);
    }

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ message: 'An error occurred while searching data.' });
  }
});

app.put('/api/edit2/:id', async (req, res) => {
  const { id } = req.params;
  const { part_no, qty } = req.body;

  try {
    const result = await db.query('UPDATE log_data_stock_2 SET id_part_no_2 = $1, quantity = $2 WHERE id = $3', [part_no, qty, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json({ message: 'Part updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating part' });
  }
});

app.delete('/delete2/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM log_data_stock_2 WHERE id = $1', [id]);
    res.json({ message: 'Part deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting part' });
  }
});

app.delete('/delete2/all', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM log_data_stock_2');
    if (result.rowCount > 0) {
      res.json({ message: `${result.rowCount} parts have been deleted.` });
    } else {
      res.status(404).json({ message: 'No parts found to delete.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  } finally {
    client.release();
  }
});

app.get('/search3', async (req, res) => {
  const { date, start_time, end_time, coreId } = req.query;
  console.log("Received params:", { date, start_time, end_time, coreId });

  try {
    let query = `
    SELECT 
      l.*,
      m.block_joint,
      m.cup_upper,
      m.cup_lower,
      m.cap,
      m.separator_1,
      m.separator_2,
      m.separator_3,
      m.separator_4,
      m.separator_5,
      m.separator_6,
      m.separator_7,
      m.tank_btm,
      m.tank_top,
      m.header_btm,
      m.header_top,
      m.side_p_btm,
      m.side_p_top,
      m.tube
    FROM log_data_stock_3 l
    LEFT JOIN matching m ON l.id_part_no_3 = m.core_id
    WHERE 1=1`;

    let values = [];

    if (date) {
      query += ` AND l.timestamp::date = $1`;
      values.push(date);
    }

    if (coreId) {
      query += ` AND l.part_no LIKE $${values.length + 1}`;
      values.push(`%${coreId}%`);
    }

    if (start_time && end_time) {
      const adjustedEndTime = end_time.includes(':') ? `${end_time}:59` : end_time;
      query += ` AND l.timestamp::time BETWEEN $${values.length + 1} AND $${values.length + 2}`;
      values.push(start_time, adjustedEndTime);
    }

    query += ` ORDER BY l.id DESC LIMIT 100`;


    console.log("Executing query:", query);
    console.log("With values:", values);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.log("No data found for the given criteria.");
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing search:", error);
    res.status(500).json({ error: "Database query error" });
  }
});





app.put('/api/edit3/:id', async (req, res) => {
  const { id } = req.params;
  const { part_no, qty } = req.body;

  try {
    const result = await db.query('UPDATE log_data_stock_3 SET part_no = $1, quantity = $2 WHERE id = $3', [part_no, qty, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json({ message: 'Part updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating part' });
  }
});

app.delete('/delete3/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM log_data_stock_3 WHERE id = $1', [id]);
    res.json({ message: 'Part deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting part' });
  }
});

app.delete('/delete3/all', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM log_data_stock_3');
    if (result.rowCount > 0) {
      res.json({ message: `${result.rowCount} parts have been deleted.` });
    } else {
      res.status(404).json({ message: 'No parts found to delete.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  } finally {
    client.release();
  }
});

app.get('/search4', async (req, res) => {
  const { date, start_time, end_time, coreId } = req.query;
  console.log("Received params:", { date, start_time, end_time, coreId });

  try {
    let query = `
    SELECT 
      l.*,
      m.block_joint,
      m.cup_upper,
      m.cup_lower,
      m.cap,
      m.separator_1,
      m.separator_2,
      m.separator_3,
      m.separator_4,
      m.separator_5,
      m.separator_6,
      m.separator_7,
      m.tank_btm,
      m.tank_top,
      m.header_btm,
      m.header_top,
      m.side_p_btm,
      m.side_p_top,
      m.tube
    FROM log_data_stock_4 l
    LEFT JOIN matching m ON l.id_part_no_4 = m.core_id
    WHERE 1=1`;

    let values = [];

    if (date) {
      query += ` AND l.timestamp::date = $1`;
      values.push(date);
    }

    if (coreId) {
      query += ` AND l.part_no LIKE $${values.length + 1}`;
      values.push(`%${coreId}%`);
    }

    if (start_time && end_time) {
      const adjustedEndTime = end_time.includes(':') ? `${end_time}:59` : end_time;
      query += ` AND l.timestamp::time BETWEEN $${values.length + 1} AND $${values.length + 2}`;
      values.push(start_time, adjustedEndTime);
    }

    query += ` ORDER BY l.id DESC LIMIT 100`;


    console.log("Executing query:", query);
    console.log("With values:", values);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.log("No data found for the given criteria.");
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing search:", error);
    res.status(500).json({ error: "Database query error" });
  }
});


app.put('/api/edit4/:id', async (req, res) => {
  const { id } = req.params;
  const { part_no, qty } = req.body;

  try {
    const result = await db.query('UPDATE log_data_stock_4 SET part_no = $1, quantity = $2 WHERE id = $3', [part_no, qty, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json({ message: 'Part updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating part' });
  }
});

app.delete('/delete4/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM log_data_stock_4 WHERE id = $1', [id]);
    res.json({ message: 'Part deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting part' });
  }
});

app.delete('/delete4/all', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM log_data_stock_4');
    if (result.rowCount > 0) {
      res.json({ message: `${result.rowCount} parts have been deleted.` });
    } else {
      res.status(404).json({ message: 'No parts found to delete.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  } finally {
    client.release();
  }
});

app.get('/search5', async (req, res) => {
  const { date, start_time, end_time, coreId } = req.query;
  console.log(date, start_time, end_time, coreId);

  try {
    let query = 'SELECT * FROM stock_data_5 WHERE timestamp::date = $1 AND part_no LIKE $2';
    let values = [date, `%${coreId}%`];

    if (start_time && end_time) {
      query += ' AND timestamp::time BETWEEN $3 AND $4';
      values.push(start_time, end_time);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);

  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ message: 'An error occurred while searching data.' });
  }
});


app.put('/api/edit5/:id', async (req, res) => {
  const { id } = req.params;
  const { part_no, qty } = req.body;

  try {
    const result = await db.query('UPDATE stock_data_5 SET part_no = $1, quantity = $2 WHERE id = $3', [part_no, qty, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json({ message: 'Part updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating part' });
  }
});

app.delete('/delete5/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM stock_data_5 WHERE id = $1', [id]);
    res.json({ message: 'Part deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting part' });
  }
});

app.delete('/delete5/all', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM stock_data_5');
    if (result.rowCount > 0) {
      res.json({ message: `${result.rowCount} parts have been deleted.` });
    } else {
      res.status(404).json({ message: 'No parts found to delete.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  } finally {
    client.release();
  }
});

app.get('/search6', async (req, res) => {
  const { date, start_time, end_time, coreId } = req.query;
  console.log(date, start_time, end_time, coreId);

  try {
    let query = 'SELECT * FROM stock_data_6 WHERE timestamp::date = $1 AND part_no LIKE $2';
    let values = [date, `%${coreId}%`];

    if (start_time && end_time) {
      query += ' AND timestamp::time BETWEEN $3 AND $4';
      values.push(start_time, end_time);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);

  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ message: 'An error occurred while searching data.' });
  }
});


app.put('/api/edit6/:id', async (req, res) => {
  const { id } = req.params;
  const { part_no, qty } = req.body;

  try {
    const result = await db.query('UPDATE stock_data_6 SET part_no = $1, quantity = $2 WHERE id = $3', [part_no, qty, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json({ message: 'Part updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating part' });
  }
});

app.delete('/delete6/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM stock_data_6 WHERE id = $1', [id]);
    res.json({ message: 'Part deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting part' });
  }
});

app.delete('/delete6/all', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM stock_data_6');
    if (result.rowCount > 0) {
      res.json({ message: `${result.rowCount} parts have been deleted.` });
    } else {
      res.status(404).json({ message: 'No parts found to delete.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  } finally {
    client.release();
  }
});


app.get('/get-data-matching', async (req, res) => {
  try {
    const result = await pool.query(
      `
SELECT 
    m.id,
    m.datetime,
    m.part_no_core,
    m.model,        
    COALESCE(o.model, m.model) AS model_replaced,  
    CASE 
        WHEN SUBSTRING(m.core_id FROM 14 FOR 2) = '04' THEN '4'  -- ดึงจากตำแหน่งที่ 14-15
        WHEN SUBSTRING(m.core_id FROM 14 FOR 2) = '03' THEN '3'  -- ดึงจากตำแหน่งที่ 14-15
        ELSE NULL
    END AS line,  -- เพิ่มตัวแปร line ตามค่าใน core_id
    m.*              -- แสดงทุกคอลัมน์ที่เหลือจาก m (matching)
FROM public.matching m
LEFT JOIN public.one_for_all o 
    ON SUBSTRING(m.part_no_core FROM 5) = o.core
WHERE m.datetime > CURRENT_DATE - INTERVAL '2 days'
ORDER BY m.id DESC limit 600;

      `
    );
    res.json({
      success: true,
      records: result.rows
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

app.get('/get-data-matching-1', async (req, res) => {
  try {
    const lineCode = '01'; 

    const result = await pool.query(
      `
      SELECT 
          m.id,
          m.datetime,
          m.part_no_core,
          m.model,        
          COALESCE(o.model, m.model) AS model_replaced,  
          CASE SUBSTRING(m.core_id FROM 14 FOR 2)
              WHEN '01' THEN '1'
              WHEN '02' THEN '2'
              WHEN '03' THEN '3'
              WHEN '04' THEN '4'
              WHEN '05' THEN '5'
              WHEN '06' THEN '6'
              ELSE NULL
          END AS line, 
          m.*           
      FROM public.matching m
      LEFT JOIN public.one_for_all o 
          ON SUBSTRING(m.part_no_core FROM 5) = o.core
      WHERE m.datetime > CURRENT_DATE - INTERVAL '2 days'
        AND SUBSTRING(m.core_id FROM 14 FOR 2) = $1
      ORDER BY m.id DESC
      LIMIT 600;
      `,
      [lineCode] 
    );

    res.json({
      success: true,
      records: result.rows
    });
  } catch (error) {
    console.error("Database error in /get-data-matching-1:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

app.get('/get-data-matching-2', async (req, res) => {
  try {
    const lineCode = '02'; 

    const result = await pool.query(
      `
      SELECT 
          m.id,
          m.datetime,
          m.part_no_core,
          m.model,        
          COALESCE(o.model, m.model) AS model_replaced,  
          CASE SUBSTRING(m.core_id FROM 14 FOR 2)
              WHEN '01' THEN '1'
              WHEN '02' THEN '2'
              WHEN '03' THEN '3'
              WHEN '04' THEN '4'
              WHEN '05' THEN '5'
              WHEN '06' THEN '6'
              ELSE NULL
          END AS line, 
          m.*           
      FROM public.matching m
      LEFT JOIN public.one_for_all o 
          ON SUBSTRING(m.part_no_core FROM 5) = o.core
      WHERE m.datetime > CURRENT_DATE - INTERVAL '2 days'
        AND SUBSTRING(m.core_id FROM 14 FOR 2) = $1
      ORDER BY m.id DESC
      LIMIT 600;
      `,
      [lineCode]
    );

    res.json({
      success: true,
      records: result.rows
    });
  } catch (error) {
    console.error("Database error in /get-data-matching-1:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

app.get('/get-data-matching-3', async (req, res) => {
  try {
    const lineCode = '03'; 

    const result = await pool.query(
      `
      SELECT 
          m.id,
          m.datetime,
          m.part_no_core,
          m.model,        
          COALESCE(o.model, m.model) AS model_replaced,  
          CASE SUBSTRING(m.core_id FROM 14 FOR 2)
              WHEN '01' THEN '1'
              WHEN '02' THEN '2'
              WHEN '03' THEN '3'
              WHEN '04' THEN '4'
              WHEN '05' THEN '5'
              WHEN '06' THEN '6'
              ELSE NULL
          END AS line, 
          m.*           
      FROM public.matching m
      LEFT JOIN public.one_for_all o 
          ON SUBSTRING(m.part_no_core FROM 5) = o.core
      WHERE m.datetime > CURRENT_DATE - INTERVAL '2 days'
        AND SUBSTRING(m.core_id FROM 14 FOR 2) = $1
      ORDER BY m.id DESC
      LIMIT 600;
      `,
      [lineCode]
    );

    res.json({
      success: true,
      records: result.rows
    });
  } catch (error) {
    console.error("Database error in /get-data-matching-1:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

app.get('/get-data-matching-4', async (req, res) => {
  try {
    const lineCode = '04'; 

    const result = await pool.query(
      `
      SELECT 
          m.id,
          m.datetime,
          m.part_no_core,
          m.model,        
          COALESCE(o.model, m.model) AS model_replaced,  
          CASE SUBSTRING(m.core_id FROM 14 FOR 2)
              WHEN '01' THEN '1'
              WHEN '02' THEN '2'
              WHEN '03' THEN '3'
              WHEN '04' THEN '4'
              WHEN '05' THEN '5'
              WHEN '06' THEN '6'
              ELSE NULL
          END AS line, 
          m.*           
      FROM public.matching m
      LEFT JOIN public.one_for_all o 
          ON SUBSTRING(m.part_no_core FROM 5) = o.core
      WHERE m.datetime > CURRENT_DATE - INTERVAL '2 days'
        AND SUBSTRING(m.core_id FROM 14 FOR 2) = $1
      ORDER BY m.id DESC
      LIMIT 600;
      `,
      [lineCode]
    );

    res.json({
      success: true,
      records: result.rows
    });
  } catch (error) {
    console.error("Database error in /get-data-matching-1:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

app.get('/get-data-matching-5', async (req, res) => {
  try {
    const lineCode = '05'; 

    const result = await pool.query(
      `
      SELECT 
          m.id,
          m.datetime,
          m.part_no_core,
          m.model,        
          COALESCE(o.model, m.model) AS model_replaced,  
          CASE SUBSTRING(m.core_id FROM 14 FOR 2)
              WHEN '01' THEN '1'
              WHEN '02' THEN '2'
              WHEN '03' THEN '3'
              WHEN '04' THEN '4'
              WHEN '05' THEN '5'
              WHEN '06' THEN '6'
              ELSE NULL
          END AS line, 
          m.*           
      FROM public.matching m
      LEFT JOIN public.one_for_all o 
          ON SUBSTRING(m.part_no_core FROM 5) = o.core
      WHERE m.datetime > CURRENT_DATE - INTERVAL '2 days'
        AND SUBSTRING(m.core_id FROM 14 FOR 2) = $1
      ORDER BY m.id DESC
      LIMIT 600;
      `,
      [lineCode]
    );

    res.json({
      success: true,
      records: result.rows
    });
  } catch (error) {
    console.error("Database error in /get-data-matching-1:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

app.get('/get-data-matching-6', async (req, res) => {
  try {
    const lineCode = '06'; 

    const result = await pool.query(
      `
      SELECT 
          m.id,
          m.datetime,
          m.part_no_core,
          m.model,        
          COALESCE(o.model, m.model) AS model_replaced,  
          CASE SUBSTRING(m.core_id FROM 14 FOR 2)
              WHEN '01' THEN '1'
              WHEN '02' THEN '2'
              WHEN '03' THEN '3'
              WHEN '04' THEN '4'
              WHEN '05' THEN '5'
              WHEN '06' THEN '6'
              ELSE NULL
          END AS line, 
          m.*           
      FROM public.matching m
      LEFT JOIN public.one_for_all o 
          ON SUBSTRING(m.part_no_core FROM 5) = o.core
      WHERE m.datetime > CURRENT_DATE - INTERVAL '2 days'
        AND SUBSTRING(m.core_id FROM 14 FOR 2) = $1
      ORDER BY m.id DESC
      LIMIT 600;
      `,
      [lineCode]
    );

    res.json({
      success: true,
      records: result.rows
    });
  } catch (error) {
    console.error("Database error in /get-data-matching-1:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

app.get("/api/latest-stock-data-1", async (req, res) => {
  try {
    const result = await pool.query(`
          SELECT id, id_part_no_1, quantity, 
          TO_CHAR(timestamp, 'YYYY-MM-DD HH24:MI:SS') AS timestamp,  
          TO_CHAR(out, 'YYYY-MM-DD HH24:MI:SS') AS out
          FROM log_data_stock_1
          ORDER BY id DESC;
      `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Database query error" });
  }
});

app.get("/api/latest-stock-data-2", async (req, res) => {
  try {
    const result = await pool.query(`
          SELECT id, id_part_no_2, quantity, 
          TO_CHAR(timestamp, 'YYYY-MM-DD HH24:MI:SS') AS timestamp,  
          TO_CHAR(out, 'YYYY-MM-DD HH24:MI:SS') AS out
          FROM log_data_stock_2
          ORDER BY id DESC;
      `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Database query error" });
  }
});

app.get("/api/latest-stock-data-3", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        l.*,
        m.block_joint,
        m.cup_upper,
        m.cup_lower,
        m.cap,
        m.separator_1,
        m.separator_2,
        m.separator_3,
        m.separator_4,
        m.separator_5,
        m.separator_6,
        m.separator_7,
        m.tank_btm,
        m.tank_top,
        m.header_btm,
        m.header_top,
        m.side_p_btm,
        m.side_p_top,
        m.tube
      FROM log_data_stock_3 l
      LEFT JOIN matching m ON l.id_part_no_3 = m.core_id
      ORDER BY l.id DESC
      LIMIT 100;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Database query error" });
  }
});

app.get("/api/latest-stock-data-4", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        l.*,
        m.block_joint,
        m.cup_upper,
        m.cup_lower,
        m.cap,
        m.separator_1,
        m.separator_2,
        m.separator_3,
        m.separator_4,
        m.separator_5,
        m.separator_6,
        m.separator_7,
        m.tank_btm,
        m.tank_top,
        m.header_btm,
        m.header_top,
        m.side_p_btm,
        m.side_p_top,
        m.tube
      FROM log_data_stock_4 l
      LEFT JOIN matching m ON l.id_part_no_4 = m.core_id
      ORDER BY l.id DESC
      LIMIT 100;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Database query error" });
  }
});

app.get("/api/latest-stock-data-5", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM stock_data_5
      ORDER BY id DESC
      LIMIT 100;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Database query error" });
  }
});

app.get("/api/latest-stock-data-6", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM stock_data_6
      ORDER BY id DESC
      LIMIT 100;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Database query error" });
  }
});


app.post("/get-data", async (req, res) => {
  const { coreNumber, volume, subnumber, subvolumn } = req.body;

  if (!coreNumber || !volume || !subnumber || !subvolumn) {
    return res.json({ success: false, message: "ข้อมูลไม่ครบถ้วน" });
  }

  try {
    const dbMasterQuery = `SELECT * FROM db_master WHERE part_no = $1`;
    const dbMasterResult = await pool.query(dbMasterQuery, [coreNumber]);

    console.log("Database query result:", dbMasterResult.rows);

    if (dbMasterResult.rows.length === 0) {
      return res.json({ success: false, message: "ไม่พบ core part number ใน db_master" });
    }

    const row = dbMasterResult.rows[0];

    const colvalue = Object.keys(row)
      .filter(col => row[col] !== null && !["part_no", "id", "model"].includes(col))
      .map(col => ({
        name: col.replace(/_/g, "-").toUpperCase(),
        value: row[col] * volume
      }));

    console.log("Processed colvalue:", colvalue);

    const matchedPart = colvalue.find(item => item.name === subnumber.toUpperCase());

    if (!matchedPart) {
      return res.json({ success: false, message: "ไม่พบ subnumber ใน colvalue" });
    }


    const status = subvolumn >= matchedPart.value ? "Enough" : "Not Enough";


    const statusColor = status === "Enough" ? "background-color: green; color: white;" : "background-color: red; color: white;";

    const tableHtml = `
      <table border="1">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          ${colvalue.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.value}</td>
              <td style="${item.name === subnumber.toUpperCase() ? statusColor : ''}">
                ${item.name === subnumber.toUpperCase() ? status : "-"}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;


    return res.json({ success: true, table: tableHtml });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
});

app.get('/api/getJudgementLine1', async (req, res) => {
  try {
    const result = await pool.query('SELECT part_no, qty FROM judgement_line1');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching Judgement Line:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getJudgementLine2', async (req, res) => {
  try {
    const result = await pool.query('SELECT part_no, qty FROM judgement_line2');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching Judgement Line:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/add', async (req, res) => {
  const { part_no, qty } = req.body;
  try {
    await db.query('INSERT INTO judgement_line1 (part_no, qty) VALUES ($1, $2)', [part_no, qty]);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error adding part');
  }
});

app.put('/api/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { part_no, qty } = req.body;

  try {
    const result = await db.query('UPDATE judgement_line1 SET part_no = $1, qty = $2 WHERE id = $3', [part_no, qty, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json({ message: 'Part updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating part' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM judgement_line1 WHERE id = $1', [id]);
    res.json({ message: 'Part deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting part' });
  }
});

app.post('/add2', async (req, res) => {
  const { part_no, qty } = req.body;
  try {
    await db.query('INSERT INTO judgement_line2 (part_no, qty) VALUES ($1, $2)', [part_no, qty]);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error adding part');
  }
});

app.put('/api/edit2/:id', async (req, res) => {
  const { id } = req.params;
  const { part_no, qty } = req.body;

  try {
    const result = await db.query('UPDATE judgement_line2 SET part_no = $1, qty = $2 WHERE id = $3', [part_no, qty, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json({ message: 'Part updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating part' });
  }
});

app.delete('/delete2/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM judgement_line2 WHERE id = $1', [id]);
    res.json({ message: 'Part deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting part' });
  }
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
    const columns = Object.keys(row).filter(
      (col) => row[col] !== null && col !== "part_no"
    );

    const filteredColumns = columns
      .filter((col) => col !== "id" && col !== "model")
      .map((col) => col.replace(/_/g, "-").toUpperCase());

    if (filteredColumns.length === 0) {
      return res.json({
        success: false,
        message: "ไม่มีคอลัมน์ที่เกี่ยวข้องใน db_master",
      });
    }

    // ค้นหาข้อมูลใน log_data_stock_1
    const stockQuery1 = `
      SELECT part_no, SUM(quantity::INTEGER) AS total_quantity
      FROM log_data_stock_1
      WHERE quantity != '0'
      AND part_no = ANY($1::text[])
      GROUP BY part_no
    `;
    const stockResult1 = await pool.query(stockQuery1, [filteredColumns]);

    // ค้นหาข้อมูลใน log_data_stock_2
    const stockQuery2 = `
      SELECT part_no, SUM(quantity::INTEGER) AS total_quantity
      FROM log_data_stock_2
      WHERE quantity != '0'
      AND part_no = ANY($1::text[])
      GROUP BY part_no
    `;
    const stockResult2 = await pool.query(stockQuery2, [filteredColumns]);

    // หากไม่พบข้อมูลในทั้งสองตาราง
    if (stockResult1.rows.length === 0 && stockResult2.rows.length === 0) {
      return res.json({
        success: true,
        message: "ไม่พบข้อมูลใน log_data_stock_1 และ log_data_stock_2",
        tableData: filteredColumns.map((partNo) => ({
          partNumber: partNo,
          status: "NG",
        })),
      });
    }

    const labels = stockResult1.rows.map((row) => row.part_no);
    const values = stockResult1.rows.map((row) => row.total_quantity);

    const channels = stockResult2.rows.map((row) => row.part_no);
    const changes = stockResult2.rows.map((row) => row.total_quantity);

    const v1 = stockResult1.rows.map((row) => ({ part_no: row.part_no, quantity: row.total_quantity }));
    const v2 = stockResult2.rows.map((row) => ({ part_no: row.part_no, quantity: row.total_quantity }));

    const tableData = colvalue.map((item) => {
      const { name: partNo, value: quantity } = item;

      const partMatch = labels.includes(partNo) || channels.includes(partNo);

      const status = !partMatch
        ? "NG"
        : (v1.some((v1Item) => v1Item.part_no === partNo && v1Item.quantity >= quantity) ||
          v2.some((v2Item) => v2Item.part_no === partNo && v2Item.quantity >= quantity))
          ? "OK"
          : "NG";

      return { partNumber: partNo, status };
    });

    res.json({
      success: true,
      labels: stockResult1.rows.map((row) => row.part_no),
      values: stockResult1.rows.map((row) => row.total_quantity),
      channels: stockResult2.rows.map((row) => row.part_no),
      changes: stockResult2.rows.map((row) => row.total_quantity),
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
    const result = await pool.query(`
      SELECT part_no, SUM(quantity::INTEGER) AS total_quantity
      FROM log_data_stock_1
      WHERE quantity != '0'
      GROUP BY part_no
    `);

    const data = {
      part_no: result.rows.map(row => row.part_no),
      total_quantity: result.rows.map(row => row.total_quantity),
    };

    res.json(data);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/getMain2', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT part_no, SUM(quantity::INTEGER) AS total_quantity
      FROM log_data_stock_2
      WHERE quantity != '0'
      GROUP BY part_no
    `);

    const data = {
      part_no: result.rows.map(row => row.part_no),
      total_quantity: result.rows.map(row => row.total_quantity),
    };

    res.json(data);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ error: 'Error fetching data' });
  }
});
//////////////////////////
app.get('/api/getPresspart', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT part_no, SUM(quantity::INTEGER) AS total_quantity 
      FROM log_data_stock_1 
      WHERE quantity != '0' 
      GROUP BY part_no
    `);
    const data = result.rows;

    res.json(data);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/getCenterrepack', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT part_no, SUM(quantity::INTEGER) AS total_quantity 
      FROM log_data_stock_2 
      WHERE quantity != '0' 
      GROUP BY part_no
    `);
    const data = result.rows;

    res.json(data);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/insertData', async (req, res) => {
  const { query } = req.body;

  try {
    const result = await pool.query(query);
    res.json({ success: true, message: 'Data inserted successfully!' });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ success: false, message: 'Error inserting data', error: err.message });
  }
});

app.post('/insert-stock3', async (req, res) => {
  const { part_no, id_part_no, quantity, type } = req.body;

  if (!part_no || !id_part_no || !quantity || !type) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    let query;
    let values;

    if (type === "IN") {
      query = `
              INSERT INTO log_data_stock_3 (part_no, id_part_no_3, quantity, timestamp)
              VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
              ON CONFLICT (id_part_no_3)
              DO UPDATE SET 
                  quantity = (CAST(log_data_stock_3.quantity AS INTEGER) + CAST($3 AS INTEGER))::TEXT,
                  timestamp = CURRENT_TIMESTAMP;
          `;
      values = [part_no, id_part_no, quantity];
    } else if (type === "OUT") {
      query = `
              UPDATE log_data_stock_3
              SET quantity = (CAST(quantity AS INTEGER) - CAST($1 AS INTEGER))::TEXT,
                  out = CURRENT_TIMESTAMP
              WHERE part_no = $2 AND id_part_no_3 = $3;
          `;
      values = [quantity, part_no, id_part_no];
    } else {
      return res.status(400).json({ success: false, message: "Invalid type, must be IN or OUT" });
    }

    await pool.query(query, values);
    res.json({ success: true, message: `Stock ${type} updated successfully` });

  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ success: false, message: "Error inserting data", error: err.message });
  }
});

app.post('/insert-stock4', async (req, res) => {
  const { part_no, id_part_no, quantity, type } = req.body;

  if (!part_no || !id_part_no || !quantity || !type) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    let query;
    let values;

    if (type === "IN") {
      query = `
              INSERT INTO log_data_stock_4 (part_no, id_part_no_4, quantity, timestamp)
              VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
              ON CONFLICT (id_part_no_4)
              DO UPDATE SET 
                  quantity = (CAST(log_data_stock_4.quantity AS INTEGER) + CAST($3 AS INTEGER))::TEXT,
                  timestamp = CURRENT_TIMESTAMP;
          `;
      values = [part_no, id_part_no, quantity];
    } else if (type === "OUT") {
      query = `
              UPDATE log_data_stock_4
              SET quantity = (CAST(quantity AS INTEGER) - CAST($1 AS INTEGER))::TEXT,
                  out = CURRENT_TIMESTAMP
              WHERE part_no = $2 AND id_part_no_4 = $3;
          `;
      values = [quantity, part_no, id_part_no];
    } else {
      return res.status(400).json({ success: false, message: "Invalid type, must be IN or OUT" });
    }

    await pool.query(query, values);
    res.json({ success: true, message: `Stock ${type} updated successfully` });

  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ success: false, message: "Error inserting data", error: err.message });
  }
});



// app.get('/api/getCoreBRS1', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT part_no, quantity FROM stock_data_3 WHERE quantity != \'0\'');

//     const data = {
//       ppLb: result.rows.map(row => row.part_no),
//       ppQty: result.rows.map(row => row.quantity),
//     };

//     res.json(data);
//   } catch (err) {
//     console.error('Error querying database:', err);
//     res.status(500).send('Error fetching data');
//   }
// });

// app.get('/api/getCoreBRS4', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT part_no, quantity FROM stock_data_4 WHERE quantity != \'0\'');

//     const data = {
//       ppLb: result.rows.map(row => row.part_no),
//       ppQty: result.rows.map(row => row.quantity),
//     };

//     res.json(data);
//   } catch (err) {
//     console.error('Error querying database:', err);
//     res.status(500).send('Error fetching data');
//   }
// });

app.get('/api/getCoreBRS3', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT part_no, SUM(quantity::INTEGER) AS total_quantity 
      FROM log_data_stock_3 
      WHERE quantity != '0' 
      GROUP BY part_no
    `);
    const data = result.rows;

    const responseData = {
      ppLb: data.map(row => row.part_no),
      ppQty: data.map(row => row.total_quantity)
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/getCoreBRS4', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT part_no, SUM(quantity::INTEGER) AS total_quantity 
      FROM log_data_stock_4 
      WHERE quantity != '0' 
      GROUP BY part_no
    `);
    const data = result.rows;

    const responseData = {
      ppLb: data.map(row => row.part_no),
      ppQty: data.map(row => row.total_quantity)
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/getBrazing', async (req, res) => {
  try {
    const result = await pool.query('SELECT part_no, quantity FROM stock_data_6 WHERE quantity != \'0\'');

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

app.get('/api/getSurface', async (req, res) => {
  try {
    const result = await pool.query('SELECT part_no, quantity FROM stock_data_5 WHERE quantity != \'0\'');

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

app.post("/api/updateStock1", async (req, res) => {
  const { id_part_no, part_no, quantity, type, qr_code } = req.body;

  try {
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity value." });
    }

    const result = await pool.query("SELECT * FROM stock_data_1 WHERE part_no = $1", [part_no]);

    if (result.rows.length > 0) {
      const existingQuantity = parseInt(result.rows[0].quantity);

      if (type === "IN") {
        const newQuantity = existingQuantity + qty;
        await pool.query(
          "UPDATE stock_data_1 SET quantity = $1, timestamp = CURRENT_TIMESTAMP, id_part_no = $2, qr_code = $3 WHERE part_no = $4",
          [newQuantity, id_part_no, qr_code, part_no]
        );
        return res.json({ message: `Part ${part_no} updated with ${quantity} added.` });

      } else if (type === "OUT") {
        if (existingQuantity >= qty) {
          const newQuantity = existingQuantity - qty;
          await pool.query(
            "UPDATE stock_data_1 SET quantity = $1, timestamp = CURRENT_TIMESTAMP, id_part_no = $2 WHERE part_no = $3",
            [newQuantity, id_part_no, part_no]
          );


          const checkStock2 = await pool.query("SELECT * FROM stock_data_2 WHERE part_no = $1", [part_no]);

          if (checkStock2.rows.length > 0) {
            await pool.query(
              "UPDATE stock_data_2 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2",
              [newQuantity, part_no]
            );
          }

          return res.json({ message: `Part ${part_no} updated with ${quantity} subtracted.` });
        } else {
          return res.status(400).json({ message: `Not enough stock to subtract for part ${part_no}.` });
        }
      }

    } else {
      if (type === "IN") {
        await pool.query(
          "INSERT INTO stock_data_1 (id_part_no, part_no, quantity, type, model, qr_code, timestamp) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)",
          [id_part_no, part_no, qty, "IN", "ModelX", qr_code]
        );
        return res.json({ message: `Part ${part_no} added with ${quantity} quantity.` });
      } else {
        return res.status(400).json({ message: `Part ${part_no} does not exist for OUT operation.` });
      }
    }
  } catch (err) {
    console.error("Error querying database:", err);
    return res.status(500).json({ message: "Error updating stock" });
  }
});

app.post("/api/updateStock2", async (req, res) => {
  const { id_part_no, part_no, quantity, type } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM log_data_stock_2 WHERE id_part_no_2 = $1",
      [id_part_no]
    );

    if (result.rows.length > 0) {
      const existingQuantity = parseInt(result.rows[0].quantity);

      if (type === "IN") {
        const qty = parseInt(quantity);
        const newQuantity1 = existingQuantity - qty;
        const newQuantity2 = existingQuantity + qty;

        await pool.query(
          "UPDATE log_data_stock_2 SET quantity = $1, timestamp = CURRENT_TIMESTAMP, id_part_no_2 = $2 WHERE part_no = $3",
          [newQuantity1, id_part_no, part_no]
        );

        await pool.query(
          "UPDATE log_data_stock_2 SET quantity = $1, timestamp = CURRENT_TIMESTAMP, id_part_no_2 = $2 WHERE part_no = $3",
          [newQuantity2, id_part_no, part_no]
        );

        res.json({
          message: `Part ${part_no} updated with ${quantity} added.`,
        });
      } else if (type === "OUT") {
        if (existingQuantity >= quantity) {
          const newQuantity = existingQuantity - quantity;

          await pool.query(
            "UPDATE log_data_stock_2 SET quantity = $1, timestamp = CURRENT_TIMESTAMP, id_part_no_2 = $2 WHERE part_no = $3",
            [newQuantity, id_part_no, part_no]
          );

          res.json({
            message: `Part ${part_no} updated with ${quantity} subtracted.`,
          });
        } else {
          res.status(400).json({
            message: `Not enough stock to subtract for part ${part_no}.`,
          });
        }
      }
    } else {
      if (type === "IN") {
        await pool.query(
          "INSERT INTO log_data_stock_2 (id_part_no_2, part_no, quantity,timestamp) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
          [id_part_no, part_no, quantity]
        );
        res.json({
          message: `Part ${part_no} added with ${quantity} quantity.`,
        });
      } else {
        res.status(400).json({
          message: `Part ${part_no} does not exist for OUT operation.`,
        });
      }
    }
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ message: "Error updating stock" });
  }
});

app.post('/api/updateStock3', async (req, res) => {
  const { part_no, quantity, type } = req.body;

  try {
    const result = await pool.query('SELECT * FROM stock_data_3 WHERE part_no = $1', [part_no]);

    if (result.rows.length > 0) {
      const existingQuantity = result.rows[0].quantity;

      if (type === 'IN') {
        var ext = parseInt(existingQuantity)
        var qty = parseInt(quantity)
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
        var ext = parseInt(existingQuantity)
        var qty = parseInt(quantity)
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
          'INSERT INTO stock_data_4 (part_no, quantity, type, model, timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
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

app.post('/api/updateStock5', async (req, res) => {
  const { part_no, quantity, type } = req.body;

  try {
    const result = await pool.query('SELECT * FROM stock_data_6 WHERE part_no = $1', [part_no]);

    if (result.rows.length > 0) {
      const existingQuantity = result.rows[0].quantity;

      if (type === 'IN') {
        var ext = parseInt(existingQuantity)
        var qty = parseInt(quantity)
        const newQuantity = ext + qty;
        await pool.query(
          'UPDATE stock_data_6 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
          [newQuantity, part_no]
        );
        res.json({ message: `Part ${part_no} updated with ${quantity} added.` });
      } else if (type === 'OUT') {
        if (existingQuantity >= quantity) {
          const newQuantity = existingQuantity - quantity;
          await pool.query(
            'UPDATE stock_data_6 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
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
          'INSERT INTO stock_data_6 (part_no, quantity, type, model, timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
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

app.post('/api/updateStock6', async (req, res) => {
  const { part_no, quantity, type } = req.body;

  try {
    const result = await pool.query('SELECT * FROM stock_data_5 WHERE part_no = $1', [part_no]);

    if (result.rows.length > 0) {
      const existingQuantity = result.rows[0].quantity;

      if (type === 'IN') {
        var ext = parseInt(existingQuantity)
        var qty = parseInt(quantity)
        const newQuantity = ext + qty;
        await pool.query(
          'UPDATE stock_data_5 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
          [newQuantity, part_no]
        );
        res.json({ message: `Part ${part_no} updated with ${quantity} added.` });
      } else if (type === 'OUT') {
        if (existingQuantity >= quantity) {
          const newQuantity = existingQuantity - quantity;
          await pool.query(
            'UPDATE stock_data_5 SET quantity = $1, timestamp = CURRENT_TIMESTAMP WHERE part_no = $2',
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
          'INSERT INTO stock_data_5 (part_no, quantity, type, model, timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)',
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
  console.log(`Server is running on http://192.168.1.100:${PORT}`);
});

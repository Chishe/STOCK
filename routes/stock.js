const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "aniwat2561",
  port: 5432,
});

router.get('/main', (req, res) => {
  res.render('main', { title: 'Search Subpart' });
});

router.get('/pp', (req, res) => {
  res.render('pp', { title: 'Press Part' });
});

router.get('/ctrp', (req, res) => {
  res.render('ctrp', { title: 'Center Repack' });
});

router.get('/cbrsl1', (req, res) => {
  res.render('cbrsl1', { title: 'Core BRS Line 1' });
});

router.get('/cbrsl2', (req, res) => {
  res.render('cbrsl2', { title: 'Core BRS Line 2' });
});

router.get('/cbrsl3', (req, res) => {
  res.render('cbrsl3', { title: 'Core BRS Line 3' });
});


router.get('/cbrsl4', (req, res) => {
  res.render('cbrsl4', { title: 'Core BRS Line 4' });
});

router.get('/cbrsl5', (req, res) => {
  res.render('cbrsl5', { title: 'Core BRS Line 5' });
});


router.get('/cbrsl6', (req, res) => {
  res.render('cbrsl6', { title: 'Core BRS Line 6' });
});

router.get('/brz', (req, res) => {
  res.render('brz', { title: 'Brazing' });
});

router.get('/suf', (req, res) => {
  res.render('suf', { title: 'Surface' });
});

router.get('/mtc', (req, res) => {
  res.render('mtc', { title: 'Matching' });
});

router.get('/mtc1', (req, res) => {
  res.render('mtc1', { title: 'Matching Core 1' });
});

router.get('/mtc2', (req, res) => {
  res.render('mtc2', { title: 'Matching Core 2' });
});

router.get('/mtc3', (req, res) => {
  res.render('mtc3', { title: 'Matching Core 3' });
});

router.get('/mtc4', (req, res) => {
  res.render('mtc4', { title: 'Matching Core 4' });
});

router.get('/mtc5', (req, res) => {
  res.render('mtc5', { title: 'Matching Core 5' });
});

router.get('/mtc6', (req, res) => {
  res.render('mtc6', { title: 'Matching Core 6' });
});

router.get("/ss1", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM log_data_stock_core_1 ORDER BY id DESC");
    res.render("ss1", { title: "Press Part", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss2", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM log_data_stock_core_2 ORDER BY id DESC");
    res.render("ss2", { title: "Center Repack", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss3", async (req, res) => {
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
      FROM log_data_stock_core_3 l
      LEFT JOIN matching m ON l.id_part_no_core_3 = m.core_id
      ORDER BY l.id DESC
      LIMIT 100;
    `);
    console.log(result.rows[0]);
    res.render("ss3", { title: "Core BRS Line 3", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss4", async (req, res) => {
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
      FROM log_data_stock_core_4 l
      LEFT JOIN matching m ON l.id_part_no_core_4 = m.core_id
      ORDER BY l.id DESC
      LIMIT 100;
    `);
    res.render("ss4", { title: "Core BRS Line 4", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss5", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stock_data_5 ORDER BY id DESC");
    res.render("ss5", { title: "Surface", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss6", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stock_data_6 ORDER BY id DESC");
    res.render("ss6", { title: "Brazing", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/set1", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM judgement_line1 ORDER BY id ASC");
    res.render("set1", { title: "Set Min Press Part", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/set2", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM judgement_line2 ORDER BY id ASC");
    res.render("set2", { title: "Set Min Center Repack", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss1", async (req, res) => {
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
      FROM log_data_stock_core_1 l
      LEFT JOIN matching m ON l.id_part_no_core_1 = m.core_id
      ORDER BY l.id DESC
      LIMIT 100;
    `);
    console.log(result.rows[0]);
    res.render("ss01", { title: "Core BRS Line 1", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss2", async (req, res) => {
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
      FROM log_data_stock_core_2 l
      LEFT JOIN matching m ON l.id_part_no_core_2 = m.core_id
      ORDER BY l.id DESC
      LIMIT 100;
    `);
    console.log(result.rows[0]);
    res.render("ss02", { title: "Core BRS Line 2", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss03", async (req, res) => {
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
      FROM log_data_stock_core_3 l
      LEFT JOIN matching m ON l.id_part_no_core_3 = m.core_id
      ORDER BY l.id DESC
      LIMIT 100;
    `);
    console.log(result.rows[0]);
    res.render("ss03", { title: "Core BRS Line 3", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss04", async (req, res) => {
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
      FROM log_data_stock_core_4 l
      LEFT JOIN matching m ON l.id_part_no_core_4 = m.core_id
      ORDER BY l.id DESC
      LIMIT 100;
    `);
    console.log(result.rows[0]);
    res.render("ss04", { title: "Core BRS Line 4", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss05", async (req, res) => {
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
      FROM log_data_stock_core_5 l
      LEFT JOIN matching m ON l.id_part_no_core_5 = m.core_id
      ORDER BY l.id DESC
      LIMIT 100;
    `);
    console.log(result.rows[0]);
    res.render("ss05", { title: "Core BRS Line 5", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ss06", async (req, res) => {
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
      FROM log_data_stock_core_6 l
      LEFT JOIN matching m ON l.id_part_no_core_6 = m.core_id
      ORDER BY l.id DESC
      LIMIT 100;
    `);
    console.log(result.rows[0]);
    res.render("ss06", { title: "Core BRS Line 6", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

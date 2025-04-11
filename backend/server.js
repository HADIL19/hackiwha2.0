import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

////////////////////////////////////
//  1) MySQL Connection Pool
////////////////////////////////////
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

////////////////////////////////////
//  2) Express App Setup
////////////////////////////////////
const app = express();
app.use(cors());
app.use(express.json());

////////////////////////////////////
//  3) Routes
////////////////////////////////////

// A) Appointments
app.post('/api/appointments', async (req, res) => {
  const { specialistId, date, time } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO appointments (specialistId, date, time) VALUES (?, ?, ?)',
      [specialistId, date, time]
    );
    res.status(201).json({ id: result.insertId, specialistId, date, time });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM appointments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// B) Behaviors
app.post('/api/behaviors', async (req, res) => {
  const { text, date, category } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO behaviors (text, date, category) VALUES (?, ?, ?)',
      [text, date, category]
    );
    res.status(201).json({ id: result.insertId, text, date, category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/behaviors', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM behaviors');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// C) Progress
app.post('/api/progress', async (req, res) => {
  const { social, language, motor } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO progress (social, language, motor) VALUES (?, ?, ?)',
      [social, language, motor]
    );
    res.status(201).json({ id: result.insertId, social, language, motor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/progress', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM progress');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// D) Recommendations
app.post('/api/recommendations', async (req, res) => {
  const { title, description, specialist, status, date } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO recommendations (title, description, specialist, status, date) VALUES (?, ?, ?, ?, ?)',
      [title, description, specialist, status || 'new', date]
    );
    res.status(201).json({ id: result.insertId, title, description, specialist, status, date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/recommendations', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM recommendations');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// E) Unified Dashboard Data
app.get('/api/dashboard', async (req, res) => {
  try {
    const [appointments] = await pool.query('SELECT * FROM appointments');
    const [behaviors] = await pool.query('SELECT * FROM behaviors');
    const [progress] = await pool.query('SELECT * FROM progress');
    const [recommendations] = await pool.query('SELECT * FROM recommendations');

    res.json({ appointments, behaviors, progress, recommendations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

////////////////////////////////////
//  4) Start Server
////////////////////////////////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n[OK] Server is running on port ${PORT}\n`);
});

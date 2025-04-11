////////////////////////////////////
//  1) Imports & Env Setup
////////////////////////////////////
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();  // Load variables from .env

////////////////////////////////////
//  2) Database (Sequelize + MySQL)
////////////////////////////////////
const sequelize = new Sequelize(
  process.env.DB_NAME,     // e.g., "therapy_platform"
  process.env.DB_USER,     // e.g., "root"
  process.env.DB_PASSWORD, // e.g., "your_mysql_password_here"
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
);

// Optional: Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('DB connection error:', err));

////////////////////////////////////
//  3) Define Models
////////////////////////////////////

// Appointments Model
const Appointment = sequelize.define('Appointment', {
  specialistId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  // Sequelize will automatically add "createdAt" and "updatedAt"
}, {
  timestamps: true
});

// Behaviors Model
const Behavior = sequelize.define('Behavior', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true
});

// Progress Model
const Progress = sequelize.define('Progress', {
  social: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  language: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true
});

// Recommendations Model
const Recommendation = sequelize.define('Recommendation', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  specialist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('new', 'in_progress', 'completed'),
    defaultValue: 'new'
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
}, {
  timestamps: true
});

////////////////////////////////////
//  4) Express App Setup
////////////////////////////////////
const app = express();
app.use(cors());
app.use(express.json());

////////////////////////////////////
//  5) API Routes
////////////////////////////////////

// A) Appointments Routes
app.post('/api/appointments', async (req, res) => {
  try {
    const { specialistId, date, time } = req.body;
    const newAppointment = await Appointment.create({ specialistId, date, time });
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// B) Behaviors Routes
app.post('/api/behaviors', async (req, res) => {
  try {
    const { text, date, category } = req.body;
    const newBehavior = await Behavior.create({ text, date, category });
    res.status(201).json(newBehavior);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/behaviors', async (req, res) => {
  try {
    const behaviors = await Behavior.findAll();
    res.json(behaviors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// C) Progress Routes
app.post('/api/progress', async (req, res) => {
  try {
    const { social, language, motor } = req.body;
    const newProgress = await Progress.create({ social, language, motor });
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/progress', async (req, res) => {
  try {
    const progressData = await Progress.findAll();
    res.json(progressData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// D) Recommendations Routes
app.post('/api/recommendations', async (req, res) => {
  try {
    const { title, description, specialist, status, date } = req.body;
    const newRecommendation = await Recommendation.create({ title, description, specialist, status, date });
    res.status(201).json(newRecommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/recommendations', async (req, res) => {
  try {
    const recommendations = await Recommendation.findAll();
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

////////////////////////////////////
//  6) Sync DB & Start Server
////////////////////////////////////
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n[OK] Database synced & server running on port ${PORT}\n`);
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));

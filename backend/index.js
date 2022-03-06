require("dotenv").config();
require("./config/database");
const cors = require("cors");
const express = require("express");
const app = express();

// import routes
const facilityRoute = require("./routes/facilityRoute");
const officerRoute = require("./routes/officerRoute");
const patientRoute = require("./routes/patientRoute");
const consultationRoute = require("./routes/consultationRoute");
const categoryRoute = require("./routes/categoryRoute");

// initialize
app.use(cors());
app.use(express.json());

// routes
app.use(
  "/api",
  facilityRoute,
  officerRoute,
  patientRoute,
  consultationRoute,
  categoryRoute
);

app.get("/", (req, res) => {
  res.status(400).sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get("/*", (req, res) => {
  res.status(400).sendFile(path.join(__dirname + "/pages/404.html"));
});

app.listen(7000, () => console.log("Server connected smoothly..."));

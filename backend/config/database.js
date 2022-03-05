const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.dbURL || "mongodb://localhost:27017/medpharma")
//   .then(() => console.log("Database connected!"))
//   .catch((err) => console.log(err.message));

mongoose
  .connect("mongodb://localhost:27017/medpharma")
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err.message));

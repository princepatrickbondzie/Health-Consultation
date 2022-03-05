const Officer = require("../models/Officer");
const Facility = require("../models/Facility");
const bcrypt = require("bcrypt");

const getOfficer = async (req, res, next) => {
  const facility = await Facility.findById(req.body.facility);
  if (!facility) next(new Error("Invalid facility"));
  const id = req.params.id;
  const officer = await Officer.findById(id);
  res.status(200).json({ officer });
};

const updateOfficer = async (req, res) => {
  const id = req.params.id;
  const officer = await Officer.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status().json({ officer });
};

const deleteOfficer = async (req, res) => {
  const id = req.params.id;
  await Officer.findByIdAndDelete(id);
  res.status(200).json({ message: "Officer deleted successfully" });
};

// const grantAccess = async (req, res) => {
//   const facility = await Facility.findById(req.body.facility);
//   if (!facility) next(new Error("Invalid facility"));
// };

module.exports = {
  getOfficer,
  updateOfficer,
  deleteOfficer,
};

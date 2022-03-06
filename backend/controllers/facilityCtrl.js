const Facility = require("../models/Facility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createFacility = async (req, res) => {
  const emailExist = await Facility.findOne({ email: req.body.email });
  if (emailExist) {
    res.status(400).json({ message: "Email is not available!!" });
  }
  //encrypt password
  const hashedPassword = await bcrypt.hash(password, 12);

  //create new facility
  const facility = await Facility.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    certifiedId: req.body.certifiedId,
    consultationOfficer: req.body.consultationOfficer,
    location: req.body.location,
    category: req.body.category,
    password: hashedPassword,
  });

  //HTTP response
  res.status(201).json({ status: "success", data: facility });
};

const facilityLogin = async (req, res, next) => {
  console.log(req.body);
  let facility = await Facility.findOne({ email: req.body.email })
    .populate("category")
    .populate("patient")
    .populate("consultationOfficer");
  if (!facility) next(new Error("User does not exist!"));
  const isMatch = await bcrypt.compare(password, facility.password);
  if (!isMatch) return next(new Error("Invalid Credentials"));
  const accessToken = jwt.sign({ id: facility._id }, "123456789", {
    expiresIn: "1h",
  });

  await Facility.findByIdAndUpdate(facility._id, { accessToken });

  res.status(200).json({
    facility,
    accessToken,
  });
};

module.exports = { createFacility, facilityLogin };

const Facility = require("../models/Facility");
// const Officer = require("../models/Officer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createFacility = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      certifiedId,
      consultationOfficer,
      location,
      category,
      password,
    } = req.body;
    console.log(req.body);

    // if (
    //   !name &&
    //   !email &&
    //   !phone &&
    //   !certifiedId &&
    //   !consultationOfficer &&
    //   !location &&
    //   !category &&
    //   !password
    // ) {
    //   res.status(400).json({ message: "All fields required!!" });
    // }
    const nameExist = await Facility.findOne({ name });
    if (nameExist) {
      res.status(400).json({ message: "Name is not available!!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await Facility.create({
      name,
      email,
      phone,
      certifiedId,
      consultationOfficer,
      location,
      category,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    const errObj = handlErrors(error);
    res.status(400).json(errObj);
  }
};

const facilityLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    let facility = await Facility.findOne({ email })
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
  } catch (error) {
    const errMsg = handlErrors(error);
    res.status(400).json(errMsg);
  }
};

module.exports = { createFacility, facilityLogin };

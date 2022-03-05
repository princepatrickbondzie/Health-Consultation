const Facility = require("../models/Facility");
const Officer = require("../models/Officer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register facility
const register = async (req, res) => {
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

    if (
      !name &&
      !email &&
      !phone &&
      !certifiedId &&
      !consultationOfficer &&
      !location &&
      !category &&
      !password
    ) {
      res.status(400).json({ message: "All fields required!!" });
    }
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

//facility login
const login = async (req, res, next) => {
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

//register officer - only by a health facility
const registerOfficer = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, facility } = req.body;

    //get facility
    const facilityID = await Facility.findById(req.body.facility);
    if (!facilityID) return res.status(400).send("Invalid facility ID");

    const hashedPassword = await bcrypt.hash(password, 12);

    const officer = await Officer.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      facility: facilityID,
    });
    res.status(201).json({ officer });
  } catch (error) {
    const errMsg = handlErrors(error);
    res.status(400).json(errMsg);
  }
};

//login officer
const loginOfficer = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let officer = await Officer.findOne({ email }).populate("facility");
    if (!officer) next(new Error("Officer does not exist!"));
    const isMatch = await bcrypt.compare(password, officer.password);
    if (!isMatch) return next(new Error("Invalid Credentials"));
    const accessToken = jwt.sign({ id: officer._id }, "123456789", {
      expiresIn: "1h",
    });

    await Officer.findByIdAndUpdate(officer._id, { accessToken });

    res.status(200).json({
      officer,
      accessToken,
    });
  } catch (error) {
    const errMsg = handlErrors(error);
    res.status(400).json(errMsg);
  }
};

//

//error handler
const handlErrors = (err) => {
  let errors = { email: "", password: "", msg: "" };

  if (err.message === "incorrect username") {
    errors.email = err.message;
  }

  if (err.message === "incorrect password") {
    errors.password = err.message;
  }

  if (err.code === 11000) {
    errors.email = "the username is not available";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = { register, login, registerOfficer, loginOfficer };

const Officer = require("../models/Officer");
const Facility = require("../models/Facility");
const bcrypt = require("bcrypt");

const getOfficer = async (req, res, next) => {
  if (req.body.facility) {
    const facility = await Facility.findById(req.body.facility);
    if (!facility) next(new Error("Invalid facility"));
  }
  const officer = await Officer.findById(req.params.id).populate("facility");
  res.status(200).json({ officer });
};

const createOfficer = async (req, res) => {
  //get facility
  const facility = await Facility.findById(req.body.facility);
  if (!facility) return res.status(400).send("Invalid doctor ID");

  const hashedPassword = await bcrypt.hash(password, 12);

  // create new officer
  let officer = await Officer.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    facility: req.body.facility,
  });

  // return HTTP response
  res.status(201).json({
    status: "sucess",
    data: officer,
  });
};

const officerLogin = async (req, res) => {
  const officer = await Officer.findOne({ email: req.body.email }).populate(
    "facility"
  );
  if (!officer) {
    return res.status(400).json({
      status: "fail",
      data: null,
      message: "Incorrent Email or Password",
    });
  }
  // decrypt password have validation.
  if (officer && (await bcrypt.compare(req.body.password, officer.password))) {
    const accessToken = jwt.sign({ id: officer._id }, "123456789", {
      expiresIn: "1h",
    });
    await Officer.findByIdAndUpdate(officer._id, { accessToken });
    res.status(200).json({ officer, accessToken: token });
  } else {
    res.status(400).json({
      status: "fail",
      data: null,
      message: "Incorrent Email or Password",
    });
  }
};

const updateOfficer = async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
  }
  const officer = await Officer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // return HTTP response
  if (!officer) {
    return res.status(404).json({
      status: "fail",
      message: "can't find the Officer",
    });
  }
  res.status(200).json({
    status: "sucess",
    data: {
      officer,
    },
  });
};

const deleteOfficer = async (req, res) => {
  const id = req.params.id;
  await Officer.findByIdAndDelete(id);
  res.status(200).json({ message: "Officer deleted successfully" });
};

module.exports = {
  getOfficer,
  createOfficer,
  officerLogin,
  updateOfficer,
  deleteOfficer,
};

const Consultation = require("../models/Consultation");
// const Patient = require("../models/Patient");
// const Officer = require("../models/Officer");

const getConsultations = async (req, res) => {
  const consultation = await Consultation.find();
  res.status(200).json({ consultation });
};

const getConsultation = async (req, res) => {
  // Get data
  const consultation = await Consultation.findById(req.params.id)
    .populate("officer", "FirstName", "LastName")
    .populate("patient", "fullName");
  if (!consultation) {
    return res.status(404).json({
      status: "fail",
      message: "can't find the consultation record",
    });
  }

  if (
    (res.locals.id == consultation.patient._id &&
      res.locals.type == "patient") ||
    res.locals.type == "officer"
  ) {
    // if user type is correct return HTTP response
    res.status(200).json({
      status: "sucess",
      DateTime: req.requestTime,
      data: consultation,
    });
  } else {
    res.status(400).json({ message: "You don't have autherize" });
  }
};

const createConsultation = async (req, res) => {};

module.exports = { getConsultation, getConsultations, createConsultation };

const Consultation = require("../models/Consultation");
const Patient = require("../models/Patient");
const Officer = require("../models/Officer");

const getConsultations = async (req, res) => {
  const consultations = await Consultation.find();
  res.status(200).json({ consultations });
};

const getConsultation = async (req, res) => {
  // Get data
  const consultation = await Consultation.findById(req.params.id)
    .populate("officer", "FirstName", "LastName")
    .populate("patient", "fullName");
  if (!consultation) {
    return res.status(404).json({
      status: "fail",
      message: "can't find consultation record",
    });
  }

  if (
    (res.locals.id == consultation.patient._id &&
      res.locals.type == "patient") ||
    res.locals.type == "officer"
  ) {
    // if user type is correct return HTTP response
    res.status(200).json({
      status: "success",
      DateTime: req.requestTime,
      data: consultation,
    });
  } else {
    res.status(400).json({ message: "You don't have permission" });
  }
};

const createConsultation = async (req, res) => {
  // get officer
  const officer = await Officer.findById(req.body.officer);
  if (!officer) return res.status(400).send("Invalid officer ID");

  // get patient
  const patient = await Patient.findById(req.body.patient);
  if (!patient) return res.status(400).send("Invalid patient ID");

  const consultation = await Consultation.create({
    officer: req.body.officer,
    patient: req.body.patient,
    history: req.body.history,
    diagnosis: req.body.diagnosis,
    illness: req.body.illness,
    treatment: req.body.treatment,
    date: req.body.date,
  });
  // return HTTP response
  res.status(201).json({
    status: "success",
    data: consultation,
  });
};

const updateConsultation = async (req, res) => {
  // get officer from HTTP request
  if (req.body.officer) {
    const officer = await Officer.findById(req.body.officer);
    if (!officer) return res.status(400).send("Invalid officer");
  }
  // get patient from HTTP request
  if (req.body.patient) {
    const patient = await Patient.findById(req.body.patient);
    if (!patient) return res.status(400).send("Invalid patient");
  }

  // find and update
  const consultation = await Consultation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!consultation) {
    return res.status(404).json({
      status: "fail",
      message: "can't find consultation record",
    });
  }

  // return HTTP reponse
  res.status(200).json({
    status: "success",
    data: {
      consultation,
    },
  });
};

module.exports = {
  getConsultation,
  getConsultations,
  createConsultation,
  updateConsultation,
};

const Patient = require("../models/Patient");
const Officer = require("../models/Officer");

const getAllPatients = async (req, res) => {
  const patients = await Patient.find();
  res.status(200).json({ patients });
};

const getPatient = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.status(200).json({ patient });
};

const createPatient = async (req, res) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const patient = await Patient.create({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    IDcard: req.body.IDcard,
    currentAddress: req.body.currentAddress,
    relative: req.body.relative,
    allergy: req.body.allergy,
    bloodType: req.body.bloodType,
    password: hashedPassword,
  });

  // return HTTP response
  res.status(201).json({
    status: "success",
    data: patient,
  });
};

const updatePatient = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ patient });
};

const deletePatient = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Patient deleted successfully" });
};

const patientLogin = async (req, res, next) => {
  const patient = await Patient.findOne({ email: req.body.email });
  if (patient && (await bcrypt.compare(req.body.password, patient.password))) {
    const accessToken = jwt.sign({ id: patient._id }, "123456789", {
      expiresIn: "1h",
    });
    await Patient.findByIdAndUpdate(patient._id, { accessToken });
    res.status(200).json({ patient, accessToken: token });
  } else {
    res.status(400).json({
      status: "fail",
      data: null,
      message: "Incorrent Email or Password",
    });
  }
};

module.exports = {
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
  createPatient,
  patientLogin,
};

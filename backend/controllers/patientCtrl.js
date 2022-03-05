const Patient = require("../models/Patient");
const Officer = require("../models/Officer");

const getAllPatients = async (req, res) => {
  const patients = await Patient.find();
  res.status(200).json({ patients });
};

const getPatient = async (req, res) => {
  const id = req.params.id;
  const patient = await Patient.findById(id);
  res.status(200).json({ patient });
};

const updatePatient = async (req, res) => {
  const id = req.params.id;
  const patient = await Patient.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ patient });
};

const deletePatient = async (req, res) => {
  const id = req.params.id;
  await Patient.findByIdAndDelete(id);
  res.status(200).json({ message: "Patient deleted successfully" });
};

const registerPatient = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      gender,
      birthdate,
      IDcard,
      currentAddress,
      relative,
      allergy,
      bloodType,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const patient = await Patient.create({
      name,
      email,
      phone,
      gender,
      birthdate,
      IDcard,
      currentAddress,
      relative,
      allergy,
      bloodType,
      password: hashedPassword,
    });
    res.status(201).json({ patient });
  } catch (error) {
    console.error(error);
  }
};

const loginPatient = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient) next(new Error("Patient does not exist!"));
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return next(new Error("Invalid Credentials"));
    const accessToken = jwt.sign({ id: officer._id }, "123456789", {
      expiresIn: "1h",
    });

    await Officer.findByIdAndUpdate(patient._id, { accessToken });
    res.status(200).json({
      patient,
      accessToken,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
  registerPatient,
  loginPatient,
};

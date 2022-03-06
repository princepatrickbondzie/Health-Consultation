const router = require("express").Router();
const {
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
  createPatient,
  patientLogin,
} = require("../controllers/patientCtrl");

router.get("/patients", getAllPatients);
router.get("/patient/:id", getPatient);
router.patch("/patient/:id", updatePatient);
router.get("/patient/:id", deletePatient);
router.patch("/patient/register", createPatient);
router.post("/patient/login", patientLogin);

module.exports = router;

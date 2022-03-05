const router = require("express").Router();
const {
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
  registerPatient,
  loginPatient,
} = require("../controllers/patientCtrl");

router.get("/patients", getAllPatients);
router.get("/patient/:id", getPatient);
router.patch("/patient/:id", updatePatient);
router.get("/patient/:id", deletePatient);
router.patch("/patient/register", registerPatient);
router.post("/patient/login", loginPatient);

module.exports = router;

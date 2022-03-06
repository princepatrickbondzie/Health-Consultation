const router = require("express").Router();
const {
  getConsultation,
  getConsultations,
  createConsultation,
  updateConsultation,
} = require("../controllers/consultationCtrl");

router.post("/consults", getConsultations);
router.post("/consult", getConsultation);
router.post("/consult", createConsultation);
router.post("/consult/:id", updateConsultation);

module.exports = router;
const router = require("express").Router();
const {
  getOfficer,
  createOfficer,
  officerLogin,
  updateOfficer,
  deleteOfficer,
} = require("../controllers/officerCtrl");

router.get("/officer", getOfficer);
router.post("/officer/register", createOfficer);
router.post("/officer/login", officerLogin);
router.patch("/officer/:id", updateOfficer);
router.delete("/officer/:id", deleteOfficer);

module.exports = router;

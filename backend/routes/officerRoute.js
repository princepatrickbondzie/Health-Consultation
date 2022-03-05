const router = require("express").Router();
const {
  getOfficer,
  updateOfficer,
  deleteOfficer,
} = require("../controllers/officerCtrl");

router.get("/officer", getOfficer);
router.patch("/officer/:id", updateOfficer);
router.post("/officer/:id", deleteOfficer);

module.exports = router;

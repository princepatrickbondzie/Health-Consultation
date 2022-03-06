const router = require("express").Router();
const {
  createFacility,
  facilityLogin,
} = require("../controllers/facilityCtrl");

router.post("/facility/register", createFacility);
router.post("/facility/login", facilityLogin);

module.exports = router;

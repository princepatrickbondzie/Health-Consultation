const router = require("express").Router();
const {
  register,
  registerOfficer,
  login,
  loginOfficer,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/officer/register", registerOfficer);
router.get("/officer/login", loginOfficer);

module.exports = router;

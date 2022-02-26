const express = require("express");
const passport = require("passport");
const router = express.Router();

const { getUsers, signup, login, getProfile } = require("../controllers/user");

router.post("/signup", signup);
router.post("/login", login);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);
router.get("/", getUsers);

module.exports = router;

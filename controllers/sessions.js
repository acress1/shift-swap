const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users.js");

router.get("/new", (req, res) => {
  res.render("sessions/new_signin.ejs");
});

router.post("/", (req, res) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.redirect("/");
    } else {
      res.send("wrong password");
    }
  });
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/sessions/new");
  });
});

module.exports = router;
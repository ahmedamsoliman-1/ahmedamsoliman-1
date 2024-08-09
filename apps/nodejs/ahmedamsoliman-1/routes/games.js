var express = require("express");
var router = express.Router();

router.get("/games", function (req, res) {
  res.render("games/games");
});

router.get("/games/rgp", function (req, res) {
  res.render("games/rgp");
});

module.exports = router;

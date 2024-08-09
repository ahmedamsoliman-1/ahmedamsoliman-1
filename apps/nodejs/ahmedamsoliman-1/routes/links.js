var express = require("express");
var router = express.Router();

router.get("/links", function (req, res) {
  res.render("links", { hostName: require("os").hostname() });
});

module.exports = router;

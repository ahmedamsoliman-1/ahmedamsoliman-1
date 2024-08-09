var express = require("express");
var router = express.Router();

router.get("/linkedin", function (req, res) {
  res.redirect("https://www.linkedin.com/in/ahmed-ali-m-soliman-01aa54120/");
});

module.exports = router;

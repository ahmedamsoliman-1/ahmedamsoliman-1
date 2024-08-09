var express = require("express");
var request = require("request");
var fs = require("fs");
var router = express.Router();

let UrlsOriginal = JSON.parse(
  fs.readFileSync("public/data/screenshots_original.json", "utf8")
);
let UrlsThumbnails = JSON.parse(
  fs.readFileSync("public/data/screenshots_thumb.json", "utf8")
);

let _year_page = "screenshots";

for (let year in UrlsOriginal) {
  router.get("/gallary/screenshots/" + year.toLowerCase(), function (req, res) {
    res.render(_year_page, {
      array1: UrlsOriginal[year],
      array2: UrlsThumbnails[year],
      y: year,
    });
  });
}

module.exports = router;

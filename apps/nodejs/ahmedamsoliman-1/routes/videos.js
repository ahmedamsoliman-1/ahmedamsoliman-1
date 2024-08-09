var express = require("express");
var request = require("request");
var fs = require("fs");
var router = express.Router();
var middleware = require("../middleware");

let UrlsOriginal = JSON.parse(
  fs.readFileSync("public/data/videos_original.json", "utf8")
);
let UrlsThumbnails = JSON.parse(
  fs.readFileSync("public/data/videos_thumb.json", "utf8")
);

let page = "0ndated";

for (let year in UrlsOriginal) {
  router.get(
    "/gallary/videos",
    middleware.isLoggedInAsAdmin,
    function (req, res) {
      res.render(page, {
        array1: UrlsOriginal[year],
        array2: UrlsThumbnails[year],
        y: year,
      });
    }
  );
}

module.exports = router;

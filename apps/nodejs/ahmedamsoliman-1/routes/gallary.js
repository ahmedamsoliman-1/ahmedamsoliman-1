var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var fs = require("fs");
var flash = require("connect-flash");
var middleware = require("../middleware");

var Picture = require("../models/picture");
var Picture_aws = require("../models/picture_aws");

router.get("/gallary", function (req, res) {
  res.render("gallary/gallary");
});

router.get("/gallary/local", function (req, res) {
  Picture.find({}, function (err, allPic) {
    if (err) {
      console.log(err);
    } else {
      res.render("gallary/local", { pict: allPic });
    }
  });
});

router.get("/gallary/local/new", middleware.isLoggedIn, function (req, res) {
  res.render("gallary/new");
});

router.post("/gallary/local", function (req, res) {
  //get data from form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;

  var newPicture = { name: name, image: image, description: desc };

  Picture.create(newPicture, function (err, newlyCreatedPicture) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/gallary/local");
    }
  });
});

//Display picture - show
router.get("/gallary/local/:id", function (req, res) {
  // Find the picture with provieded ID
  Picture.findById(req.params.id, function (err, foundedPic) {
    if (err) {
      console.log(err);
    } else {
      res.render("gallary/show", { pic: foundedPic });
    }
  });
});

// Edit picture
router.get("/gallary/local/:id/edit", function (req, res) {
  Picture.findById(req.params.id, function (err, foundedPic) {
    res.render("gallary/edit", { pic: foundedPic });
  });
});

//Update picture
router.put("/gallary/local/:id", function (req, res) {
  console.log("route");

  Picture.findByIdAndUpdate(
    req.params.id,
    req.body.pic,
    function (err, updatePic) {
      if (err) {
        res.redirect("/gallary/local");
      } else {
        res.redirect("/gallary/local/" + req.params.id);
      }
    }
  );
});

//Destroy picture
router.delete("/gallary/local/:id", function (req, res) {
  Picture.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.redirect("/gallary/local");
    } else {
      res.redirect("/gallary/local/");
    }
  });
});

router.get("/gallary/all", function (req, res) {
  res.render("gallary/all");
});

router.get("/gallary/fellas", function (req, res) {
  res.render("gallary/fellas");
});

router.get("/gallary/screenshots", function (req, res) {
  res.render("gallary/screenshots");
});

// let oautoJSONData = JSON.parse(
//   fs.readFileSync(
//     "public/data/aams-lambda-to-list-urls-oau-1-LambdaFunction-ZdKT4MNaVKYo_response.json",
//     "utf8"
//   )
// );

// router.get("/gallary/oau", function (req, res) {
//   res.render("oau", { all: oautoJSONData["oau"], y: "_oau" });
// });

module.exports = router;

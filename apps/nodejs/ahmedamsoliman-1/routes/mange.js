var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

var User = require("../models/user");

// router.get("/mange", middleware.isLoggedInAsAdmin, function (req, res) {
router.get("/mange", function (req, res) {
  User.find({}, function (err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      // console.log(allUsers[0]);
      res.render("mange", { _user: allUsers });
    }
  });
});

router.get("/profile/:id", function (req, res) {
  // Find the picture with provieded ID
  User.findById(req.params.id, function (err, foundedUsers) {
    if (err) {
      console.log(err);
    } else {
      // console.log(foundedUsers.username);
      // console.log(foundedUsers.fulname);
      res.render("showProfile", { fuser: foundedUsers });
    }
  });
});

router.delete(
  "/mange/profile/:id",
  middleware.isLoggedInAsAdmin,
  function (req, res) {
    User.findByIdAndDelete(req.params.id, function (err) {
      if (err) {
        res.redirect("/mange");
      } else {
        res.redirect("/mange");
      }
    });
  }
);

// Edit User
router.get("/mange/profile/:id/edituser", function (req, res) {
  User.findById(req.params.id, function (err, foundedUser) {
    res.render("editUser", { user_: foundedUser });
  });
});

//Update picture
router.put("/mange/profile/:id", function (req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    req.body.user_,
    function (err, updatePic) {
      if (err) {
        res.redirect("/mange");
        console.log(err);
      } else {
        res.redirect("/profile/" + req.params.id);
      }
    }
  );
});

module.exports = router;

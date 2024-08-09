var Picture = require("../models/picture");

var middlewareJbj = {};

middlewareJbj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      if (err) {
        req.flash("error", "Campground not found!");
        res.redirect("back");
      } else {
        //Does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "No Permission!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Need to be logged in!");
    res.redirect("back");
  }
};

middlewareJbj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        //Does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "No permission for comment!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Need to be logged in to comment!");
    res.redirect("back");
  }
};

middlewareJbj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "Need to be loged in!");
    res.redirect("/login");
  }
};

middlewareJbj.isLoggedInAsAdmin = function (req, res, next) {
  if (req.isAuthenticated() && req.user.username === "admin") {
    return next();
  } else {
    req.flash("error", "only Admins can do that!");
    res.redirect("/mange");
  }
};

// middlewareJbj.isLoggedInAsVideosUser = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     if (req.user.username === "ahmed" || req.user.username === "Admin") {
//       return next();
//     }
//   } else {
//     req.flash("error", "only videosUser can do that!");
//     res.redirect("/login");
//   }
// };

module.exports = middlewareJbj;

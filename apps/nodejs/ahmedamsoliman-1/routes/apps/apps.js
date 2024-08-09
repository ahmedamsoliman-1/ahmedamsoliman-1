var express = require("express");
var router = express.Router();

apps_e = [
  {
    title: "MyLinkTree",
    image: "../../image/apps/avatar2.jpg",
    link: "https://www.ahmedalimsoliman.click",
  },
  {
    title: "Web Resume",
    image: "../../image/apps/webresume.jpg",
    link: "https://resume.ahmedalimsoliman.click",
  },
  {
    title: "Printable CV",
    image: "../../image/apps/cv.jpg",
    link: "https://cv.dev.ahmedalimsoliman.click",
  },
  {
    title: "uTube",
    image: "../../image/apps/youtube.jpg",
    link: "https://utube.ahmedalimsoliman.click",
  },
  {
    title: "Blog",
    image: "../../image/apps/blog.jpg",
    link: "https://blog.ahmedalimsoliman.click",
  },
  {
    title: "Upload",
    image: "../../image/apps/upload.jpg",
    link: "https://upload.ahmedalimsoliman.click",
  },
  {
    title: "Fluid Gallery",
    image: "../../image/apps/fluid.jpg",
    link: "https://fluid.ahmedalimsoliman.click",
  },
  {
    title: "Gallery",
    image: "../../image/apps/gallery.jpg",
    link: "https://gallery.ahmedalimsoliman.click",
  },
  {
    title: "RLinktree",
    image: "../../image/apps/react.jpg",
    link: "https://react.ahmedalimsoliman.click",
  },
];
apps_i = [
  {
    title: "Ask Hound",
    image: "../../image/apps/hound.jpg",
    link: "/apps/houndify",
  },
  {
    title: "ToDo",
    image: "../../image/apps/2do.jpg",
    link: "/apps/todo",
  },
  {
    title: "Dog Picture Generator",
    image: "../../image/apps/dog.jpg",
    link: "/apps/dogsrand",
  },
  {
    title: "Calendar",
    image: "../../image/apps/calendar.jpg",
    link: "/apps/calendar",
  },
  {
    title: "Calculator",
    image: "../../image/apps/cal.jpg",
    link: "/apps/calculator",
  },
  {
    title: "Weather",
    image: "../../image/apps/wea.jpg",
    link: "/weather",
  },
];

router.get("/apps", function (req, res) {
  res.render("apps/apps", { apps_e: apps_e, apps_i: apps_i });
});

router.get("/apps/calculator", function (req, res) {
  res.render("apps/calculator");
});

router.get("/apps/calendar", function (req, res) {
  res.render("apps/calendar");
});

router.get("/apps/houndify", function (req, res) {
  res.render("apps/houndify");
});

router.get("/apps/todo", function (req, res) {
  res.render("apps/todo");
});

router.get("/apps/dogsrand", function (req, res) {
  res.render("apps/dogsrand");
});

router.get("/apps/harrypotter", function (req, res) {
  res.render("apps/harrypotter");
});

module.exports = router;

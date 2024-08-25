// const { use } = require("express/lib/application");

var express = require("express");
var app = express();
var expressSanitizer = require("express-sanitizer");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
require("dotenv").config();
var port = process.env.PORT || 3000;
var ipAddress = require("ip").address();
var hostName = require("os").hostname();
const ll = require('./middleware/utils');
const currentDate = new Date();
const currentTime = currentDate.toLocaleString();
// APP config
mongoose.connect(process.env.MONGO_DB_URI);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Mongoose/Model config
// cover Schema
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

// Compiling into a model
var Blog = mongoose.model("Blog", blogSchema);

// RESTful Routes
app.get("/", function (req, res) {
  ll.llog("Main route page rendered")
  res.redirect("/covers");
});

// Index route
app.get("/covers", function (req, res) {
  Blog.find({}, function (err, covers) {
    if (err) {
      console.log("Error");
    } else {
      res.render("index", { covers: covers });
    }
  });
});

// New route
app.get("/covers/new", function (req, res) {
  res.render("new");
});

// Create route
app.post("/covers", function (req, res) {
  req.body.cover.body = req.sanitize(req.body.cover.body);
  //Create cover
  Blog.create(req.body.cover, function (err, newcover) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/covers");
    }
  });
});

// Show route
app.get("/covers/:id", function (req, res) {
  Blog.findById(req.params.id, function (err, foundcover) {
    if (err) {
      res.redirct("/covers");
    } else {
      res.render("show", { cover: foundcover });
    }
  });
});

// Edit route
app.get("/covers/:id/edit", function (req, res) {
  Blog.findById(req.params.id, function (err, foundcover) {
    if (err) {
      res.redirect("/covers");
    } else {
      res.render("edit", { cover: foundcover });
    }
  });
});

// Update route
app.put("/covers/:id", function (req, res) {
  req.body.cover.body = req.sanitize(req.body.cover.body);
  Blog.findByIdAndUpdate(
    req.params.id,
    req.body.cover,
    function (err, updatedcover) {
      if (err) {
        res.redirect("/covers");
      } else {
        res.redirect("/covers/" + req.params.id);
      }
    }
  );
});

// Delete route
app.delete("/covers/:id", function (req, res) {
  Blog.findByIdAndUpdate(
    req.params.id,
    req.body.cover,
    function (err, updatedcover) {
      Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
          res.redirect("/covers");
        } else {
          res.redirect("/covers");
        }
      });
    }
  );
});


app.listen(port, () => {
  ll.llog("Service Information:");
  console.table({
    "App Name": 'Blog App Cover Letters',
    "Server Name": `${hostName}/${ipAddress}`,
    "Start Time": currentTime,
    "Server URL": `http://localhost:${port}`,
  });
});

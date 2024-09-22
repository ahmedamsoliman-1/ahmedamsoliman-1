var express = require("express");
var app = express();
var expressSanitizer = require("express-sanitizer");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var config = require('./config/config');
var port = process.env.PORT || 3000;
var ipAddress = require("ip").address();
var hostName = require("os").hostname();
const ll = require('./middleware/utils');
const dal = require('./dal');

const { setupMetrics } = require('./metrics');


setupMetrics(app); 

// App config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// RESTful Routes
app.get("/", function (req, res) {
  ll.llog("Main route page rendered")
  res.redirect("/covers");
});

// Index route
app.get("/covers", async function (req, res) {
  try {
    const covers = await dal.getAllCovers();
    res.render("index", { covers: covers });
  } catch (err) {
    console.error("Error retrieving covers", err);
  }
});

// New route
app.get("/covers/new", function (req, res) {
  res.render("new");
});

// Create route
app.post("/covers", async function (req, res) {
  req.body.cover.body = req.sanitize(req.body.cover.body);
  try {
    await dal.createCover(req.body.cover);
    res.redirect("/covers");
  } catch (err) {
    res.render("new");
  }
});

// Show route
app.get("/covers/:id", async function (req, res) {
  try {
    const foundCover = await dal.getCoverById(req.params.id);
    res.render("show", { cover: foundCover });
  } catch (err) {
    res.redirect("/covers");
  }
});

// Edit route
app.get("/covers/:id/edit", async function (req, res) {
  try {
    const foundCover = await dal.getCoverById(req.params.id);
    res.render("edit", { cover: foundCover });
  } catch (err) {
    res.redirect("/covers");
  }
});

// Update route
app.put("/covers/:id", async function (req, res) {
  req.body.cover.body = req.sanitize(req.body.cover.body);
  try {
    await dal.updateCover(req.params.id, req.body.cover);
    res.redirect("/covers/" + req.params.id);
  } catch (err) {
    res.redirect("/covers");
  }
});

// Delete route
app.delete("/covers/:id", async function (req, res) {
  try {
    await dal.deleteCover(req.params.id);
    res.redirect("/covers");
  } catch (err) {
    res.redirect("/covers");
  }
});

app.listen(port, () => {
  ll.llog("Service Information:");
  console.table({
    "App Name": 'Blog App Cover Letters',
    "DB": config.DB_TYPE,
    "Server Name": `${hostName}/${ipAddress}`,
    "Start Time": new Date().toLocaleString(),
    "Server URL": `http://localhost:${port}`,
  });
});

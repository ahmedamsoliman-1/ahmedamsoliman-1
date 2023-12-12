var express = require("express"),
  session = require("express-session"),
  mongoose = require("mongoose"),
  dynamodb = require("dynamodb"),
  hbs = require("hbs"),
  path = require("path"),
  fs = require("fs"),
  bodyParser = require("body-parser"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  https = require("https"),
  Houndify = require("houndify"),
  cors = require("cors"),
  fs = require("fs"),
  request = require("request"),
  app = express(),
  // Picture = require("./models/picture"),
  // Comment = require("./models/comment"),

  port = process.env.PORT || 80,
  ipAddress = require("ip").address(),
  hostName = require("os").hostname(),
  weatherData = require("./utils/weatherData"),
  indexRoutes = require("./routes/index"),
  gallaryRoutes = require("./routes/gallary"),
  yearsRoutes = require("./routes/years"),
  fellasRoutes = require("./routes/fellas"),
  screenshotsRoutes = require("./routes/screenshots"),
  oauRoutes = require("./routes/oau"),
  instagramRoutes = require("./routes/instagram"),
  linksRoutes = require("./routes/links"),
  videosRoutes = require("./routes/videos"),
  mangeRoutes = require("./routes/mange"),
  gamesRoutes = require("./routes/games"),
  weatherRoutes = require("./routes/weather"),
  digitalBadgesRoutes = require("./routes/badges"),
  appsRoutes = require("./routes/apps/apps"),
  appsRoutes_HarryPotter = require("./routes/apps/harryPotter"),
  linkedinRoutes = require("./routes/linkedin"),
  User = require("./models/user"),
  middleware = require("./middleware");

mongoose.connect(process.env.MONGO_URL);

// iam_original = process.env.iam_original;
// iam_thumb = process.env.iam_thumb;
// request(iam_original, function (error, response, body) {
//   fs.writeFileSync("public/data/iam_original.json", body);
// });
// request(iam_thumb, function (error, response, body) {
//   fs.writeFileSync("public/data/iam_thumb.json", body);
// });

// screenshots_original = process.env.screenshots_original;
// screenshots_thumb = process.env.screenshots_thumb;
// request(screenshots_original, function (error, response, body) {
//   fs.writeFileSync("public/data/screenshots_original.json", body);
// });
// request(screenshots_thumb, function (error, response, body) {
//   fs.writeFileSync("public/data/screenshots_thumb.json", body);
// });

// oau_original = process.env.oau_original;
// oau_thumb = process.env.oau_thumb;
// request(oau_original, function (error, response, body) {
//   fs.writeFileSync("public/data/oau_original.json", body);
// });
// request(oau_thumb, function (error, response, body) {
//   fs.writeFileSync("public/data/oau_thumb.json", body);
// });

// fellas_original = process.env.fellas_original;
// fellas_thumb = process.env.fellas_thumb;
// request(fellas_original, function (error, response, body) {
//   fs.writeFileSync("public/data/fellas_original.json", body);
// });
// request(fellas_thumb, function (error, response, body) {
//   fs.writeFileSync("public/data/fellas_thumb.json", body);
// });

// instagram = process.env.instagram;
// request(instagram, function (error, response, body) {
//   fs.writeFileSync("public/data/instagram.json", body);
// });

// videos_original = process.env.videos_original;
// request(videos_original, function (error, response, body) {
//   fs.writeFileSync("public/data/videos_original.json", body);
// });

// videos_thumb = process.env.videos_thumb;
// request(videos_thumb, function (error, response, body) {
//   fs.writeFileSync("public/data/videos_thumb.json", body);
// });

// certs_original = process.env.certs_original;
// request(certs_original, function (error, response, body) {
//   fs.writeFileSync("public/data/certs_original.json", body);
// });
// certs_thumb = process.env.certs_thumb;
// request(certs_thumb, function (error, response, body) {
//   fs.writeFileSync("public/data/certs_thumb.json", body);
// });

// dynamodb.connect("mongodb+srv://ahmed:123@cluster0.7ocrq.mongodb.net/yelp?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(cors());
// app.use(express.json());

// =========================================================
// Passport configurations
app.use(
  require("express-session")({
    secret: process.env.SECRET_PHRASE,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.message = req.flash();
  next();
});

// =========================================================

app.use(middleware.addTimestamp);
app.use(middleware.logger);

app.use(indexRoutes);
app.use(gallaryRoutes);
app.use(yearsRoutes);
app.use(fellasRoutes);
app.use(linksRoutes);
app.use(gamesRoutes);
app.use(weatherRoutes);
app.use(videosRoutes);
app.use(screenshotsRoutes);
app.use(oauRoutes);
app.use(instagramRoutes);
app.use(mangeRoutes);
app.use(appsRoutes);
app.use(digitalBadgesRoutes);
app.use(appsRoutes_HarryPotter);
app.use(linkedinRoutes);

//authenticates Houndify requests
app.get(
  "/houndifyAuth",
  Houndify.HoundifyExpress.createAuthenticationHandler({
    clientId: process.env.HOUNDIFY_CLIENT_ID,
    clientKey: process.env.HOUNDIFY_CLIENT_KEY,
  })
);

//sends the request to Houndify backend with authentication headers
app.post(
  "/textSearchProxy",
  bodyParser.text({ limit: "1mb" }),
  Houndify.HoundifyExpress.createTextProxyHandler()
);
// =========================================================

// console.log(process.env.WEATHER_API_SECRET_KEY);

app.listen(port, process.env.IP, function () {
  console.log(
    `Website server started on "${hostName}" at "http://${ipAddress}:${port}"`
  );
});

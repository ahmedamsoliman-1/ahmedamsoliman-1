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

  port = process.env.APP_PORT || 8080,
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
  User = require("./models/user");

mongoose.connect(process.env.MONGO_URL);

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

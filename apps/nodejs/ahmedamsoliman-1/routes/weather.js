var express = require("express");
var router = express.Router();
var weatherData = require("../utils/weatherData");

router.get("/weather", function (req, res) {
  res.render("weather/weatherapp", {
    title: "Weather Application",
  });
});

router.get("/weather/app", function (req, res) {
  var address = req.query.address;

  if (!address) {
    return res.send({
      error: "Must enter address!",
    });
  }

  weatherData(address, (error, { temperature, description, cityName } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    res.send({
      temperature,
      description,
      cityName,
    });
  });
});

module.exports = router;

var express = require("express");
var request = require("request");
var fs = require("fs");

var router = express.Router();

let options = { json: true };

let new_url_2d =
  "https://cxqjzhjthdy7ssvfzshhj7nyha0ifhbk.lambda-url.us-east-1.on.aws/";

// let new_url_2d = JSON.parse(
//   fs.readFileSync(
//     "public/data/aams-lambda-to-list-urls-certs-1-LambdaFunction-zlGfzQ9YM4vq_response.json",
//     "utf8"
//   )
// );

router.get("/badges", function (req, res_o) {
  request(new_url_2d, options, (error, res, body) => {
    res_o.render("badges", {
      aws_badges: res.body["Badges"],
      aws_cert: res.body["Certifications"],
      aws_train: res.body["Trainning"],
      hcl: res.body["HCL"],
      sdn: res.body["SDN"],
      percipio: res.body["Percipio"],
      linkedin: res.body["Linkedin"],
      other: res.body["Others"],
    });
  });
});

module.exports = router;

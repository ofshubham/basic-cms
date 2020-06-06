module.exports = function (app) {
  const bodyParser = require("body-parser");
  const cors = require("cors");
  // support parsing of application/json type post data
  app.use(bodyParser.json());
  //support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  //   app.get("/", (req, res) => {
  //     res.send("Hellow");
  //   });
  app.use("/api", require("./collections/post"));
  app.use("/api", require("./collections/user"));
  app.use("/api", require("./utility/auth"));
  // Catch all
  app.use("*", function (req, res, next) {
    res.status(404).json({ err: "Path" + req.originalUrl + " does not exist" });
  });
};

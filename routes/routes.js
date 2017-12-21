const mainRoutes = require("express").Router();

module.exports = (function() {
  mainRoutes
    .route("/register")
    .get((req, res) => {
      res.send("it works");
    })
    .post((req, res) => {
      res.send("it works");
    });

  mainRoutes
    .route("/login")
    .get((req, res) => {
     return res.send("it works");
    })
    .post((req, res) => {
     return  res.send("it works");
    });

  mainRoutes.route("/user/:userid").get((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/user/update").post((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/todo/new").get((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/todo/index").get((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/todo/create").post((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/todo/:id").get((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/todo/:id/update").post((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/logout").post((req, res) => {
    return res.send("it works");
  });

  return mainRoutes;
})();
const mainRoutes = require("express").Router();
const bodyParser  = require("body-parser");
// const express     = require("express");
// const app         = express();

mainRoutes.use(bodyParser.urlencoded({ extended: true }));



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

  mainRoutes.route("/").get((req, res) => {
    return res.render("index",
    {
    // errors: req.flash('errors'),
    // messages: req.flash('messages')
    });
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
    if (!req.body.todo) {
      // req.flash('errors', 'empty');
      res.redirect("/");
      return;
    }
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
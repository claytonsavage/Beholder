const mainRoutes = require("express").Router();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const ENV         = process.env.ENV || "development";
const knexConfig = require('../knexfile');
const knex = require("knex")(knexConfig[ENV]);

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
    knex.select('*').from('todo_list').then(rows => {
      // todo pass this information in a nice way to the browser
      // loop through the information and show it in the browser
      rows.forEach(function(element) {
    console.log(element.todo);
});
      knex.destroy()
    })

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
    } else {
      knex('todo_list').insert({'todo': req.body.todo, 'id': }).then(() => {
        res.redirect("/");
      });
    }
  })

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
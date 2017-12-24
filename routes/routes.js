const mainRoutes = require("express").Router();

module.exports = function(knex) {
  mainRoutes
    .route("/register")
    .get((req, res) => {


    })
    .post((req, res) => {

    });

  mainRoutes
    .route("/login")
    .get((req, res) => {
      if (req.session.userID) {
       return res.redirect('/');
      // que user by email and password from db
     // if verified => set session; req.session.userID = id (id from db);
    }})
    .post((req, res) => {
      knex.select('name','email','password', 'id').
          from("users").
          where("email", req.body.email).
          then((data) => {
            // console.log(data);
            if (req.body.password === data[0].password) {
              // set session
              req.session.userID = data[0].id;
              return res.redirect('/');
            }
            return res.send("wrong password");
          }).
          catch((err) => {
            console.log(err);
          });
    });

  mainRoutes.route("/").get((req, res) => {
      // if user logined => render todos from db
      // if not , ask user to login in

    knex.select('*').from('todo_list').then(rows => {
      // todo pass this information in a nice way to the browser
      // loop through the information and show it in the browser
      rows.forEach(function(element) {
    // console.log(element.todo);
});
    });
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
      knex('todo_list').insert({'todo': req.body.todo}).then(() => {
        res.redirect("/");
      }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
    }
  });

  mainRoutes.route("/todo/:id").get((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/todo/:id/update").post((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/logout").post((req, res) => {
    req.session.userID = null;
    return res.send(200);
  });

  return mainRoutes;
};
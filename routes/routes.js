const mainRoutes = require("express").Router();


module.exports = function(knex) {
  // mainRoutes
  //   .route("/register")
  //   .get((req, res) => {
  //     res.send("it works");

  //   })
  //   .post((req, res) => {
  //     res.send("it works");
  //   });

  mainRoutes
    .route("/login")
    .get((req, res) => {
     return res.send("it works");

    })
    .post((req, res) => {
          let loginDetails = false;
    if (!req.body.email || !req.body.password) {
      loginDetails = false;
      console.log('Email/Password field cannot be empty');
      return res.redirect('/');
    }
    knex.select('*').from('users')
    .then((result)=> {
      for (let user of result) {
        if (req.body.email === user.email) {
          // if (bcrypt.compareSync(password, user.pass_hash)) {

            loginDetails = true;
            let user_email = req.body.email;
            knex('users')
            .returning('id')
            .where('email', user_email)
            .then((user_id) => {
              console.log({user_id});
              req.session.user_id = user_id;
              return res.redirect('/');
            });
          //}
        }
      }
      if (!loginDetails) {
        console.log('Please enter a valid email/password');
        return res.redirect('/');
      }
    });
    });


  mainRoutes.route("/").get((req, res) => {
    knex.select('*').from('todo_list').then(rows => {
      // todo pass this information in a nice way to the browser
      // loop through the information and show it in the browser
      rows.forEach(function(element) {
    console.log(element.todo);
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
    return res.send("it works");
  });

  return mainRoutes;
};
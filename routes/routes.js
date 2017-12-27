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
            console.log("1", req.body.password);
            console.log("2", data[0].password);
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
    console.log('SESSION ID: ', res.session.userID);
    if (req.session.userID) {
      res.render('index');
      knex.select('todo').
      from('todo_list').
      where('user_id', req.session.userID).
      then(rows => {
        console.log('rows:', rows);
        //return res.render(req.session.userID[0]);
      }
      // if user logined => render todos from db
      // if not , ask user to login in
  );

} else {
  return res.render("index");
}
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
    knex.select('todo').
    from('todo_list').
    where('user_id', req.session.userID).
    then(rows => {
      return res.send(rows);
    }).
     catch((err) => {
            console.log(err);
          });
  });


  mainRoutes.route("/todo/create").post((req, res) => {
    console.log('BODY', req.body, 'USERID', req.session.userID);
    if (req.session.userID === undefined || !req.session) {
      // req.flash('errors', 'empty');
      return res.redirect("/");
    } else {
      knex('todo_list').insert({'todo': req.body.todo, 'user_id': req.session.userID, }).then(() => {
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
    console.log('RS', req.session);
    // res.redirect(300, "/");
    if (req.session.userID) {
      req.session.userID = null;
      return res.redirect('/');
    }
    return res.send("it doesn't work");
  });



  return mainRoutes;
};






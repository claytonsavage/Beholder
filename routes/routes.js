const mainRoutes = require("express").Router();
const yelp = require('yelp-fusion');
const getSecrets = require('../secrets');
const client = yelp.client(getSecrets.yelp_TOKEN);
const MovieDB = require('moviedb')(getSecrets.THEMOVIEDB_TOKEN);
const walmart = require('walmart')(getSecrets.walmart);

module.exports = function(knex) {
  mainRoutes
    .route("/register")
    .post((req, res) => {


      if (!req.body.email || !req.body.password) {
        return res.send(403, '<a href="/">email and password are required</a>');
      }


      knex('users').where('email', req.body.email).

        then((rows) => {
          if (rows.length) {
            return res.send(403, '<a href="/">E-mail not unique</a>');
          } else  {
            console.log("INSERT");


            knex('users').insert({
              name: req.body.username,
              email: req.body.email,
              password: req.body.password
            }).
              then(() => {
                return res.redirect('/');
              }).
              catch((err) => {
                console.log(err);
                return res.redirect('/');
              });
          }
        });
    });

  mainRoutes
    .route("/login")
    .get((req, res) => {
      if (req.session.userID) {
        return res.redirect('/');
      }
    })
    .post((req, res) => {
      knex.select('name', 'email', 'password', 'id').
        from("users").
        where("email", req.body.email).
        then((data) => {
          if (req.body.password === data[0].password) {
            req.session.userID = data[0].id;
            req.session.username = data[0].name;
            return res.redirect('/');
          }
          return res.send("wrong password");
        }).
        catch((err) => {
          console.log(err);
        });
    });

  mainRoutes.route("/").get((req, res) => {
    var loginName = [];
    if (req.session.userID) {
      knex('users').where({ id: req.session.userID }).then(rows => { return rows[0].name; });
      const useridentification = {userID: req.session.userID, username: req.session.username};
      res.render('index', useridentification);
      knex.select('todo').
        from('todo_list').
        where('user_id', req.session.userID);
    } else {
      return res.render("index", {userID: req.session.userID, username: req.session.username});
    }
  });

  mainRoutes.route("/user/:userid").get((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/user/update").post((req, res) => {
    console.log('id', req.session.userID);
    console.log("name", req.body.username);
    console.log("pass", req.body.password);
    knex('users').
      update({
        name: req.body.username,
        password: req.body.password
      }).
      where({'id': req.session.userID}).
      then(() => {
        return res.redirect('/');
      }).
      catch((err) => {
        return res.send(500);
      });
  });

  mainRoutes.route("/todo/:id/update/completed").post((req, res) => {
    knex('todo_list').where({ id: req.params.id}).update({completed: true}).then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  });

  mainRoutes.route("/todo/:id/update/incomplete").post((req, res) => {
    knex('todo_list').where({ id: req.params.id}).update({completed: false}).then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  });

  mainRoutes.route("/todo/:id/delete").post((req, res) => {
    knex('todo_list').where({ id: req.params.id}).del().then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  });

  mainRoutes.route("/todo/new").get((req, res) => {
    return res.send("it works");
  });

  mainRoutes.route("/todo/index").get((req, res) => {
    knex.select('todo', 'id', 'category_id', 'completed').
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
    if (req.session.userID === undefined || !req.session || !req.session.userID) {
      return res.redirect("/");
    } else {
      var str = req.body.todo;
      var watchResult = RegExp('watch', 'i').test(str);
      var bookResult = RegExp('read', 'i').test(str);
      var restuarantResult = RegExp('eat', 'i').test(str);
      var productResult = RegExp('buy', 'i').test(str);
      var catVar;

      if(watchResult === true) {
        catVar = 1;
      } else if (bookResult === true) {
        catVar = 2;
      } else if (restuarantResult === true) {
        catVar = 3;
      } else if (productResult === true) {
        catVar = 4;
      }

      if (req.session.userID) {
        knex('todo_list').insert({'todo': req.body.todo, 'user_id': req.session.userID, 'category_id': catVar, 'completed': false}).then(() => {
          res.redirect("/");
        }).catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
      } else {
        return res.redirect("/");
      }
    }
  });

  mainRoutes.route("/todo/:id").get((req, res) => {
    knex.select('todo', 'category_id').from('todo_list').
      where('id', req.params.id).
      then((data) => {
        var query = data[0].todo;
        var queryString = query.substr(query.indexOf(' ') + 1);
        if (data[0]['category_id'] === 3) {
          client.search({
            term: queryString,
            location: 'Vancouver'
          }).
            then(response => {
              return res.json(response.jsonBody.businesses[0]);
            }).
            catch(e => {
              console.log(e);
              return res.send(500);
            });
        } else if (data[0]['category_id'] === 2 || data[0]['category_id'] === 4) {
          walmart.search(queryString).
            then(function(data) {
              return res.json(data["items"][0]);
            });
        } else if (data[0]['category_id'] === 1) {
          MovieDB.searchMovie({ query: queryString }, (err, data) => {
            return  res.json(data);
          });
        }
      });
  });

  mainRoutes.route("/todo/:id/update/movie").post((req, res) => {
    knex('todo_list').where({ id: req.params.id }).update({category_id: 1}).then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  });
  mainRoutes.route("/todo/:id/update/book").post((req, res) => {
    knex('todo_list').where({ id: req.params.id }).update({category_id: 2}).then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  });
  mainRoutes.route("/todo/:id/update/restaurant").post((req, res) => {
    knex('todo_list').where({ id: req.params.id }).update({category_id: 3}).then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  });
  mainRoutes.route("/todo/:id/update/purchase").post((req, res) => {
    knex('todo_list').where({ id: req.params.id }).update({category_id: 4}).then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  });

  mainRoutes.route("/logout").post((req, res) => {
    if (req.session.userID) {
      req.session.userID = null;
      return res.redirect('/');
    }
    return res.send("it doesn't work");
  });

  return mainRoutes;
};






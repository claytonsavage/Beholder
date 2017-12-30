const mainRoutes = require("express").Router();
const yelp = require('yelp-fusion');
const getSecrets = require('../secrets');
const client = yelp.client(getSecrets.yelp_TOKEN);
const MovieDB = require('moviedb')(getSecrets.THEMOVIEDB_TOKEN);
const walmart = require('walmart')(getSecrets.walmart);

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
            //console.log("1", req.body.password);
            //console.log("2", data[0].password);
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
    var loginName = [];
    //console.log('SESSION ID: ', req.session.userID);

    if (req.session.userID) {
      // const username = { 'key': req.session.userID };
      // console.log('KONRAD ============>', username['key']);
      // // console.log('KNEX =====>', knex.select('name').from('users').where(id = username['key']));
      // console.log('LOOOOK ---------------------', knex('users').whereRaw('id = ?', [1]));
      knex('users').where({ id: req.session.userID }).then(rows => { return rows[0].name; });
      //console.log('LOGINNNNNNN ===', loginName);
      const useridentification = { key: "TEST" };
      res.render('index', useridentification);
      knex.select('todo').
      from('todo_list').
      where('user_id', req.session.userID).
      then(rows => {
        //console.log('rows:', rows);
        // return res.render(req.session.userID[0]);
      }
      // if user logined => render todos from db
      // if not , ask user to login in
  );

} else {
  //console.log('taking else route');
  return res.render("index", {key: 'Login To Get Started!'});
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
    knex.select('todo', 'id', 'category_id').
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
    //console.log('BODY', req.body, 'USERID', req.session.userID);
    if (req.session.userID === undefined || !req.session) {
      // req.flash('errors', 'empty');
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

      knex('todo_list').insert({'todo': req.body.todo, 'user_id': req.session.userID, 'category_id': catVar}).then(() => {
        res.redirect("/");
      }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
    }
  });


//knex.select('title', 'author', 'year').from('books')

// --------- YELP API SET UP -----------

  mainRoutes.route("/todo/:id").get((req, res) => {
    //console.log('PARAMS', req.params);
    knex.select('todo', 'category_id').from('todo_list').
    where('id', req.params.id).
    then((data) => {
      //console.log(data[0].todo);
      var query = data[0].todo;
      var queryString = query.substr(query.indexOf(' ') + 1);
      //console.log('DATA ========>>>>>', data);

      if (data[0]['category_id'] === 3) {
        client.search({
        term: queryString,
        location: 'Vancouver'
      }).
      then(response => {
      console.log('YELP API OUTPUT ------->', 'Rating: ', response.jsonBody.businesses[0].rating, 'Price: ', response.jsonBody.businesses[0].price);
        return res.json(response.jsonBody.businesses[0]);
        console.log('Price: ', data.price, 'Rating: ', data.rating, 'Address', data.location.address1);

      }).
      catch(e => {
        console.log(e);
        return res.send(500);
      });
      } else if (data[0]['category_id'] === 2 || data[0]['category_id'] === 4) {
        walmart.search(queryString).
        then(function(data) {
        console.log('Title: ', data["items"][0]["name"], 'Price: $', data["items"][0]["salePrice"], 'Category: ', data["items"][0]['categoryPath'], 'Description: ', data["items"][0]['categoryPath']);
        return res.json(data["items"][0]);
        });
      } else if (data[0]['category_id'] === 1) {
            MovieDB.searchMovie({ query: queryString }, (err, data) => {
        console.log(`Review: ${data['results'][0]['vote_average']} Overview: ${data['results'][0]['overview']}`);
      return  res.json(data);

    });
      }
    });
  });


// ---------- Walmart API ---------



// mainRoutes.route("/todo/:id").get((req, res) => {
//   knex
//     .select("todo", "category_id")
//     .from("todo_list")
//     .where("id", req.params.id)
//     .then(data => {
//       walmart.search('Toilet paper').
//       then(function(data) {
//         console.log('Title: ', data["items"][0]["name"], 'Price: $', data["items"][0]["salePrice"], 'Category: ', data["items"][0]['categoryPath'], 'Description: ', data["items"][0]['categoryPath']);
//         return res.json(data["items"][0]);
//       });
//     });
// });



// ---------Movie API ------------------

  //   mainRoutes.route("/todo/:id").get((req, res) => {
  //   knex.select('todo', 'category_id').from('todo_list').
  //   where('id', req.params.id).
  //   then((data) => {

    //  MovieDB.searchMovie({ query: 'Shrek' }, (err, data) => {
    //   console.log(`Review: ${data['results'][0]['vote_average']} Overview: ${data['results'][0]['overview']}`);
    //   return  res.json(data);

    // });

  //   });

  // });






  mainRoutes.route("/todo/:id/update").post((req, res) => {
    return res.send("it works");
  });



  mainRoutes.route("/logout").post((req, res) => {
    //console.log('RS', req.session);
    // res.redirect(300, "/");
    if (req.session.userID) {
      req.session.userID = null;
      return res.redirect('/');
    }
    return res.send("it doesn't work");
  });



  return mainRoutes;
};






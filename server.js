
"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const flash       = require('connect-flash');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const session     = require('cookie-session');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const mainRoutes  = require("./routes/routes");
// const mainRoutes = express.Router();
//API's
const getSecrets = require('./secrets');
const MovieDB = require('moviedb')(getSecrets.THEMOVIEDB_TOKEN);
const walmart = require('walmart')(getSecrets.walmart);
const books = require('google-books-search');
//development testing
const userInput = process.argv[2];
//purchases
// walmart.search(removeCategory).then(function(item) {
//   console.log(item['items'][0]['name'], item['items'][0]['salePrice']);
// });
//books
// books.search('Professional JavaScript for Web Developers', function(error, results) {
//     if ( ! error ) {
//         console.log(results[0]['authors'], results[0]['categories'], results[0]['link'], results[0]['thumbnail']);
//     } else {
//         console.log(error);
//     }
// });
//movies
// MovieDB.searchMovie({ query: 'Shrek' }, (err, res) => {
//   // console.log(`Review: ${res['results'][0]['vote_average']} Overview: ${res['results'][0]['overview']}`);
// });
//places to eat
const yelp = require('yelp-fusion');

const client = yelp.client(getSecrets.yelp_TOKEN);

// client.search({
//   term: req.params,
//   location: 'Vancouver'
// }).then(response => {
//   //console.log(response.jsonBody.businesses[0].rating, response.jsonBody.businesses[0].price);
// }).catch(e => {
//   console.log(e);
// });


// app.use((req, res, next) => {
//   res.locals.userID = req.session.userID;
//   next();
// });



// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(session({
  name: 'session',
  keys: ['hello'],
  // Cookie Options
}));

// flash
app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/todo", mainRoutes(knex));

// Home page
app.get("/", (req, res) => {
   if (req.session.userID) {
      // const username = { 'key': req.session.userID };
      knex('users').where({ id: req.session.userID }).then(rows => { return rows[0].name; });
      const useridentification = { key: "TEST" };
      res.render('index', useridentification);
      knex.select('todo').
      from('todo_list').
      where('user_id', req.session.userID).
      then(rows => {
      }
  );
      res.render("index", {userID: req.session.userID,
                          key: 'test'}
                        );
  } else {
  //console.log('taking else route');
  console.log("here2");
  return res.render("index", {userID: "Not login"});
  }
});


app.use(mainRoutes(knex));


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});




  // mainRoutes.route("/").get((req, res) => {
//     var loginName = [];
//     //console.log('SESSION ID: ', req.session.userID);

//     if (req.session.userID) {
//       const username = { 'key': req.session.userID };
//       // console.log('KONRAD ============>', username['key']);
//       // // console.log('KNEX =====>', knex.select('name').from('users').where(id = username['key']));
//       // console.log('LOOOOK ---------------------', knex('users').whereRaw('id = ?', [1]));
//       knex('users').where({ id: req.session.userID }).then(rows => { return rows[0].name; });
//       //console.log('LOGINNNNNNN ===', loginName);
//       const useridentification = { key: "TEST" };
//       res.render('index', useridentification);
//       knex.select('todo').
//       from('todo_list').
//       where('user_id', req.session.userID).
//       then(rows => {
//         //console.log('rows:', rows);
//         // return res.render(req.session.userID[0]);
//       }
//       // if user logined => render todos from db
//       // if not , ask user to login in

//   );
//       console.log("here1");
//       console.log(req.session.userID);
//       return res.render("index", {userID: req.session.userID});
//   } else {
//   //console.log('taking else route');
//   console.log("here2");
//   return res.render("index", {userID: "Not login"});
//   }
// });



























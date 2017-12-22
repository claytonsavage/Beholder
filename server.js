"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const mainRoutes  = require("./routes/routes");
// const mainRoutes = express.Router();
//API's
const getSecrets = require('./secrets');
const MovieDB = require('moviedb')(getSecrets.THEMOVIEDB_TOKEN);
const walmart = require('walmart')(getSecrets.walmart);

walmart.search('iphone').then(function(item) {
  console.log(item['items'][0]['msrp'], item['items'][0]['name'], item['items'][0]['salePrice']);
});

var books = require('google-books-search');

books.search('Professional JavaScript for Web Developers', function(error, results) {
    if ( ! error ) {
        console.log(results[0]['authors'], results[0]['categories'], results[0]['link'], results[0]['thumbnail']);
    } else {
        console.log(error);
    }
});

MovieDB.searchMovie({ query: 'Alien' }, (err, res) => {
  console.log(`Review: ${res['results'][0]['vote_average']} Overview: ${res['results'][0]['overview']}`);
});



// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(mainRoutes);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

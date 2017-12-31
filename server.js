
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
const mainRoutes  = require("./routes/routes");
// const mainRoutes = express.Router();
//API's
const getSecrets = require('./secrets');
const MovieDB = require('moviedb')(getSecrets.THEMOVIEDB_TOKEN);
const walmart = require('walmart')(getSecrets.walmart);
const books = require('google-books-search');
//development testing
const userInput = process.argv[2];
const yelp = require('yelp-fusion');

const client = yelp.client(getSecrets.yelp_TOKEN);
app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(session({
  name: 'session',
  keys: ['hello']
}));
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
app.use("/api/todo", mainRoutes(knex));
app.use(mainRoutes(knex));
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

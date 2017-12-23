"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("todo")
      .from("todo_list")
      // .where("user_id" === 2)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
};

"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/poll", (req, res) => {
    knex
      .select("*")
      .from("poll")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id/results", (req, res) => {
  knex
    .select("*")
    .from("poll")
    .join("responses", {"poll.id": "poll_id"})
    .then((results) => {
      res.json(results);
    });
  });

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("poll")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/poll", (req, res) => {
    // knex('poll')
    //   .insert({ req.body });
  });

  router.post("/poll/results", (req, res) => {
    // knex('results')
    //   .insert({ req.body })
  });

  return router;
}

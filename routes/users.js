"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });

  router.post("/poll", (req, res) => {
    knex('poll')
      .insert({
        email: 'hello',
        options: '[world]',
        question: 'Where do you want to eat?',
        emails: '[my@emails.com]'
  });

  // router.post("/poll/results", (req, res) => {
  //   knex('results')
  //     .insert({ req.body })
  // });

  // router.get("/poll", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("poll")
  //     .then((results) => {
  //       res.json(results);
  //     });
  // });

  // router.get("/poll/results", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("results")
  //     .join("poll". "poll.url", "=", "poll_url")
  //     .then((results) => {
  //       res.json(results);
  //     });
  // });

  return router;
}
}

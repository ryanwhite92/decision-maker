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

  router.get("/poll/results", (req, res) => {
  knex
    .select("*")
    .from("poll")
    .join("response", {"poll.url": "poll_url"})
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
    const emails = req.body.emails.split(', ');
    const newPoll = {
      question: req.body.question,
      email: req.body.email,
      options: [req.body.option1, req.body.option2, req.body.option3, req.body.option4],
      url: req.body.url,
      emails: emails
    };

    knex('poll')
      .insert(newPoll)
      .then(rows => {
        console.log(rows);
      })
      .catch(error => console.error(error));

      // Temporary redirect to index
      res.redirect('/');
  });

  router.post("/poll/results", (req, res) => {
    const newResponse = {
      ranks: JSON.parse(req.body.ranking),
      poll_url: req.body.url
    };

    knex('response')
      .insert(newResponse)
      .then(rows => console.log(rows))
      .catch(error => console.error(error));
  });

  return router;
}

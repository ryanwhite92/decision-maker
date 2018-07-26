"use strict";

const express = require('express');
const router  = express.Router();
const math = require('../public/scripts/math');

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
    const pollUrl = math.generateRandomString(10);
    const emails = req.body.emails.split(', ');
    const newPoll = {
      question: req.body.question,
      email: req.body.email,
      options: [req.body.option1, req.body.option2, req.body.option3, req.body.option4],
      url: pollUrl,
      emails: emails
    };

    knex('poll')
      .insert(newPoll)
      .then(rows => {
        console.log(rows);
      })
      .catch(error => console.error(error));
      res.redirect(`/poll/${pollUrl}`);
  });

  router.post("/poll/:pid/results", (req, res) => {
    const newResponse = {
      ranks: JSON.parse(req.body.ranking),
      poll_url: req.params.pid
    };

    knex('response')
      .insert(newResponse)
      .then(rows => console.log(rows))
      .catch(error => console.error(error));

    res.redirect(`/poll/${req.params.pid}/results`);
  });

  return router;
}

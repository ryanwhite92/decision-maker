"use strict";

const express = require('express');
const router  = express.Router();
const math = require('../public/scripts/math');
const mailgun = require('./util/mailgun.js');

module.exports = (knex) => {

  router.get("/poll", (req, res) => {
    knex('poll')
      .select("*")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/poll/:pid/response", (req, res) => {
    try {
      knex('response')
        .select('*')
        .where({ "poll_url": req.params.pid })
        then(results => {
          res.json(results);
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.error(error);
    }
  });

  router.get("/poll/:pid/results", (req, res) => {
    knex('poll')
      .select("poll.options", "poll.question", "response.ranks")
      .join("response", {"poll.url": "poll_url"})
      .where({ "poll.url": req.params.pid })
      .then((results) => {
        try {
          const options = results[0].options;
          const question = results[0].question;
          const rankedArray = [];

          // Get ranks array from each response in db
          results.forEach((result) => {
            rankedArray.push(result.ranks);
          });

          // Sum ranks by index in rankedArray
          let ranks = rankedArray.reduce((accumulator, current) => {
            current.forEach((num, i) => {
              accumulator[i] = (accumulator[i] || 0) + num;
            });
            return accumulator;
          }, []);

          res.json({ options, question, ranks });
        } catch (error) {
          console.error(error);
        }
      });
  });

  router.get("/", (req, res) => {
    knex('poll')
      .select("*")
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/poll", (req, res) => {
    let optionArr = [];
    let val = Object.values(req.body);
    let key = Object.keys(req.body);
    for (let i = 0; i < val.length; i++) {
      if (key[i].includes("option")) {
        optionArr.push(val[i]);
      }
    }
    const pollUrl = math.generateRandomString(10);
    const emails = req.body.emails.split(', ');
    const newPoll = {
      question: req.body.question,
      email: req.body.email,
      options: optionArr,
      url: pollUrl,
      emails: emails
    };

    knex('poll')
      .insert(newPoll)
      .then(rows => {
        console.log(rows);
      })
      .catch(error => console.error(error));

    mailgun.sendEmail(newPoll);
    mailgun.sendInvites(newPoll);

    res.redirect(`/poll/${pollUrl}/results`);
  });

  router.post("/poll/:pid/results", (req, res) => {
    const newResponse = {
      ranks: JSON.parse(req.body.ranking),
      email: JSON.parse(req.body.email),
      poll_url: req.params.pid
    };

    knex('response')
      .insert(newResponse)
      .then(rows => console.log(rows))
      .catch(error => console.error(error));

    knex('poll')
      .select('email', 'question', 'url')
      .where({ 'url': req.params.pid })
      .then((result) => {
        //console.log(result);
        mailgun.sendEmail(result[0]);
      })
      .catch((error) => console.err(error));

    const redirect = `/poll/${req.params.pid}/results`;
    res.json({ redirect });
  });

  return router;
}

# Node Skeleton

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above

## Goal

Build a web app from start to finish using the tech and approaches learned to date
Turn requirements into a working product
Practice architecting an app in terms of UI/UX, Routes/API and Database
Manage a multi-developer project with git
Simulate the working world where you do not always get to completely cherry pick your team, stack or product features
Practice demoing an app to help prepare for the final project and employer interviews

## Stack Requirements

Your projects must use:

ES6 for server-side (Node) code
ES5 for front-end code
Node
Express
RESTful routes
Using AJAX or complete SPA approach is optional
One of the following two CSS grid and UI frameworks
Bootstrap 3
Zurb Foundation 5
jQuery
SASS for styling
PostgreSQL for DB
Knex.js for querying and migrations
git for version control
heroku for hosting (hosting is optional)

## Decision Maker

A web app that helps groups of friends to vote on a preferred choice (using ranked voting), for example: "What movie should we see next Friday?".

## Requirements

a user can create a poll with multiple choices
each choice can have a title and optional description
the creator must enter an email
when a poll is finished being created, the user is given two links: an administrative link (which lets them access the results) and a submission link (which the user sends to their friends)
the links are also sent to the creator via email (using mailgun)
when a user visits the submission link, they enter their name if required (see extensions) and see a list of the choices for that poll
the user can rank the choices (by drag and drop, or some other method) and then submits the poll
each time a submission is received, the creator is notified with an email (which includes the administrative link and a link to the results)
the results are ranked using the Borda Count method: https://en.wikipedia.org/wiki/Borda_count
note: this app does not follow the typical user authentication process: voters don't need to register or log in and the only way to access the polls or see the results is via linksgit 

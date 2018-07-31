# Decision Maker

Decision Maker is a full stack web application that helps groups of friends make a poll and vote for their preferred poll choice (using ranked voting). Decision Maker can be tested and used by visiting https://boiling-meadow-35275.herokuapp.com/.

## Screenshots
!["Screenshot of main page"](https://github.com/ryanwhite92/decision-maker/blob/master/docs/index.png?raw=true)
!["Screenshot of poll page"](https://github.com/ryanwhite92/decision-maker/blob/master/docs/poll.png?raw=true)
!["Screenshot of results page"](https://github.com/ryanwhite92/decision-maker/blob/master/docs/results.png?raw=true)

## Goal

- Build a midterm project for Lighthouse Labs
- Build a web app from start to finish using the tech and approaches learned to date
- Turn requirements into a working product
- Practice architecting an app in terms of UI/UX, Routes/API and Database
- Manage a multi-developer project with git
- Simulate the working world where you do not always get to completely cherry pick your team, stack or product features
- Practice demoing an app to help prepare for the final project and employer interviews

## Dependencies

- node 8.9.4 or above
- npm 3.8.x or above
- body-parser
- brew
- dotenv
- ejs
- express
- knex
- knex-logger
- mailgun
- mailgun-js
- morgan
- node-sass-middleware
- pg

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

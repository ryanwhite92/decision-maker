const api_key = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
const fs = require('fs');

module.exports = {

  sendEmail: function(data) {
    const url = `http://localhost:8080/poll/${data.url}`
    const content = fs.readFile(__dirname + "/email.html", "utf-8");
    const content2 = fs.readFile(__dirname + "/email-end.html", "utf-8");
    const mailgunSetup = {
      from: 'admin@dside.com',
      to: data.email,
      subject: `dSide - ${data.question}`,
      html: content + url + content2
    };

    mailgun.messages().send(mailgunSetup, (err, body) => {
      if (err) return console.error(err);
    });
  },

    sendInvites: function(data) {
    const url = `http://localhost:8080/poll/${data.url}`
    for (let i = 0; i < data.emails.length; i++) {
      let mailgunSetup = {
        from: 'admin@dside.com',
        to: data.emails[i],
        subject: `dSide - ${data.question}`,
        text: `You've been invited to answer the following:\n${data.question}\nClick here to submit your answer:\n${url}`
      };

      mailgun.messages().send(mailgunSetup, (err, body) => {
        if (err) return console.error(err);
        //console.log(mailgunSetup);
      });
    }
  }

};

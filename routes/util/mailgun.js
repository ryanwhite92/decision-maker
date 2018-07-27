const api_key = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

module.exports = {

  sendEmail: function(data) {
    console.log(data);

    const mailgunSetup = {
      from: 'admin@dside.com',
      to: data.email,
      subject: `dSide - ${data.question}`,
      text: 'poll text'
    };

    mailgun.messages().send(mailgunSetup, (err, body) => {
      if (err) return console.error(err);
      console.log(mailgunSetup);
    });
  }
};

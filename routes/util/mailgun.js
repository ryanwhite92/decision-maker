const api_key = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
const fs = require('fs');

module.exports = {

  sendEmail: function(data) {
    const url = `https://boiling-meadow-35275.herokuapp.com/poll/${data.url}/results`
    const ugly = '">Your Current Results</a></td></tr></tbody></table></td></tr></tbody></table><p align="center">dSide is a service that allows busy people to make group decisions with ease</p><p align="center">If you have a group decision to make, click <a href="https://boiling-meadow-35275.herokuapp.com/">here</a></p></td></tr></table></td></tr></table><div class="footer"><table border="0" cellpadding="0" cellspacing="0"><tr><td class="content-block"><span class="apple-link">The Basement<br>838 Fort St<br>Victoria<br>BC V8W 1H8</span><br> Is this an unwanted email? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a></td></tr><tr></tr></table></div></div></td><td>&nbsp;</td></tr></table></body></html>'
    fs.appendFileSync(__dirname + "/email2.html", url);
    fs.appendFileSync(__dirname + "/email2.html", ugly)
    let content = fs.readFileSync(__dirname + "/email2.html", "utf-8");
    let mailgunSetup = {
      from: 'admin@dside.com',
      to: data.email,
      subject: `dSide - ${data.question}`,
      html: content
    };

    mailgun.messages().send(mailgunSetup, (err, body) => {
      if (err) return console.error(err);
    });
  },

  sendInvites: function(data) {
    const url = `https://boiling-meadow-35275.herokuapp.com/poll/${data.url}`
    let ugly = '">Cast your vote here</a></td></tr></tbody></table></td></tr></tbody></table><p align="center">dSide is a service that allows busy people to make group decisions with ease</p><p align="center">If you have a group decision to make, click <a href="https://boiling-meadow-35275.herokuapp.com/">here</a></p></td></tr></table></td></tr></table><div class="footer"><table border="0" cellpadding="0" cellspacing="0"><tr><td class="content-block"><span class="apple-link">The Basement<br>838 Fort St<br>Victoria<br>BC V8W 1H8</span><br> Is this an unwanted email? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a></td></tr><tr></tr></table></div></div></td><td>&nbsp;</td></tr></table></body></html>'
    fs.appendFileSync(__dirname + "/email.html", url);
    fs.appendFileSync(__dirname + "/email.html", ugly)
    let content = fs.readFileSync(__dirname + "/email.html", "utf-8");

    for (let i = 0; i < data.emails.length; i++) {
      let mailgunSetup = {
        from: 'admin@dside.com',
        to: data.emails[i],
        subject: `dSide - ${data.question}`,
        html: content
      };

      mailgun.messages().send(mailgunSetup, (err, body) => {
        if (err) return console.error(err);

      });
    }
  }

};

const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
require('dotenv').config();

var api_key = 'key-6acc6b39ed0622949853f0e6155530c9';
var domain = 'sandbox597f2d99b2cc425ea38b3bcbfef1db59.mailgun.org';
const mg = mailgun({ apiKey: api_key, domain: domain });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    const email = req.body.email;

    const data = {
        from: "aadarsh4751.be22@chitkara.edu.in",
        to: "aadarsh4751.be22@chitkara.edu.in",
        subject: 'Welcome to Deakin!',
        text: 'Welcome to deakin subscription, now you will be able to get latest updates. Thankyou'
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent:", body);
            res.send("Your email was sent successfully");
        }
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running at port ${port}!!!');
});
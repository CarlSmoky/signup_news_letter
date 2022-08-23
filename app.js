import express from 'express';
import https from "node:https";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";
import 'dotenv/config';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
})

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_field: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const API_SERVER = `us13`;
  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}`;
  const options = {
    method: "POST",
    auth: `kaoru:${process.env.API_KEY}`
  }
  
  const request = https.request(url, options, (response) => {

    if (response.statusCode === 200) {
      res.sendFile(`${__dirname}/success.html`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }
    response.on("data", data => {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
  
});

app.post('/failure', (req, res) => {
  res.sendFile(`${__dirname}/signup.html`)
})

app.listen(3001, (req, res) => {
  console.log("I'm listening 3001");
  // console.log(__dirname);
})

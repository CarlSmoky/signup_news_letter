import express from 'express';
import https from "node:https"; import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
})

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  res.write(`<h1>Name is ${firstName} ${lastName}</h1>`);
  res.write(`<h2>${email}</h2>`);

  res.send();
})



app.listen(3001, (req, res) => {
  console.log("I'm listening 3001");
  // console.log(__dirname);
})

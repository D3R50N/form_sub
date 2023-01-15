const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const config = require("./config");
const crypto = require("crypto");

const db = require("./db");
const tables = require("./db/tables");
const User = require("./db/models/user");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("signup");
});

app.listen(config.port, () => {
  console.clear();
  console.log(`Server started on port http://localhost:${config.port}`);
  db.connect();
  // tables.create_users_table();
});

app.post("/signup", (req, res) => {
  const passcode = crypto.randomBytes(6).toString("hex").toUpperCase();
  const uid = str_to_uid(req.body.name.toLowerCase());
  const user = new User(
    uid,
    escape_str(req.body.name),
    req.body.email,
    passcode,
    req.body.phrase
  );
    user.save();
  res.json(user);
});

function escape_str(str = "") {
  return str
    .trim()
    .replace(/\!/g, "")
    .replace(/\?/g, "")
    .replace(/\:/g, "")
    .replace(/\;/g, "")
    .replace(/\'/g, "")
    .replace(/\"/g, "")
    .replace(/\,/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "");
}
function str_to_uid(str='') {
    return escape_str(str).replace(/\s/g, "-").replace(/\./g, "-");
}
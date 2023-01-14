const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const config = require("./config");

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
  console.log(`Server started on port http://localhost:${config.port}`);
});

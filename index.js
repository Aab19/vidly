const express = require("express");
const app = express();
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app:startup");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
require("express-async-errors");
require("./startup/db")();
require("./startup/config")();
require("./startup/routes")(app);
require("./startup/prod")(app);

process.on("unhandledRejection", ex => {
  throw ex;
});

app.use(express.json()); // built in middleware

app.use(express.urlencoded({ extended: true })); // built in middleware
app.use(express.static("public")); // built in middleware

console.log("Application name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));

debug("Enter");

// Detect env to conditional apply middleware
if (app.get("env") || process.env.NODE_ENV === "development") {
  app.use(morgan("tiny")); // third party middleware
  debug("Morgan enabled...");
}

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;

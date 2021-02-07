const express = require("express");
const app = express();

const todoRoute = require("./todo");

app.use("/todo", todoRoute);

module.exports = app;

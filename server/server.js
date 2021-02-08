const express = require("express");
 const app = express();
const bodyparser = require("body-parser");
const path = require("path");

//parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: false}));

//parse application/json
app.use(bodyparser.json());

// add cross origin support
app.use((_req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

//enable server routes
app.use(require("./routes/index"));

//enable angular app
app.use(express.static(path.resolve(__dirname, "../dist/todo")));

//catch all and redirect to angular app
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/todo/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info("Listening on port: " + port);
});

module.exports = app;

const express = require("express");
 const app = express();
const bodyparser = require("body-parser");
const path = require("path");

app.use(bodyparser.json({
  limit: 1024 * 124 * 50, //50Mb
  type: "application/json"
}));

if(process.env.ENV === "local"){
  const cors = require("cors");
  app.use(cors({
    origin: "http://localhost:4200"
  }));
}

//enable server routes
app.use(require("./routes/index"));

//enable angular app
app.use(express.static(path.resolve(__dirname, "../dist/todo")));

//catch all and redirect to angular app
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/todo/index.html"));
});

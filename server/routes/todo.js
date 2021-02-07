const express = require("express");
const router = express.Router();
const dbconn = require('../utils/dbconn');

router.get('/', async(req, res) => {
  let appError;
  const page = req.query.page || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  const liststatement = `SELECT * FROM ToDo LIMIT ${offset}, ${limit}`;
  const totalStatement = `SELECT COUNT(Id) AS total FROM ToDo`;

  const listResult = await dbconn.execute(liststatement).catch(error => {
    console.log("Error querying Todo: " + error);
    appError = error;
  });

  if(!listResult){ return res.status(500).send(appError.message);}

  const total = await dbconn.execute(totalStatement);
  const hasMore = (offset + limit) < total[0].total;

  res.status(200).send({
    todos: listResult,
    hasMoreitems: hasMore
  });

});

router.post("/", async(req, res) => {
  const payload = req.body;
  let appError;

  if(!payload){
    return res.status(400).send({
      message: "invalid request",
      details: "request body is required"
    });
  }

  const insertCols = [];
  const insertValues = [];
  for(let prop in payload){
    insertCols.push(prop);
    const escaped = dbconn.strEsc(payload[prop]);
    insertValues.push(escaped);
  }

  const insertStatement = `INSERT INTO ToDo(${insertCols.join(",")}) VALUES(${insertValues.join(",")})`;
  const insertResult = await dbconn.execute(insertStatement).catch(error => {
    console.log("Error inserting new todo: " + erro);
    appError = error;
  });

  if(!insertResult){return res.status(500).send(appError.message);}

  payload.Id = insertResult.insertId;

  res.status(200).send(payload);
});

router.put("/:id", async(req, res) => {
  const id = req.params.id;
  let appError;

  if(!id){
    return res.status(400).send({
      message: "Invalid request",
      details: "Id is required"
    });
  }

  const payload = req.body.todo;
  const updatedValues = [];
  delete payload.Id;
  for(let prop in payload){
    const escaped = dbconn.strEsc(payload[prop]);
    updatedValues.push(`${prop}=${escaped}`);
  }

  const updateStatement = `UPDATE ToDo SET ${updatedValues.join(",")} WHERE Id=${id}`;
  const updateResult = await dbconn.execute(updateStatement).catch(error => {
    console.log("Error Updating Todo: " + error);
    appError = error;
  });

  if(!updateResult){return res.status(500).send(appError.message);}

  res.status(200).send(payload);
});

router.delete("/:id", async(req, res) => {
  const id = req.params.id;
  let appError;

  if(!id){
    return res.status(400).send({
      message: "Invalid request",
      details: "Id is required"
    });
  }

  const deleteStatement = `DELETE FROM ToDo WHERE Id='${id}'`;
  const deleteResult = dbconn.execute(deleteStatement).catch(error => {
    console.log("Error deleting Todo: " + error);
    appError = error;
  });

  if(!deleteResult){return res.status(500).send(appError.message);}

  res.status(204).send();
});

module.exports = router;

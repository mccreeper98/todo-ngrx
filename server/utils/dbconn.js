const mysql = require("mysql");

const connectOptions = {
  connectionLimit: 10,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_KEY
};

if(process.env.NODE_ENV === "development"){
  connectOptions.host = process.env.DB_HOST;
}else{
  connectOptions.socketPath = process.env.CLOUD_SQL_CONNECTION_NAME;
}

const pool = mysql.createPool(connectOptions);

const execute = async(sqlStatement) => {
  return new Promise((resolve, reject) => {
    pool.query(sqlStatement, (error, results) => {
      if(error){
        reject(error);
      }else{
        resolve(results);
      }
    });
  });
};

const strEsc = (data) => {
  return pool.escape(data);
};

module.exports = {
  execute,
  strEsc
};

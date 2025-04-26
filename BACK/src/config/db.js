import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool
  .getConnection()
  .then((connection) => {
    connection.release();
  })
  .catch((err) => {
  });

export default pool;

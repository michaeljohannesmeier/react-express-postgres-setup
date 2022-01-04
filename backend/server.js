// imports
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const { Pool } = require('pg')

// middlewares
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// connection to database
const pool = new Pool({
  user: "postgres",
  host: "test-postgres",
  database: "test",
  password: "test-postgres",
  port: "5432"
});


// create tables if they do not already exist
pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(200));')


// database queries
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


// rest api endpoints
app.get("/", async (req, res) => {
  console.log("in / get request");
  res.send("Hello World!");
});
app.get("/users", getUsers);


// server start
const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

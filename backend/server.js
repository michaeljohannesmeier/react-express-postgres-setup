const express = require("express");
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const port = 3001;

const { Pool } = require('pg')
const pool = new Pool({
  user: "postgres",
  host: "test-postgres",
  database: "test",
  password: "test-postgres",
  port: "5432"
});
console.log('connected..')
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
app.get("/", async (req, res) => {
  console.log("in / get request");
  res.send("Hello World!");
});
app.get("/users", getUsers);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

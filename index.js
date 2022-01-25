var mysql = require('mysql');
const express = require('express')
const { body, validationResult } = require('express-validator');

var User = {
  username: '',
  password: ''
}

const app = express()
const port = 3000

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "1424@Parole132725",
  database: 'gtmetrixdb'
});

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json());

app.post('/user', body('username', 'Short Username').trim().isLength({ min: 3 }).escape(),
  body('password', 'Short Password').trim().isLength({ min: 1 }).escape(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      app.use(express.static('public'))
      return;
    }

    User = {
      username: req.body.username,
      password: req.body.password,
    }
    // Get user with username & password
    pool.getConnection(function (err, con) {
      if (err) { console.log(err) }
      con.query(`SELECT * FROM users WHERE username = '${User.username}' AND password = '${User.password}'`,
        function (err, rows) {
          if (err) {
            app.use(express.static('public'))
            throw err
          };
          // console.log(rows)
          app.get('/welcome/', (req, res) => {
            res.send(`Welcome ${User.username}!`)
          })
          con.release();
        });
    });

    // New user added
    // con.connect(function (err) {
    //   if (err) throw err;
    //   console.log("Connected!");
    //   var sql = `INSERT INTO users (username, password) VALUES ('${User.username}', '${User.password}')`;
    //   con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted, ID: " + result.insertId);
    //   });
    // });
  });


// const username = 'hackerjohn'
// const password = 'reallyhArdpwbtw'
// let user_id = 1
// // Database created
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE gtmetrixdb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created", result);
//   });
// });

// Table Created
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = `CREATE TABLE users (
// user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//     username VARCHAR(255) NOT NULL UNIQUE,
//       password CHAR(60) NOT NULL
// )`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created",result);
//   });
// });



app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
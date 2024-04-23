const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const ejs = require('ejs');

dotenv.config();

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/data', (req, res) => {
  connection.query('SELECT time, temperature, pressure, humidity, latitude, longitude, height, velocity FROM sarfad_data', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
  
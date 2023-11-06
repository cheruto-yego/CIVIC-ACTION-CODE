const express = require("express")
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'law_app_db'
});

// Connect to the MySQL database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});


const users = [];

app.post('/signup', (req, res) => {
    const { email, username, password, client_number } = req.body;

    // Insert user data into MySQL database
    const query = 'INSERT INTO users (email, username, password, client_number) VALUES (?, ?, ?, ?)';
    connection.query(query, [email, username, password, client_number], (err, results) => {
        if (err) {
            console.error('Error inserting user data: ' + err.stack);
            return res.send('Error occurred during signup.');
        }
        console.log('New user registered with ID: ' + results.insertId);
        res.send('Signup successful!');
    });
});

app.listen(3000, () => console.log("Server is running on port 3000"))
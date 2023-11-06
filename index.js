const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'law_app_db'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

app.get('/signup', (req, res) => {
    res.send(`
        <form action="/signup" method="post">
            Email: <input type="email" name="email" required><br>
            Username: <input type="text" name="username" required><br>
            client_number: <input type="text" name="client_number" required><br>
            Password: <input type="password" name="password" required><br>
            <input type="submit" value="Sign Up">
        </form>
    `);
});

app.post('/signup', (req, res) => {
    const { email, username, clientNumber, password } = req.body;

    // Insert user data into MySQL database
    const query = 'INSERT INTO users (email, username, client_number, password) VALUES (?, ?, ?, ?)';
    connection.query(query, [email, username, client_number, password], (err, results) => {
        if (err) {
            console.error('Error inserting user data: ' + err.stack);
            return res.send('Error occurred during signup.');
        }
        console.log('New user registered with ID: ' + results.insertId);
        res.send('Signup successful!');
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


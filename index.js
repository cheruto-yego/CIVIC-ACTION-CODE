const express = require("express")
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'your-mysql-host',
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

app.get("/" , (req, res) => {
    res.send(`
    <form action="/signup" method="post">
        Email: <input type="email" name="email" required><br>
        Username: <input type="text" name="username" required><br>
        Phone Number: <input type="tel" name="phoneNumber" required><br>
        Password: <input type="password" name="password" required><br>
        <input type="submit" value="Sign Up">
    </form>
`)
    
})
app.post('/signup', (req, res) => {
    const { email, username, phoneNumber, password } = req.body;
    
    // Check if the email is already registered
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.send('Email already registered. Please use a different email.');
    }

    // Store the user data (in-memory storage, replace it with database storage in a real application)
    const newUser = { email, username, phoneNumber, password };
    users.push(newUser);

   
    console.log('New user registered:', newUser);
    res.send('Signup successful!');

    
});

app.listen(3000, () => console.log("Server is running on port 3000"))
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
const users = [];

// Serve the signup form
app.get('/signup', (req, res) => {
    res.send(`
        <form action="/signup" method="post">
            Email: <input type="email" name="email" required><br>
            Username: <input type="text" name="username" required><br>
            client_number: <input type="tel" name="client_number" required><br>
            Password: <input type="password" name="password" required><br>
            <input type="submit" value="Sign Up">
        </form>
    `);
});

// Handle form submission
app.post('/signup', (req, res) => {
    const { email, username, password, client_number } = req.body;
    
    // Check if the email is already registered
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.send('Email already registered. Please use a different email.');
    }

    // Store the user data (in-memory storage, replace it with database storage in a real application)
    const newUser = { email, username, password, client_number };
    users.push(newUser);

    // For demonstration purposes, just print the user data
    console.log('New user registered:', newUser);
    res.send('Signup successful!');

    // Redirect to a thank you page or login page after successful signup
    // res.redirect('/thankyou');
});
// Connect to the MySQL database


app.listen(3000, () => console.log("Server is running on port 3000"))
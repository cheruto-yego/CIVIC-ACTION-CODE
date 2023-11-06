const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse incoming request data
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store user data (in-memory storage, replace it with a database in a real application)
const users = [];

// Serve the signup form
app.get('/signup', (req, res) => {
    res.send(`
        <form action="/signup" method="post">
            Email: <input type="email" name="email" required><br>
            Username: <input type="text" name="username" required><br>
            Phone Number: <input type="tel" name="phoneNumber" required><br>
            Password: <input type="password" name="password" required><br>
            <input type="submit" value="Sign Up">
        </form>
    `);
});

// Handle form submission
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

    // For demonstration purposes, just print the user data
    console.log('New user registered:', newUser);
    res.send('Signup successful!');

    // Redirect to a thank you page or login page after successful signup
    // res.redirect('/thankyou');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

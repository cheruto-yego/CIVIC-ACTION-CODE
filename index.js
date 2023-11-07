const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// Create a MySQL connection
const connection = mysql.createConnection(process.env.DATABASE_URL);

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as id " + connection.threadId);
  console.log("Connected to PlanetScale!");
});

const users = [];

app.get("/", (req, res) => {
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

app.post("/signup", (req, res) => {
  const { email, username, client_number, password } = req.body;

  // Check if the email is already registered in the database
  const checkQuery = "SELECT * FROM client_table WHERE email = ?";
  connection.query(checkQuery, [email], (error, results) => {
    if (error) {
      console.error("Error checking existing user:", error);
      return res.send("Error occurred during signup.");
    }

    // If the user already exists, send an error message
    if (results.length > 0) {
      return res.send(
        "Email already registered. Please use a different email."
      );
    }

    // Insert the new user into the client_table
    const insertQuery =
      "INSERT INTO client_table (email, username, client_number, password) VALUES (?, ?, ?, ?)";
    connection.query(
      insertQuery,
      [email, username, client_number, password],
      (err, result) => {
        if (err) {
          console.error("Error inserting user data:", err);
          return res.send("Error occurred during signup.");
        }
        console.log("New user registered with ID:", result.insertId);
        res.send("Signup successful!");
      }
    );
  });
});

const PORT = process.env.PORT || 3001; // Use the PORT environment variable provided by Render or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

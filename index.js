import express from "express";
import cors from "cors";

const app = express();
// Enable CORS for all routes
app.use(cors());
app.use(express.json());

import mysql from "mysql2";

// connecting Database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123@Yego",
  database: "users",
});

// post request

app.post("/users", async (req, res) => {
  try {
    const { name, email, password, number } = req.body;
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO users (name, email, password, number) 
          VALUES (?, ?,?,?)`,
      [name, email, password, number]
    );
    res.status(202).json({
      message: "User Created",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const data = await connection.promise().query(`SELECT *  from users;`);
    res.status(200).json({
      users: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await connection
      .promise()
      .query(`SELECT *  from users where id = ?`, [id]);
    res.status(200).json({
      user: data[0][0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, number } = req.body;
    const update = await connection
      .promise()
      .query(
        `UPDATE users set name = ?, email = ?, password = ?, number = ? where id = ?`,
        [name, email, password, number, id]
      );
    res.status(200).json({
      message: "updated",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = await connection
      .promise()
      .query(`DELETE FROM  users where id = ?`, [id]);
    res.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.listen(5000, () => {
  console.log("Server listening in http://localhost:5000");
});

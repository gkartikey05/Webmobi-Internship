import mysql from "mysql";
import app from "./app.js";
import { config } from "dotenv";
config();

const connectionToDB = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

connectionToDB.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DataBase!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
});

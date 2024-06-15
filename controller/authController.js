import mysql from "mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const connectionToDB = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

const cookieOptions = {
  expires: new Date(Date.now() + 604800000),
  httpOnly: true,
  secure: true,
};

// REGISTER
const register = async (req, res) => {
  const sql = "INSERT INTO User (`username`,`email`,`password`) VALUES (?)";
  const values = [req.body.username, req.body.email, req.body.password];

  connectionToDB.query(sql, [values], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    return res.status(201).json({ message: "User registered successfully" });
  });
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    user.password = undefined;
    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { register, login };

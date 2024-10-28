// routes/auth.js

// Import the express library to handle routing
const express = require("express");

// Create a router instance to define routes for user authentication
const router = express.Router();

// Import the User model to interact with the user data in the database
const User = require("../models/User");

// Import bcrypt for password hashing and comparison
const bcrypt = require("bcrypt");

// Import jsonwebtoken for generating and verifying JWTs
const jwt = require("jsonwebtoken");

// User registration route
router.post("/register", async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Hash the password with a salt rounds of 10
    console.log(password);

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the username and hashed password
    const user = new User({ username, password: hashedPassword });

    // Save the user to the database
    await user.save();

    // Respond with a success message and a 201 status code
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // If an error occurs, respond with a 500 status and an error message
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login route
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find the user by username in the database
    const user = await User.findOne({ username });

    // If the user is not found, respond with a 401 status and an error message
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the password does not match, respond with a 401 status and an error message
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // If authentication is successful, create a JWT token with userId
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h", // Token will expire in 1 hour
    });

    // Respond with the token and a 200 status code
    res.status(200).json({ token });
  } catch (error) {
    // If an error occurs during login, respond with a 500 status and an error message
    res.status(500).json({ error: "Login failed" });
  }
});

// Export the router for use in the main application
module.exports = router;

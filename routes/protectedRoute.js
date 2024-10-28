// Import the express library to handle routing
const express = require("express");

// Create a router instance to define routes for the application
const router = express.Router();

// Import the verifyToken middleware to protect routes
const verifyToken = require("../middleware/authMiddleware");

// Protected route
// This route can only be accessed if the token verification is successful
router.get("/", verifyToken, (req, res) => {
  // If the token is valid, send a 200 status and a success message
  res.status(200).json({ message: "Protected route accessed" });
});

// Export the router for use in the main application
module.exports = router;

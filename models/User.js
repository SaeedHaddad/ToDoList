// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define a schema for the User model to structure the user data
const userSchema = new mongoose.Schema({
  // The 'username' field must be a unique string and is required
  username: { type: String, unique: true, required: true },

  // The 'password' field must be a string and is required
  password: { type: String, required: true },
});

// Export the User model based on the userSchema
// This allows the model to be used in other parts of the application for database operations
module.exports = mongoose.model("User", userSchema);

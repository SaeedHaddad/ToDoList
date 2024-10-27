// Including necessary modules
const express = require("express"); // Express framework for Node.js
const mongoose = require("mongoose"); // Mongoose library to connect to MongoDB

// Initialize the app using the express module
const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost/todo_express", {
  // useNewUrlParser: true, // Optional: enables the new MongoDB connection string parser
  // useUnifiedTopology: true, // Optional: uses the new MongoDB server discovery and monitoring engine
});

// Middlewares
// Parses incoming requests with URL-encoded payloads (form data)
app.use(express.urlencoded({ extended: true }));

// Serves static files from the 'public' directory
app.use(express.static("public"));

// Sets 'ejs' as the view engine for rendering HTML templates
app.set("view engine", "ejs");

// Routes
// Imports and uses routes defined in the 'index' and 'todo' files
app.use(require("./routes/index"));
// When user visits homepage (GET /):
// → routes/index.js handles it
// → Fetches todos from MongoDB
// → Renders index.ejs with todos
app.use(require("./routes/todo"));
// Handles todo operations like:
// POST /add/todo → Create new todo
// GET /delete/todo/:id → Delete a todo

// Server configuration
// Starts the server and listens on port 3000, logs a message when the server starts
app.listen(3000, () => console.log("Server Started listening on Port:3000"));

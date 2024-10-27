// Import the Router functionality from Express framework
const router = require("express").Router();

// Import the Todo model we created in Todo.js
const Todo = require("../models/Todo");

// Define routes for handling HTTP requests

// Handle GET requests to the root path '/'
router.get("/", async (req, res) => {
  // Find all todo items in the database using the Todo model
  // The 'await' keyword makes sure we wait for the database query to complete
  const allTodo = await Todo.find();

  // Render the 'index' view (template) and pass the todos as data
  // The todos will be available in the template as the variable 'todo'
  res.render("index", { todo: allTodo });
});

// Export the router so it can be used in other parts of the application
module.exports = router;

// Import Express Router to create modular route handlers
const router = require("express").Router();

// Import the Todo model for database operations
const Todo = require("../models/Todo");

// Define routes for todo operations

router
  // Handle POST request to add a new todo
  .post("/add/todo", (req, res) => {
    // Extract the todo text from request body using destructuring
    const { todo } = req.body;

    // Create a new Todo instance with the extracted todo text
    const newTodo = new Todo({ todo });

    // Save the new todo to the database
    newTodo
      .save()
      // If save is successful
      .then(() => {
        // Log success message to server console
        console.log("successfully added to do !");

        // Redirect user back to homepage
        res.redirect("/");
      })
      // If there's an error, log it to the console
      .catch((err) => console.log(err));
  })

  // Handle GET request to delete a todo
  // :_id is a URL parameter that will contain the todo's ID
  .get("/delete/todo/:_id", (req, res) => {
    // Extract the _id from URL parameters using destructuring
    const { _id } = req.params;

    // Delete the todo with the matching _id from database
    Todo.deleteOne({ _id })
      // If deletion is successful
      .then(() => {
        // Log success message to server console
        console.group("Deleted Todo Successfully!");

        // Redirect user back to homepage
        res.redirect("/");
      })
      // If there's an error, log it to the console
      .catch((err) => console.log(err));
  });

// Export the router to be used in other parts of the application
module.exports = router;

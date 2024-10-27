// Import mongoose library which helps interact with MongoDB
const mongoose = require("mongoose");

// Create a new schema definition for Todo items
const TodoSchema = new mongoose.Schema({
  // Define the 'todo' field
  todo: {
    type: String, // The field will contain string data
    required: true, // This field is mandatory and cannot be empty
  },
});

// Create and export a mongoose model named "Todo" using our schema
// This model can be used in other files to interact with the "todos" collection
module.exports = new mongoose.model("Todo", TodoSchema);

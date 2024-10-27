//including
const express = require("express");
const mongoose = require("mongoose"); // to connect to the database

//initialize app using express module

const app = express();

//connection to mongodb

mongoose.connect("mongodb://localhost/todo_express", {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true, //what is this??????
});

//middlewares
//a body parser now comes integrated with expressjs

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//routes
app.use(require("./routes/index"));
app.use(require("./routes/todo"));

//server configurations

app.listen(3000, () => console.log("Server Started listening on Port:3000"));

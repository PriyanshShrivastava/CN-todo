const express = require("express");
const app = express();
const connectDB = "./config/db.js";
const Tasks = require("./model/todoModel.js");
const bodyParser = require("body-parser");

// connect to db
connectDB();

// Setting up ejs requirements
app.set("view engine", "ejs");
app.set("views", "./views");

// setting up static folder to be served
app.use(express.static("css"));

//Middleware to use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  Tasks.find({}, function (err, tasks) {
    if (err) {
      console.log("Error Fetching from database");
      return;
    }
    return res.render("list", {
      title: "To do list",
      tasks_list: tasks,
    });
  });
});

const express = require("express");
const app = express();
const Tasks = require("./model/todoModel.js");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const path = require("path");
dotenv.config({ path: "./.env" });

// Setting up ejs requirements
app.set("view engine", "ejs");
app.set("views", "./views");

// setting up static folder to be served
app.use(express.static(__dirname + "/public"));

//Middleware to use bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  const DB_URL = process.env.MONGO_URL.replace(
    "<PASSWORD>",
    process.env.MONGO_PASSWORD
  );
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log(`Connected to mongo db database ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};
// connect to db
connectDB();

// Serving normal get request

app.get("/", function (req, res) {
  Tasks.find({}).then((tasks) =>
    res.render("list", {
      title: "To do list",
      tasks_list: tasks,
    })
  );
});

// handling adding task
app.post("/create-task", function (req, res) {
  Tasks.create({
    description: req.body.description,
    category: req.body.category,
    dueDate: req.body.dueDate === "" ? "No Deadline" : req.body.dueDate,
  })
    .then((newTask) => {
      console.log(newTask);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      return;
    });
});

// handling delete task
app.post("/delete-task", function (req, res) {
  let id = req.body.id;

  Tasks.findByIdAndDelete(id)
    .then((_) => res.redirect("back"))
    .catch((err) => {
      console.error(err);
      return;
    });
});

// setting port value
const PORT = process.env.PORT || 8080;

app.listen(PORT, function (err) {
  if (err) {
    console.log("Error running the server");
  }
  console.log("Server is up and running");
});

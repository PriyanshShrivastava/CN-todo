const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
});

const Tasks = mongoose.model("Tasks", toDoSchema);

module.exports = Tasks;

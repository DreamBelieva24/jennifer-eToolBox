console.log("got to models")

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: { type: String, required: false },
  label: { type: String, required: false },
  completed: { type: Number, required: false },
  username: { type: String, required: true },
  subscription: { type: String, required: false },
  name: { type: String, required: false },
  date: { type: Date, required: false },
  count: {type: Number, required: false}
  
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

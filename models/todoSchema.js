// todoSchema.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  checked: { type: Boolean, default: false },
});

const Tasks = mongoose.model("Tasks", todoSchema,"Todo-List");

module.exports = Tasks;

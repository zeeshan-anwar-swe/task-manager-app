const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a task"],
    },

    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

const Task = mongoose.model("task", taskSchema);
module.exports = Task;

const express = require("express");
const { createTask, getTasks, getSingleTask, deleteTask, updateTask } = require("../controller/taskController.js");


const router = express.Router();

// add data in mongo db
router.post("/create-task", createTask)
  
// get all tasks from mongo db
router.get("/get-tasks", getTasks)

// get single tasks from mongo db
router.get("/get-task/:id", getSingleTask)

// get single tasks from mongo db
router.delete("/delete-task/:id", deleteTask)

// get single tasks from mongo db
router.put("/update-task/:id", updateTask)


  
module.exports = router

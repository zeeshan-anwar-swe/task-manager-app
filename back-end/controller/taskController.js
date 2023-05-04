const Task = require("../models/taskModel");

const createTask = async (request, response) => {
  try {
    const task = await Task.create(request.body);
    response.status(200).json(task);
  } catch (error) {
    response.status(500).json(error);
  }
};

const getTasks = async (request, response) => {
  try {
    const tasks = await Task.find();
    response.status(200).json(tasks);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

const getSingleTask = async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findById(id);
    if (!task) {
      return response.status(404).json(`No Task found Against this id: ${id}`);
    } else {
      response.status(200).json(task);
    }
  } catch (error) {
    return response.status(500).json(error);
  }
};

const deleteTask = async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return response.status(404).json(`No Task found Against this id: ${id}`);
    } else {
      response.status(200).json(`Task against id: ${id} has been deleted`);
    }
  } catch (error) {
    return response.status(500).json({msg: error.message});
  }
};

const updateTask = async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, request.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return response.status(404).json(`No Task found Against this id: ${id}`);
    } else {
      response.status(200).json(task);
    }
  } catch (error) {
    return response.status(500).json({msg: error.message});
  }
};

module.exports = {
  createTask,
  getSingleTask,
  getTasks,
  deleteTask,
  updateTask,
};

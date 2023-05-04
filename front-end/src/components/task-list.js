import loadingImg from "../assets/loader.gif";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TaskForm from "./task-form";
import { URL } from "../App";
import Task from "./task";
import axios from "axios";

//http://localhost:4000/api/tasks/create-task
//http://localhost:4000/api/tasks/delete-task
//http://localhost:4000/api/tasks/get-tasks

const TaskList = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, name: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const fetchedTasks = await axios.get(`${URL}/get-tasks`);
      setIsLoading(false);
      setTasks(fetchedTasks.data);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(cTask.length);
  }, [tasks]);
  

  const createTask = async (e, id) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field canot be empty");
    }

    if (isUpdating === false) {
      try {
        await axios.post(`${URL}/create-task`, formData);
        setFormData({ ...formData, name: "" });
        toast.success("Task added successfully");
        getTasks();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        await axios.put(`${URL}/update-task/${taskId}`, formData);
        setFormData({ ...formData, name: "" });
        toast.success("Task updated successfully");
        getTasks();
        setIsUpdating(false);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getSingleData = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskId(task._id);
    setIsUpdating(true);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/delete-task/${id}`);
      toast.success("Task deleted successfully");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toCompleteTask = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };

    try {
      await axios.put(`${URL}/update-task/${task._id}`, newFormData);
      toast.success("Task completed successfully");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h4>Task Manager</h4>
      <TaskForm
        handleInputChange={handleInputChange}
        createTask={createTask}
        isUpdating={isUpdating}
        name={name}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks: </b>
          {tasks.length}
        </p>

        <p>
          <b>Completed Tasks: </b>
          {completedTasks}
        </p>
      </div>

      <hr />

      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Image is loading...." />
        </div>
      )}

      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task added, please add a task.</p>
      ) : (
        tasks.map((task, index) => (
          <Task
            key={task._id}
            task={task}
            index={index}
            deleteTask={deleteTask}
            getSingleData={getSingleData}
            toCompleteTask={toCompleteTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;

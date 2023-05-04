const TaskForm = ({ isUpdating, createTask, name, handleInputChange }) => {
  return (
    <>
      <form className="task-form" onSubmit={createTask}>
        <input
          type="text"
          placeholder="Enter the task "
          value={name}
          onChange={handleInputChange}
        />
        <button type="submit">{isUpdating === true ? "Update" : "Add"}</button>
      </form>
    </>
  );
};

export default TaskForm;

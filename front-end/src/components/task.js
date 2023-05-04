import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";
// import "./task.css";

const Task = ({ task, index, deleteTask, getSingleData, toCompleteTask }) => {
	return (
		<div className={task.completed ? "task completed" : "task"}>
			<p>
				<b>{index + 1}. </b>
				{task.name}
			</p>

			<div className="task-icons">
				<FaCheckDouble color="green" onClick={() => toCompleteTask(task)} />
				<FaEdit color="purple" onClick={() => getSingleData(task)} />
				<FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
			</div>
		</div>
	);
};

export default Task;

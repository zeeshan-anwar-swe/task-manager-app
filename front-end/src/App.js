import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from "./components/task-list";

export const URL = process.env.REACT_APP_SERVER_HOST_URL;

function App() {
  console.log(">>>>>>>>",URL);
  return (
    <div className="app">
      <div className="task-container">
        <TaskList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

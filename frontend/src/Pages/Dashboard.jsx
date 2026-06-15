import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../Components/Navbar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const processingTasks = tasks.filter(
    (task) => task.status === "processing"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Dashboard
        </h1>

        <p className="text-gray-600 mb-8">
          Monitor your distributed task queue in real time.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Total Tasks</h3>
            <p className="text-3xl font-bold text-indigo-600">
              {totalTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Processing</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {processingTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Pending</h3>
            <p className="text-3xl font-bold text-red-500">
              {pendingTasks}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Recent Tasks
        </h2>

        <div className="grid gap-4">
          {tasks.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow">
              No tasks found.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {task.title}
                  </h3>

                  <p className="text-gray-500">
                    Type: {task.type}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-white text-sm font-medium
                  ${
                    task.status === "completed"
                      ? "bg-green-500"
                      : task.status === "processing"
                      ? "bg-yellow-500"
                      : task.status === "pending"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
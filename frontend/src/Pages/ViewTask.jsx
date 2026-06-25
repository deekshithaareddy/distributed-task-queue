import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../Components/Navbar";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          All Tasks
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-3">
                {task.title}
              </h2>

              <p className="mb-2">
                <strong>Type:</strong> {task.type}
              </p>

              <p className="mb-2">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    task.status === "completed"
                      ? "text-green-600"
                      : task.status === "processing"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {task.status}
                </span>
              </p>
            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default ViewTasks;

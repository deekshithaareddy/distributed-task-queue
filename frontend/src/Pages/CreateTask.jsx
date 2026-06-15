import { useState } from "react";
import api from "../api";
import Navbar from "../Components/Navbar";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("general");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/tasks", {
      title,
      type,
    });

    alert("Task Created");

    setTitle("");
    setType("general");
  };

  return (
    <>
    <Navbar />
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">

      <h2 className="text-3xl font-bold mb-6">
        Create New Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option value="general">General</option>
          <option value="report">Report</option>
          <option value="email">Email</option>
        </select>

        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Create Task
        </button>

      </form>
    </div>
    </>
  );
};

export default CreateTask;

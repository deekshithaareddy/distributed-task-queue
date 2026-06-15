import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Task Queue
        </h1>

        <div className="flex items-center gap-8">
          <Link to="/dashboard">Home</Link>

          <Link to="/create">
            Create Task
          </Link>

          <Link to="/tasks">
            View Tasks
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
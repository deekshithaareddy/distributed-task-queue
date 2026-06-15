import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-600 text-white">
      <nav className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold">TaskQueue</h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-purple-700 px-4 py-2 rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-white px-4 py-2 rounded-lg"
          >
            Register
          </Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h2 className="text-6xl font-bold mb-6">
          Distributed Task Queue
        </h2>

        <p className="text-xl max-w-2xl">
          Create, manage and monitor background jobs with
          Redis, BullMQ, MongoDB and React.
        </p>

        <Link
          to="/register"
          className="mt-8 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
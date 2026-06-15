import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-8">

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h1 className="text-3xl font-bold mt-4">
            Profile
          </h1>

          <p className="text-gray-500">
            User Information
          </p>
        </div>

        <div className="mt-8 space-y-4">

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">
              Username
            </p>

            <h2 className="text-lg font-semibold">
              {user?.name || "Unknown User"}
            </h2>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">
              Email
            </p>

            <h2 className="text-lg font-semibold">
              {user?.email || "No Email"}
            </h2>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;
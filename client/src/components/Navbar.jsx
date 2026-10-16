import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          EduNotes
        </h2>

        <p className="text-slate-500 text-sm">
          Student Notes Sharing Platform
        </p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-xl w-96">
        <FaSearch className="text-slate-400" />

        <input
          type="text"
          placeholder="Search notes..."
          className="bg-transparent outline-none ml-3 w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="relative">
          <FaBell className="text-2xl text-slate-600 hover:text-blue-600" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {user ? (
          <>
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-4xl text-slate-600" />

              <div className="hidden md:block">
                <h3 className="font-semibold">
                  {user.name}
                </h3>

                <p className="text-sm text-slate-500">
                  Student
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;

import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaUpload,
  FaUser,
  FaGraduationCap,
  FaFolderOpen,
  FaFileAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/",
    },
    {
      name: "Courses",
      icon: <FaBook />,
      path: "/courses",
    },
    {
      name: "Notes",
      icon: <FaFolderOpen />,
      path: "/notes/All",
    },
    {
      name: "Upload Notes",
      icon: <FaUpload />,
      path: "/upload",
    },
    {
      name: "My Uploaded Notes",
      icon: <FaFileAlt />,
      path: "/my-uploaded-notes",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-8 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <FaGraduationCap className="text-4xl text-blue-400" />

          <div>
            <h1 className="text-2xl font-bold">EduNotes</h1>

            <p className="text-sm text-slate-400">
              Learn • Share • Grow
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 p-5">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname === item.path ||
                  (item.path === "/notes/All" &&
                    location.pathname.startsWith("/notes/"));

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>

                  <span className="font-medium">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-slate-700">
        <p className="text-center text-sm text-slate-400">
          EduNotes v1.0
        </p>
      </div>
    </div>
  );
}

export default Sidebar;

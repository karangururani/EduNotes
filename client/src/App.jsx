
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Branches from "./pages/Branches";
import Years from "./pages/Years";
import Semesters from "./pages/Semesters";
import Subjects from "./pages/Subjects";
import Notes from "./pages/Notes";
import UploadNotes from "./pages/UploadNotes";
import MyUploadedNotes from "./pages/MyUploadedNotes";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      {/* Password reset page */}
      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* Main EduNotes layout */}
      <Route
        path="*"
        element={
          <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <main className="flex-1 p-8">
              <Navbar />

              <div className="mt-8">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route
                    path="/branches/:courseId"
                    element={<Branches />}
                  />

                  <Route
                    path="/years/:courseId/:branchId"
                    element={<Years />}
                  />

                  <Route
                    path="/semesters/:courseId/:branchId/:yearIndex"
                    element={<Semesters />}
                  />

                  <Route
                    path="/subjects/:courseId/:branchId/:yearIndex/:semesterIndex"
                    element={<Subjects />}
                  />

                  <Route
                    path="/notes/:subjectName"
                    element={<Notes />}
                  />

                  {/* Protected Routes */}
                  <Route
                    path="/upload"
                    element={
                      <ProtectedRoute>
                        <UploadNotes />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/my-uploaded-notes"
                    element={
                      <ProtectedRoute>
                        <MyUploadedNotes />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </main>
          </div>
        }
      />
    </Routes>
  );
}

export default App;


import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaArrowRight, FaBookOpen } from "react-icons/fa";
import { courses } from "../data/courses";

function Courses() {
  const navigate = useNavigate();

  return (
    <div className="pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Explore Courses
          </h1>

          <p className="mt-2 text-slate-600">
            Choose your course to find notes for your branch, year, and semester.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-blue-700">
          <FaBookOpen className="text-xl" />
          <span className="font-medium">
            {courses.length} Courses Available
          </span>
        </div>
      </div>

      {/* Course Cards */}
      {courses.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">
            No courses available
          </h2>
          <p className="mt-2 text-slate-500">
            Courses will appear here when they are added.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <button
              key={course.id}
              type="button"
              onClick={() => navigate(`/branches/${course.id}`)}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <FaGraduationCap className="text-3xl" />
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                  {course.branches.length}{" "}
                  {course.branches.length === 1 ? "Branch" : "Branches"}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-800">
                {course.name}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explore branches, select your academic year and semester, and
                find relevant study notes.
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="font-semibold text-blue-600">
                  Explore Course
                </span>

                <FaArrowRight className="text-blue-600 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;

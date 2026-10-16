
import { useParams, useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaArrowRight,
  FaBookOpen,
} from "react-icons/fa";
import { courses } from "../data/courses";

function Branches() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = courses.find(
    (course) => String(course.id) === courseId
  );

  if (!course) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-red-500">
          Course Not Found
        </h1>

        <p className="mt-2 text-slate-600">
          The selected course could not be found.
        </p>

        <button
          type="button"
          onClick={() => navigate("/courses")}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const branches = course.branches || [];

  return (
    <div className="pb-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <button
          type="button"
          onClick={() => navigate("/courses")}
          className="hover:text-blue-600"
        >
          Courses
        </button>

        <span>/</span>

        <span className="font-medium text-slate-800">
          {course.name}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            {course.name}
          </h1>

          <p className="mt-2 text-slate-600">
            Select your branch to find notes for your academic year and semester.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-blue-700">
          <FaBookOpen className="text-2xl" />

          <div>
            <p className="text-2xl font-bold">{branches.length}</p>
            <p className="text-sm">
              {branches.length === 1 ? "Branch" : "Branches"}
            </p>
          </div>
        </div>
      </div>

      {/* Branch Cards */}
      {branches.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-800">
            No branches available
          </h2>

          <p className="mt-2 text-slate-500">
            There are currently no branches listed for this course.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch) => (
            <button
              key={branch.id}
              type="button"
              onClick={() =>
                navigate(`/years/${course.id}/${branch.id}`)
              }
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <FaGraduationCap className="text-3xl" />
                </div>

                <FaArrowRight className="text-blue-600 transition-transform group-hover:translate-x-1" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-800">
                {branch.name}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explore academic years, semesters, subjects, and available study notes.
              </p>

              <div className="mt-5 border-t border-slate-100 pt-4 font-semibold text-blue-600">
                View Academic Years
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Branches;

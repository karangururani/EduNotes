
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa";
import { courses } from "../data/courses";

function Semesters() {
  const { courseId, branchId, yearIndex } = useParams();
  const navigate = useNavigate();

  const course = courses.find(
    (item) => String(item.id) === courseId
  );

  const branch = course?.branches.find(
    (item) => String(item.id) === branchId
  );

  const year = branch?.years?.[Number(yearIndex)];

  if (!course || !branch || !year) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-red-500">
          Academic Year Not Found
        </h1>

        <p className="mt-2 text-slate-600">
          Please select a valid course, branch, and academic year.
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

  const semesters =
    typeof year === "string" ? [] : year.semesters || [];

  const yearName =
    typeof year === "string" ? year : year.year;

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

        <button
          type="button"
          onClick={() => navigate(`/branches/${course.id}`)}
          className="hover:text-blue-600"
        >
          {course.name}
        </button>

        <span>/</span>

        <button
          type="button"
          onClick={() =>
            navigate(`/years/${course.id}/${branch.id}`)
          }
          className="hover:text-blue-600"
        >
          {branch.name}
        </button>

        <span>/</span>

        <span className="font-medium text-slate-800">
          {yearName}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            Select Semester
          </h1>

          <p className="mt-2 text-slate-600">
            {course.name} · {branch.name} · {yearName}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Choose a semester to explore its subjects and study notes.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-blue-700">
          <FaGraduationCap className="text-2xl" />

          <div>
            <p className="text-2xl font-bold">{semesters.length}</p>
            <p className="text-sm">
              {semesters.length === 1 ? "Semester" : "Semesters"}
            </p>
          </div>
        </div>
      </div>

      {/* Semester Cards */}
      {semesters.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-800">
            No semesters available
          </h2>

          <p className="mt-2 text-slate-500">
            No semesters have been configured for this academic year.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {semesters.map((semester, index) => (
            <button
              key={semester}
              type="button"
              onClick={() =>
                navigate(
                  `/subjects/${courseId}/${branchId}/${yearIndex}/${index}`
                )
              }
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <FaBookOpen className="text-2xl" />
                </div>

                <FaArrowRight className="text-blue-600 transition-transform group-hover:translate-x-1" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-800">
                {semester}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Explore subjects and available notes for this semester.
              </p>

              <div className="mt-5 border-t border-slate-100 pt-4 font-semibold text-blue-600">
                View Subjects
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Semesters;
